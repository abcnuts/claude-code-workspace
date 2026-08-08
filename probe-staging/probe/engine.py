"""The probe engine.

One run = N independent, search-grounded asks of the customer question,
followed by a cheap extraction pass that lists the business names in each
answer. Appearance = the target business is named (fuzzy-matched), with raw
text kept forever as the human-checkable receipt.

Integrity rule 1: every ask uses the web_search tool. Never the bare model.
Integrity rule 2: if any sample errors, the whole run is marked invalid.
Integrity rule 3: re-runs of a business reuse the baseline's locked config.
"""
import json
import os

import yaml
from dotenv import load_dotenv
from openai import OpenAI

from . import db
from .matching import normalize, target_in_names, target_in_text

load_dotenv()

DEFAULT_MODEL = os.environ.get("OPENAI_MODEL", "gpt-4o-mini")
SAMPLES_PER_RUN = int(os.environ.get("SAMPLES_PER_RUN", "10"))

_QUESTIONS_PATH = os.path.join(os.path.dirname(__file__), "questions.yaml")

_EXTRACT_PROMPT = (
    "Below is an answer from an AI assistant about local businesses. "
    "List every business name it mentions. Respond with ONLY a JSON array of "
    "strings, e.g. [\"Joe's Plumbing\", \"Acme Drain\"]. If it names no "
    "businesses, respond with []."
)

_NO_REC_MARKERS = (
    "i can't recommend", "i cannot recommend", "i'm unable to recommend",
    "check online directories", "i don't have specific recommendations",
)


def load_questions() -> dict:
    with open(_QUESTIONS_PATH) as f:
        return yaml.safe_load(f)


def question_for(trade: str, town: str) -> str:
    questions = load_questions()
    if trade not in questions:
        raise ValueError(f"Unknown trade '{trade}'. Add it to probe/questions.yaml. "
                         f"Known: {', '.join(sorted(questions))}")
    return questions[trade].format(town=town)


def _ask_with_search(client: OpenAI, model: str, question: str) -> str:
    resp = client.responses.create(
        model=model,
        tools=[{"type": "web_search"}],
        input=question,
    )
    return resp.output_text


def _extract_names(client: OpenAI, model: str, answer_text: str) -> list[str]:
    resp = client.responses.create(
        model=model,
        input=f"{_EXTRACT_PROMPT}\n\n---\n{answer_text}",
    )
    text = resp.output_text.strip()
    # Defensive parse: find the first JSON array in the output.
    start, end = text.find("["), text.rfind("]")
    if start == -1 or end == -1:
        return []
    try:
        names = json.loads(text[start:end + 1])
        return [n for n in names if isinstance(n, str)]
    except json.JSONDecodeError:
        return []


def _looks_like_no_recommendation(text: str, names: list[str]) -> bool:
    if names:
        return False
    lower = text.lower()
    return any(m in lower for m in _NO_REC_MARKERS)


def run_probe(business: str, trade: str, town: str, *,
              model: str | None = None, n_samples: int | None = None,
              progress=None) -> int:
    """Execute a full run. Returns the run id. Marks the run invalid if any
    sample fails — partial runs are never presented as results."""
    conn = db.connect()
    business_norm = normalize(business)

    # Integrity rule 3: lock to the baseline config when one exists.
    baseline = db.baseline_config(conn, business_norm)
    if baseline:
        question, model, n_samples = baseline["question"], baseline["model"], baseline["n_samples"]
    else:
        question = question_for(trade, town)
        model = model or DEFAULT_MODEL
        n_samples = n_samples or SAMPLES_PER_RUN

    run_id = db.create_run(
        conn, business=business, business_norm=business_norm, trade=trade,
        town=town, question=question, model=model, n_samples=n_samples,
    )

    client = OpenAI()
    failed = False
    for i in range(1, n_samples + 1):
        try:
            raw = _ask_with_search(client, model, question)
            names = _extract_names(client, model, raw)
            hit = 1 if (target_in_names(business, names) or target_in_text(business, raw)) else 0
            no_rec = _looks_like_no_recommendation(raw, names)
            db.add_sample(conn, run_id, i, raw_text=raw, names=names,
                          target_hit=hit, no_recommendation=no_rec)
            if progress:
                progress(i, n_samples, hit)
        except Exception as e:  # noqa: BLE001 — any sample failure invalidates the run
            db.add_sample(conn, run_id, i, error=str(e))
            failed = True
            break

    db.finalize_run(conn, run_id, "invalid" if failed else "valid")
    return run_id


def competitor_tally(samples) -> list[tuple[str, int]]:
    """Aggregate every named business across samples (normalized dedupe)."""
    counts: dict[str, dict] = {}
    for s in samples:
        seen_this_sample = set()
        for name in json.loads(s["names_json"] or "[]"):
            key = normalize(name)
            if not key or key in seen_this_sample:
                continue
            seen_this_sample.add(key)
            if key not in counts:
                counts[key] = {"display": name, "n": 0}
            counts[key]["n"] += 1
    ranked = sorted(counts.values(), key=lambda d: -d["n"])
    return [(d["display"], d["n"]) for d in ranked]

"""SQLite persistence. Append-only by design.

Integrity rule 2: there is intentionally NO update/delete path for runs or
samples. Manual corrections live in an append-only overrides table and reports
show both original and corrected counts.
"""
import json
import os
import sqlite3
from datetime import date, datetime, timezone

DB_PATH = os.environ.get("PROBE_DB", os.path.join(os.path.dirname(__file__), "..", "probe.db"))

_SCHEMA = """
CREATE TABLE IF NOT EXISTS runs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    business TEXT NOT NULL,
    business_norm TEXT NOT NULL,
    trade TEXT NOT NULL,
    town TEXT NOT NULL,
    question TEXT NOT NULL,
    model TEXT NOT NULL,
    n_samples INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',   -- pending | valid | invalid
    created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS samples (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    run_id INTEGER NOT NULL REFERENCES runs(id),
    idx INTEGER NOT NULL,
    raw_text TEXT,
    names_json TEXT,
    target_hit INTEGER,            -- 1 / 0 / NULL on error
    no_recommendation INTEGER DEFAULT 0,
    error TEXT
);
CREATE TABLE IF NOT EXISTS overrides (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sample_id INTEGER NOT NULL REFERENCES samples(id),
    corrected_hit INTEGER NOT NULL,
    note TEXT,
    created_at TEXT NOT NULL
);
"""


def connect():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.executescript(_SCHEMA)
    return conn


def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def create_run(conn, *, business, business_norm, trade, town, question, model, n_samples) -> int:
    cur = conn.execute(
        "INSERT INTO runs (business, business_norm, trade, town, question, model, n_samples, status, created_at)"
        " VALUES (?,?,?,?,?,?,?, 'pending', ?)",
        (business, business_norm, trade, town, question, model, n_samples, _now()),
    )
    conn.commit()
    return cur.lastrowid


def add_sample(conn, run_id, idx, *, raw_text=None, names=None, target_hit=None,
               no_recommendation=False, error=None):
    conn.execute(
        "INSERT INTO samples (run_id, idx, raw_text, names_json, target_hit, no_recommendation, error)"
        " VALUES (?,?,?,?,?,?,?)",
        (run_id, idx, raw_text, json.dumps(names or []), target_hit,
         1 if no_recommendation else 0, error),
    )
    conn.commit()


def finalize_run(conn, run_id, status):
    assert status in ("valid", "invalid")
    conn.execute("UPDATE runs SET status=? WHERE id=? AND status='pending'", (status, run_id))
    conn.commit()


def add_override(conn, sample_id, corrected_hit, note):
    conn.execute(
        "INSERT INTO overrides (sample_id, corrected_hit, note, created_at) VALUES (?,?,?,?)",
        (sample_id, 1 if corrected_hit else 0, note, _now()),
    )
    conn.commit()


def get_run(conn, run_id):
    run = conn.execute("SELECT * FROM runs WHERE id=?", (run_id,)).fetchone()
    if not run:
        return None, [], {}
    samples = conn.execute(
        "SELECT * FROM samples WHERE run_id=? ORDER BY idx", (run_id,)
    ).fetchall()
    # Latest override per sample wins for the corrected count.
    overrides = {}
    for s in samples:
        o = conn.execute(
            "SELECT * FROM overrides WHERE sample_id=? ORDER BY id DESC LIMIT 1", (s["id"],)
        ).fetchone()
        if o:
            overrides[s["id"]] = o
    return run, samples, overrides


def list_runs(conn, business_norm=None):
    if business_norm:
        return conn.execute(
            "SELECT * FROM runs WHERE business_norm=? ORDER BY created_at DESC", (business_norm,)
        ).fetchall()
    return conn.execute("SELECT * FROM runs ORDER BY created_at DESC LIMIT 200").fetchall()


def baseline_config(conn, business_norm):
    """Integrity rule 3: the earliest valid run's config is the locked baseline."""
    return conn.execute(
        "SELECT question, model, n_samples FROM runs"
        " WHERE business_norm=? AND status='valid' ORDER BY created_at ASC LIMIT 1",
        (business_norm,),
    ).fetchone()


def runs_today(conn) -> int:
    today = date.today().isoformat()
    row = conn.execute(
        "SELECT COUNT(*) AS c FROM runs WHERE created_at LIKE ?", (today + "%",)
    ).fetchone()
    return row["c"]


def score(run, samples, overrides):
    """Return (original_hits, corrected_hits, n, no_rec_count)."""
    orig = sum(1 for s in samples if s["target_hit"] == 1)
    corrected = 0
    for s in samples:
        o = overrides.get(s["id"])
        hit = o["corrected_hit"] if o else s["target_hit"]
        corrected += 1 if hit == 1 else 0
    no_rec = sum(1 for s in samples if s["no_recommendation"])
    return orig, corrected, run["n_samples"], no_rec

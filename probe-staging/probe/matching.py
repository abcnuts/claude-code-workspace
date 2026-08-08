"""Business-name matching.

A false "0 of 10" from a name mismatch is the worst failure this tool can have,
so matching is deliberately forgiving and every report shows raw answers for a
human backstop.
"""
import re
from difflib import SequenceMatcher

# Suffix/filler tokens that don't carry identity.
_NOISE_TOKENS = {
    "llc", "inc", "co", "corp", "company", "the", "and", "of",
    "services", "service", "llp", "pllc", "pc", "pa",
}

_FUZZY_THRESHOLD = 0.9


def normalize(name: str) -> str:
    """Lowercase, strip punctuation and noise tokens, collapse whitespace."""
    s = name.lower()
    s = re.sub(r"[’']", "", s)  # apostrophes vanish: Joe's -> joes, not "joe s"
    s = s.replace("&", " and ")
    s = re.sub(r"[^a-z0-9\s]", " ", s)
    tokens = [t for t in s.split() if t not in _NOISE_TOKENS]
    return " ".join(tokens)


def is_match(target: str, candidate: str) -> bool:
    """True if candidate plausibly refers to the target business."""
    t, c = normalize(target), normalize(candidate)
    if not t or not c:
        return False
    if t == c:
        return True
    # Containment either way ("joes plumbing" in "joes plumbing drain")
    if t in c or c in t:
        return True
    return SequenceMatcher(None, t, c).ratio() >= _FUZZY_THRESHOLD


def target_in_names(target: str, names: list[str]) -> bool:
    return any(is_match(target, n) for n in names)


def target_in_text(target: str, text: str) -> bool:
    """Fallback: normalized containment against the raw answer text."""
    t = normalize(target)
    return bool(t) and t in normalize(text)

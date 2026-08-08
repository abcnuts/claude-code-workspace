"""Crew CLI — the engine with no UI.

Usage:
    python cli.py "Joe's Plumbing" plumber "Beaumont, TX"
"""
import sys

from probe import db
from probe.engine import competitor_tally, run_probe


def main():
    if len(sys.argv) != 4:
        print(__doc__)
        sys.exit(1)
    business, trade, town = sys.argv[1], sys.argv[2], sys.argv[3]
    if "," not in town:
        print("Include the state: e.g. \"Beaumont, TX\" (there are 30 Springfields).")
        sys.exit(1)

    def progress(i, n, hit):
        print(f"  ask {i}/{n}: {'NAMED' if hit else 'not named'}")

    print(f"Probing: {business} ({trade}) in {town}")
    run_id = run_probe(business, trade, town, progress=progress)

    conn = db.connect()
    run, samples, overrides = db.get_run(conn, run_id)
    orig, corrected, n, no_rec = db.score(run, samples, overrides)

    print(f"\nRun #{run_id} [{run['status']}] — {run['question']}")
    print(f"Score: named in {orig} of {n} asks" + (f" ({no_rec} gave no recommendation)" if no_rec else ""))
    print("\nWho showed up:")
    for name, count in competitor_tally(samples)[:15]:
        print(f"  {count:>2}x  {name}")


if __name__ == "__main__":
    main()

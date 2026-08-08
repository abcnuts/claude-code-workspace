import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from probe.matching import is_match, normalize, target_in_names  # noqa: E402


def test_normalize():
    assert normalize("Joe's Plumbing, LLC") == "joes plumbing"
    assert normalize("A&B Roofing Co.") == "a b roofing"
    assert normalize("The Dental Center of Beaumont") == "dental center beaumont"


def test_suffix_and_punctuation_variants_match():
    assert is_match("Joe's Plumbing LLC", "Joes Plumbing")
    assert is_match("A&B Roofing", "A and B Roofing Co")
    assert is_match("Joe's Plumbing", "Joe's Plumbing & Drain")   # containment


def test_different_businesses_do_not_match():
    assert not is_match("Joe's Plumbing", "Bob's Plumbing")
    assert not is_match("Acme HVAC", "Apex HVAC")


def test_target_in_names():
    names = ["Roto-Rooter", "Joes Plumbing and Drain", "Mr. Rooter"]
    assert target_in_names("Joe's Plumbing", names)
    assert not target_in_names("Delta Drain Pros", names)


if __name__ == "__main__":
    fails = 0
    for name, fn in sorted(globals().items()):
        if name.startswith("test_") and callable(fn):
            try:
                fn()
                print(f"PASS {name}")
            except AssertionError as e:
                fails += 1
                print(f"FAIL {name}: {e}")
    sys.exit(1 if fails else 0)

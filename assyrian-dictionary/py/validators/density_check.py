#!/usr/bin/env python3

import json
import os
import sys
from collections import Counter

PREV_FILE = "js/json/_aii.prev.jsonl"
CUR_FILE = "js/json/_aii.jsonl"

MAX_DENSITY_PCT = float(os.environ.get("AII_DENSITY_MAX_PCT", "3.0"))
MAX_NEW_FIELD_BYTES = int(os.environ.get("AII_NEW_FIELD_MAX_BYTES", "250000"))
MAX_SHARED_PCT = float(os.environ.get("AII_SHARED_MAX_PCT", "0.5"))
SOFT = os.environ.get("AII_DENSITY_SOFT") == "1"

RED = "\033[91m"
GREEN = "\033[92m"
YELLOW = "\033[93m"
RESET = "\033[0m"


def generate_aii_v(item, aii_not_v):
    forms = item.get("forms")
    if forms and forms[0].get("tags", [])[:1] == ["canonical"]:
        return forms[0]["form"]
    return aii_not_v


def walk(obj, prefix, paths, depth):
    if depth > 3:
        return
    if isinstance(obj, dict):
        for key, val in obj.items():
            path = f"{prefix}.{key}" if prefix else key
            paths[path] += len(json.dumps(val, ensure_ascii=False).encode("utf-8"))
            walk(val, path, paths, depth + 1)
    elif isinstance(obj, list):
        for val in obj:
            if isinstance(val, (dict, list)):
                walk(val, f"{prefix}[]", paths, depth)


def analyze(filename):
    by_word = Counter()
    paths = Counter()
    total = 0

    with open(filename, encoding="utf-8") as f:
        for line in f:
            if not line.strip():
                continue
            size = len(line.encode("utf-8"))
            total += size
            item = json.loads(line)
            by_word[generate_aii_v(item, item["word"])] += size
            walk(item, "", paths, 1)

    return {
        "words": len(by_word),
        "bytes": total,
        "paths": paths,
        "by_word": by_word,
    }


def pct(old, new):
    return (new - old) / old * 100 if old else float("inf")


def row(label, old, new, suffix="", delta=None, fmt=","):
    if delta is None:
        delta = pct(old, new)
    colour = GREEN if delta >= 0 else RED
    print(
        f"{label:<12}{old:>9{fmt}} -> {new:>9{fmt}}  "
        f"{colour}{delta:>+7.2f}%{RESET}{suffix}"
    )


def main():
    for path in (PREV_FILE, CUR_FILE):
        if not os.path.exists(path):
            print(f"skipping density check, {path} missing")
            sys.exit(0)

    prev = analyze(PREV_FILE)
    cur = analyze(CUR_FILE)

    if not prev["words"] or not cur["words"]:
        print("skipping density check, no words found")
        sys.exit(0)

    prev_density = prev["bytes"] / prev["words"]
    cur_density = cur["bytes"] / cur["words"]
    density_delta = pct(prev_density, cur_density)

    title = "dump density check"
    padding = "#" * len(title)
    print("\n".join([padding, title, padding]))

    row(
        "jsonl_kb",
        prev["bytes"] // 1024,
        cur["bytes"] // 1024,
        delta=pct(prev["bytes"], cur["bytes"]),
    )
    row("words", prev["words"], cur["words"])

    breached = abs(density_delta) > MAX_DENSITY_PCT
    flag = (
        f"  {YELLOW}<- exceeds {MAX_DENSITY_PCT}%{RESET}"
        if breached
        else f"  {GREEN}(density stable){RESET}"
    )
    row("kb/word", prev_density / 1024, cur_density / 1024, flag, density_delta, ",.2f")

    shared = prev["by_word"].keys() & cur["by_word"].keys()
    prev_shared = sum(prev["by_word"][word] for word in shared)
    cur_shared = sum(cur["by_word"][word] for word in shared)
    shared_delta = pct(prev_shared, cur_shared)
    warned = shared_delta > MAX_SHARED_PCT

    shared_flag = (
        f"  {YELLOW}<- exceeds {MAX_SHARED_PCT}%, analyze{RESET}"
        if warned
        else f"  {GREEN}(existing entries stable){RESET}"
    )
    row(
        "shared_kb",
        prev_shared // 1024,
        cur_shared // 1024,
        shared_flag,
        shared_delta,
    )

    new_fields = [
        (path, cur["paths"][path])
        for path in cur["paths"].keys() - prev["paths"].keys()
        if cur["paths"][path] > MAX_NEW_FIELD_BYTES
    ]
    new_fields.sort(key=lambda x: -x[1])

    dropped_fields = [
        (path, prev["paths"][path])
        for path in prev["paths"].keys() - cur["paths"].keys()
        if prev["paths"][path] > MAX_NEW_FIELD_BYTES
    ]
    dropped_fields.sort(key=lambda x: -x[1])

    if new_fields:
        print(f"\n{YELLOW}new fields in this dump:{RESET}")
        for path, size in new_fields:
            print(f"  {path:<40}{size:>+14,} bytes")

    if dropped_fields:
        print(f"\n{YELLOW}fields dropped from this dump:{RESET}")
        for path, size in dropped_fields:
            print(f"  {path:<40}{-size:>+14,} bytes")

    if breached or warned or new_fields or dropped_fields:
        shifts = [
            (path, prev["paths"].get(path, 0), cur["paths"].get(path, 0))
            for path in prev["paths"].keys() | cur["paths"].keys()
        ]
        shifts = [s for s in shifts if abs(s[2] - s[1]) > MAX_NEW_FIELD_BYTES]
        shifts.sort(key=lambda s: -abs(s[2] - s[1]))

        if shifts:
            print("\nlargest byte contributors to the change:")
            for path, old, new in shifts[:10]:
                colour = GREEN if new >= old else RED
                change = f"{new - old:+,}"
                share = f"{pct(old, new):+.1f}%" if old else "new"
                print(
                    f"  {path:<40}{old:>14,} -> {new:>14,}  "
                    f"{colour}{change:>14}{RESET}  {share:>8}"
                )

    if warned and not breached:
        print(
            f"\n{YELLOW}words carried over from the last dump grew "
            f"{shared_delta:.2f}%, over the {MAX_SHARED_PCT}% limit{RESET}"
        )
        print("bytes landed on entries that already existed, not on new words.")
        print("check the contributors above before merging this dump.")

    if breached:
        print(f"\n{RED}kb/word exceeded the {MAX_DENSITY_PCT}% limit{RESET}")
        print("the dump grew out of proportion to the words it describes.")
        sys.exit(0 if SOFT else 1)


if __name__ == "__main__":
    main()

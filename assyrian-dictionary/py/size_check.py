#!/usr/bin/env python3

import os
import sys

def main():
    # Files to compare
    new_file = "js/consts/aii-dict.min.js.gz"
    old_file = "js/consts/aii-dict.min.prev.js.gz"

    for file_path in [new_file, old_file]:
        if not os.path.exists(file_path):
            print(f"skipping size check, {file_path} missing")
            sys.exit(0)

    # Get sizes in bytes
    new_size = os.path.getsize(new_file)
    old_size = os.path.getsize(old_file)

    # Calculate the difference
    diff_bytes = new_size - old_size
    diff_kb = diff_bytes / 1024.0  # convert bytes to KB

    # Guard against division by zero (if old_size is ever 0)
    if old_size == 0:
        print("Error: old file size is 0 bytes; cannot compute percentage.")
        sys.exit(1)

    pct = (diff_bytes / old_size) * 100

    # ANSI escape codes for colors
    GREEN = "\033[92m"
    RED   = "\033[91m"
    RESET = "\033[0m"

    # Decide which color and message to print
    if diff_bytes > 0:
        color = GREEN
        direction = "bigger"
    elif diff_bytes < 0:
        color = RED
        direction = "smaller"
    else:
        # Same size
        color = ""
        direction = "the same size"

    # Absolute values for cleaner output
    diff_kb_abs = abs(diff_kb)
    pct_abs = abs(pct)

    if diff_bytes == 0:
        print(f"new dump is {direction}.")
    else:
        print(f"{color}new dump is {diff_kb_abs:.2f}KB {direction} ({pct_abs:.2f}%){RESET}")


if __name__ == "__main__":
    main()

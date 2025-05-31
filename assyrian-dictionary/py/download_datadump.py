import io
import gzip
import json
import hashlib
from pathlib import Path
from tempfile import NamedTemporaryFile

from requests import get
from tqdm import tqdm


DUMP_URL  = "https://kaikki.org/dictionary/raw-wiktextract-data.jsonl.gz"
BASE_DIR  = Path("js/json")
CUR_FILE  = BASE_DIR / "_aii.jsonl"
PREV_FILE = BASE_DIR / "_aii.prev.jsonl"
BASE_DIR.mkdir(parents=True, exist_ok=True)


def md5(path, bufsize=1 << 20):
    h = hashlib.md5()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(bufsize), b""):
            h.update(chunk)
    return h.hexdigest()


def stream_decompressed_lines(url):
    with get(url, stream=True, timeout=(15, 120)) as r:
        r.raise_for_status()
        total = int(r.headers.get("Content-Length", 0)) or None

        # attach tqdm to r.raw.read (in-place)
        tqdm.wrapattr(
            r.raw, "read",
            total=total,
            unit="B", unit_scale=True, unit_divisor=1024,
            desc="Downloading"
        )

        # gzip can now use r.raw directly
        with gzip.GzipFile(fileobj=r.raw) as gz, \
             io.TextIOWrapper(gz, encoding="utf-8") as txt:
            yield from txt          # re-yield every line verbatim

def build_filtered_dump() -> Path:
    with NamedTemporaryFile(
            mode="w", encoding="utf-8", delete=False,
            suffix=".jsonl", dir=BASE_DIR) as out:
        tmp_path = Path(out.name)
        progress_bar = tqdm(desc="Writing aii entries", unit=" lines")
        for line in stream_decompressed_lines(DUMP_URL):
            if not line.strip():
                continue
            try:
                obj = json.loads(line)
            except json.JSONDecodeError:
                continue
            if obj.get("lang_code") == "aii" and obj.get("lang") == "Assyrian Neo-Aramaic":
                json.dump(obj, out, ensure_ascii=False)
                out.write("\n")
                progress_bar.update(1)
        progress_bar.close()
    return tmp_path


def main():
    new_path = build_filtered_dump()

    if CUR_FILE.exists() and md5(CUR_FILE) == md5(new_path):
        new_path.unlink()
        print("No update – existing file is current.")
        return

    if CUR_FILE.exists():
        CUR_FILE.rename(PREV_FILE)
    new_path.rename(CUR_FILE)
    print(f"Updated  → {CUR_FILE}")
    if PREV_FILE.exists():
        print(f"Previous → {PREV_FILE}")


if __name__ == "__main__":
    main()

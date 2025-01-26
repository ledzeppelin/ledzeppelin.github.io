# from pprint import pprint
import hashlib
from pathlib import Path
from requests import get  # to make GET request
def download(url, file_name):
    # https://stackoverflow.com/a/34964610
    with open(file_name, "wb") as file:
        # get request
        response = get(url, timeout=30)
        # write to file
        file.write(response.content)

def get_hash(f_path, mode='md5'):
    # https://stackoverflow.com/a/42819810
    h = hashlib.new(mode)
    with open(f_path, 'rb') as file:
        data = file.read()
    h.update(data)
    digest = h.hexdigest()
    return digest

def download_datadump():
    prev_file, cur_file, new_file  = [
        f'./js/json/{file}' for file in ['_aii.prev.jsonl', '_aii.jsonl', 'aii.new.jsonl']
    ]

    url = "https://kaikki.org/dictionary/Assyrian%20Neo-Aramaic/kaikki.org-dictionary-AssyrianNeoAramaic.jsonl"
    download(url, new_file)

    cur_hash, new_hash = [
        get_hash(file, mode='md5') for file in [cur_file, new_file]
    ]
    is_file_updated = new_hash != cur_hash

    if is_file_updated:
        Path(cur_file).rename(prev_file)
        Path(new_file).rename(cur_file)
    else:
        file_to_rem = Path(new_file)
        file_to_rem.unlink()

download_datadump()

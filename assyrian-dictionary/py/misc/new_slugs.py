import json
from pprint import pprint
from urllib.parse import quote
import webbrowser

def new_slugs():
    prev_file, cur_file = './js/json/aii.prev.jsonl', './js/json/aii.jsonl'

    with open(cur_file, encoding="utf-8") as f:
        data = [json.loads(line) for line in f]

    with open(prev_file, encoding="utf-8") as f:
        prev_data = [json.loads(line) for line in f]

    words = set()
    for item in data:
        words.add(item['word'])

    prev_words = set()
    for item in prev_data:
        prev_words.add(item['word'])

    i = 0
    LIMIT = 2
    # LIMIT = 9999
    print(len(list(prev_words ^ words)))
    for slug in prev_words ^ words:
        i+=1
        if i > LIMIT:
            break
        print(slug)
        replaced = quote(slug)
        # webbrowser.open_new_tab(f'https://en.wiktionary.org/wiki/{replaced}#Assyrian_Neo-Aramaic')


new_slugs()

import json
from urllib.parse import quote
import webbrowser
import re
import sys
from is_valid_aii_v import is_valid_aii_v
sys.path.append('py')
from conjugate_verbs import strip_markers


def unstripped_slugs():
    with open('./js/json/aii.jsonl', encoding="utf-8") as f:
        data = [json.loads(line) for line in f]

    regex = strip_markers()
    for item in data:
        if not is_valid_aii_v(item):
            continue

        stripped_slug = re.sub(regex, '', item['word'])
        if stripped_slug != item['word']:
            print(stripped_slug, item['word'])
            replaced = quote(item['word'])
            # webbrowser.open_new_tab(f'https://en.wiktionary.org/wiki/{replaced}#Assyrian_Neo-Aramaic')

unstripped_slugs()

import json
import sys
sys.path.append('py')
from datadump_to_dict import generate_aii_v


def nouns_missing_roots():
    with open('./js/json/_aii.jsonl', encoding="utf-8") as f:
        data = [json.loads(line) for line in f]
    for item in data:
        if item['pos'] != 'noun':
            continue

        root = None
        if 'etymology_templates' in item:
            for ety in item['etymology_templates']:
                if ety['name'] == 'aii-root':
                    root = ety['args'].get('1', None)
        if not root:
            print(f'https://en.wiktionary.org/wiki/{item['word']}#Assyrian_Neo-Aramaic')


print('#############################################')
print('nouns missing rootbox under etymology section')
print('#############################################')
nouns_missing_roots()

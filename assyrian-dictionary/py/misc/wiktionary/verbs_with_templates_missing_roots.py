import json
import sys
sys.path.append('py')
from datadump_to_dict import generate_aii_v


def verbs_missing_roots():
    with open('./js/json/_aii.jsonl', encoding="utf-8") as f:
        data = [json.loads(line) for line in f]
    for item in data:
        if 'inflection_templates' not in item:
            continue

        if item['inflection_templates'][-1]['name'] != 'aii-conj-verb':
            continue

        root = None
        if 'etymology_templates' in item:
            for ety in item['etymology_templates']:
                if ety['name'] == 'aii-root':
                    root = ety['args'].get('1', None)
        if not root:
            print(f'https://en.wiktionary.org/wiki/{item['word']}#Assyrian_Neo-Aramaic')

msg = 'aii-conj pages that are missing rootbox under etymology section'

print('#' * len(msg))
print(msg)
print('#' * len(msg))
verbs_missing_roots()

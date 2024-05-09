# this script isn't relevant anymore since we don't get the numerous canonical spellings from the forms but instead the head template

import json
from collections import defaultdict
# see https://en.wiktionary.org/wiki/%DC%92-#Particle
def canonical_spellings():
    with open('./js/json/aii.jsonl', encoding="utf-8") as f:
        data = [json.loads(line) for line in f]

    aii_dict = defaultdict(lambda: defaultdict(list))
    num_canonical = 0
    num_numltiple_canonical = 0
    for item in data:
        valid_aii_v = 'forms' in item and item['forms'][0]['tags'][0] == 'canonical'
        if valid_aii_v:
            num_can = 0
            for form in item['forms']:
                if 'form' in form and 'canonical' in form['tags']:
                    num_can += 1
            if num_can > 1:
                aii_v = item['forms'][0]['form']
                print(aii_v)
                num_numltiple_canonical += 1
            num_canonical += 1

    print(num_canonical)
    print(f'{round(100*(num_numltiple_canonical/num_canonical), 2)}% of vocalized spellings have multiple canonical spellings)')
    return aii_dict

foo = canonical_spellings()
print(foo)

import json
from collections import defaultdict

def headword_matches_url_slug():
    with open('./js/json/_aii.jsonl', encoding="utf-8") as f:
        data = [json.loads(line) for line in f]

    aii_dict = defaultdict(lambda: defaultdict(list))

    for item in data:
        valid_aii_v = 'forms' in item and item['forms'][0]['tags'][0] == 'canonical'
        if valid_aii_v:
            pass
        else:
            if item['pos'] != 'root':
                # print(item['word'], item['pos'], senses[0])
                print(item['word'])

    return aii_dict

foo = headword_matches_url_slug()
print(foo)


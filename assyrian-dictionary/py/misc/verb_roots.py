import json
import sys
# from pprint import pprint
from is_valid_aii_v import is_valid_aii_v
sys.path.append('py')
from conjugate_verbs import root_venn


def verb_roots():
    with open('./js/json/_aii.jsonl', encoding="utf-8") as f:
        data = [json.loads(line) for line in f]

    counter_match = 0
    counter_total = 0

    for item in data:
        if not is_valid_aii_v(item):
            continue

        if not 'inflection_templates' in item:
            continue

        root, verb_args, verb_args_x_root = root_venn(item)
        if root:
            counter_total += 1
            if verb_args_x_root:
                counter_match+=1

    pct = round(100 * (counter_match/counter_total), 2)
    return f'{pct}%'
    # return f'{pct}%', counter_total

print(verb_roots())



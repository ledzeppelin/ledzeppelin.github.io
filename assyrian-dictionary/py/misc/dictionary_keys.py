import json
from collections import defaultdict
from pprint import pprint
from .is_valid_aii_v import is_valid_aii_v
from ..vars.consts import linkage_types

def dict_keys():
    with open('./js/json/_aii.jsonl', encoding="utf-8") as f:
        data = [json.loads(line) for line in f]

    counter = defaultdict(int)
    counter_disambiguated = defaultdict(int)

    for item in data:
        if not is_valid_aii_v(item):
            continue

        for sense in item['senses']:
            # tier 3
            for key in sense.keys():
                if key in linkage_types and not isinstance(sense[key], list):
                    raise Exception('oh no')
                counter_disambiguated[key] += 1

        for key in item.keys():
            # tier 2
            if key in linkage_types and not isinstance(item[key], list):
                raise Exception('oh no')
            counter[key] += 1

    return counter, counter_disambiguated

res, res_disam = dict_keys()

z_cnt, z_cnt_disam = [sorted(res.items(), key=lambda item: item[1], reverse=True) for res in dict_keys()]


pprint(z_cnt)
pprint(' ')
pprint(z_cnt_disam)


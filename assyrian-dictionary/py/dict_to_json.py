import json
from collections import defaultdict
from datadump_to_dict import datadump_to_dict
from vars.consts import aii_alphabet

def collapse_etymologies(inner_obj, jsonlines):
    etys = [jsonline['tier2_etymology'] for jsonline in jsonlines if 'tier2_etymology' in jsonline]
    collapse_etys = len(etys) == len(jsonlines) and all(ety==etys[0] for ety in etys)
    # collapse_etys = False
    if collapse_etys:
        inner_obj['tier1_tags'].extend([f"from:{language}" for language in etys[0]])
        inner_obj['tier1_etymology'] = etys[0]
        for jsonline in jsonlines:
            jsonline.pop('tier2_etymology')
    else:
        for jsonline in jsonlines:
            if 'tier2_etymology' in jsonline:
                jsonline['tier2_tags'].extend([f"from:{language}" for language in jsonline['tier2_etymology']])
    inner_obj['jsonlines'] = jsonlines


def unvocalized_contains_root(aii_v_s):
    for jsonlines in aii_v_s.values():
        for jsonline in jsonlines:
            if jsonline['pos'] in {f'{i}-letter root' for i in range(3, 6)}:
                if len(aii_v_s) > 1:
                    raise Exception('numerous vocalized spellings for the unvocalized root')
                if len(jsonlines) > 1:
                    raise Exception('numerous jsonlines/parts of speech for the unvocalized root')
                return True
    return False

def contains_assyrian_alphabet(jsonlines):
    for jsonline in jsonlines:
        for sense in jsonline['senses']:
            if 'assyrian alphabet' in sense.get('tier3_categories', []):
                return True
    return False



def aii_dict_to_fuse(aii_dict, sounds, numbers_table):
    # structure dictionary in a format that can be indexed by fusejs and on a per vocalized
    # 1. add ipas
    # 2. check if common word
    # 3. check if in numbers table
    # 4. collapse etymologies if possible

    remaining_alphabet_letters = len(aii_alphabet)
    numbers_table_set = set()
    cardinal_numbers = []
    for row in numbers_table['rows']:
        for i, value in enumerate(row['values']):
            numbers_table_set.add(value['value'])
            if i == 0:
                cardinal_numbers.append(value['value'])

    deduped_cardinal_numbers = list(dict.fromkeys(cardinal_numbers))
    if deduped_cardinal_numbers != cardinal_numbers:
        raise Exception(cardinal_numbers)


    with open('./js/json/common-words.json', encoding="utf-8") as user_file:
        parsed_json = json.load(user_file)

    deduped_common_words = list(dict.fromkeys(parsed_json))

    fuse_data = []
    for aii_not_v, aii_v_s in aii_dict.items():
        obj = defaultdict(lambda:float('inf'))

        contains_root = unvocalized_contains_root(aii_v_s)
        obj['aii_not_v'] = aii_not_v
        if contains_root:
            obj['aii_not_v'] = [aii_not_v, aii_not_v.replace(' ', '')]
            # obj['is_root'] = True
        else:
            obj['aii_not_v'] = aii_not_v

        obj['aii_v_s'] = []

        for aii_v, jsonlines in aii_v_s.items():
            inner_obj = defaultdict(list)
            inner_obj['aii_v'] = aii_v

            # if len(jsonlines) > 4:
            #     raise Exception(aii_v)

            if aii_not_v in sounds and aii_v in sounds[aii_not_v]:
                inner_obj['ipas'] = sounds[aii_not_v][aii_v]
                for accents, _, _ in sounds[aii_not_v][aii_v]:
                    for accent in accents:
                        inner_obj['tier1_tags'].append(f"ipa:{accent}")


            if contains_assyrian_alphabet(jsonlines):
                remaining_alphabet_letters -= 1
                obj['alpha_idx'] = aii_alphabet.index(aii_v)

            try:
                idx = deduped_common_words.index(aii_v)
                obj['min_common_word_idx'] = min(obj['min_common_word_idx'], idx)
                inner_obj['is_common_word'] = True
                inner_obj['tier1_tags'].append('special:common word')
            except ValueError:
                pass

            aii_v_contains_numeral = any(line['pos'] == 'numeral' for line in jsonlines)
            if aii_v_contains_numeral:
                try:
                    idx = deduped_cardinal_numbers.index(aii_v)
                    obj['min_numeral_idx'] = min(obj['min_numeral_idx'], idx)
                except ValueError:
                    # we don't expect more than 1000 numerals or people would scroll 1000 entries
                    obj['min_numeral_idx'] = 1000

            if aii_v in numbers_table_set:
                inner_obj['in_numbers_table'] = True

            collapse_etymologies(inner_obj, jsonlines)
            obj['aii_v_s'].append(inner_obj)

        # so searching for ܒ- will always show ܒ- before ܒܸ-
        obj['aii_v_s'].sort(key=lambda x: x['aii_v'])
        fuse_data.append(obj)

    if remaining_alphabet_letters != 0:
        raise Exception(f'remaining_alphabet_letters: {remaining_alphabet_letters}')
    return fuse_data


def validate_tag_order(objs):
    for obj in objs:
        for aii_v in obj['aii_v_s']:
            validate_t1_tags(aii_v)
            for jsonline in aii_v['jsonlines']:
                validate_t2_tags(jsonline)
                for sense in jsonline['senses']:
                    validate_t3_tags(sense)

def validate_t1_tags(aii_v):
    if 'tier1_tags' in aii_v:
        # per functions.js the DOM elements with .tier1-tag should appear in this order:
        # ipa -> common words -> tier 1 etymology
        tier1 = []
        if 'ipas' in aii_v:
            tier1 += [f'ipa:{accent}' for ipa in aii_v['ipas'] for accent in ipa[0]]

        if 'is_common_word' in aii_v:
            tier1 += ['special:common word']
        if 'tier1_etymology' in aii_v:
            tier1 += [f'from:{ety}' for ety in aii_v['tier1_etymology']]

        if tier1 != aii_v['tier1_tags']:
            raise Exception(f'{tier1} doesnt equal {aii_v['tier1_tags']}')

def validate_t2_tags(jsonline):
    if 'pos' not in jsonline:
        raise Exception('pos isnt in jsonline')

    if 'tier2_tags' in jsonline:
        # per functions.js the DOM elements with .tier2-tag should appear in this order:
        # pos -> pattern -> tier 2 etymology
        tier2 = [f'pos:{jsonline['pos']}']
        if 'verb_conjugation' in jsonline:
            vis = jsonline['verb_conjugation']
            if 'pattern' not in vis:
                raise Exception('oh dear')
            tier2.append(f'pattern:{vis['pattern']}')
        if 'tier2_etymology' in jsonline:
            tier2 += [f'from:{ety}' for ety in jsonline['tier2_etymology']]

        if tier2 != jsonline['tier2_tags']:
            raise Exception(f'{tier2} doesnt equal {jsonline['tier2_tags']}')

def validate_t3_tags(sense):
    if 'tier3_tags' in sense:
        # per functions.js the DOM elements with .tier3-tag should appear in this order:
        # category
        tier3 = []

        if 'tier3_categories' in sense:
            tier3 += [f'category:{cat}' for cat in sense['tier3_categories']]

        if tier3 != sense['tier3_tags']:
            raise Exception(f'{tier3} doesnt equal {sense['tier3_tags']}')


# print(json.dumps(foo))
aii_dict1, aii_collapsed_sounds1, numbers_table_ = datadump_to_dict()

foo = aii_dict_to_fuse(aii_dict1, aii_collapsed_sounds1, numbers_table_)
validate_tag_order(foo)

with open("js/json/aii-dict-no-tr.json", "w") as file:
    file.write(json.dumps(foo, ensure_ascii=False))

with open("js/json/aii-numbers-table-no-tr.json", "w") as file:
    file.write(json.dumps(numbers_table_, ensure_ascii=False))

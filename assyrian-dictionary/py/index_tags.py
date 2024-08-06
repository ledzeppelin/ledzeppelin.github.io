import json
from collections import defaultdict
from vars.verb_templates import conj_stems_and_patterns
from conjugate_verbs import find_stem_of_pattern

def tag_counts():
    with open('./js/json/aii-dict-no-tr.json', encoding="utf-8") as f:
        data = json.load(f)

    counter = defaultdict(int)
    for aii_not_v in data:
        for item in aii_not_v['aii_v_s']:
            if 'tier1_tags' in item:
                for tier1_tag in item['tier1_tags']:
                    counter[tier1_tag] += 1
            for jsonline in item['jsonlines']:
                for tier2_tag in jsonline['tier2_tags']:
                    counter[tier2_tag] += 1
                for sense in jsonline['senses']:
                    if 'tier3_tags' in sense:
                        for tier3_tag in sense['tier3_tags']:
                            counter[tier3_tag] += 1

    # {('ipa:standard', 3585), ('ipa:Urmian', 751), ('pos:adjective', 496), ...}
    counter['table:Numbers Table'] = 100
    # raise Exception(counter)
    return counter

def tag_counts_grouped(tag_counter):
    MIN_OCCURENCES = 4
    # MIN_OCCURENCES = 1
    exempt_from_min_occurrences = {'root:2-letters'}
    results = defaultdict(list)
    for tag, count in tag_counter.items():
        if count >= MIN_OCCURENCES or tag in exempt_from_min_occurrences:
            tag_type, tag_name = tag.split(':', 1)
            results[tag_type].append(tag_name)
    # {'ipa': ['standard', 'Urmian', 'Nineveh Plains']}
    return results

def generate_verb_stem_list(stem_tag_names, pattern_tag_names):
    return [
        {
            'name': 'verb stem',
            'children': generate_stems_list(stem_tag_names, pattern_tag_names)
        }
    ]

def generate_stems_list(stem_tag_names, pattern_tag_names):
    # raise Exception(stem_tag_names, pattern_tag_names)
    res = []
    for stem_tag_name in sorted(stem_tag_names,key=str.casefold):
        res.append({
            'name': stem_tag_name,
            'tag': f"stem:{stem_tag_name}",
            'children': generate_patterns_list(pattern_tag_names, stem_tag_name),
            'are_children_inline': True,
        })

    if not res:
        raise Exception('empty stem list')

    return res


def generate_patterns_list(pattern_tag_names, stem_tag_name):
    # raise Exception(pattern_tag_names, stem_tag_name)
    res = []
    for pattern_tag_name in sorted(pattern_tag_names,key=str.casefold):
        # raise Exception(stem_tag_name)
        if stem_tag_name == find_stem_of_pattern(conj_stems_and_patterns, pattern_tag_name):
            res.append({
                'name': f'{pattern_tag_name} pattern',
                'tag': f"pattern:{pattern_tag_name}",
            })

    if not res:
        raise Exception('empty pattern list')

    return res

def generate_root_letters_list(root_letters_tag_names):
    res = []
    for root_letters_tag_name in sorted(root_letters_tag_names,key=str.casefold):
        res.append({
            'name': root_letters_tag_name,
            'tag': f"root:{root_letters_tag_name}",
        })

    return res


def append_l2(tag_type, tag_names, verb_stem_list, root_letters_list, l2_full_name, fuse_results):
    children = []
    for tag_name in tag_names:
        child = {
            'name': tag_name,
            'tag': f"{tag_type}:{tag_name}",
        }
        if tag_type == 'pos' and tag_name == 'root':
            child['children'] = root_letters_list
            child['are_children_inline'] = True

        children.append(child)

    if tag_type == 'pos':
        children += verb_stem_list

    fuse_results.append({
        'name': l2_full_name,
        'children': sorted(
            children,
            key=lambda d: d['name']
        )
    })

def append_l1(tag_type, tag_names, fuse_results):
    if len(tag_names) != 1:
        raise Exception(tag_names)
    fuse_results.append({
        'name': tag_names[0],
        'tag': f"{tag_type}:{tag_names[0]}",
    })

def parse_indices(tag_counter):
    # omit = {'category', 'from', 'ipa'}
    omit = set()
    l1 = {'special', 'table'}
    l2_full_names = {
        'ipa': 'Pronunciations',
        'category': 'Categories',
        'from': 'Etymologies',
        'pos': 'Parts of Speech',
    }

    grouped_tags = tag_counts_grouped(tag_counter)
    verb_stem_list = generate_verb_stem_list(grouped_tags['stem'], grouped_tags['pattern'])
    root_letters_list = generate_root_letters_list(grouped_tags['root'])

    for tag_type_to_rem in ['pattern', 'stem', 'root']:
        grouped_tags.pop(tag_type_to_rem)

    fuse_results = []
    for tag_type, tag_names in grouped_tags.items():
        if tag_type in omit:
            pass
        elif tag_type in l1:
            append_l1(tag_type, tag_names, fuse_results)
        elif tag_type in l2_full_names:
            append_l2(tag_type, tag_names, verb_stem_list, root_letters_list, l2_full_names[tag_type], fuse_results)
        else:
            raise Exception(f'{tag_type} not found')

    sorted_fuse_results = sorted(
        fuse_results,
        key=lambda d: d['name']
    )

    return [{
        'name': 'Top Tags',
        'children': sorted_fuse_results
    }]

# print(tag_counts())

foo = parse_indices(tag_counts())
bar = json.dumps(foo, ensure_ascii=False)
print(bar)

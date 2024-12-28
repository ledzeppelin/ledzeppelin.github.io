import json
from collections import defaultdict

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
    counter['special:numbers table'] = 100
    # raise Exception(counter)
    return counter

def tag_counts_grouped(tag_counter):
    MIN_OCCURENCES = 4
    # MIN_OCCURENCES = 1
    exempt_from_min_occurrences = {'root:2-letter-root', 'root:4-letter-root', 'root:5-letter-root'}
    results = defaultdict(list)
    # raise Exception(tag_counter.items())
    for tag, count in tag_counter.items():
        if count >= MIN_OCCURENCES or tag in exempt_from_min_occurrences:
            tag_type, tag_name = tag.split(':', 1)
            results[tag_type].append(tag_name)
    # {'ipa': ['standard', 'Urmian', 'Nineveh Plains']}
    return results

def conjugations_patterns(pattern_tag_names):
    return [
        {
            'name': 'Verb Conjugation Patterns',
            'children': generate_patterns_list(pattern_tag_names)
        }
    ]

def generate_patterns_list(pattern_tag_names):
    res = []
    for pattern_tag_name in pattern_tag_names:
        res.append({
            'name': pattern_tag_name,
            'tag': f"pattern:{pattern_tag_name}",
        })

    return res

def generate_root_letters_list(root_letters_tag_names):
    res = []
    for root_letters_tag_name in root_letters_tag_names:
        tag = f"root:{root_letters_tag_name}"
        res.append({
            'name': root_letters_tag_name,
            'tag': tag,
            'sort_key': tag,
        })

    return res


def append_l2(tag_type, tag_names, root_letters_list, l2_full_name, fuse_results):
    children = []
    for tag_name in tag_names:
        child = {
            'name': tag_name,
            'tag': f"{tag_type}:{tag_name}",
        }

        children.append(child)
        if tag_type == 'pos' and tag_name == 'root':
            children += root_letters_list


    fuse_results.append({
        'name': l2_full_name,
        'children': children
    })

def sort_dictionary_tags(fuse_results):
    for l1 in fuse_results:
        if 'children' in l1:
            l1['children'] = sorted(
                l1['children'],
                key=lambda child: child.get('sort_key', child['name'])
            )

    return sorted(fuse_results, key=lambda l1: l1['name'])

def parse_indices(tag_counter):
    # omit = {'category', 'from', 'ipa'}
    omit = set()
    l2_full_names = {
        'ipa': 'Audio Pronunciations',
        'category': 'Categories',
        'from': 'Etymologies',
        'pos': 'Parts of Speech',
        'special': 'Language Basics',
    }

    grouped_tags = tag_counts_grouped(tag_counter)

    conj_patterns = conjugations_patterns(grouped_tags['pattern'])

    root_letters_list = generate_root_letters_list(grouped_tags['root'])

    for tag_type_to_rem in ['pattern', 'root']:
        grouped_tags.pop(tag_type_to_rem)

    fuse_results = conj_patterns
    for tag_type, tag_names in grouped_tags.items():
        if tag_type in omit:
            pass
        elif tag_type in l2_full_names:
            append_l2(tag_type, tag_names, root_letters_list, l2_full_names[tag_type], fuse_results)
        else:
            raise Exception(f'{tag_type} not found')

    return sort_dictionary_tags(fuse_results)

# print(tag_counts())

foo = parse_indices(tag_counts())
bar = json.dumps(foo, ensure_ascii=False)
print(bar)

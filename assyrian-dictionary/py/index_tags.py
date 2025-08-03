import json
from collections import defaultdict

from .vars.consts import attached_pronouns, subject_pronouns
expected_counts = {
    'pos:attached pronoun': len(attached_pronouns),
    'pos:subject pronoun': len(subject_pronouns)
}

def tag_counts():
    with open('./js/json/aii-dict-no-tr.json', encoding="utf-8") as f:
        data = json.load(f)

    counter = defaultdict(int)
    for aii_not_v in data:
        for tier0_tag in aii_not_v.get('tier0_tags', []):
            counter[tier0_tag] += 1
        for item in aii_not_v['aii_v_s']:
            for tier1_tag in item.get('tier1_tags', []):
                counter[tier1_tag] += 1
            for jsonline in item['jsonlines']:
                for tier2_tag in jsonline['tier2_tags']:
                    counter[tier2_tag] += 1
                for sense in jsonline['senses']:
                    for tier3_tag in sense.get('tier3_tags', []):
                        counter[tier3_tag] += 1

    # {('ipa:standard', 3585), ('ipa:Urmian', 751), ('pos:adjective', 496), ...}
    counter['special:numbers table'] = 100
    # raise Exception(counter)
    return counter

def tag_counts_grouped(tag_counter):
    MIN_OCCURRENCES = 4
    # MIN_OCCURRENCES = 1

    for tag, expected_count in expected_counts.items():
        if tag_counter[tag] != expected_count:
            raise Exception(f"Expecting {expected_count} {tag.replace('pos:', '')}, got {tag_counter[tag]}")


    exempt_from_min_occurrences = {'pos:4-letter root', 'pos:5-letter root'}
    results = defaultdict(list)
    # raise Exception(tag_counter.items())
    for tag, count in tag_counter.items():
        # if count >= MIN_OCCURRENCES or tag in exempt_from_min_occurrences or tag.startswith('pattern:'):
        if count >= MIN_OCCURRENCES or tag in exempt_from_min_occurrences:
            tag_type, tag_name = tag.split(':', 1)
            results[tag_type].append(tag_name)
    # {'ipa': ['standard', 'Urmian', 'Nineveh Plains']}
    return results

def append_l2(tag_type, tag_names, l2_entry, fuse_results):
    children =  []
    for tag_name in tag_names:
        child = {
            'name': tag_name,
        }

        if f"{tag_type}:{tag_name}" in expected_counts:
            child['sort_key'] = f'pronoun {tag_name}'

        children.append(child)



    fuse_results.append({
        'name': l2_entry['name'],
        'sort_key': l2_entry['sort_key'],
        'emoji': l2_entry['emoji'],
        'tag_key': tag_type,
        'children': children
    })


def sort_dictionary_tags(fuse_results):
    for l1 in fuse_results:
        if 'children' in l1:
            l1['children'] = sorted(
                l1['children'],
                key=lambda child: child.get('sort_key', child['name'])
            )

    return sorted(fuse_results, key=lambda l1: l1.get('sort_key', l1['name']))

def parse_indices(tag_counter):
    # omit = {'category', 'from', 'ipa'}
    omit = set()

    l2_full_names = {
        'from': {
            'name': 'etymologies',
            'sort_key': '1',
            'emoji': '🌎',
        },
        'ipa': {
            'name': 'pronunciations',
            'sort_key': '2',
            'emoji': '🔈',
        },
        'pattern': {
            'name': 'verb patterns',
            'sort_key': '3',
            'emoji': '🧠',
        },
        'pos': {
            'name': 'parts of speech',
            'sort_key': '4',
            'emoji': '🧩',
        },
        'category': {
            'name': 'categories',
            'sort_key': '5',
            'emoji': '🗂️',
        },
        'special': {
            'name': 'language basics',
            'sort_key': '6',
            'emoji': '📚',
        },
    }

    grouped_tags = tag_counts_grouped(tag_counter)
    fuse_results = []
    for tag_type, tag_names in grouped_tags.items():
        if tag_type in omit:
            pass
        elif tag_type in l2_full_names:
            append_l2(tag_type, tag_names, l2_full_names[tag_type], fuse_results)
        else:
            raise Exception(f'{tag_type} not found')

    return sort_dictionary_tags(fuse_results)

# print(tag_counts())

foo = parse_indices(tag_counts())
bar = json.dumps(foo, ensure_ascii=False)
print(bar)
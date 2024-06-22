import json
from collections import defaultdict
import difflib
from typing import Callable
import sys
sys.path.append('py')
from vars.consts import linkage_types

def is_valid_aii_v(item):
    is_valid = 'forms' in item and item['forms'][0]['tags'][0] == 'canonical'
    return is_valid or item['pos'] != 'root'

class DiffInfo:
    def __init__(self, prev_file, file):
        self.prev_file = prev_file
        self.file = file

    def print_diffs(self):
        functions = [
            # roughly ordered by descending importance
            (self.shallow_head_template_counters, 'HEAD TEMPLATE, SHALLOW'),
            (self.shallow_infl_template_counters, 'INFL TEMPLATE, SHALLOW'),
            (self.ipa_counters, 'IPA'),
            (self.ety_counters, 'ETYMOLOGY'),
            (self.sense_key_counter, 'SENSE KEY'),
            (self.examples_key_counter, 'EXAMPLE KEY'),
            (self.cat_counters, 'CATEGORY'),
            (self.linkages_counter, 'LINKAGE, DEEP'),
            (self.deep_head_template_counters, 'HEAD TEMPLATE, DEEP'),
            (self.deep_infl_template_counters, 'INFL TEMPLATE, DEEP'),
        ]
        for function, title in functions:
            prev_count, count = [function(filename) for filename in [self.prev_file, self.file]]
            prev_count_none = {}
            cnt_name = 'COUNTERS'
            full_title = f'### {title} {cnt_name} ###'
            padding = '#' * len(full_title)
            print(
                '\n'.join([padding, full_title, padding]),
                self.get_edits_string(
                    json.dumps(prev_count, indent=2, sort_keys=True),
                    json.dumps(count, indent=2, sort_keys=True)
                )
            )

    def get_edits_string(self, old: str, new: str) -> str:
        # from: https://stackoverflow.com/a/74336612
        RED: Callable[[str], str] = lambda text: f"\u001b[31m{text}\033\u001b[0m"
        GREEN: Callable[[str], str] = lambda text: f"\u001b[32m{text}\033\u001b[0m"
        result = ""

        lines = difflib.ndiff(old.splitlines(keepends=True), new.splitlines(keepends=True))
        for line in lines:
            line = line.rstrip()
            if line.startswith("+"):
                result += GREEN(line) + "\n"
            elif line.startswith("-"):
                result += RED(line) + "\n"
            elif line.startswith("?"):
                continue
            else:
                result += line + "\n"

        return result

    def cat_counters(self, filename):
        with open(f'./js/json/{filename}', encoding="utf-8") as f:
            data = [json.loads(line) for line in f]

        counter = defaultdict(int)

        for item in data:
            if not is_valid_aii_v(item):
                continue
            for sense in item['senses']:
                if 'categories' in sense:
                    for category in sense['categories']:
                        # pprint(sense['categories'])
                        if 'langcode' in category and category['langcode'] == 'aii':
                            # counter[category['orig']] += 1
                            counter[category['name']] += 1
        return counter


    def ety_counters(self, filename):
        with open(f'./js/json/{filename}', encoding="utf-8") as f:
            data = [json.loads(line) for line in f]

        ety_counter = defaultdict(int)
        for item in data:
            if is_valid_aii_v(item) and 'etymology_templates' in item:
                etys = set()
                for et in item['etymology_templates']:
                    ety_counter[et['name']] += 1
                    etys.add(et['name'])

        # sorted_dict = dict(sorted(ety_counter.items(), key=lambda item: item[1], reverse=True))
        # raise Exception(sorted_dict)

        return ety_counter

    def head_template_counters(self, filename):
        with open(f'./js/json/{filename}', encoding="utf-8") as f:
            data = [json.loads(line) for line in f]

        ht_deep = defaultdict(lambda: defaultdict(int))
        ht_shallow = defaultdict(int)

        for item in data:
            if not is_valid_aii_v(item):
                continue

            if 'head_templates' not in item:
                continue

            ht = item['head_templates'][0]
            ht_shallow[ht['name']] += 1
            ht_name = ht['name']

            for key, val in ht['args'].items():
                if ht['name'] == 'head' and key == '2':
                    # uses        https://en.wiktionary.org/wiki/Template:head
                    # instead of  https://en.wiktionary.org/wiki/Module:aii-headword
                    ht_deep[ht_name][val] += 1
                else:
                    ht_deep[ht_name][key] += 1

        ht_deep.pop('head') # we don't really care abt this
        return ht_shallow, ht_deep

    def shallow_head_template_counters(self, filename):
        shallow, _ = self.head_template_counters(filename)

        return shallow
    def deep_head_template_counters(self, filename):
        _, deep = self.head_template_counters(filename)
        return deep

    def infl_template_counters(self, filename):
        with open(f'./js/json/{filename}', encoding="utf-8") as f:
            data = [json.loads(line) for line in f]

        shallow = defaultdict(int)
        deep = defaultdict(lambda: defaultdict(int))

        for item in data:
            if not is_valid_aii_v(item):
                continue

            if 'inflection_templates' not in item:
                continue

            pos_template_name = item['inflection_templates'][0]['name']
            if not pos_template_name.startswith('aii-conj'):
                continue
            shallow[pos_template_name] += 1


            idx = 0
            if pos_template_name.startswith('aii-conj-verb/'):
                idx = 1

            if len(item['inflection_templates']) == idx + 1:
                if item['inflection_templates'][idx]['args']:
                    for arg, _ in item['inflection_templates'][idx]['args'].items():
                        deep[pos_template_name][arg] += 1
                else:
                    pass
                    # raise Exception(f'{pos_template_name} oh dear')

        return shallow, deep

    def shallow_infl_template_counters(self, filename):
        shallow, _ = self.infl_template_counters(filename)

        return shallow
    def deep_infl_template_counters(self, filename):
        _, deep = self.infl_template_counters(filename)
        return deep

    def ipa_counters(self, filename):
        with open(f'./js/json/{filename}', encoding="utf-8") as f:
            data = [json.loads(line) for line in f]

        ipa_counter = defaultdict(int)
        for item in data:
            if is_valid_aii_v(item) and 'sounds' in item:
                for sound in item['sounds']:
                    if 'tags' in sound and 'note' in sound:
                        raise Exception(f'oh no {item["word"]} note in sound')
                    if 'tags' in sound and len(sound['tags']) > 1:
                        pass
                        # raise Exception(f'oh no {item["word"]}')
                    if 'tags' in sound:
                        ipa_counter[sound['tags'][0]] += 1
                    elif 'note' in sound:
                        ipa_counter[sound['note']] += 1
        return ipa_counter

    def linkages_counter(self, filename):
        deep_counter = defaultdict(lambda: defaultdict(int))
        # deep_counter = defaultdict(int)
        with open(f'./js/json/{filename}', encoding="utf-8") as f:
            data = [json.loads(line) for line in f]

        for item in data:
            if not is_valid_aii_v(item):
                continue
            for sense in item['senses']:
                for key, values in sense.items(): # ex. key == meronyms
                    if key not in linkage_types:
                        continue
                    for value in values:
                        for key2 in value:
                            deep_counter[key][key2] += 1
        return deep_counter


    def sense_key_counter(self, filename):
        counter = defaultdict(int)
        with open(f'./js/json/{filename}', encoding="utf-8") as f:
            data = [json.loads(line) for line in f]

        for item in data:
            if is_valid_aii_v(item):
                for sense in item['senses']:
                    for key in sense:
                        counter[key] += 1
        return counter

    def examples_key_counter(self, filename):
        counter = defaultdict(int)
        type_counter = defaultdict(int)
        with open(f'./js/json/{filename}', encoding="utf-8") as f:
            data = [json.loads(line) for line in f]

        for item in data:
            if not is_valid_aii_v(item):
                continue
            for sense in item['senses']:
                if not 'examples' in sense:
                    continue
                for example in sense['examples']:
                    for key, val in example.items():
                        counter[key] += 1
                        if key == 'type':
                            type_counter[val] += 1
        return counter, type_counter

diffInfo = DiffInfo('_aii.prev.jsonl', '_aii.jsonl')
diffInfo.print_diffs()

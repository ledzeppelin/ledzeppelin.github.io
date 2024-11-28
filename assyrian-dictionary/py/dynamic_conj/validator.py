import json
import re
from collections import defaultdict
from utils import AiiConjugation

def generate_stem_patterns():
    with open('js/json/aii-dict-no-tr.json', 'r') as file:
        data = json.load(file)

    ALREADY_MOVED = {
    '',
    }


    stem_patterns = defaultdict(set)
    for obj in data:
        for _aii_v in obj['aii_v_s']:
            if _aii_v['aii_v'] in ALREADY_MOVED:
                continue
            for jsonline in _aii_v['jsonlines']:
                if jsonline['pos'] != 'verb':
                    continue
                if 'tier2_vis_verb' in jsonline:
                    if jsonline['tier2_vis_verb']['pattern'] != 'Irregular':
                        stem_patterns[jsonline['tier2_vis_verb']['pattern']].add(_aii_v['aii_v'])
                else:
                    keywords = {'participle', 'first-person', 'second-person', 'third-person',
                    'infinitive of', 'feminine singular', 'Contraction of'}
                    # keywords = set()
                    if any(keyword in sense['gloss'] for sense in jsonline['senses'] for keyword in keywords):
                        pass
                    else:
                        stem_patterns['---'].add(_aii_v['aii_v'])
    return stem_patterns



def fix_template_warning(old_pattern, new_pattern, _aii_v):
    if old_pattern != new_pattern:
        # print( '====Conjugation====')
        # print( f'{{{{aii-conj-verb/{new_pattern}|{'|'.join(_aii_stripped_atwateh)}}}}}')
        print( f'{_aii_v} use {new_pattern} not {old_pattern}')
        # print()
            # print( f'{_aii_v} use {new_template} not {old_template}')
            # print('')

conj = AiiConjugation()
pattern_regexes = conj.get_patterns()
_stem_patterns = generate_stem_patterns()


msg = 'aii-conj validation'

print('')
print('#' * len(msg))
print(msg)
print('#' * len(msg))


for cur_pattern, aii_vs in _stem_patterns.items():
    for aii_v in aii_vs:
        matched_patterns = []
        vowel_diacritics_stripped  = re.sub(f"[^{conj.LETTERS}]", '', aii_v)

        if aii_v in conj.special_cases:
            matched_patterns.append(aii_v)
            fix_template_warning('G', 'G', aii_v)
        else:
            for pattern, num_atwateh, regex in pattern_regexes:
                if len(vowel_diacritics_stripped) == num_atwateh and re.match(regex, aii_v):
                    matched_patterns.append(pattern)
                    fix_template_warning(cur_pattern, pattern, aii_v)

        if len(matched_patterns) == 0:
            if cur_pattern != '---':
                print(f'{aii_v} with pattern {cur_pattern} didnt match anything')
        elif len(matched_patterns) == 1:
            pass
        else:
            raise Exception(f'{aii_v} matched multiple regexes {matched_patterns}')


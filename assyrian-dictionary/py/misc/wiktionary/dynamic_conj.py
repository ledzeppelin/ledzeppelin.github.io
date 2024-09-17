import json
import re
from collections import defaultdict


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
        # return

        # each element of array is individual vocalized atuta

        _aii_stripped = re.sub(f"[{DIACRITICS}]", '', aii_v)
        _aii_unvocalized  = re.sub(f"[^{LETTERS}]", '', aii_v)

        # if _aii_unvocalized == 'ܡܚܘܓ':
        #     _aii_stripped_atwateh = re.split(re_split_aii_v, _aii_stripped)

        # print( '====Conjugation====')
        # print( f'{{{{aii-conj-verb/{new_pattern}|{'|'.join(_aii_stripped_atwateh)}}}}}')
        print( f'{_aii_v} use {new_pattern} not {old_pattern}')
        # print()
            # print( f'{_aii_v} use {new_template} not {old_template}')
            # print('')


KHWASA_RWASA = '\u073C'
KHWASA_RWAKHA = '\u073F'
PTAKHA = '\u0732'
ZQAPA = '\u0735'
ZLAMA_KIRYA = '\u0738'
ZLAMA_YAREEKHA = '\u0739'

DIACRITICS = f'{KHWASA_RWASA}{KHWASA_RWAKHA}{PTAKHA}{ZQAPA}{ZLAMA_KIRYA}{ZLAMA_YAREEKHA}'
CONSONANTS = 'ܦܒܬܛܕܟܓܩܣܨܙܫܚܥܗܡܢܪܠ'
CONSONANTS_MINUS_E = CONSONANTS.replace('ܥ', '')

ALAP = 'ܐ'
WAW = 'ܘ'
YUDH = 'ܝ'
VOWEL_HELPERS = f'{ALAP}{WAW}{YUDH}'
LETTERS = f'{CONSONANTS}{VOWEL_HELPERS}'

re_split_aii_v = f"[{CONSONANTS}][\u0730-\u074F]*"

_stem_patterns = generate_stem_patterns()

pattern_regexes = [
    ('C', 4, rf"^ܡ{PTAKHA}[{LETTERS}][{CONSONANTS}{ALAP}]{ZLAMA_KIRYA}[{CONSONANTS}]$"),
    ('C-mv',4,rf"^ܡ{PTAKHA}[{LETTERS}][{WAW}{YUDH}]{ZLAMA_KIRYA}[{CONSONANTS}]$"),
    ('C-drop-radical',3,rf"^ܡ{PTAKHA}[{CONSONANTS}]{ZLAMA_KIRYA}[{CONSONANTS}]$"),
    ('C-1o',4,rf"^ܡ{ZQAPA}{WAW}[{CONSONANTS}]{ZLAMA_KIRYA}[{CONSONANTS}]$"),
    ('C-1o3i',4,rf"^ܡ{ZQAPA}{WAW}[{CONSONANTS}]{ZLAMA_YAREEKHA}{ALAP}$"),
    ('C-3i',4,rf"^ܡ{PTAKHA}[{LETTERS}][{LETTERS}]{ZLAMA_YAREEKHA}{ALAP}$"),
    ('D',4,rf"^ܡ[{LETTERS}]{PTAKHA}[{LETTERS}]{ZLAMA_KIRYA}[{LETTERS}]$"),
    ('D-1o',5,rf"^ܡܫ{ZQAPA}{WAW}[{LETTERS}]{ZLAMA_KIRYA}[{LETTERS}]$"),
    ('D-3i',4,rf"^ܡ[{LETTERS}]{PTAKHA}[{CONSONANTS}{WAW}]{ZLAMA_YAREEKHA}{ALAP}$"),
    ('G',3,rf"^[{CONSONANTS}]{ZQAPA}[{CONSONANTS}{WAW}]{ZLAMA_YAREEKHA}[{CONSONANTS_MINUS_E}]$"),
    ('G-1i',3,rf"^[{ALAP}{YUDH}]{ZQAPA}[{CONSONANTS}]{ZLAMA_YAREEKHA}[{CONSONANTS}]$"),
    ('G-1i3i',3,rf"^{YUDH}{ZQAPA}[{CONSONANTS}]{ZLAMA_YAREEKHA}{ALAP}$"),

    ('G-2i',3,rf"^[{CONSONANTS}]{ZQAPA}[{YUDH}{ALAP}][{ZLAMA_YAREEKHA}{ZLAMA_KIRYA}][{CONSONANTS}]$"),
    # ('G-2i',3,rf"^[{CONSONANTS}]{ZQAPA}[{YUDH}][{ZLAMA_YAREEKHA}{ZLAMA_KIRYA}][{CONSONANTS}]$"),

    ('G-3e',3,rf"^[{CONSONANTS}]{ZQAPA}[{CONSONANTS}]{ZLAMA_YAREEKHA}ܥ$"),
    ('G-3i',3,rf"^[{CONSONANTS}{ALAP}]{ZQAPA}[{CONSONANTS}{WAW}{YUDH}]{ZLAMA_YAREEKHA}{ALAP}$"),
    ('Gt',5,rf"^ܡ{ZLAMA_KIRYA}[{CONSONANTS}][{CONSONANTS}][{CONSONANTS}]{ZLAMA_KIRYA}[{CONSONANTS}]$"),
    ('Q',5,rf"^ܡ[{LETTERS}]{PTAKHA}[{CONSONANTS}{WAW}{YUDH}][{CONSONANTS}{WAW}]{ZLAMA_KIRYA}[{CONSONANTS}]$"),
    ('Q-w',5,rf"^ܡ[{LETTERS}]{PTAKHA}[{CONSONANTS}][{CONSONANTS}]{ZLAMA_YAREEKHA}{ALAP}$"),
]



for cur_pattern, aii_vs in _stem_patterns.items():
    for aii_v in aii_vs:
        matched_patterns = []
        aii_unvocalized  = re.sub(f"[^{LETTERS}]", '', aii_v)
        # strips markers like rukkakha for ease of processing
        aii_v_stripped = re.sub(f"[^{LETTERS}{DIACRITICS}]", '', aii_v)

        for pattern, num_atwateh, regex in pattern_regexes:
            if len(aii_unvocalized) == num_atwateh and re.match(regex, aii_v_stripped):
                matched_patterns.append(pattern)
                fix_template_warning(cur_pattern, pattern, aii_v)

        if len(matched_patterns) == 0:
            # pass
            print(f'{aii_v} with pattern {cur_pattern} didnt match anything')
        elif len(matched_patterns) == 1:
            pass
        else:
            raise Exception(f'{aii_v} matched multiple regexes {matched_patterns}')


# koine standard using zlama yareekha for g-stem


# print(sorted(_stem_patterns.keys()))
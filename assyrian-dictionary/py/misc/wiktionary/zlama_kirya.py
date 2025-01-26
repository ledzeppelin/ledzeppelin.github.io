import json
import re
from collections import defaultdict

def zlama_yareekha_not_kirya():
    with open('js/json/aii-dict-no-tr.json', 'r') as file:
        data = json.load(file)

    # print('_aii_v')


    for obj in data:
        for _aii_v in obj['aii_v_s']:
            for jsonline in _aii_v['jsonlines']:
                if jsonline['pos'] != 'verb':
                    continue

                aii_unvocalized  = re.sub(f"[^{LETTERS}]", '', _aii_v['aii_v'])
                if len(aii_unvocalized) == 3 and re.match(G_STABLE_RE, _aii_v['aii_v']):
                    print(f'https://en.wiktionary.org/wiki/{aii_unvocalized}#Assyrian_Neo-Aramaic')


ZQAPA = '\u0735'
ZLAMA_KIRYA = '\u0738'
ZLAMA_YAREEKHA = '\u0739'

CONSONANTS = 'ܦܒܬܛܕܟܓܩܣܨܙܫܚܥܗܡܢܪܠ'
ALAP = 'ܐ'
WAW = 'ܘ'
YUDH = 'ܝ'
VOWEL_HELPERS = f'{ALAP}{WAW}{YUDH}'
LETTERS = f'{CONSONANTS}{VOWEL_HELPERS}'


G_STABLE_RE = rf"^[{CONSONANTS}]{ZQAPA}[{YUDH}{ALAP}][{ZLAMA_KIRYA}][{CONSONANTS}]$"

zlama_yareekha_not_kirya()
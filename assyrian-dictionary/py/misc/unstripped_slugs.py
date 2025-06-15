import json
from urllib.parse import quote
import webbrowser
import re
from .is_valid_aii_v import is_valid_aii_v

def strip_markers():
    # this is a port of /shared_js/aii-utils.js
    COMBINING_TILDE_ABOVE = '\u0303'
    COMBINING_MACRON = '\u0304'
    COMBINING_DOT_ABOVE = '\u0307'
    COMBINING_DIAERESIS = '\u0308'
    COMBINING_DOT_BELOW = '\u0323'
    COMBINING_BREVE_BELOW = '\u032E'
    COMBINING_TILDE_BELOW = '\u0330'
    COMBINING_MACRON_BELOW = '\u0331'
    SUPERSCRIPT_ALAPH = '\u0711'

    SYRIAC_START = '\u0730'
    SYRIAC_END = '\u074A'

    other_marks = [
        COMBINING_TILDE_ABOVE,
        COMBINING_MACRON,
        COMBINING_DOT_ABOVE,
        COMBINING_DIAERESIS,
        COMBINING_DOT_BELOW,
        COMBINING_BREVE_BELOW,
        COMBINING_TILDE_BELOW,
        COMBINING_MACRON_BELOW,
        SUPERSCRIPT_ALAPH,
    ]


    diacritic_range = f'{"".join(other_marks)}{SYRIAC_START}-{SYRIAC_END}'
    non_capture_group = f'(?:[{diacritic_range}])'

    return non_capture_group

def unstripped_slugs():
    with open('./js/json/_aii.jsonl', encoding="utf-8") as f:
        data = [json.loads(line) for line in f]

    regex = strip_markers()
    for item in data:
        if not is_valid_aii_v(item):
            continue

        stripped_slug = re.sub(regex, '', item['word'])
        if stripped_slug != item['word']:
            print(stripped_slug, item['word'])
            replaced = quote(item['word'])
            # webbrowser.open_new_tab(f'https://en.wiktionary.org/wiki/{replaced}#Assyrian_Neo-Aramaic')

unstripped_slugs()

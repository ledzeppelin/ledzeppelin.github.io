from collections import defaultdict
# from pprint import pprint
import hashlib
import json
import os
import re
import copy
from vars import consts
from vars.ht_schemas import ht_schema_omit, ht_schema, forms_abbrev, gender_abbrev
from vars.infl_schemas import noun_infl_schema, omitted_infl_schema
from ipa_to_mp3 import ipa_to_mp3
from conjugate_verbs import set_verb_conj

def annotated_row(meta, aii_values):
    row = defaultdict(list)
    row['meta'] = meta

    for aii_value in aii_values:
        val_obj = {'value': aii_value}
        row['values'].append(val_obj)

    return row

def set_examples(item_sense, sense):
    if 'examples' in item_sense:
        res = []
        for example in item_sense['examples']:
            if 'type' in example and example['type'] not in {'example', 'quotation', 'quote'}:
                raise Exception('invalid example type')

            if 'text' in example and 'english' in example:
                aii = example['text']
                english = example['english']
                if 'type' in example and example['type'] in {'quote', 'quotation'}:
                    left_quote = '“'
                    right_quote = '”'

                    aii = f'{right_quote}{aii}{left_quote}'
                    english = f'"{english}"'

                if 'ref' in example:
                    english = f"{english} - {example['ref']}"
                obj = {
                    'text': aii,
                    'english': english,
                }

                res.append(obj)
        if res:
            sense['examples'] = res

def literally_etys_to_senses(item):
    senses = []
    if 'etymology_templates' in item:
        for ety in item['etymology_templates']:
            if ety['name'] == "lit":
                senses.append({"gloss": ety['expansion']})
    return senses


def parse_senses(item, aii_v, obj):
    senses = literally_etys_to_senses(item)
    for item_sense in item['senses']:
        sense = defaultdict(lambda: defaultdict(list))
        sense['gloss'] = item_sense['glosses'][0]

        set_examples(item_sense, sense)

        if item['pos'] == 'root':
            set_linkage_table(item_sense, obj, aii_v)
        else:
            set_linkage_table(item_sense, sense, aii_v)

        if 'categories' in item_sense:
            tier3_categories = []
            for category in item_sense['categories']:
                if 'langcode' in category and category['langcode'] == 'aii':
                    tier3_categories.append(category['name'].lower())
            if tier3_categories:
                sense['tier3_categories'] = tier3_categories
                sense['tier3_tags'] = [f"category:{t3cat}" for t3cat in tier3_categories]
        senses.append(sense)

    return senses

def set_infl(item, obj, aii_v, verb_denominal_forms = None):
    if 'inflection_templates' not in item:
        return

    html_template_name = item['inflection_templates'][-1]['name']

    if html_template_name == 'aii-conj':
        set_verb_conj(item, obj, aii_v, verb_denominal_forms)
    elif html_template_name in noun_infl_schema:
        set_noun_infl(item, obj, html_template_name, aii_v)
    elif html_template_name in omitted_infl_schema:
        pass
    else:
        raise Exception(f'html_template_name: {html_template_name} not found')


def set_noun_infl(item, obj, template_name, aii_v):
    # for noun/preposition
    template = copy.deepcopy(noun_infl_schema[template_name]['template'])
    omit = noun_infl_schema[template_name]['omit']
    unique_keys = {key:pron for pron, val in template.items() for key in val}

    for arg, aii in item['inflection_templates'][-1]['args'].items():
        if arg in omit:
            pass
        elif arg in unique_keys:
            pron = unique_keys.pop(arg)
            template[pron][arg] = aii
        else:
            raise Exception(f'missing {arg} for word {item["word"]}')

    if unique_keys:
        raise Exception(unique_keys)

    rows = []
    for key, val in template.items():
        rows.append( annotated_row(key, list(val.values())))

    obj['table'] = {
        "heading": noun_infl_schema[template_name]['heading'],
        "rows": rows
    }

    if 'heading_2' in noun_infl_schema[template_name]:
        obj['table']['heading_2'] = noun_infl_schema[template_name]['heading_2']


def set_head_template(item, obj, aii_v):
    if 'head_templates' not in item:
        return

    ht_name = item['head_templates'][0]['name']
    if ht_name in ht_schema_omit:
        return

    for arg, val in item['head_templates'][0]['args'].items():
        if arg in ht_schema[ht_name]['omit']:
            pass
        elif arg in ht_schema[ht_name]['forms']:
            if ht_name in forms_abbrev:
                form_name = forms_abbrev[ht_name][arg]
            else:
                form_name = forms_abbrev['default'][arg]

            obj['other_forms']['rows'].append(
                annotated_row(form_name, [val])
            )

        elif arg in ht_schema[ht_name]['genders']:
            pos_gender_abbrev = gender_abbrev.get(ht_name, gender_abbrev['default'])

            if arg in ("2", "g"):
                obj['gender'] = pos_gender_abbrev[val]

            if arg == "g2":
                obj['other_forms']['rows'].append(
                    annotated_row(f'sometimes {pos_gender_abbrev[val]}', [aii_v])
                )

        else:
            raise Exception(f'"{arg}" not in omit, forms or genders for ht {ht_name} for:\n\n {item}')


    if 'default_gender' in ht_schema[ht_name] and len(ht_schema[ht_name]['genders']) == 0:
        if 'gender' in obj:
            raise Exception('oh dear')
        obj['gender'] = ht_schema[ht_name]['default_gender']

def set_linkage_table(parent, obj, aii_v):
    already_there = already_there_set(obj)
    already_there.add(aii_v)

    for linkage_key, linkage_val in consts.linkage_types.items(): # ex. {'alt_of': 'alternate',}
        if linkage_key in parent:
            for linkage in parent[linkage_key]: # ex. for synonym in synonyms
                word_linkage = linkage['word']

                # personal_pronouns pronouns dont show up when linkage_key == 'related' outside of
                # being implicitly provided by {{aii-personal_pronouns}}
                # so we can always safely omit them
                if linkage_key == 'related' and word_linkage in consts.personal_pronouns:
                    continue

                omit = re.search('[a-zA-Z]', linkage['word']) or word_linkage in already_there
                if not omit:
                    obj['other_forms']['rows'].append(
                        annotated_row(linkage_val, [word_linkage])
                    )
                    already_there.add(word_linkage)

def parse_sounds(item, aii_sounds, aii_not_v, aii_v):
    ipas = []
    if 'sounds' in item:
        for sound in item['sounds']:
            if 'tags' in sound or 'note' in sound:
                enc_str = sound['ipa'].encode()
                # for 128-bit algo, 50% chance of collision after 2^64 ipas, ie hexdigest(16)
                #                   50% chance of collision after 2^32 ipas, ie hexdigest(8)
                hash_str = hashlib.shake_128(enc_str).hexdigest(16)
                if 'tags' in sound:
                    # most "Standard" ipa
                    ipas.append((sound['tags'][0].lower(), sound['ipa'], hash_str))
                else:
                    # other ipa
                    for note in sound['note'].split(', '):
                        ipas.append((note.lower(), sound['ipa'], hash_str))

    if ipas:
        aii_sounds[aii_not_v][aii_v].append(ipas)

def collapse_sounds(aii_sounds):
    # intersection of all sublists
    aii_collapsed_sounds = defaultdict(lambda: {})

    for aii_not_v, aii_vs in aii_sounds.items():
        for aii_v, jsonlines_ipas in aii_vs.items():
            # finds ipas common to all jsonlines on a per aii_v basis
            collapsed = set.intersection(*[set(list_) for list_ in jsonlines_ipas])
            if collapsed:
                unique_ipas = defaultdict(list)
                for accent, ipa, checksum in collapsed:
                    unique_ipas[(ipa, checksum)].append(accent)

                unique_ipas_lst = [(sorted(v), k[0], k[1]) for k, v in unique_ipas.items()]
                unique_ipas_lst.sort()

                # if aii_v == 'ܚܘܼܘܹܐ':
                #     raise Exception(unique_ipas)


                aii_collapsed_sounds[aii_not_v][aii_v] = unique_ipas_lst

                if os.getenv('AII_DICT_GENERATE_AUDIO'):
                    for _, ipa, ipa_hash in unique_ipas_lst:
                        if os.getenv('USE_CACHED_AUDIO'):
                            ipa_to_mp3(ipa, ipa_hash, True)
                        else:
                            ipa_to_mp3(ipa, ipa_hash, False)

    return aii_collapsed_sounds



def set_cognate(obj, item, ety):
    # https://en.wiktionary.org/wiki/Template:cog
    #
    # we use expansion instead of args because
    # 1. it provides transliteration from modules whereas ety['args']['tr'] only contains param tr
    # 2. ex. in Akkadian you can't predict whether ety['args']['2'] is in cunieform or latin
    #
    cog_name = consts.language_codes[ety['args']['1']]
    if not ety['expansion'].startswith(cog_name):
        raise Exception(item['word'], ety['expansion'], cog_name)
    val = ety['expansion'].removeprefix(cog_name).strip()

    if not val:
        return

    cognate = {
        "meta": f"{cog_name.lower()} cognate",
        "values": [
            {
                "cog_value": val,
            }
        ]
    }
    obj['other_forms']['rows'].append(cognate)
    # check duplicate cogs

def already_there_set(obj):
    already_there = set()
    if 'other_forms' in obj and 'rows' in obj['other_forms']:
        for row in obj['other_forms']['rows']:
            for value in row['values']:
                if 'value' in value:
                    already_there.add(value['value'])
    return already_there

def annotate_row_if_not_there(meta, aii_values, obj):
    already_there = already_there_set(obj)

    # if any value of values is there, we just omit all values
    # because it makes the table confusing to look at when part of an affix is missing
    for aii_value in aii_values:
        if aii_value in already_there:
            return

    if aii_values:
        obj['other_forms']['rows'].append(
            annotated_row(meta, aii_values)
        )


def annotate_row_if_not_there2(meta, aii_values, obj):
    # function exists so we don't get extra rows-y-padding
    already_there = already_there_set(obj)
    for aii_value in aii_values:
        if aii_value in already_there:
            return

    if aii_values:
        for i, aii_value in enumerate(aii_values):
            obj['other_forms']['rows'].append(
                annotated_row(meta if i == 0 else ' ', [aii_value])
            )


def add_other_forms_from_ety_templates(ety, obj, item, aii_v, alias):
    if ety['name'] == 'cog' and '2' in ety['args']:
        set_cognate(obj, item, ety)
    elif ety['name'] in ('contraction') and ety['args']['1'] == 'aii' and '2' in ety['args']:
        annotate_row_if_not_there(alias, [ety['args']['2']], obj)
    elif ety['name'] in ('m', 'l', 'clipping', 'back-form') and ety['args']['1'] == 'aii':
        annotate_row_if_not_there(alias, [ety['args']['2']], obj)
    elif ety['name'] in ('doublet') and ety['args']['1'] == 'aii':
        if '5' in ety['args']:
            raise Exception(f'{aii_v} too many doublets')
        for doublet_num in ['2', '3', '4']:
            if doublet_num in ety['args']:
                annotate_row_if_not_there(alias, [ety['args'][doublet_num]], obj)
    elif ety['name'] in ('affix', 'af', 'com', 'compound', 'surf', 'blend', 'univerbation') and ety['args']['1'] == 'aii':
        if ety['name'] in ('affix', 'af'):
            for lang in ['lang1', 'lang2']:
                if lang in ety["args"] and ety["args"][lang] != 'aii':
                    return
                    # raise Exception(f'only aii allowed for {aii_v}')
        aii_affixes = [ety['args']['2']]
        if '6' in ety['args']:
            raise Exception(f'{aii_v} too many affixes')
        for affix_num in ['3', '4', '5']:
            if affix_num in ety['args']:
                aii_affixes.append(ety['args'][affix_num])
        annotate_row_if_not_there2(alias, aii_affixes, obj)


def add_etymology(obj, item, aii_v):
    if 'etymology_templates' in item:
        etymology = []
        for ety in item['etymology_templates']:
            if ety['name'] in consts.derivation_templates:
                if ety['args']['1'] == 'aii':
                    lang_name = consts.language_codes[ety['args']['2']]
                    etymology.append(lang_name.lower())
                elif ety['args']['1'] == 'syc':
                    for code in ['syc', ety['args']['2']]:
                        lang_name = consts.language_codes[code]
                        etymology.append(lang_name.lower())
            elif ety['name'] in consts.other_forms_from_ety_templates:
                alias = consts.other_forms_from_ety_templates[ety['name']]
                add_other_forms_from_ety_templates(ety, obj, item, aii_v, alias)
            elif ety['name'] == 'aii-root':
                if obj['pos'] == 'root':
                    raise Exception('root shouldnt contain aii-root')
                obj['of_root'] = ety['args']['1']

        if etymology:
            # remove dupes, maintain order
            etymology = list(dict.fromkeys(etymology))
            obj['tier2_etymology'] = etymology

def generate_aii_v(item, aii_not_v):
    # we use forms instead of head_templates since the order of positional
    # parameters generated by template:head and Module:aii-headword differs
    #
    # ex.  ܒܸܪ̈ܟܵܟܹܐ is using template:head where {"1": "aii"}
    # additionally the head_template for certain pos like determiners doesn't get parsed

    valid_aii_v = 'forms' in item and item['forms'][0]['tags'][0] == 'canonical'
    if valid_aii_v:
        return item['forms'][0]['form']

    if item['pos'] == 'root':
        return aii_not_v

    # see headword_matches_url_slug.py
    #
    # for when the vocalized spelling is the same as the unvocalized spelling, ex. 'ܘ-'
    # however, ~10% of the time this is due to the page being misnamed w/ diacritics, ex.
    # https://en.wiktionary.org/wiki/%DC%A9%DC%98%DC%BC%DC%A0%DC%98%DC%BC%DC%93%DD%82
    return aii_not_v

def append_number_cell_to_row(row, cell_val):
    if isinstance(cell_val, list) and len(cell_val) != 1:
        raise Exception(f'invalid cell val {cell_val}')

    if isinstance(cell_val, list):
        cell_val = cell_val[0]

    cell = {"value": cell_val}

    row['values'].append(cell)


def generate_numbers_table():
    with open('./js/json/aii-number-list.json', encoding="utf-8") as f:
        aii_number_list = json.load(f)

    res = {
        "heading": "Number",
        "heading_2": [
            "Cardinal",
            "Ordinal",
            "(Multiplier)",
            "(Fractional)",
        ],
        "rows" : []
    }

    for number, obj in aii_number_list.items():
        row = {
            "meta": number,
            "values": []
        }
        append_number_cell_to_row(row, obj['cardinal'])
        append_number_cell_to_row(row, obj['ordinal'])

        if 'multiplier' in obj:
            append_number_cell_to_row(row, obj['multiplier'])

        if 'fractional' in obj:
            append_number_cell_to_row(row, obj['fractional'])

        res['rows'].append(row)

    res['rows'].sort(key=lambda x: int(x['meta']))

    return res



def datadump_to_dict():
    with open('./js/json/_aii.jsonl', encoding="utf-8") as f:
        data = [json.loads(line) for line in f]

    aii_dict = defaultdict(lambda: defaultdict(list))
    aii_sounds = defaultdict(lambda: defaultdict(list))
    verb_denominal_forms = {}


    BLACKLIST = {
        'ܡܦܪܲܣܚܲܙܹܐ',
        'ܡܚܘܛܡܠܠ',
        #####
    }

    vocalized_cache = {generate_aii_v(item, item['word']) for item in data}
    cnt_str = f"{len(vocalized_cache)} Assyrian words"
    cnt_lst = ['#'*len(cnt_str), cnt_str, '#'*len(cnt_str) ]
    print('\n'.join(cnt_lst))

    for item in data:
        aii_not_v = item['word']
        aii_v = generate_aii_v(item, aii_not_v)

        if aii_v in BLACKLIST:
            continue

        obj = defaultdict(lambda: defaultdict(list))

        pronoun_types = {
            'particle': ('attached pronoun', consts.attached_pronouns),
            'pron': ('subject pronoun', consts.subject_pronouns)
        }

        if item['pos'] in pronoun_types and aii_v in pronoun_types[item['pos']][1]:
            pronoun_label = pronoun_types[item['pos']][0]
            obj['pos'] = pronoun_label
            obj['tier2_tags'] = [f"pos:{pronoun_label}"]
        elif item['pos'] == 'root':
            num_chars = len(aii_v.split())
            if num_chars not in (2, 3, 4, 5):
                raise Exception(f'{aii_v} is not 2, 3, 4, 5 letters')

            n_letter_root = f'{num_chars}-letter root'
            obj['pos'] = n_letter_root
            obj['tier2_tags'] = [f'pos:{n_letter_root}']
        else:
            obj['pos'] = consts.pos_abbrev[item['pos']]
            obj['tier2_tags'] = [f"pos:{consts.pos_abbrev[item['pos']]}"]


        obj['senses'] = parse_senses(item, aii_v, obj)

        set_head_template(item, obj, aii_v)
        set_linkage_table(item, obj, aii_v)
        set_infl(item, obj, aii_v, verb_denominal_forms)

        add_etymology(obj, item, aii_v)
        # add_tier2_linkages
        parse_sounds(item, aii_sounds, aii_not_v, aii_v)

        aii_dict[aii_not_v][aii_v].append(obj)

    numbers_table = generate_numbers_table()


    with open('./js/json/verb-denominal-forms.json', 'w') as f:
        json.dump(verb_denominal_forms, f, ensure_ascii=False, indent=4)

    return aii_dict, collapse_sounds(aii_sounds), numbers_table

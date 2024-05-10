from collections import defaultdict
# from pprint import pprint
import hashlib
import json
import os
import re
import copy
from vars import consts
from vars.ht_schemas import ht_schema_omit, ht_schema, forms_abbrev, gender_abbrev
from vars.infl_schemas import infl_schema_omit, infl_schema
from ipa_to_mp3 import ipa_to_mp3
from conjugate_verbs import set_verb_conj

def set_examples(item_sense, sense):
    if 'examples' in item_sense:
        res = []
        for example in item_sense['examples']:
            if 'text' in example and 'english' in example:
                aii = example['text']
                english = example['english']
                if 'type' in example and example['type'] == 'quotation':
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

def parse_senses(item, aii_v, vocalized_cache, obj):
    senses = []
    for item_sense in item['senses']:
        sense = defaultdict(lambda: defaultdict(list))
        sense['gloss'] = item_sense['glosses'][0]

        set_examples(item_sense, sense)

        if item['pos'] == 'root':
            set_linkage_table(item_sense, obj, aii_v, vocalized_cache)
        else:
            set_linkage_table(item_sense, sense, aii_v, vocalized_cache)

        if 'categories' in item_sense:
            tier3_categories = []
            for category in item_sense['categories']:
                if 'langcode' in category and category['langcode'] == 'aii':
                    tier3_categories.append(category['name'])
            if tier3_categories:
                sense['tier3_categories'] = tier3_categories
                sense['tier3_tags'] = [f"category:{t3cat}" for t3cat in tier3_categories]
        senses.append(sense)

    return senses

def set_infl(item, obj, aii_v, vocalized_cache, visual_conj_cache):
    if 'inflection_templates' not in item:
        return

    name = item['inflection_templates'][0]['name']
    if name in infl_schema_omit:
        return

    if name.startswith('aii-conj'):
        set_verb_conj(item, obj, name, aii_v, vocalized_cache, visual_conj_cache)
    else:
        set_noun_infl(item, obj, name, aii_v, vocalized_cache)


def set_noun_infl(item, obj, name, aii_v, vocalized_cache):
    # for noun/preposition
    template = copy.deepcopy(infl_schema[name]['template'])
    omit = infl_schema[name]['omit'].union(infl_schema[name]['omit_dangling'])
    unique_keys = {key:pron for pron, val in template.items() for key in val}

    for arg, aii in item['inflection_templates'][0]['args'].items():
        if arg in omit:
            pass
        elif arg in unique_keys:
            pron = unique_keys[arg]
            template[pron][arg] = aii
        else:
            raise Exception(f'missing {arg} for word {item["word"]}')

    rows = []
    for key, val in template.items():
        rows.append( annotated_row(key, list(val.values()), aii_v, vocalized_cache))

    obj['table'] = {
        "heading": infl_schema[name]['heading'],
        "rows": rows
    }

    if 'heading_2' in infl_schema[name]:
        obj['table']['heading_2'] = infl_schema[name]['heading_2']


def annotated_row(meta, aii_values, aii_v, vocalized_cache):
    row = defaultdict(list)
    row['meta'] = meta

    for aii_value in aii_values:
        val_obj = {'value': aii_value}
        if aii_value in vocalized_cache:
            val_obj['anchor'] = True
        if aii_value == aii_v:
            val_obj['matches_aii_v'] = True
        # if letters and template_str:
        #     val_obj['letters'] = letters
        #     val_obj['template_str'] = template_str

        row['values'].append(val_obj)

    return row


def set_head_template(item, obj, aii_v, vocalized_cache):
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
                annotated_row(form_name, [val], aii_v, vocalized_cache)
            )

        elif arg in ht_schema[ht_name]['genders']:
            pos_gender_abbrev = gender_abbrev.get(ht_name, gender_abbrev['default'])

            if arg in ("2", "g"):
                obj['other_forms']['rows'].append(
                    annotated_row(pos_gender_abbrev[val], [aii_v], aii_v, vocalized_cache)
                )

            if arg == "g2":
                obj['other_forms']['rows'].append(
                    annotated_row(f'sometimes {pos_gender_abbrev[val]}', [aii_v], aii_v, vocalized_cache)
                )

        else:
            raise Exception(f'"{arg}" not in omit, forms or genders for ht {ht_name} for:\n\n {item}')

def set_linkage_table(parent, obj, aii_v, vocalized_cache):
    # check whether aii_v or head templates are already accounted for so we don't have duplicates
    already_there = {aii_v}
    # so we don't accidentally create array (defaultdict)
    if 'other_forms' in obj and 'rows' in obj['other_forms']:
        for row in obj['other_forms']['rows']:
            for values in row['values']:
                already_there.add(values['value'])


    for linkage_key, linkage_val in consts.linkage_types.items(): # ex. {'alt_of': 'alternate',}
        if linkage_key in parent:
            for linkage in parent[linkage_key]: # ex. for synonym in synonyms
                word_linkage = linkage['word']
                omit = re.search('[a-zA-Z]', linkage['word']) or word_linkage in already_there
                if not omit:
                    obj['other_forms']['rows'].append(
                        annotated_row(linkage_val, [word_linkage], aii_v, vocalized_cache)
                    )
                    already_there.add(word_linkage)

def fix_urmian(name):
    return 'Urmian' if name == 'Urmia' else name

def parse_sounds(item, aii_sounds, aii_not_v, aii_v):
    ipas = []
    if 'sounds' in item:
        for sound in item['sounds']:
            if 'tags' in sound or 'note' in sound:
                enc_str = sound['ipa'].encode()
                # for 128-bit algo, 50% chance of collision after 2^64 ipas, ie hexdigest(16)
                #                   50% chance of collision after 2^32 ipas, ie hexdigest(8)
                hash_str = hashlib.shake_128(enc_str).hexdigest(16)
                # .title() is mainly for uppercasing "standard"
                if 'tags' in sound:
                    ipas.append((fix_urmian(sound['tags'][0]), sound['ipa'], hash_str))
                else:
                    ipas.append((fix_urmian(sound['note']), sound['ipa'], hash_str))

    if ipas:
        aii_sounds[aii_not_v][aii_v].append(ipas)

def collapse_sounds(aii_sounds):
    # intersection of all sublists
    aii_collapsed_sounds = defaultdict(lambda: {})

    for aii_not_v, aii_vs in aii_sounds.items():
        for aii_v, jsonlines_ipas in aii_vs.items():
            collapsed = set.intersection(*[set(list_) for list_ in jsonlines_ipas])
            if collapsed:
                # custom sort priority
                collapsed_list = sorted(collapsed)
                collapsed_list.sort(key=lambda words: (words[0] != 'standard', words[0]))
                # sorted(words, key=lambda word: (word != 'apple', word))
                aii_collapsed_sounds[aii_not_v][aii_v] = collapsed_list

                if os.getenv('AII_DICT_GENERATE_AUDIO'):
                    for _, ipa, ipa_hash in collapsed_list:
                        ipa_to_mp3(ipa, ipa_hash)

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

def add_etymology(obj, item):
    if 'etymology_templates' in item:
        etymology = []
        for ety in item['etymology_templates']:
            if ety['name'] in consts.derivation_templates:
                if ety['args']['1'] == 'aii':
                    lang_name = consts.language_codes[ety['args']['2']]
                    etymology.append(lang_name)
                elif ety['args']['1'] == 'syc':
                    for code in ['syc', ety['args']['2']]:
                        lang_name = consts.language_codes[code]
                        etymology.append(lang_name)
            elif ety['name'] == 'cog' and '2' in ety['args']:
                set_cognate(obj, item, ety)

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


def datadump_to_dict():
    with open('./js/json/_aii.jsonl', encoding="utf-8") as f:
        data = [json.loads(line) for line in f]

    aii_dict = defaultdict(lambda: defaultdict(list))
    aii_sounds = defaultdict(lambda: defaultdict(list))

    vocalized_cache = set()
    visual_conj_cache = {}
    for item in data:
        vocalized_cache.add(generate_aii_v(item, item['word']))

    for item in data:
        aii_not_v = item['word']
        aii_v = generate_aii_v(item, aii_not_v)

        obj = defaultdict(lambda: defaultdict(list))
        obj['pos'] = consts.pos_abbrev[item['pos']]
        obj['tier2_tags'] = [f"pos:{consts.pos_abbrev[item['pos']]}"]
        if item['pos'] == 'root':
            num_chars = len(aii_v.split())
            if num_chars not in (2, 3, 4):
                raise Exception(f'{aii_v} is not 2, 3, 4 letters')

            obj['tier2_tags'].append(f'root:{num_chars}-letters')
            obj['root_num_letters'] = num_chars


        obj['senses'] = parse_senses(item, aii_v, vocalized_cache, obj)

        set_head_template(item, obj, aii_v, vocalized_cache)
        set_linkage_table(item, obj, aii_v, vocalized_cache)
        set_infl(item, obj, aii_v, vocalized_cache, visual_conj_cache)

        add_etymology(obj, item)
        # add_tier2_linkages
        parse_sounds(item, aii_sounds, aii_not_v, aii_v)

        aii_dict[aii_not_v][aii_v].append(obj)

    return aii_dict, collapse_sounds(aii_sounds), visual_conj_cache

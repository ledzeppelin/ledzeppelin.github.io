from collections import defaultdict
import re
import itertools
import copy
from vars.verb_templates import conj_schema, conj_stems_and_patterns
from vars.infl_schemas import verb_infl_schema

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

def root_letters_in_verb_args(root_letters, verb_args):
    regex = strip_markers()
    # strip diacritics from template vals
    va_stripped = [re.sub(regex, '', atuta) for atuta in verb_args]
    va_intersected = [None] * len(verb_args)

    if len(root_letters) > 5:
        raise Exception('root has more than 5 letters')

    if not (len(root_letters) in (2,3,4, 5) and len(verb_args) in (1,2,3,4,5)):
        return None

    max_num_matches = min(len(root_letters), len(verb_args))
    for num_matches in reversed(range(1, max_num_matches + 1)):
        # we try for most number of matches
        root_combos = list(itertools.combinations(enumerate(root_letters), num_matches))
        for root_combo in root_combos:
            # print(root_combos)
            # print(root_combo)
            # print(' ')
            va_stripped_combos = list(itertools.combinations(enumerate(va_stripped), num_matches))
            for va_stripped_combo in va_stripped_combos:
                root_combo_vals = tuple(pair[1] for pair in root_combo)
                va_stripped_combo_vals = tuple(pair[1] for pair in va_stripped_combo)
                if root_combo_vals == va_stripped_combo_vals:
                    # print(root, verb_args, root_combo_vals, va_stripped_combo_vals)
                    # raise Exception(va_stripped_combo)
                    root_combo_indices = tuple(i for i, _ in root_combo)
                    va_stripped_combo_indices = tuple(i for i, _ in va_stripped_combo)
                    for root_i, va_stripped_i in zip(root_combo_indices, va_stripped_combo_indices):
                        va_intersected[va_stripped_i] = [root_i, verb_args[va_stripped_i]] # unstripped

                    return va_intersected
    return None

def root_venn(item, verb_args):
    if 'etymology_templates' in item:
        for ety in item['etymology_templates']:
            if not (ety['name'] == 'aii-root' and item['pos'] == 'verb'):
                continue

            root = ety['args']['1'].split(' ')
            regex = strip_markers()
            va_stripped = [re.sub(regex, '', atuta) for atuta in verb_args]
            valid_verb_args = all(len(verb_arg) <= 1 for verb_arg in va_stripped)
            if valid_verb_args:
                return root, root_letters_in_verb_args(root, verb_args)
    return None, None

def parse_verb_pattern(input_str):
    # "G-strong|ܩ|ܪ|ܡ}}"
    # Output: ('G-strong', ['ܩ', 'ܪ', 'ܡ'])
    if 'aii-conj-haweh' in input_str:
        return 'aii-conj-haweh', []
    cleaned_str = input_str.strip('}}')
    parts = cleaned_str.split('|')
    return f"aii-conj-verb/{parts[0]}", parts[1:]

def unique_forms(aii_v, item, template_name, irregular_num_forms):
    # turn the relevant aii forms into a list whose values will be used to fill out the template
    alphabet = 'ܦܒܬܛܕܟܓܩܣܨܙܫܚܥܗܡܢܪܠܐܘܝ'
    matching_forms = []
    for entry in item.get('forms', []):
        if entry.get("source") in {"conjugation", "inflection"}:
            if any(char in alphabet or entry["form"] == '-' for char in entry["form"]):
                matching_forms.append(entry["form"])

    if template_name in irregular_num_forms:
        if irregular_num_forms[template_name] != len(matching_forms):
            raise Exception(len(matching_forms), matching_forms, aii_v)
    else:
        if len(matching_forms) != 53:
            raise Exception(len(matching_forms), matching_forms, aii_v)

    return set(matching_forms)

def replace_placeholders(input_string, replacements):
    for i, replacement in enumerate(replacements, start=1):
        input_string = input_string.replace(f"{{{{{{{i}}}}}}}", replacement)
    return input_string


def set_verb_conj(item, obj, aii_v, vocalized_cache, visual_conj_cache):
    irregular_num_forms = {
        'aii-conj-verb/azel': 52,
        'aii-conj-verb/yavel': 52,
        'aii-conj-verb/atheh': 52,
        'aii-conj-haweh': 54
    }

    template_str_invocation = item['forms'][-1]['form']
    template_name, template_args = parse_verb_pattern(template_str_invocation)
    if template_name == 'aii-conj-verb/G-weak-1i':
        return
    if template_name not in list(conj_schema):
        raise Exception(aii_v, template_name)

    AII_CONJ_VERB = 'aii-conj-haweh' if template_name == 'aii-conj-haweh' else 'aii-conj-verb'
    template = copy.deepcopy(verb_infl_schema[AII_CONJ_VERB]['template'])
    unique = unique_forms(aii_v, item, template_name, irregular_num_forms)


    vn_tense_key = None
    for tense_key, tense in template.items():
        for pronoun in tense.values():
            for form in pronoun.keys():
                if form == 'vn' and form not in conj_schema[template_name]:
                    vn_tense_key = tense_key
                    continue
                eval_form = replace_placeholders(conj_schema[template_name][form], template_args)
                if eval_form not in unique:
                    raise Exception(template_name, form, eval_form, aii_v, 'form doesnt match')
                pronoun[form] = eval_form

    if vn_tense_key:
        # raise Exception(vn_tense_key)
        del template[vn_tense_key]

    tenses = []


    root, verb_args_x_root = root_venn(item, template_args)

    alt_heading = {
        'Present Participle': ' ',
        'Past Participle': 'Gender of Described Noun',
        'Verbal Noun': ' ',
        'Agent Noun': 'Number and Gender',
        'Instance Noun': 'Number',
    }

    for tense, pronouns in template.items():
        rows = []
        # raise Exception(tense)
        true_heading = alt_heading[tense] if tense in alt_heading else verb_infl_schema[AII_CONJ_VERB]["heading"]

        for pronoun, conj_obj in pronouns.items():
            rows.append(
                annotated_verb_row(
                    pronoun, conj_obj, aii_v, vocalized_cache, template_name,
                    template_args, verb_args_x_root, visual_conj_cache, root
                )
            )
        tenses.append(
            {'heading': true_heading, 'heading_2': [tense], 'rows': rows}
        )


    is_irregular = template_name in irregular_num_forms
    if is_irregular:
        stem_name = "Irregular"
        obj['tier2_vis_verb'] = {
            'stem': stem_name,
        }
        obj['tier2_tags'].append(f'stem:{stem_name}')
    else:
        pattern = template_name.removeprefix('aii-conj-verb/')
        stem_name = find_stem_of_pattern(conj_stems_and_patterns, pattern)

        obj['tier2_vis_verb'] = {
            'stem': stem_name,
            'pattern': pattern,
        }
        obj['tier2_tags'].append(f'stem:{stem_name}')
        obj['tier2_tags'].append(f'pattern:{pattern}')

    if is_irregular:
        set_singleton_not_vis_root_table(item, obj, aii_v)
    else:
        set_singleton_vis_root_table(tenses, obj, aii_v, root)

    obj['conj']['tenses'] += tenses

def find_stem_of_pattern(_conj_stems_and_patterns, conj_pattern):
    for stem, conj_patterns in _conj_stems_and_patterns.items():
        if conj_pattern in conj_patterns:
            return f'{stem}-stem'
    raise ValueError(f"{conj_pattern} not found")


def annotated_row(meta, aii_values, aii_v):
    row = defaultdict(list)
    row['meta'] = meta

    for aii_value in aii_values:
        val_obj = {'value': aii_value}
        row['values'].append(val_obj)

    return row

def get_singleton_root_table_headers():
    root_tense = {
      "heading": " ",
      "heading_2": ["Root of Verb"],
      'rows': [],
    }
    meta_name = ' '
    return root_tense, meta_name

def set_singleton_vis_root_table(tenses, obj, aii_v, root):
    root_tense, meta_name = get_singleton_root_table_headers()

    for tense in tenses:
        for row in tense['rows']:
            for value in row['values']:
                if 'template_str' in value:
                    vis_conj_row = annotated_root_row(aii_v, root, meta_name)
                    root_tense['rows'].append(vis_conj_row)
                    obj['conj']['tenses'] = [root_tense]
                    return

def set_singleton_not_vis_root_table(item, obj, aii_v):
    if 'etymology_templates' in item:
        root_tense, meta_name = get_singleton_root_table_headers()
        for ety in item['etymology_templates']:
            if ety['name'] == 'aii-root':
                no_vis_conj_row = annotated_row(meta_name, [ety['args']['1']], aii_v)
                root_tense['rows'].append(no_vis_conj_row)
                obj['conj']['tenses'] = [root_tense]
                return

def replace_template_str(template_str, aii_value, verb_args, verb_args_x_root, aii_v):
    if len(verb_args) != len(verb_args_x_root):
        raise Exception('oh dear')

    capture_group = r"({{{[1-5]}}})"

    matches = re.findall(capture_group, template_str)
    if len(matches) > 5 or len(matches) > len(verb_args):
        raise Exception(f"{template_str} {verb_args}")

    evaluated_template_str = template_str
    for i, match in enumerate(matches):
        evaluated_template_str = evaluated_template_str.replace(match, verb_args[i])
    if evaluated_template_str != aii_value:
        raise Exception(f"{evaluated_template_str} | {aii_value}")


    # the is the first of two passes, the 2nd is done in the UI via js
    #
    # replace every placeholder, ex. {{{1}}} with every verb arg that doesn't overlap w/ root char
    # this implicitly would handle verb args which are empty strings since root letters are always non-empty
    partial_template_str = template_str
    for i, match in enumerate(matches):
        if verb_args_x_root[i] is None:
            partial_template_str = partial_template_str.replace(match, verb_args[i])
    chars = [char for char in verb_args_x_root if char is not None]

    rem_matches = re.findall(capture_group, partial_template_str)

    if len(rem_matches) != len(chars):
        raise Exception(template_str, aii_value, verb_args, verb_args_x_root, chars, aii_v)

    return partial_template_str, chars


def annotated_root_row(aii_v, root, meta):
    row = {
        'meta': meta,
    }
    root_str = ' '.join(root)

    val_obj = {'value': root_str}
    val_obj['template_str'] = ''.join([f'{{{{{{%s}}}}}}' % (i) for i in range(1,len(root)+1)])
    val_obj['template_atwateh'] = [[i, char] for i, char in enumerate(root)]
    val_obj['break_ligatures'] = True

    row['values'] = [val_obj]

    return row


def annotated_verb_row(meta, conj_obj, aii_v, vocalized_cache, template_name, verb_args,
    verb_args_x_root, visual_conj_cache, root):
    row = defaultdict(list)
    row['meta'] = meta

    # conj_obj {'past-3rd-sm': 'ܐܒܓ'}

    for key, aii_value in conj_obj.items():
        val_obj = {'value': aii_value}
        verb_template_not_visualized = {'aii-conj-verb', 'aii-conj-hawe'}

        all_t = (verb_template_not_visualized, conj_schema.keys())
        if any(template_name in l for l in all_t) is False:
            raise Exception(f'template {template_name} not handled', all_t)

        if template_name in conj_schema and key in conj_schema[template_name]:
            if verb_args_x_root:
                partial_template_str, atwateh = replace_template_str(
                    conj_schema[template_name][key],
                    aii_value, verb_args,
                    verb_args_x_root,
                    aii_v
                )

                val_obj['template_str'] = partial_template_str
                val_obj['template_atwateh'] = atwateh

                if aii_value in vocalized_cache and key == 'pres-3rd-sm':
                    val_obj_copy = copy.deepcopy(val_obj)
                    val_obj_copy['derived_from_root'] = " ".join(root)
                    visual_conj_cache[aii_value] = val_obj_copy

        row['values'].append(val_obj)

    return row


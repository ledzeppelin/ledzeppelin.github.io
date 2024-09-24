from collections import defaultdict
import re
import itertools
import copy
from vars.verb_templates import conj_schema, conj_stems_and_patterns
from vars.infl_schemas import infl_schema

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

    if len(root_letters) > 4:
        raise Exception('root has more than 4 letters')

    if not (len(root_letters) in (2,3,4) and len(verb_args) in (2,3,4)):
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

def root_venn(item):
    if 'etymology_templates' in item:
        for ety in item['etymology_templates']:
            if not (ety['name'] == 'aii-root' and item['pos'] == 'verb'):
                continue

            template = item['inflection_templates'][0]
            if template['name'].startswith('aii-conj-verb/'):
                root = ety['args']['1'].split(' ')
                verb_args = list(template['args'].values())

                regex = strip_markers()
                va_stripped = [re.sub(regex, '', atuta) for atuta in verb_args]
                valid_verb_args = all(len(verb_arg) <= 1 for verb_arg in va_stripped)
                if valid_verb_args:
                    return root, verb_args, root_letters_in_verb_args(root, verb_args)
    return None, None, None


def set_verb_conj(item, obj, html_template_name, template_name, aii_v, vocalized_cache, visual_conj_cache):
    template = copy.deepcopy(infl_schema[html_template_name]['template'])
    unique_keys = {}
    for tense, pronouns in template.items():
        for pronoun, conj in pronouns.items():
            for key in conj:
                # {'past-3rd-sm' : ('He', 'past')}
                unique_keys[key] = (pronoun, tense)

    omit = infl_schema[html_template_name]['omit']

    for arg, aii in item['inflection_templates'][-1]['args'].items():
        if arg in omit:
            pass
        elif arg in unique_keys:
            pron, tense = unique_keys.pop(arg)
            template[tense][pron][arg] = aii
        else:
            raise Exception(f'missing {arg} for word {item["word"]}')

    if unique_keys:
        raise Exception(unique_keys)

    tenses = []

    root, verb_args, verb_args_x_root = root_venn(item)

    for tense, pronouns in template.items():
        rows = []
        for pronoun, conj_obj in pronouns.items():
            rows.append(
                annotated_verb_row(
                    pronoun, conj_obj, aii_v, vocalized_cache, template_name,
                    verb_args, verb_args_x_root, visual_conj_cache, root
                )
            )
        tenses.append(
            {'heading': infl_schema[html_template_name]["heading"], 'heading_2': [tense], 'rows': rows}
        )


    if template_name == html_template_name:
        set_singleton_not_vis_root_table(item, obj, aii_v, vocalized_cache)
    else:
        pattern = template_name.removeprefix('aii-conj-verb/')
        stem_name = find_stem_of_pattern(conj_stems_and_patterns, pattern)

        obj['tier2_vis_verb'] = {
            'stem': stem_name,
            'pattern': pattern,
        }
        obj['tier2_tags'].append(f'stem:{stem_name}')
        obj['tier2_tags'].append(f'pattern:{pattern}')

        set_singleton_vis_root_table(tenses, obj, aii_v, vocalized_cache, root)


    obj['conj']['tenses'] += tenses

def find_stem_of_pattern(_conj_stems_and_patterns, conj_pattern):
    for stem, conj_patterns in _conj_stems_and_patterns.items():
        if conj_pattern in conj_patterns:
            return f'{stem}-stem'
    raise ValueError(f"{conj_pattern} not found")


def annotated_row(meta, aii_values, aii_v, vocalized_cache):
    row = defaultdict(list)
    row['meta'] = meta

    for aii_value in aii_values:
        val_obj = {'value': aii_value}
        if aii_value in vocalized_cache:
            val_obj['anchor'] = True
        if aii_value == aii_v:
            val_obj['matches_aii_v'] = True

        row['values'].append(val_obj)

    return row

def get_singleton_root_table_headers():
    root_tense = {
      "heading": "Morpheme",
      'rows': [],
    }
    meta_name = 'root of verb'
    return root_tense, meta_name

def set_singleton_vis_root_table(tenses, obj, aii_v, vocalized_cache, root):
    root_tense, meta_name = get_singleton_root_table_headers()

    for tense in tenses:
        for row in tense['rows']:
            for value in row['values']:
                if 'template_str' in value:
                    vis_conj_row = annotated_root_row(aii_v, vocalized_cache, root, meta_name)
                    root_tense['rows'].append(vis_conj_row)
                    obj['conj']['tenses'] = [root_tense]
                    return

def set_singleton_not_vis_root_table(item, obj, aii_v, vocalized_cache):
    if 'etymology_templates' in item:
        root_tense, meta_name = get_singleton_root_table_headers()
        for ety in item['etymology_templates']:
            if ety['name'] == 'aii-root':
                no_vis_conj_row = annotated_row(meta_name, [ety['args']['1']], aii_v, vocalized_cache)
                root_tense['rows'].append(no_vis_conj_row)
                obj['conj']['tenses'] = [root_tense]
                return

def replace_template_str(template_str, aii_value, verb_args, verb_args_x_root, aii_v):
    if len(verb_args) != len(verb_args_x_root):
        raise Exception('oh dear')

    capture_group = r"({{{[1-4]}}})"

    matches = re.findall(capture_group, template_str)
    if len(matches) > 4 or len(matches) > len(verb_args):
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


# def ambiguate_atwateh_colors(template_atwateh, root):
#     # when root has consec chars and one of them is dropped during conjugation (see G-2i)
#     # root_letters_in_verb_args can't tell which one is actually dropped
#     res = []
#     for i, char in enumerate(root):
#         if i == 0:
#             res.append([i, char])
#         else:
#             prev_idx, prev_char = res[-1]
#             if char == prev_char:
#                 res.append([prev_idx, char])
#             else:
#                 res.append([i, char])
#     return res


def annotated_root_row(aii_v, vocalized_cache, root, meta):
    row = {
        'meta': meta,
        # 'meta': 'root of verb',
    }
    root_str = ' '.join(root)

    val_obj = {'value': root_str}
    if root_str in vocalized_cache:
        val_obj['anchor'] = True
    if root_str == aii_v:
        val_obj['matches_aii_v'] = True

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
        if aii_value in vocalized_cache:
            val_obj['anchor'] = True
        if aii_value == aii_v:
            val_obj['matches_aii_v'] = True

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


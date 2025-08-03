from .vars.verb_templates import conj_schema
from .dynamic_conj.aii_conj import aii_conj

def parse_verb_pattern(aii_conj_arg):
    # Output: ('G-strong', ['ܩ', 'ܪ', 'ܡ'])
    invocation = aii_conj(aii_conj_arg)
    return invocation['title'], [] if invocation['args'] is None else invocation['args']

def unique_forms(item):
    # turn the relevant aii forms into a list whose values will be used to fill out the template
    alphabet = 'ܦܒܬܛܕܟܓܩܣܨܙܫܚܥܗܡܢܪܠܐܘܝ'
    matching_forms = []
    for entry in item.get('forms', []):
        if entry.get("source") in {"conjugation", "inflection"}:
            if any(char in alphabet or entry["form"] == '-' for char in entry["form"]):
                matching_forms.append(entry["form"])

    return set(matching_forms)

def set_verb_conj(item, obj, aii_v, verb_denominal_forms):
    irregular_patterns = {
        'azel',
        'yavel',
        'atheh',
        'aii-conj-haweh',
    }

    aii_conj_arg = item['inflection_templates'][-1]['args']['1']
    template_name, template_args = parse_verb_pattern(aii_conj_arg)

    if template_name not in conj_schema:
        raise Exception(aii_v, template_name)

    verb_denominal_forms[aii_v] = sorted(unique_forms(item))

    is_irregular = template_name in irregular_patterns
    pattern = "irregular" if is_irregular else template_name

    obj['verb_conjugation'] = {
        'pattern': pattern,
        'strong_radicals': template_args,
    }
    if is_irregular:
        obj['verb_conjugation']['alt_pattern'] = template_name

    if template_name == 'aii-conj-haweh':
        obj['verb_conjugation']['schema'] = 'verb-conj-schema-haweh'
    else:
        obj['verb_conjugation']['schema'] = 'verb-conj-schema'


    obj['tier2_tags'].append(f'pattern:{pattern}')

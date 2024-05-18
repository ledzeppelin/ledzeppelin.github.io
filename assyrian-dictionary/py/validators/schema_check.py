import sys
sys.path.append('py')
from collections import Counter
from vars import ht_schemas
from vars import verb_templates
from vars import consts

# deleted_verb_templates, verb_template_omit, conj_schema

for key, val in ht_schemas.ht_schema.items():
    one = val['omit'] & val['forms']
    two = val['forms'] & val['genders']
    three = val['genders'] & val['omit']

    if (one or two or three):
        raise Exception (f"duplicate found in {key}")



template_names = []
template_names +=  list(verb_templates.deleted_verb_templates)
template_names +=  list(verb_templates.verb_template_omit)
template_names +=  list(verb_templates.verb_template_aliases.keys())
template_names +=  list(verb_templates.conj_schema.keys())

for item, count in Counter(template_names).items():
    if count > 1:
        raise Exception(f'item {item} is duplicated')


if set(consts.derivation_templates) & set(consts.other_forms_from_ety_templates):
    raise Exception('ety templates have duplicate values')

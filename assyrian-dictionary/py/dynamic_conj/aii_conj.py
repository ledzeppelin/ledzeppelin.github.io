import re
import sys
sys.path.append('py')
from dynamic_conj.utils import AiiConjugation

def aii_conj(aii_v):
    # given the non-past, 3rd person, single, masculine form of a verb
    # return the template name and the arguments to that template which generate the other forms

    conj = AiiConjugation()
    patterns = conj.get_patterns()

    matched_patterns = []
    vowel_diacritics_stripped = re.sub(f"[^{conj.LETTERS}]", '', aii_v)

    if aii_v in conj.special_cases:
        args = conj.special_cases[aii_v][1:] if len(conj.special_cases[aii_v]) > 1 else None
        return {
            'title': conj.special_cases[aii_v][0],
            'args': args,
        }


    for pattern, num_atwateh, regex in patterns:
        match =  re.match(regex, aii_v)
        if len(vowel_diacritics_stripped) == num_atwateh and match:

            args = list(match.groups())
            matched_patterns.append(
                {
                    'title': pattern,
                    'args': args,
                }
            )

    if len(matched_patterns) == 0:
        raise Exception(f'{aii_v} matched no existing conjugation patterns')
    if len(matched_patterns) == 1:
        return matched_patterns[0]

    raise Exception(f'{aii_v} matched {", ".join(matched_patterns)} - it should only match one conjugation pattern')


# print(aii_conj('ܥܵܐܹܠ'))

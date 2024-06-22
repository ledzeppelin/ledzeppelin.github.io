infl_schema_not_parameterized = {
    "aii-conj-verb/zi": 1,
    "aii-infl-prep/bi": 1,
    "aii-infl-prep/il": 1,
    "aii-infl-prep/it": 1,
    "aii-infl-prep/layt": 1,
}

verb_template_not_visualized = {
    'aii-conj',
    'aii-conj-verb',
    'aii-conj-verb/hawe',
}

# templates do not inherit from another template
base_verb_templates = {
    'aii-conj',
    'aii-conj-verb',
}


DEFAULT_VAL = ' '
DEFAULT_VAL = '-'

infl_schema = {
    'aii-infl-noun':{
        'heading': 'Possessive Determiner',
        'heading_2': ['one', 'two or more'],
        'omit': {
            'sg.emph.', 'pl.emph.', 'sg.cstr.', 'pl.cstr.', 'pl.abs.', 'sg.abs.'
        },
        # ex. 'omit_dangling': { 'sg.2mp', 'sg.2fp' },
        'omit_dangling': set(),
        'template': {
            'my': {
                'sg.1cs': DEFAULT_VAL,
                'pl.1cs': DEFAULT_VAL,
            },
            'our': {
                'sg.1cp': DEFAULT_VAL,
                'pl.1cp': DEFAULT_VAL,
            },
            'your (to a man)': {
                'sg.2ms': DEFAULT_VAL,
                'pl.2ms': DEFAULT_VAL,
            },
            'your (to a woman)': {
                'sg.2fs': DEFAULT_VAL,
                'pl.2fs': DEFAULT_VAL,
            },
            'your (to a group)': {
                'sg.2cp': DEFAULT_VAL,
                'pl.2cp': DEFAULT_VAL,
            },
            'his': {
                'sg.3ms': DEFAULT_VAL,
                'pl.3ms': DEFAULT_VAL,
            },
            'her': {
                'sg.3fs': DEFAULT_VAL,
                'pl.3fs': DEFAULT_VAL,
            },
            'their': {
                'sg.3cp': DEFAULT_VAL,
                'pl.3cp': DEFAULT_VAL,
            },
        }
    },

    'aii-infl-noun-unc':{
        'heading': 'Possessive Determiner',
        'omit': {
            "abs.", "cstr.", "emph.", "number"
        },
        'omit_dangling': set(),
        'template': {
            'my': {
                '1cs': DEFAULT_VAL,
            },
            'our': {
                '1cp': DEFAULT_VAL,
            },
            'your (to a man)': {
                '2ms': DEFAULT_VAL,
            },
            'your (to a woman)': {
                '2fs': DEFAULT_VAL,
            },
            'your (to a group)': {
                '2cp': DEFAULT_VAL,
            },
            'his': {
                '3ms': DEFAULT_VAL,
            },
            'her': {
                '3fs': DEFAULT_VAL,
            },
            'their': {
                '3cp': DEFAULT_VAL,
            },
        }
    },

    'aii-infl-prep':{
        'heading': 'Object Pronoun',
        'omit': {
            "heading", "base", '1',
        },
        'omit_dangling': set(),
        'template': {
            'me': {
                '1s': DEFAULT_VAL,
            },
            'us': {
                '1p': DEFAULT_VAL,
            },
            'you (to a man)': {
                '2m': DEFAULT_VAL,
            },
            'you (to a woman)': {
                '2f': DEFAULT_VAL,
            },
            'you (to a group)': {
                '2p': DEFAULT_VAL,
            },
            'him': {
                '3m': DEFAULT_VAL,
            },
            'her': {
                '3f': DEFAULT_VAL,
            },
            'them': {
                '3p': DEFAULT_VAL,
            },
        }
    },

    'aii-conj-verb/':{
        'heading': 'Subject Pronoun',
        'omit': set(),
        'omit_dangling': set(),
        'template': {
            'Past Tense': {
                'I': {
                    'past-1st-s': DEFAULT_VAL,
                },
                'we': {
                    'past-1st-p': DEFAULT_VAL,
                },
                'you (to a man)': {
                    'past-2nd-sm': DEFAULT_VAL,
                },
                'you (to a woman)': {
                    'past-2nd-sf': DEFAULT_VAL,
                },
                'you (to a group)': {
                    'past-2nd-p': DEFAULT_VAL,
                },
                'he': {
                    'past-3rd-sm': DEFAULT_VAL,
                },
                'she': {
                    'past-3rd-sf': DEFAULT_VAL,
                },
                'they': {
                    'past-3rd-p': DEFAULT_VAL,
                },
            },
            'Present/Future Tense': {
                'I (man)': {
                    'pres-1st-sm': DEFAULT_VAL,
                },
                'I (woman)': {
                    'pres-1st-sf': DEFAULT_VAL,
                },
                'we': {
                    'pres-1st-p': DEFAULT_VAL,
                },
                'you (to a man)': {
                    'pres-2nd-sm': DEFAULT_VAL,
                },
                'you (to a woman)': {
                    'pres-2nd-sf': DEFAULT_VAL,
                },
                'you (to a group)': {
                    'pres-2nd-p': DEFAULT_VAL,
                },
                'he': {
                    'pres-3rd-sm': DEFAULT_VAL,
                },
                'she': {
                    'pres-3rd-sf': DEFAULT_VAL,
                },
                'they': {
                    'pres-3rd-p': DEFAULT_VAL,
                },
            },
            'Imperative Mood': {
                'you (to a man)': {
                    'imp-2nd-sm': DEFAULT_VAL,
                },
                'you (to a woman)': {
                    'imp-2nd-sf': DEFAULT_VAL,
                },
                'you (to a group)': {
                    'imp-2nd-p': DEFAULT_VAL,
                },
            },

        }
    },
    'aii-conj-verb/hawe':{
        'heading': 'Subject Pronoun',
        'omit': set(),
        'omit_dangling': set(),
        'template': {
            'Past Tense': {
                'I': {
                    'past-1st-s': DEFAULT_VAL,
                },
                'we': {
                    'past-1st-p': DEFAULT_VAL,
                },
                'you (to a man)': {
                    'past-2nd-sm': DEFAULT_VAL,
                },
                'you (to a woman)': {
                    'past-2nd-sf': DEFAULT_VAL,
                },
                'you (to a group)': {
                    'past-2nd-p': DEFAULT_VAL,
                },
                'he': {
                    'past-3rd-sm': DEFAULT_VAL,
                },
                'she': {
                    'past-3rd-sf': DEFAULT_VAL,
                },
                'they': {
                    'past-3rd-p': DEFAULT_VAL,
                },
            },
            'Present Tense': {
                'I (man)': {
                    'pres-1st-sm': DEFAULT_VAL,
                },
                'I (woman)': {
                    'pres-1st-sf': DEFAULT_VAL,
                },
                'we': {
                    'pres-1st-p': DEFAULT_VAL,
                },
                'you (to a man)': {
                    'pres-2nd-sm': DEFAULT_VAL,
                },
                'you (to a woman)': {
                    'pres-2nd-sf': DEFAULT_VAL,
                },
                'you (to a group)': {
                    'pres-2nd-p': DEFAULT_VAL,
                },
                'he': {
                    'pres-3rd-sm': DEFAULT_VAL,
                },
                'she': {
                    'pres-3rd-sf': DEFAULT_VAL,
                },
                'they': {
                    'pres-3rd-p': DEFAULT_VAL,
                },
            },
            'Future Tense': {
                'I (man)': {
                    'fut-1st-sm': DEFAULT_VAL,
                },
                'I (woman)': {
                    'fut-1st-sf': DEFAULT_VAL,
                },
                'we': {
                    'fut-1st-p': DEFAULT_VAL,
                },
                'you (to a man)': {
                    'fut-2nd-sm': DEFAULT_VAL,
                },
                'you (to a woman)': {
                    'fut-2nd-sf': DEFAULT_VAL,
                },
                'you (to a group)': {
                    'fut-2nd-p': DEFAULT_VAL,
                },
                'he': {
                    'fut-3rd-sm': DEFAULT_VAL,
                },
                'she': {
                    'fut-3rd-sf': DEFAULT_VAL,
                },
                'they': {
                    'fut-3rd-p': DEFAULT_VAL,
                },
            },
            'Imperative Mood': {
                'you (to a man)': {
                    'imp-2nd-sm': DEFAULT_VAL,
                },
                'you (to a woman)': {
                    'imp-2nd-sf': DEFAULT_VAL,
                },
                'you (to a group)': {
                    'imp-2nd-p': DEFAULT_VAL,
                },
            },

        }
    },
}

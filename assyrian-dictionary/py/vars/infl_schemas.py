infl_templates_ignored = {
    "aii-infl-bi", "aii-infl-il", "aii-infl-it", "aii-infl-layt", "aii-particle-infl-zi",
    'aii-conj-verb/B4i'
}

infl_schema = {
    'aii-infl-noun':{
        'heading': 'Possessive Determiner',
        'heading_2': ['one', 'two or more'],
        'omit': {
            'sg.emph.', 'pl.emph.', 'sg.cstr.', 'pl.cstr.', 'pl.abs.', 'sg.abs.'
        },
        'template': {
            'my': {
                'sg.1cs': None,
                'pl.1cs': None,
            },
            'our': {
                'sg.1cp': None,
                'pl.1cp': None,
            },
            'your (to a man)': {
                'sg.2ms': None,
                'pl.2ms': None,
            },
            'your (to a woman)': {
                'sg.2fs': None,
                'pl.2fs': None,
            },
            'your (to a group)': {
                'sg.2cp': None,
                'pl.2cp': None,
            },
            'his': {
                'sg.3ms': None,
                'pl.3ms': None,
            },
            'her': {
                'sg.3fs': None,
                'pl.3fs': None,
            },
            'their': {
                'sg.3cp': None,
                'pl.3cp': None,
            },
        }
    },

    'aii-infl-noun-unc':{
        'heading': 'Possessive Determiner',
        'omit': {
            "abs.", "cstr.", "emph.", "number"
        },
        'template': {
            'my': {
                '1cs': None,
            },
            'our': {
                '1cp': None,
            },
            'your (to a man)': {
                '2ms': None,
            },
            'your (to a woman)': {
                '2fs': None,
            },
            'your (to a group)': {
                '2cp': None,
            },
            'his': {
                '3ms': None,
            },
            'her': {
                '3fs': None,
            },
            'their': {
                '3cp': None,
            },
        }
    },

    'aii-infl-prep':{
        'heading': 'Object Pronoun',
        'omit': {
            "heading", "base", '1',
        },
        'template': {
            'me': {
                '1s': None,
            },
            'us': {
                '1p': None,
            },
            'you (to a man)': {
                '2m': None,
            },
            'you (to a woman)': {
                '2f': None,
            },
            'you (to a group)': {
                '2p': None,
            },
            'him': {
                '3m': None,
            },
            'her': {
                '3f': None,
            },
            'them': {
                '3p': None,
            },
        }
    },

    'aii-conj-verb':{
        'heading': 'Subject Pronoun',
        'omit': set(),
        'template': {
            'Past Tense': {
                'I': {
                    'past-1st-s': None,
                },
                'we': {
                    'past-1st-p': None,
                },
                'you (to a man)': {
                    'past-2nd-sm': None,
                },
                'you (to a woman)': {
                    'past-2nd-sf': None,
                },
                'you (to a group)': {
                    'past-2nd-p': None,
                },
                'he': {
                    'past-3rd-sm': None,
                },
                'she': {
                    'past-3rd-sf': None,
                },
                'they': {
                    'past-3rd-p': None,
                },
            },
            'Present/Future Tense': {
                'I (man)': {
                    'pres-1st-sm': None,
                },
                'I (woman)': {
                    'pres-1st-sf': None,
                },
                'we': {
                    'pres-1st-p': None,
                },
                'you (to a man)': {
                    'pres-2nd-sm': None,
                },
                'you (to a woman)': {
                    'pres-2nd-sf': None,
                },
                'you (to a group)': {
                    'pres-2nd-p': None,
                },
                'he': {
                    'pres-3rd-sm': None,
                },
                'she': {
                    'pres-3rd-sf': None,
                },
                'they': {
                    'pres-3rd-p': None,
                },
            },
            'Imperative Mood': {
                'you (to a man)': {
                    'imp-2nd-sm': None,
                },
                'you (to a woman)': {
                    'imp-2nd-sf': None,
                },
                'you (to a group)': {
                    'imp-2nd-p': None,
                },
            },

        }
    },
    'aii-conj-hawe':{
        'heading': 'Subject Pronoun',
        'omit': set(),
        'template': {
            'Past Tense': {
                'I': {
                    'past-1st-s': None,
                },
                'we': {
                    'past-1st-p': None,
                },
                'you (to a man)': {
                    'past-2nd-sm': None,
                },
                'you (to a woman)': {
                    'past-2nd-sf': None,
                },
                'you (to a group)': {
                    'past-2nd-p': None,
                },
                'he': {
                    'past-3rd-sm': None,
                },
                'she': {
                    'past-3rd-sf': None,
                },
                'they': {
                    'past-3rd-p': None,
                },
            },
            'Present Tense': {
                'I (man)': {
                    'pres-1st-sm': None,
                },
                'I (woman)': {
                    'pres-1st-sf': None,
                },
                'we': {
                    'pres-1st-p': None,
                },
                'you (to a man)': {
                    'pres-2nd-sm': None,
                },
                'you (to a woman)': {
                    'pres-2nd-sf': None,
                },
                'you (to a group)': {
                    'pres-2nd-p': None,
                },
                'he': {
                    'pres-3rd-sm': None,
                },
                'she': {
                    'pres-3rd-sf': None,
                },
                'they': {
                    'pres-3rd-p': None,
                },
            },
            'Copula': {
                'I (man)': {
                    'cop-1st-sm': None,
                },
                'I (woman)': {
                    'cop-1st-sf': None,
                },
                'we': {
                    'cop-1st-p': None,
                },
                'you (to a man)': {
                    'cop-2nd-sm': None,
                },
                'you (to a woman)': {
                    'cop-2nd-sf': None,
                },
                'you (to a group)': {
                    'cop-2nd-p': None,
                },
                'he': {
                    'cop-3rd-sm': None,
                },
                'she': {
                    'cop-3rd-sf': None,
                },
                'they': {
                    'cop-3rd-p': None,
                },
            },
            'Future Tense': {
                'I (man)': {
                    'fut-1st-sm': None,
                },
                'I (woman)': {
                    'fut-1st-sf': None,
                },
                'we': {
                    'fut-1st-p': None,
                },
                'you (to a man)': {
                    'fut-2nd-sm': None,
                },
                'you (to a woman)': {
                    'fut-2nd-sf': None,
                },
                'you (to a group)': {
                    'fut-2nd-p': None,
                },
                'he': {
                    'fut-3rd-sm': None,
                },
                'she': {
                    'fut-3rd-sf': None,
                },
                'they': {
                    'fut-3rd-p': None,
                },
            },
            'Imperative Mood': {
                'you (to a man)': {
                    'imp-2nd-sm': None,
                },
                'you (to a woman)': {
                    'imp-2nd-sf': None,
                },
                'you (to a group)': {
                    'imp-2nd-p': None,
                },
            },

        }
    },
}

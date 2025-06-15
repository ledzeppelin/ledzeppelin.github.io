# omitted_infl_schema = {'aii-particle-infl-zi'}
omitted_infl_schema = set()

noun_infl_schema = {
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
                '1cs': None,
            },
            'us': {
                '1cp': None,
            },
            'you (to a man)': {
                '2ms': None,
            },
            'you (to a woman)': {
                '2fs': None,
            },
            'you (to a group)': {
                '2cp': None,
            },
            'him': {
                '3ms': None,
            },
            'her': {
                '3fs': None,
            },
            'them': {
                '3cp': None,
            },
        }
    },
    # 'aii-infl-prep-numeral':{
    #     'heading': 'Object Pronoun',
    #     'omit': {
    #         "base", '1',
    #     },
    #     'template': {
    #         'us': {
    #             '1p': None,
    #         },
    #         'you (to a group)': {
    #             '2p': None,
    #         },
    #         'them': {
    #             '3p': None,
    #         },
    #     }
    # },
    # 'aii-infl-prep-alt':{
    #     'heading': 'Object Pronoun',
    #     'heading_2': ['base form', 'variant form'],
    #     'omit': {
    #         "heading", "base", 'variant',
    #     },
    #     'template': {
    #         'me': {
    #             'base-1s': None,
    #             'variant-1s': None,
    #         },
    #         'us': {
    #             'base-1p': None,
    #             'variant-1p': None,
    #         },
    #         'you (to a man)': {
    #             'base-2m': None,
    #             'variant-2m': None,
    #         },
    #         'you (to a woman)': {
    #             'base-2f': None,
    #             'variant-2f': None,
    #         },
    #         'you (to a group)': {
    #             'base-2p': None,
    #             'variant-2p': None,
    #         },
    #         'him': {
    #             'base-3m': None,
    #             'variant-3m': None,
    #         },
    #         'her': {
    #             'base-3f': None,
    #             'variant-3f': None,
    #         },
    #         'them': {
    #             'base-3p': None,
    #             'variant-3p': None,
    #         },
    #     }
    # },
}

# https://en.wiktionary.org/wiki/Module:aii-headword
# per Module:aii-headword args[2] is the positional param for "g" (gender)

ht_schema_omit = {
    'aii-root': {},
    "head": {},
}

ht_schema = {
    "aii-adjective": {
        'omit': { "1", "head", "tr" },
        'forms': {
            "f",
            "fpl",
            "head2",
            "mpl",
            "pl",
        },
        'genders': set(),
    },
    "aii-adverb": {
        'omit': {
            "1", "head", "tr"
        },
        'forms': {
            "head2",
            "head3",
        },
        'genders': set(),
    },
    "aii-conjunction": {
        'omit': { "1" },
        'forms': set(),
        'genders': set(),
    },
    "aii-interj": {
        'omit': { "1", "head", "tr" },
        'forms': {"f", "fs", "ms", "pl"},
        'genders': { "g" },    
    },
    "aii-noun": {
        'omit': {
            "1",
            "head",                
            "pltr",
            "tr",
        },
        'forms': {
            "head2",
            "m", "m2",
            "f", "f2",
            "pl", "pl2", "pl3","pl4", "pl5"
        },
        'genders': {
            "2", "g", "g2"
        }
    },
    "aii-noun form": {
        'omit': { "1" },
        'forms': set(),
        'genders': set(),
    },
    "aii-numeral": {
        'omit': { "1" },
        'forms': {"cstr", "f", "head2", "m", "pl"},
        'genders': {"2", "g"},
    },
    "aii-particle": {
        'omit': { "1" },
        'forms': {"head2", "head3", "head4"},
        'genders': set(),
    },
    "aii-past participle": {
        'omit': { "1", "head" },
        'forms': {"f", "pl"},
        'genders': set(),
    },
    "aii-phrase": {
        'omit': { "1", "head", "tr" },
        'forms': set(),
        'genders': set(),
    },
    "aii-prep": {
        'omit': { "1", "head", "tr" },
        'forms': { "head2" },
        'genders': set(),
    },
    "aii-present participle": {
        'omit': { "1" },
        'forms': set(),
        'genders': set(),
    },
    "aii-pronoun": {
        'omit': { "1", "head", "tr" },
        'forms': {"f", "head2", "pl", "ms", "fs", "m", "mpl", "fpl", "s"},
        'genders': {"g", "g2"},
    },
    "aii-proper noun": {
        'omit': { "1", "tr", "tr2" },
        'forms': { "head2" },
        'genders': {"2", "g", "g2"},
    },
    "aii-suffix": {
        'omit': { "1" },
        'forms': {"f", "pl"},
        'genders': {"g"},
    },
    "aii-verb": {
        'omit': { "1", "head", "tr", "pptr", "prptr" },
        'forms': { "head2", "pp", "prp"},
        'genders': set(),
    },
}

# should be 1:1 relation between keys in gender_abbrev and forms_abbrev

gender_abbrev = {
    "aii-adjective": { },
    "aii-interj": {
        "m-s": 'when subject is a masculine noun',
        "f-s": 'when subject is a feminine noun',
        "p": 'when subject is a plural noun',
    },
    "aii-past participle": {},
    "aii-suffix": {
        "m-s": 'masculinizing',
    },
    "aii-verb": { },
    'default': {
        "m": 'masculine',
        "m-s": 'masculine',
        "m-p": 'plural masculine',
        "f": 'feminine',
        "f-s": 'feminine',
        "f-p": 'plural feminine',
        "mf": "masculine or feminine",
        "s": "singular",
        "p": "plural",
    }
}

def adj_wrap(gram_category):
    return f"describing a {gram_category} noun"

forms_abbrev = {
    "aii-adjective": {
        "f": adj_wrap('feminine'),
        "pl": adj_wrap('plural'),
        "head2": 'alternate',
        "fpl": adj_wrap('plural feminine'),
        "mpl": adj_wrap('plural masculine'),
    },
    "aii-interj": {
        "fs": 'when subject is a feminine noun',
        "f": 'when subject is a feminine noun',
        "ms": 'when subject is a masculine noun',
        "pl": 'when subject is a plural noun',
    },
    "aii-past participle": {
        "f": adj_wrap('feminine'),
        "pl": adj_wrap('plural'),
    },
    "aii-suffix": {
        "f": 'feminizing',
        "pl": 'pluralizing',
    },
    "aii-verb": {
        "head2": 'alternate',
        "pp": 'past participle',
        "prp": 'present participle'
    },
    'default': {
        "head2": 'alternate',
        "head3": '2nd alternate',
        "head4": '3rd alternate',

        "m": 'masculine',
        "ms": 'masculine',
        "m2": 'masculine (alternate)',
        "mpl": 'plural masculine',

        "f": 'feminine',
        "fs": 'feminine',
        "f2": 'feminine (alternate)',
        "fpl": 'plural feminine',

        "s": 'singular',

        "pl": 'plural',
        "pl2": 'plural (alternate)',
        "pl3": 'plural (2nd alternate)',
        "pl4": 'plural (3rd alternate)',
        "pl5": 'plural (4th alternate)',

        "cstr": 'construct',
    }

}

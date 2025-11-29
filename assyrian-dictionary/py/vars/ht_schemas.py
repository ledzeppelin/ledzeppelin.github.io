# https://en.wiktionary.org/wiki/Module:aii-headword
# per Module:aii-headword args[2] is the positional param for "g" (gender)

ht_schema_omit = {
    'aii-root': {},
    "head": {},
}

def adj_wrap(gram_category):
    return f"describing {gram_category} noun"

# when resolving issues from uptaking new dictionary
# 1. add missing value to either 'forms' or 'genders' set
#    ex. "2", "g", "g2" go to genders
#    but others go to forms
# 2. if needed, add abbreviation to gender_abbrev or forms_abbrev
#    ex. check if ht name is default or not, then add

ht_schema = {
    "aii-adjective": {
        'omit': { "1", "head", "tr", "tr2" },
        'forms': {
            "f",
            "fpl",
            "head2",
            "mpl",
            "pl",
        },
        'genders': set(),
        'default_gender': adj_wrap('masculine')
    },
    "aii-adverb": {
        'omit': {
            "1", "head", "tr", "tr2" 
        },
        'forms': {
            "head2",
            "head3",
        },
        'genders': set(),
    },
    "aii-conjunction": {
        'omit': { "1", "tr" },
        'forms': set(),
        'genders': set(),
    },
    "aii-interj": {
        'omit': { "1", "head", "tr", 'ftr', 'pltr' },
        'forms': {"f", "fs", "ms", "pl"},
        'genders': { "g" },    
    },
    "aii-noun": {
        'omit': {
            "1",
            "head",                
            "pltr",
            "tr",
            "tr2",
        },
        'forms': {
            "head2",
            "head3",
            "m", "m2",
            "f", "f2",
            "pl", "pl2", "pl3", "pl4", "pl5", "pl6"
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
        'forms': {"cstr", "f", "head2", "m", "pl", "pl2"},
        'genders': {"2", "g"},
    },
    "aii-particle": {
        'omit': { "1" },
        'forms': {"head2", "head3", "head4"},
        'genders': set(),
    },
    "aii-past-participle": {
        'omit': { "1", "head" },
        'forms': {"f", "pl"},
        'genders': set(),
        'default_gender': adj_wrap('masculine'),
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
    "aii-prefix": {
        'omit': { "1" },
        'forms': set(),
        'genders': set(),
    },
    "aii-present-participle": {
        'omit': { "1" },
        'forms': set(),
        'genders': set(),
    },
    "aii-pronoun": {
        'omit': { "1", "head", "tr", "tr2" },
        'forms': {"f", "head2", "pl", "ms", "fs", "m", "mpl", "fpl", "s"},
        'genders': {"2", "g", "g2"},
    },
    "aii-proper-noun": {
        'omit': { "1", "tr", "tr2", "head" },
        'forms': { "head2" },
        'genders': {"2", "g", "g2"},
    },
    "aii-suffix": {
        'omit': { "1" },
        'forms': {"f", "pl", "pl2", "pl3"},
        'genders': {"g"},
    },
    "aii-verb": {
        'omit': { "1"},
        'forms': { "head2"},
        'genders': set(),
    },
}

# should be 1:1 relation between keys in gender_abbrev and forms_abbrev

gender_abbrev = {
    "aii-adjective": { },
    "aii-interj": {
        "m": 'for masculine noun',
        "m-s": 'for masculine noun',
        "f-s": 'for feminine noun',
        "p": 'for plural noun',
    },
    "aii-past-participle": {},
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

forms_abbrev = {
    "aii-adjective": {
        "f": adj_wrap('feminine'),
        "pl": adj_wrap('plural'),
        "head2": 'alternate',
        "fpl": adj_wrap('plural feminine'),
        "mpl": adj_wrap('plural masculine'),
    },
    "aii-interj": {
        "fs": 'for feminine noun',
        "f": 'for feminine noun',
        "ms": 'for masculine noun',
        "pl": 'for plural noun',
    },
    "aii-past-participle": {
        "f": adj_wrap('feminine'),
        "pl": adj_wrap('plural'),
    },
    "aii-suffix": {
        "f": 'feminizing',
        "pl": 'pluralizing',
        "pl2": 'pluralizing (alternate)',
        "pl3": 'pluralizing (2nd alternate)',
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
        "pl6": 'plural (5th alternate)',

        "cstr": 'construct',
    }

}

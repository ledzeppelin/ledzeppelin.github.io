pos_abbrev = {
  'adj': 'adjective',
  'adv': 'adverb',
  'article': 'article',
  'character': 'character',
  'conj': 'conjunction',
  'det': 'determiner',
  'intj': 'interjection',
  'name': 'name',
  'noun': 'noun',
  'num': 'numeral',
  'particle': 'particle',
  'phrase': 'phrase',
  'prefix': 'prefix',
  'prep': 'preposition',
  'pron': 'pronoun',
  'suffix': 'suffix',
  'verb': 'verb',
}

language_codes = {
  # https://en.wiktionary.org/wiki/Wiktionary:List_of_languages
  'acm': 'Iraqi Arabic',
  'ae': 'Avestan',
  'afa-pro': 'Proto-Afroasiatic',
  'afb': 'Gulf Arabic',
  'ajp': 'South Levantine Arabic',
  'akk': 'Akkadian',
  'akk-lbb': 'Late Babylonian',
  'am': 'Amharic',
  'apc': 'North Levantine Arabic',
  'ar': 'Arabic',
  'arc': 'Aramaic',
  'arc-cpa': 'Christian Palestinian Aramaic',
  'arc-imp': 'Imperial Aramaic',
  'arz': 'Egyptian Arabic',
  'az': 'Azerbaijani',
  'ber': 'Berber',
  'bn': 'Bengali',
  'bo': 'Tibetan',
  'ckb': 'Central Kurdish',
  'de': 'German',
  'egy': 'Egyptian',
  'el': 'Greek',
  'elx': 'Elamite',
  'en': 'English',
  'enm': 'Middle English',
  'es': 'Spanish',
  'eu': 'Basque',
  'fa': 'Persian',
  'fa-cls': 'Classical Persian',
  'fr': 'French',
  'fro': 'Old French',
  'gbz': 'Zoroastrian Dari',
  'gez': "Ge'ez",
  'gkm': 'Byzantine Greek',
  'grc': 'Ancient Greek',
  'hbo': 'Biblical Hebrew',
  'he': 'Hebrew',
  'he-IL': 'Israeli Hebrew',
  'he-mis': 'Mishnaic Hebrew',
  'hi': 'Hindi',
  'hit': 'Hittite',
  'hu': 'Hungarian',
  'hy': 'Armenian',
  'iir': 'Indo-Iranian',
  'iir-pro': 'Proto-Indo-Iranian',
  'inm': 'Minaean',
  'inc': 'Indo-Aryan',
  'ine-pro': 'Proto-Indo-European',
  'ira': 'Iranian',
  'ira-mid': 'Middle Iranian',
  'ira-old': 'Old Iranian',
  'ira-pro': 'Proto-Iranian',
  'it': 'Italian',
  'ja': 'Japanese',
  'jpa': 'Jewish Palestinian Aramaic',
  'ka': 'Georgian',
  'kmr': 'Northern Kurdish',
  'ko': 'Korean',
  'la': 'Latin',
  'lez': 'Lezgi',
  'lhs': 'Mlahsö',
  'lsd': 'Lishana Deni',
  'ltc': 'Middle Chinese',
  'mid': 'Mandaic',
  'ml': 'Malayalam',
  'ML.': 'Medieval Latin',
  'ms': 'Malay Jepang',
  'mt': 'Maltese',
  'myz': 'Classical Mandaic',
  'nah': 'Nahuatl',
  'nan': 'Min Nan',
  'nan-hbl': 'Hokkien',
  'ne': 'Nepali',
  'nl': 'Dutch',
  'non': 'Old Norse',
  'och': 'Old Chinese',
  'osp': 'Old Spanish',
  'ota': 'Ottoman Turkish',
  'pal': 'Middle Persian',
  'peo': 'Old Persian',
  'phn': 'Phoenician',
  "pl": 'Polish',
  'pra-sau': 'Sauraseni Prakrit',
  'pt': 'Portuguese',
  'qfa-sub': 'substrate',
  'ru': 'Russian',
  'sa': 'Sanskrit',
  'sem': 'Semitic',
  'sem-pro': 'Proto-Semitic',
  'sem-saf': 'Safaitic',
  'sem-srb': 'Old South Arabian',
  'sem-wes-pro': 'Proto-West Semitic',
  'sh': 'Serbo-Croatian',
  'sla-pro': 'Proto-Slavic',
  'so': 'Somali',
  'sog': 'Sogdian',
  'sux': 'Sumerian',
  'sw': 'Swahili',
  'syc': 'Classical Syriac',
  'ti': 'Tigrinya',
  'tig': 'Tigre',
  'tmr': 'Jewish Babylonian Aramaic',
  'tr': 'Turkish',
  'trk-pro': 'Proto-Turkic',
  'tru': 'Turoyo',
  'tzm': 'Central Atlas Tamazight',
  'udi': 'Udi',
  'uga': 'Ugaritic',
  'ur': 'Urdu',
  'vi': 'Vietnamese',
  'xcl': 'Old Armenian',
  'xeb': 'Eblaite',
  'xme-old': 'Old Median',
  'xno': 'Anglo-Norman',
  'xpr': 'Parthian',
  'xpu': 'Punic',
  'yue': 'Cantonese',
  'zh': 'Chinese',
  'zhx': 'Sinitic',
}


linkage_types = {
  'alt_of': 'alternate',
  'antonyms': 'antonym',
  'coordinate_terms': 'coordinate term',
  'derived': 'derived term',
  'form_of': 'other form',
  'holonyms': 'holonym',
  'hypernyms': 'hypernym',
  'hyponyms': 'hyponym',
  'meronyms': 'meronym',
  'related': 'related term',
  'synonyms': 'synonym',
}

# `make datadump-diff` for etymology counters
#
# reference 2nd position of language code params
# https://en.wiktionary.org/wiki/Template:<ety-name>
# https://en.wiktionary.org/wiki/Category:Foreign_derivation_templates
derivation_templates = {
  'bor',
  'bor+',
  'cal',
  'calque',
  'der',
  'inh',
  'inh+',
  'lbor',
  'partial calque',
  'psm',
  'semantic loan',
  'sl',
  'slbor',
  'uder',
}

other_forms_from_ety_templates = {
  'af': 'affix',
  'affix': 'affix',
  'back-form': 'back formation',
  'blend': 'blend',
  'clipping': 'clipping',
  'cog': 'cognate',
  'com': 'compound',
  'compound': 'compound',
  'contraction': 'contraction',
  'doublet': 'doublet',
  'm': 'also',
  'l': 'also',
  'surf': 'apparent etymology',
  'univerbation': 'univerbation',
}

# pronouns from https://en.wiktionary.org/wiki/Template:aii-personal_pronouns
personal_pronouns = {
    "ܐܵܢܵܐ",
    "ܐܲܚܢܲܢ",
    "ܐܲܢ݇ܬ",
    "ܐܲܢ݇ܬܝ",
    "ܐܲܢ݇ܬܘܿܢ",
    "ܐܲܢ݇ܬܹܝܢ",
    "ܗ̇ܘ",
    "ܗ̇ܝ",
    "ܗܸܢܘܿܢ",
    "ܗܸܢܹܝܢ",
    "-ܝܼ",
    "-ܲܢ",
    "-ܘܼܟ݂",
    "-ܵܟ݂ܝ",
    "-ܵܘܟ݂ܘܿܢ",
    "-ܹܗ",
    "-ܘܼܗܝ",
    "-ܵܗ̇",
    "-ܘܿܗ̇",
    "-ܗܘܿܢ",
}

attached_pronouns = {
    "-ܝ ܼ", # incorrect form
    # "-ܝܼ", # correct form
    "-ܲܢ",
    "-ܘܼܟ݂",
    "-ܵܟ݂ܝ",
    "-ܵܘܟ݂ܘܿܢ",
    "-ܹܗ",
    "-ܘܼܗܝ",
    "-ܵܗ̇",
    "-ܘܿܗ̇",
    "-ܗܘܿܢ"
}

subject_pronouns = {
    "ܐܵܢܵܐ",
    "ܐܲܚܢܲܢ",
    "ܐܲܢ݇ܬ",
    "ܐܲܢ݇ܬܝ",
    "ܐܲܚܬܘܿܢ",
    "ܗ̇ܘ",
    "ܗ̇ܝ",
    "ܐܵܢܝܼ",
}

aii_alphabet = [
    "ܐܵܠܲܦ",  # ālap
    "ܒܹܝܬ݂",  # bēṯ
    "ܓܵܡܲܠ",  # gāmal
    "ܕܵܠܲܬ݂",  # dālaṯ
    "ܗܹܐ",    # hē
    "ܘܲܘ",    # waw
    "ܙܹܝܢ",   # zēn
    "ܚܹܝܬ݂",  # ḥēṯ
    "ܛܹܝܬ݂",  # ṭēṯ
    "ܝܘܿܕ݂",  # yōḏ
    "ܟܵܦ",    # kāp
    "ܠܵܡܲܕ݂", # lāmaḏ
    "ܡܝܼܡ",   # mīm
    "ܢܘܼܢ",   # nūn
    "ܣܸܡܟܲܬ݂", # simkaṯ
    "ܥܹܐ",    # ˁē
    "ܦܹܐ",    # pē
    "ܨܵܕ݂ܹܐ", # ṣāḏē
    "ܩܘܿܦ",   # qōp
    "ܪܹܝܫ",   # rēš
    "ܫܝܼܢ",   # šīn
    "ܬܵܘ"     # tāw
]

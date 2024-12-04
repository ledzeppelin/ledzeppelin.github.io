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
  'root': 'root',
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
  'arc-imp': 'Imperial Aramaic',
  'arz': 'Egyptian Arabic',
  'az': 'Azerbaijani',
  'ber': 'Berber',
  'bn': 'Bengali',
  'bo': 'Tibetan',
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
  'pra-sau': 'Sauraseni Prakrit',
  'pt': 'Portuguese',
  'ru': 'Russian',
  'sa': 'Sanskrit',
  'sem': 'Semitic',
  'sem-pro': 'Proto-Semitic',
  'sem-saf': 'Safaitic',
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

// This is a js port of https://en.wiktionary.org/w/index.php?title=Module:tru-translit

function truTranslit(truText) {
  const RBASA_BELOW = '\u{0737}';
  const PTHAHA_BELOW = '\u{0731}';
  const RBASA = '\u{0736}';
  const ZQAPHA = '\u{0733}';
  const PTHAHA = '\u{0730}';
  const vowelCaptureGroup = `([${RBASA_BELOW}${PTHAHA_BELOW}${RBASA}${ZQAPHA}${PTHAHA}])`;

  const COMBINING_DIAERESIS = '\u{0308}';
  const COMBINING_TILDE_BELOW = '\u{0330}';
  const QUSHSHAYA = '\u{0741}';
  const RUKKAKHA = '\u{0742}';

  const ttTransposePunc = {
    '“': '”',
    '”': '“',
    '‘': '’',
    '’': '‘',
    '؟': '?', // question mark
    '«': '“', // quotation mark
    '»': '”', // quotation mark
    '،': ',', // comma
    '؛': ';', // semicolon
    // skewed colons from https://r12a.github.io/scripts/syrc/tru.html#phrase
    '܇': ',',
    '܆': ';',
  };
  const ttTransposePuncKeys = Object.keys(ttTransposePunc).join('');
  const ttTransposePuncKeysCapture = `([${ttTransposePuncKeys}])`;

  const fixes = [
    [`${vowelCaptureGroup}${QUSHSHAYA}`, `${QUSHSHAYA}$1`],
    [`${vowelCaptureGroup}${RUKKAKHA}`, `${RUKKAKHA}$1`],
    [`${vowelCaptureGroup}${COMBINING_TILDE_BELOW}`, `${COMBINING_TILDE_BELOW}$1`],
    // partition punctuation marks so "starts with" and "ends with" substitutions work
    [`([${ttTransposePuncKeys}()!.:"'])`, '#$1#'],
  ];

  const tt = {
    ܦ: 'f',
    ܒ: 'b',
    ܬ: 't',
    ܛ: 'ṭ',
    ܕ: 'd',
    ܟ: 'k',
    ܓ: 'g',
    ܩ: 'q',
    ܔ: 'j',
    ܣ: 's',
    ܨ: 'ṣ',
    ܙ: 'z',
    ܫ: 'š',
    ܚ: 'ḥ',
    ܥ: 'c',
    ܗ: 'h',
    ܡ: 'm',
    ܢ: 'n',
    ܪ: 'r',
    ܠ: 'l',
  };
  const ttKeysCapture = `([${Object.keys(tt).join('')}])`;

  // for atypical romanizations see https://en.wiktionary.org/wiki/Wiktionary:Turoyo_transliteration
  const phoneticReplacements = {
    // consonants https://textbook.surayt.com/en/Level%20A/2.1?content-fragment-id=1747
    c: 3,
    č: 'ch',
    ḏ: 'th',
    ġ: 'gh',
    ḥ: 7,
    š: 'sh',
    ṣ: 's',
    ṭ: 't',
    ṯ: 'th',
    x: 'kh',
    ž: 'zh',
    // vowels https://textbook.surayt.com/en/Level%20A/2.2?content-fragment-id=1748
    // i: 'i',
    ë: 'e',
    ä: 'a',
  };
  const phoneticReplacementsKeysCapture = `([${Object.keys(phoneticReplacements).join('')}])`;

  // consonants representing vowels (matres lectionis) defined as constants so IDE reads
  // left-to-right more clearly
  const ALAPH = 'ܐ';
  const WAW = 'ܘ';
  const YUDH = 'ܝ';

  const ttNext = {
    [WAW]: 'w',
    [YUDH]: 'y',

    [RBASA_BELOW]: 'ë',
    [PTHAHA_BELOW]: 'ä',
    [RBASA]: 'e',
    [ZQAPHA]: 'o',
    [PTHAHA]: 'a',
  };
  const ttNextKeysCapture = `([${Object.keys(ttNext).join('')}])`;

  const specialCases = [
    // [ matching_aii_text, latin_substitution ]
    //
    // # symbol pads the start and end of a word, consider the follow examples for matching_aii_text
    // #float#    only float matches
    // #float     words starting with float like float or floats match
    // float#     words ending with float like float or afloat match
    // float      words containing float like float, floats, afloat and refloats match
    ['ܡܳܪܝ#', 'mor#'],
  ];

  let text = truText;
  text = text.normalize('NFC');
  text = text.replaceAll(' | ', '# | #');
  text = `##${text.replaceAll(' ', '# #')}##`;
  text = text.replaceAll('ـ', '');
  text = text.replaceAll(COMBINING_DIAERESIS, '');

  let re;
  fixes.forEach((fix) => {
    re = new RegExp(fix[0], 'g');
    text = text.replaceAll(re, fix[1]);
  });

  specialCases.forEach((specialCase) => {
    text = text.replaceAll(specialCase[0], specialCase[1]);
  });

  text = text.replaceAll(`ܫ${COMBINING_TILDE_BELOW}`, 'č');
  text = text.replaceAll(`ܙ${COMBINING_TILDE_BELOW}`, 'ž');

  text = text.replaceAll(`ܦ${QUSHSHAYA}`, 'p');

  text = text.replaceAll(`ܒ${RUKKAKHA}`, 'v');
  text = text.replaceAll(`ܬ${RUKKAKHA}`, 'ṯ');
  text = text.replaceAll(`ܕ${RUKKAKHA}`, 'ḏ');
  text = text.replaceAll(`ܟ${RUKKAKHA}`, 'x');
  text = text.replaceAll(`ܓ${RUKKAKHA}`, 'ġ');

  re = new RegExp(ttTransposePuncKeysCapture, 'g');
  text = text.replaceAll(re, (match) => ttTransposePunc[match]);
  re = new RegExp(ttKeysCapture, 'g');
  text = text.replaceAll(re, (match) => tt[match]);

  const consonants = `fbtṭdkgqjsṣzšḥchmnrlvžpvṯḏxġ${YUDH}${WAW}`;
  const consonantsGroup = `([${consonants}])`;
  re = new RegExp(`${consonantsGroup}${WAW}${consonantsGroup}`, 'g');
  text = text.replaceAll(re, '$1u$2');
  re = new RegExp(`${consonantsGroup}${YUDH}${consonantsGroup}`, 'g');
  text = text.replaceAll(re, '$1i$2');

  re = new RegExp(`#${WAW}${consonantsGroup}`, 'g');
  text = text.replaceAll(re, '#u$1');
  re = new RegExp(`#${YUDH}${consonantsGroup}`, 'g');
  text = text.replaceAll(re, '#i$1');

  text = text.replaceAll(`${ALAPH}${PTHAHA}${WAW}#`, '#aw');
  text = text.replaceAll(`${ALAPH}${PTHAHA}${YUDH}#`, '#ay');

  text = text.replaceAll(`#${ALAPH}${WAW}`, '#u');
  text = text.replaceAll(`#${ALAPH}${YUDH}`, '#i');

  text = text.replaceAll(`${WAW}#`, 'u#');
  text = text.replaceAll(`${YUDH}#`, 'i#');

  text = text.replaceAll(`${PTHAHA}${ALAPH}#`, 'a#');
  text = text.replaceAll(`${RBASA}${ALAPH}#`, 'e#');
  text = text.replaceAll(`${ZQAPHA}${ALAPH}#`, 'o#');
  text = text.replaceAll(`${ALAPH}#`, 'o#');
  text = text.replaceAll(ALAPH, '');

  re = new RegExp(ttNextKeysCapture, 'g');
  text = text.replaceAll(re, (match) => ttNext[match]);

  // remove consecutive duplicate characters
  text = text.replaceAll(/([cḥšṯx])\1+/g, '$1');

  text = text.replaceAll('#', '');

  // adding phonetic support
  re = new RegExp(phoneticReplacementsKeysCapture, 'g');
  const phonetic = text.replaceAll(re, (match) => phoneticReplacements[match]);

  return { latin: text, phonetic };
}

// this allows use to run code in a Node context and also browser-side js
if (typeof module === 'object') {
  module.exports = {
    truTranslit,
  };
}

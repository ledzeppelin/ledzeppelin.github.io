// Started as a js port of https://en.wiktionary.org/w/index.php?title=Module:aii-translit
// but now has diverged

function aiiTranslit(aiiText) {
  const HBASA = '\u{073C}';
  const RWAHA = '\u{073F}';
  const ZLAMA_ANGULAR = '\u{0739}';
  const ZLAMA_HORIZONTAL = '\u{0738}';
  const PTHAHA = '\u{0732}';
  const ZQAPHA = '\u{0735}';

  const diacriticVowels = `${HBASA}${RWAHA}${ZLAMA_ANGULAR}${ZLAMA_HORIZONTAL}${PTHAHA}${ZQAPHA}`;
  const diacriticVowelsCapture = `([${diacriticVowels}])`;

  const TALQANA_ABOVE = '\u{0747}';
  const COMBINING_DIAERESIS = '\u{0308}';

  // consonants representing vowels (matres lectionis) defined as constants so IDE reads
  // left-to-right more clearly
  const ALAPH = 'ܐ';
  const SUPERSCRIPT_ALAPH = '\u{0711}';
  const WAW = 'ܘ';
  const YUDH = 'ܝ';

  const COMBINING_TILDE_BELOW = '\u{0330}';
  const COMBINING_TILDE_ABOVE = '\u{0303}';
  const COMBINING_MACRON_BELOW = '\u{0331}';
  const COMBINING_MACRON = '\u{0304}';
  const QUSHSHAYA = '\u{0741}';
  const RUKKAKHA = '\u{0742}';
  const COMBINING_BREVE_BELOW = '\u{032E}';
  const NON_VOWEL_DIACRITICS = `${COMBINING_TILDE_BELOW}${COMBINING_TILDE_ABOVE}${QUSHSHAYA}${RUKKAKHA}${COMBINING_BREVE_BELOW}${TALQANA_ABOVE}`;

  const COMBINING_DOT_BELOW = '\u{0323}';
  const COMBINING_DOT_ABOVE = '\u{0307}';

  const GLOTTAL_STOP = 'ʾ';
  const PHARYNGEAL = 'ʿ';

  // constants for transliterated snippets which are used in later substitutions
  const TR_THIRD_PERSON_FEM_SUFFIX = 'oh';
  const TR_WAW_PLUS_RVASA = 'u';

  const tt = {
    ܦ: 'p',
    ܒ: 'b',
    ܬ: 't',
    ܛ: 'ṭ',
    ܕ: 'd',
    ܟ: 'k',
    ܓ: 'g',
    ܩ: 'q',
    ܣ: 's',
    ܨ: 'ṣ',
    ܙ: 'z',
    ܫ: 'š',
    ܚ: 'ḥ',
    ܥ: PHARYNGEAL,
    ܗ: 'h',
    ܡ: 'm',
    ܢ: 'n',
    ܪ: 'r',
    ܠ: 'l',
  };
  const consonants = Object.keys(tt).join('');
  const consonantsCapture = `([${consonants}])`;
  const ttValues = Object.values(tt).join('');

  const mhagjana = [...'ܗܠܡܢܥܪ'].map((char) => tt[char]).join('') + ALAPH + YUDH + WAW;
  const mhagjanaCapture = `([${mhagjana}])`;

  const marhetana = [...'ܦܒܬܛܕܟܓܩܣܨܙܫܚ'].map((char) => tt[char]).join('');
  const marhetanaCapture = `([${marhetana}])`;

  // https://r12a.github.io/scripts/syrc/aii.html#single_letter_words
  const bdul = 'ܒܕܘܠ';
  const bdulCapture = `([${bdul}])`;
  const bdulCapture2 = `([${bdul}])([${bdul}])`;

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
  };
  const ttTransposePuncKeys = Object.keys(ttTransposePunc).join('');
  const ttTransposePuncKeysCapture = `([${ttTransposePuncKeys}])`;

  const ttNext = {
    [WAW]: 'w',
    [YUDH]: 'y',

    [ZLAMA_ANGULAR]: 'ē',
    [ZLAMA_HORIZONTAL]: 'i',
    [PTHAHA]: 'a',
    [ZQAPHA]: 'ā',
  };
  const ttNextKeysCapture = `([${Object.keys(ttNext).join('')}])`;

  const phoneticReplacements = {
    ṭ: 't',
    ṣ: 's',
    š: 'sh',
    ḥ: 'kh',
    ž: 'zh',
    ḇ: 'v',
    ṯ: 'th',
    ḏ: 'd',
    ḵ: 'kh',
    ḡ: 'gh',
    ē: 'e', // 'eh' sound
    // ì: 'zzz',
    ī: 'ee',
    ā: 'a',
    [PHARYNGEAL]: '`',
    [GLOTTAL_STOP]: "'",
    č: 'ch',
  };
  const phoneticReplacementsKeysCapture = `([${Object.keys(phoneticReplacements).join('')}])`;

  const glides = `${ALAPH}${YUDH}${WAW}`; // unvoweled, original values of matres lectionis (consonants representing vowels)
  const consonantsMinusGlides = `${ttValues}čjžfḇṯḏḵḡ`;

  const lettersCapture = `([${glides}${consonantsMinusGlides}])`;
  const lettersNonCapture = `(?:[${glides}${consonantsMinusGlides}])`;
  const consonantsWawYudhCapture = `([${WAW}${YUDH}${consonantsMinusGlides}])`;
  const vowelsW = `${TR_WAW_PLUS_RVASA}o`;
  const vowelsY = 'eiēī';
  const vowels = `${vowelsW}${vowelsY}aā`;
  const consonantsAndVowelsCapture = `([${glides}${consonantsMinusGlides}${vowels}])`;

  const fixes = [
    [`${diacriticVowelsCapture}${QUSHSHAYA}`, `${QUSHSHAYA}$1`],
    // partition punctuation marks so "starts with" and "ends with" substitutions work
    [`([${ttTransposePuncKeys}()!.:"'])`, '#$1#'],
  ];

  const specialCases = [
    // [ matching_aii_text, latin_substitution ]
    //
    // # symbol pads the start and end of a word, consider the follow examples for matching_aii_text
    // #float#    only float matches
    // #float     words starting with float like float or floats match
    // float#     words ending with float like float or afloat match
    // float      words containing float like float, floats, afloat and refloats match

    // bdwl prefix for some words starting with yudh+kwasa
    ['ܝܼܗܘܼܕ', 'īhud'],
    ['ܝܼܚܝܼܕܵܝܵܐ', 'īḥīdāyā'],
    ['ܝܼܣܲܪ', 'īsar'],
    ['ܝܼܠܝܼܕܘܼܬܵܐ', 'īlidutā'],
    ['ܝܼܕܵܥ', 'īdāʿ'],
    //

    [`#ܒܗ${COMBINING_DOT_ABOVE}ܝ#`, '#b-ay#'],
    [`ܗ${COMBINING_DOT_ABOVE}ܝ#`, 'aya#'],
    [`ܗ${COMBINING_DOT_ABOVE}ܘ#`, 'awa#'],
    [`ܡ${COMBINING_DOT_ABOVE}ܢ#`, 'man#'],
    [`ܡ${COMBINING_DOT_BELOW}ܢ#`, 'min#'],
    ['ܒܵܬܹܐ#', 'bāttē#'],
    ['ܟ̰ܵܐܝ', 'čāy'],
    ['ܒܵܐܝ', 'bāy'],
    ['ܐܲܦ̮ܘܿܟܵܕ', 'avokād'],
    ['ܝܼܫܘܿܥ#', 'īšoʿ#'], // starts with vowel but not silent alaph
    ['ܢܲܦ̮ܫ', 'noš'],
    ['ܘܼܦ̮', 'ܘܼ'], // pe + breve below should be silent if preceeded by waw+hbasa
    ['ܕܝܼܢܵܐ#', 'dīnā#'], // otherwise d-īnā
    // "to be" without inital khwasa, ì
    ['#ܝܘܸܢ#', '#ìwen#'], ['#ܝܘܵܢ#', '#ìwān#'],
    ['#ܝܘܲܚ#', '#ìwaḥ#'], ['#ܝܘܸܬ#', '#ìwet#'],
    ['#ܝܘܵܬܝ#', '#ìwāt#'], ['#ܝܬܘܿܢ#', '#ìton#'],
    ['#ܝܠܹܗ#', '#ìlēh#'], ['#ܝܠܵܗ̇#', '#ìlāh#'],
    ['#ܝܢܵܐ#', '#ìnā#'], ['#ܝܗ݇ܘܵܐ#', '#ìwā#'],
    ['#ܝܗ݇ܘܵܬ݇#', '#ìwā#'], ['#ܝܗ݇ܘܵܘ#', '#ìwā#'],
    // "to be" with inital khwasa, ī
    ['ܝܼܘܸܢ#', 'īwen#'], ['ܝܼܘܵܢ', 'īwān'],
    ['ܝܼܘܸܬ#', 'īwet#'], ['ܝܼܘܵܬܝ#', 'īwāt#'],
    ['ܝܼܠܹܗ#', 'īlēh#'], ['ܝܼܠܵܗ̇#', 'īlāh#'],
    ['ܝܼܘܲܚ#', 'īwaḥ#'], ['ܝܼܬܘܿܢ#', 'īton#'], ['ܝܼܢܵܐ#', 'īnā#'],
    // "to be" blends
    ['ܝܼܗ݇ܘܵܐ#', 'īwā#'], ['ܝܼܗ݇ܘܵܘ#', 'īwā#'],
    // "to be" imperative forms
    // following substitutions starting with '#w' are to pre-empt 'w-' prefixing rule
    ['#ܗ݇ܘܝܼ', '#wī'], ['#ܗ݇ܘܹܝܡܘܼܢ#', '#wēmun#'],
    // "to be" past particles
    ['#ܗ݇ܘܵܐ#', '#wā#'],
    ['#ܗ݇ܘܵܘ#', '#wā#'],
    ['#ܗ݇ܘܹܐ#', '#wē#'],
    // "all", "each", "every"
    ['ܟܠ#', 'kul#'], ['ܟܠܵܢ#', 'kullān#'],
    ['ܟܠܘܼܟ݂#', 'kulloḵ#'], ['ܟܠܵܟ݂ܝ#', 'kullāḵ#'],
    ['ܟܠܹܗ#', 'kullēh#'], ['ܟܠܵܗ̇#', 'kullāh#'],
    ['ܟܠܘܼܗܝ#', 'kulluh#'], ['ܟܠܘܿܗ̇#', 'kulloh#'],
    ['ܟܠܲܢ#', 'kullan#'], ['ܟܠܵܘܟ݂ܘܿܢ#', 'kullāwḵon#'], ['ܟܠܲܘܟ݂ܘܿܢ#', 'kullāwḵon#'],
    ['ܟܠܵܝܗܝ#', 'kullāyh#'], ['ܟܠܗܘܿܢ#', 'kullhon#'],
    ['ܟܠܵܢܵܐܝܼܬ#', 'kullānāʾīt#'], ['ܟܠܵܢܵܐܝܼܬ݂#', 'kullānāʾīṯ#'],
    ['ܟܠܵܢܵܝ', 'kullānāy'], ['ܟܘܿܠܵܝ', 'kollāy'],
    ['ܟܠܚܲܕ݇#', 'kulḥa#'], ['ܟܠܚܕ݂ܵܐ#', 'kulḥḏā#'],
    ['ܟܠܫܲܢ݇ܬ#', 'kulšat#'],
    // popular slang terms
    ['ܝܲܐܠܵܗ#', 'yallāh#'], ['ܘܲܐܠܵܗ#', 'wallāh#'],
    // feminine imperative forms
    ['ܙܹܠ݇ܝ#', 'zē#'], ['ܬܵܐܝ#', 'tā#'],
  ];

  let text = aiiText;
  text = text.normalize('NFC');
  text = text.replaceAll(' | ', '# | #');
  text = `##${text.replaceAll(' ', '# #')}##`;
  text = text.replaceAll('ـ', '');
  text = text.replaceAll(COMBINING_DIAERESIS, '');
  text = text.replaceAll(SUPERSCRIPT_ALAPH, '');

  let re;
  fixes.forEach((fix) => {
    re = new RegExp(fix[0], 'g');
    text = text.replaceAll(re, fix[1]);
  });

  specialCases.forEach((specialCase) => {
    text = text.replaceAll(specialCase[0], specialCase[1]);
  });

  // urmian pronunciation for g-stem imperatives where 3rd radical is ܥ
  const eConj = [
    'ܥ',
    'ܥܝ',
    `ܥܡܘ${HBASA}ܢ`,
  ];

  re = new RegExp(`([${consonants}${YUDH}][${NON_VOWEL_DIACRITICS}]?[${consonants}][${NON_VOWEL_DIACRITICS}]?)${ZLAMA_ANGULAR}(${eConj.join('|')})#`, 'g');
  text = text.replaceAll(re, `$1${YUDH}${HBASA}$2#`);

  // in urmian, verbs ending in ܪ follow a past tense contraction of mir leh -> mirreh, not meereh
  // yudh+kwasa, though not sandwiched between voweless atwateh, should be <i>, not <ī>
  const rConj = [
    `${ZQAPHA}ܟ${RUKKAKHA}${YUDH}`, // 2nd person, female
    `${ZLAMA_ANGULAR}ܗ`, // 3rd person, male
    `${ZQAPHA}ܗ${COMBINING_DOT_ABOVE}`, // 3rd person, female
    `${PTHAHA}ܢ`, // 1st person, plural
    `${ZQAPHA}${WAW}ܟ${RUKKAKHA}${WAW}${RWAHA}ܢ`, // 2nd person, plural
  ];

  re = new RegExp(`${YUDH}${HBASA}ܪ(${rConj.join('|')})#`, 'g');
  text = text.replaceAll(re, `${ZLAMA_HORIZONTAL}ܪ$1#`);

  text = text.replaceAll(`ܟ${COMBINING_TILDE_BELOW}`, 'č');
  text = text.replaceAll(`ܓ${COMBINING_TILDE_BELOW}`, 'j');
  text = text.replaceAll(`ܫ${COMBINING_TILDE_BELOW}`, 'ž');

  text = text.replaceAll(`ܙ${COMBINING_TILDE_ABOVE}`, 'ž');
  text = text.replaceAll(`ܟ${COMBINING_TILDE_ABOVE}`, 'č');
  text = text.replaceAll(`ܫ${COMBINING_TILDE_ABOVE}`, 'ž');

  text = text.replaceAll(`ܦ${COMBINING_BREVE_BELOW}`, 'f');

  text = text.replaceAll(`ܦ${QUSHSHAYA}`, 'p');
  text = text.replaceAll(`ܒ${QUSHSHAYA}`, 'b');
  text = text.replaceAll(`ܬ${QUSHSHAYA}`, 't');
  text = text.replaceAll(`ܕ${QUSHSHAYA}`, 'd');
  text = text.replaceAll(`ܟ${QUSHSHAYA}`, 'k');
  text = text.replaceAll(`ܓ${QUSHSHAYA}`, 'g');

  text = text.replaceAll(`ܒ${RUKKAKHA}`, 'ḇ');
  text = text.replaceAll(`ܬ${RUKKAKHA}`, 'ṯ');
  text = text.replaceAll(`ܕ${RUKKAKHA}`, 'ḏ');
  text = text.replaceAll(`ܟ${RUKKAKHA}`, 'ḵ');
  text = text.replaceAll(`ܓ${RUKKAKHA}`, 'ḡ');

  // this covers b-, d-, w-, l- prefixing for words starting with an alaph
  // https://r12a.github.io/scripts/syrc/aii.html#standalone
  // and ALL special_cases starting with initialTranslitChar

  const initialTranslitChar = 'aī'; // accounts for substituted special cases starting with vowel sound
  const initialCharCapture = `([${ALAPH}${initialTranslitChar}])`; // 'aī' accounts for substituted special cases
  re = new RegExp(`#${bdulCapture2}${initialCharCapture}`, 'g');
  text = text.replaceAll(re, '#$1-$2-$3');
  re = new RegExp(`#${bdulCapture}${initialCharCapture}`, 'g');
  text = text.replaceAll(re, '#$1-$2');

  text = text.replaceAll(`${WAW}${HBASA}ܗ${COMBINING_DOT_ABOVE}#`, `${TR_THIRD_PERSON_FEM_SUFFIX}#`);

  text = text.replaceAll(`${YUDH}${HBASA}ܥ`, 'īܥ');
  text = text.replaceAll(`${YUDH}${HBASA}`, '⚹'); // ⚹ is placeholder for later substitution
  text = text.replaceAll(`${WAW}${RWAHA}`, 'o');
  text = text.replaceAll(`${WAW}${HBASA}`, TR_WAW_PLUS_RVASA);

  re = new RegExp(ttTransposePuncKeysCapture, 'g');
  text = text.replaceAll(re, (match) => ttTransposePunc[match]);

  re = new RegExp(consonantsCapture, 'g');
  text = text.replaceAll(re, (match) => tt[match]);

  text = text.replaceAll(`#${ALAPH}#`, `#${GLOTTAL_STOP}#`);

  re = new RegExp(`${lettersCapture}${mhagjanaCapture}${COMBINING_MACRON_BELOW}${lettersCapture}`, 'g');
  text = text.replaceAll(re, '$1e$2$3');

  re = new RegExp(`${lettersCapture}${marhetanaCapture}${COMBINING_MACRON}${lettersCapture}`, 'g');
  text = text.replaceAll(re, '$1$2e$3');

  re = new RegExp(`${lettersNonCapture}${TALQANA_ABOVE}`, 'g');
  text = text.replaceAll(re, '');

  // doubling consonants
  re = new RegExp(`([${ZLAMA_HORIZONTAL}${PTHAHA}])${lettersCapture}${diacriticVowelsCapture}`, 'g');
  text = text.replaceAll(re, '$1$2$2$3');
  re = new RegExp(`([${ZLAMA_HORIZONTAL}${PTHAHA}])${lettersCapture}${TR_WAW_PLUS_RVASA}${lettersCapture}${diacriticVowelsCapture}`, 'g');
  text = text.replaceAll(re, `$1$2$2${TR_WAW_PLUS_RVASA}$3$4`);
  re = new RegExp(`([${ZLAMA_HORIZONTAL}${PTHAHA}])${lettersCapture}${TR_THIRD_PERSON_FEM_SUFFIX}`, 'g');
  text = text.replaceAll(re, `$1$2$2${TR_THIRD_PERSON_FEM_SUFFIX}`);
  //

  text = text.replaceAll(COMBINING_DOT_ABOVE, '');

  // yudh+khwasa sandwiched between voweless atwateh should sound like [ɪ], <i> not [i], <ī>
  // last capture group could match # word boundary
  re = new RegExp(`${consonantsWawYudhCapture}⚹${lettersCapture}([^${diacriticVowels}])`, 'g');
  text = text.replaceAll(re, '$1i$2$3');
  text = text.replaceAll('⚹', 'ī');

  re = new RegExp(`${lettersCapture}${ZLAMA_ANGULAR}${YUDH}${lettersCapture}`, 'g');
  text = text.replaceAll(re, '$1ē$2');

  // bdwl for g-stems starting w/ yudh
  re = new RegExp(`#${bdulCapture}${YUDH}${lettersCapture}`, 'g');
  text = text.replaceAll(re, '#$1-$2');

  re = new RegExp(`${lettersCapture}${YUDH}${lettersCapture}`, 'g');
  text = text.replaceAll(re, '$1i$2');

  re = new RegExp(`([${consonantsMinusGlides}])${YUDH}#`, 'g');
  text = text.replaceAll(re, '$1#');

  text = text.replaceAll(`${ALAPH}${PTHAHA}${WAW}#`, 'aw#');
  text = text.replaceAll(`${ALAPH}${PTHAHA}${YUDH}#`, 'ay#');

  text = text.replaceAll(`#${ALAPH}${ZLAMA_ANGULAR}${YUDH}`, '#ē');
  text = text.replaceAll(`#${ALAPH}${YUDH}`, '#ī');

  re = new RegExp(`#${YUDH}${lettersCapture}`, 'g');
  text = text.replaceAll(re, '#$1');

  text = text.replaceAll(`${PTHAHA}${ALAPH}#`, 'a#');
  text = text.replaceAll(`${ZLAMA_ANGULAR}${ALAPH}#`, 'ē#');

  re = new RegExp(`${ZLAMA_HORIZONTAL}${ALAPH}(?:${YUDH})?#`, 'g');
  text = text.replaceAll(re, `i${GLOTTAL_STOP}#`);

  text = text.replaceAll(`${ZQAPHA}${ALAPH}#`, 'ā#');
  text = text.replaceAll(`${ALAPH}#`, 'ā#');
  text = text.replaceAll(`#${ALAPH}`, '#');
  text = text.replaceAll(ALAPH, GLOTTAL_STOP);

  re = new RegExp(`#${WAW}${consonantsAndVowelsCapture}`, 'g');
  text = text.replaceAll(re, '#w-$1');

  re = new RegExp(ttNextKeysCapture, 'g');
  text = text.replaceAll(re, (match) => ttNext[match]);

  re = new RegExp(`([ēīā])${GLOTTAL_STOP}${lettersCapture}`, 'g');
  text = text.replaceAll(re, '$1$2');

  re = new RegExp(`([${vowelsW}])([${vowels}])`, 'g');
  text = text.replaceAll(re, '$1w$2');
  re = new RegExp(`([${vowelsY}])([${vowels}])`, 'g');
  text = text.replaceAll(re, '$1y$2');

  // beth+rukkakha <ḇ> preceeded by pthaha <a> or zqapha <ā> and followed by consonant
  // sound that isn't <ḇ> should always be <w>, even in urmian
  re = new RegExp(`([aā])ḇ([${consonantsMinusGlides.replace('ḇ', '')}])`, 'g');
  text = text.replaceAll(re, '$1w$2');

  // beth+rukkakha preceeded by waw+rwaha and followed by consonant sound should be silenced
  re = new RegExp(`uḇ([${consonantsMinusGlides}])`, 'g');
  text = text.replaceAll(re, 'u$1');

  // remove consecutive duplicate characters
  re = new RegExp(`([${PHARYNGEAL}${GLOTTAL_STOP}āšyḥhčžj])\\1+`, 'g');
  text = text.replace(re, '$1');
  text = text.replaceAll(/([ḥčḡš])h/g, '$1');

  text = text.replaceAll(`-${GLOTTAL_STOP}`, '-');

  let phoneticText = text; // maintain word boundaries
  text = text.replaceAll('#', '');

  // ///////////////////////
  // adding phonetic support
  // ///////////////////////
  re = new RegExp(`ē([${PHARYNGEAL}${GLOTTAL_STOP}])`, 'g');
  phoneticText = phoneticText.replaceAll(re, 'eh$1');

  re = new RegExp(`([${PHARYNGEAL}${GLOTTAL_STOP}])ā#`, 'g');
  phoneticText = phoneticText.replaceAll(re, '$1ah#');

  phoneticText = phoneticText.replaceAll(/ē#/g, 'eh#');
  phoneticText = phoneticText.replaceAll(/uh#/g, 'oo#');

  phoneticText = phoneticText.replaceAll('#', '');

  // this is to support webapps which pad transliterated text with with start and end delimiters
  // for highlighting for "to be" without inital khwasa cases, see test cases
  const sDelimiter = ' ❋ '; // we use uncommon dingbat
  const eDelimiter = ' ❊ '; // we use uncommon dingbat
  [[sDelimiter, `-${sDelimiter}`], [eDelimiter, `${eDelimiter}-`]].forEach((delimGroup) => {
    const [delim, hypenTerm] = delimGroup;
    const nonCG1 = `(?:[ ]+)${delim}(?:[ ]*)`;
    const nonCG2 = `(?:[ ]*)${delim}(?:[ ]+)`;
    const nonCG = `(?:${nonCG1}|${nonCG2})`;
    re = new RegExp(`([${consonantsMinusGlides}${vowels}wy])${nonCG}ì`, 'g');
    phoneticText = phoneticText.replaceAll(re, `$1${hypenTerm}`);
  });

  re = new RegExp(`([${consonantsMinusGlides}${vowels}wy])(?:[ ]+)ì`, 'g'); // hyphen delimited "to be" suffix
  phoneticText = phoneticText.replaceAll(re, '$1-');

  // adding this for standalone copular "to be" haweh
  phoneticText = phoneticText.replaceAll('ì', '-');

  // No need to check if word starts with 'w-' for this replacement since the
  // only time we add hyphens is if the word starts with waw in the first place
  phoneticText = phoneticText
    .replaceAll('w-', 'oo-')
    .replaceAll('āyh', 'āy')
    .replaceAll('ayh', 'ay'); // ܕܒܹܝܠܲܝܗܝ dbēlay not dbēlayh

  re = new RegExp(phoneticReplacementsKeysCapture, 'g');
  phoneticText = phoneticText.replaceAll(re, (match) => phoneticReplacements[match]);

  return { latin: text, phonetic: phoneticText };
}

// this allows us to run code in a Node context and also browser-side js
if (typeof module === 'object') {
  module.exports = {
    aiiTranslit,
  };
}

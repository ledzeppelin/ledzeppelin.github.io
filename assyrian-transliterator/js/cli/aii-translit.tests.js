const {
  aiiTranslit,
} = require('../aii-translit');

function testTranslit() {
  const examples = [
    ['ܒܗ̇ܝ', 'b-ay'],
    ['ܒܲܝܬܵܐ', 'baytā'],
    ['ܒܲܝܬܝܼ', 'baytī'],
    ['ܒܲܝܬܵܟ݂ܝ', 'baytāḵ'],
    ['ܒܵܬܹ̈ܐ', 'bāttē'],
    ['ܒܲܝܬܘܵܬܹ̈ܐ', 'baytwātē'],
    ['ܒܲܝܬ̈ܘܵܬܗܘܿܢ', 'baytwāthon'],
    ['ܒܲܝܬܘܼܬܵܐ', 'baytutā'],
    ['ܝܵܠܘܿܦܵܐ', 'yālopā'],
    ['ܝܵܠܘܿܦܲܢ', 'yālopan'],
    ['ܝܵܠܘܿܦܬܵܐ', 'yāloptā'],
    ['ܩܲܕ݇ܡܵܝܵܐ', 'qammāyā'],
    ['ܚܲܡܫܲܥܣܲܪ', 'ḥamšaʿsar'],
    ['ܒܲܝܬ̈ܘܵܬܹܐ', 'baytwātē'],
    ['ܩܲܕ݇ܡܵܝܹ̈ܐ', 'qammāyē'],
    ['ܚܲܕ݇', 'ḥa'],
    ['ܚܵܕܹܐ', 'ḥādē'],
    ['ܚܕܵܐ', 'ḥdā'],
    ['ܚܕܵܝܵܐ', 'ḥdāyā'],
    ['ܚܸܕܝܵܐ', 'ḥidyā'],
    ['ܚܵܕܹܝܬܘܿܢ', 'ḥādēton'],
    ['ܝܵܠܦܹܢ', 'yālpēn'],
    ['ܝܠܝܼܦ ܠܝܼ', 'lip lī'],
    ['ܒܪܘܿܢܵܐ', 'bronā'],
    ['ܒܢܘܿܢܹ̈ܐ', 'bnonē'],
    ['ܒܪܵܬܵܐ', 'brātā'],
    ['ܒܢܵܬܹ̈ܐ', 'bnātē'],
    ['ܐ݇ܟ݂ܵܠ݇ܪܲܡܫܵܐ', 'ḵāramšā'],
    ['ܒܵܬܲܝ̈ ܡܘܼܣܵܝܵܐ', 'bātay musāyā'],
    ['ܦܲܪܨܘܿܦܵܐܝܼܬ', 'parṣopāʾīt'],
    ['ܕܲܪܵܓ݂ܬܵܐ ܗܵܘܵܝܬܵܐ', 'darrāḡtā hāwāytā'],
    ['ܐܝܼܪܝܼܚܘܿ', 'īriḥo'],
    ['ܒܹܝܬܠܚܸܡ', 'bētlḥim'],
    ['ܡܲܥܪܒ݂ܵܐ', 'maʿrḇā'],
    ['ܒܹܝܬ ܡܲܟ̰ܡܲܥܬܵܐ', 'bēt mačmaʿtā'],
    ['ܐܝܼܵܪ', 'īyār'],
    ['ܡܝܼܟ݂ܵܐܹܝܠ', 'mīḵāʾēl'],
    ['ܗܸܟ̃', 'hič'],
    ['ܕܸܫ̃ܡܸܢ', 'dižmin'],
    ['ܕܸܙ̃ܡܸܢ', 'dižmin'],
    ['ܐܵܢܵܐ', 'ānā'],
    ['ܐܲܢ݇ܬ', 'at'],
    ['ܐܲܢ݇ܬܝ', 'at'],
    ['ܗ̇ܝ', 'aya'],
    ['ܗ̇ܘ', 'awa'],
    ['ܡ̣ܢ', 'min'],
    ['ܡ̇ܢ', 'man'],
    ['ܚܲܕ݇، ܬܪܹܝ، ܬܠܵܬܵܐ', 'ḥa, trēy, tlātā'],
    ['ܚܲܕ݇ ܘܬܪܹܝ ܘܬܠܵܬܵܐ', 'ḥa w-trēy w-tlātā'],
    ['ܗܵܐ؟', 'hā?'],
    ['ܡܹܐܟ݂ܠܵܬܹ̈ܐ', 'mēḵlātē'],
    ['ܬܹܐܢܵܐ', 'tēnā'],
    // ['ܦܐܬܠܓܢ', 'NIL'],
    ['ܟܠܘܼܗܝ', 'kulluh'],
    ['ܡܘܿܕܵܐ', 'modā'],
    ['ܒܹܬ݂ ـ ܟܪ̈ܝܼܗܹܐ', 'bēṯ  krīhē'],
    ['ܓ̰ܵܘܹܓ̰', 'jāwēj'],
    ['ܡܝܼܫ̰', 'miž'],
    ['ܬܸܦ̮ܠܵܐ', 'tiflā'],
    // qushshaya cases
    ['ܒ݁ܪܵܬܵ݁ܐ', 'brātā'], // zqapha then qushshaya
    ['ܒ݁ܪܵܬ݁ܵܐ', 'brātā'], // qushshaya then zqapha
    ['ܫܸܬ݁ܠܵܐ', 'šitlā'],
    ['ܐܸܕ݁ܠܲܝܠܹܐ', 'idlaylē'],
    ['ܟ݁ܘܵܝܬ݁', 'kwāyt'],
    ['ܕ݁ܘܼܓ݁ܠܵܐ', 'duglā'],
    // "to be" cases
    ['ܐܵܢܵܐ ܐܵܬܘܿܪܵܝܵܐ ܝܘܸܢ', 'ānā ātorāyā ìwen'],
    ['«ܐܲܚܬܘܿܢ ܐܵܬܘܿܪ̈ܵܝܹܐ ܝܬܘܿܢ؟»', '“aḥton ātorāyē ìton?”'],
    ['ܕܝܼܘܸܢ', 'd-īwen'],
    ['ܠܕܝܼܘܵܢܘܼ̈ܟ݂', 'l-d-īwānuḵ'],
    ['ܕܝܼܘܸܬ', 'd-īwet'],
    ['ܝܼܘܵܬܝ', 'īwāt'],
    ['ܕܝܼܠܹܗ', 'd-īlēh'],
    ['ܕܝܼܠܵܗ̇', 'd-īlāh'],
    ['ܕܝܼܘܲܚ', 'd-īwaḥ'],
    ['ܘܝܼܘܲܚ', 'w-īwaḥ'],
    ['ܗܲܡܸܢܝܼܬܘܿܢ', 'hamminīton'],
    ['ܕܝܼܬܘܿܢ', 'd-īton'],
    ['ܕܦܵܠܛܝܼܬܘܿܢ', 'dpālṭīton'],
    ['ܕܝܼܢܵܐ', 'd-īnā'],
    // "to be" blends
    ['ܘܕܝܼܗ݇ܘܵܐ', 'w-d-īwā'],
    ['ܕܝܼܗ݇ܘܵܘ', 'd-īwā'],
    // "to be" imperative forms
    ['ܗ݇ܘܝܼܵܬܹ̈ܐ', 'wīyātē'],
    ['ܘܗ݇ܘܹܝܡܘܼܢ', 'w-wēmun'],
    // "to be" past particles
    ['ܟܬܝܼܒ݂ܗ݇ܘܵܐ', 'ktiḇwā'],
    ['ܐܝܼܬ ܗ݇ܘܵܐ', 'īt wā'],
    ['ܟܬܝܼܒ݂ ܗ݇ܘܵܘ', 'ktiḇ wā'],
    ['ܕܗ݇ܘܹܐ', 'dwē'],
    //
    ['ܐܵܕ݂ܵܪ', 'āḏār'],
    ['ܐܝܼܕ݂ܵܗ̇', 'īḏāh'],
    ['ܘܟܠܵܘܟ݂ܘܿܢ', 'w-kullāwḵon'],
    ['ܣܘܼܪܝܬ', 'surit'],
    ['ܣܘܼܪܝܼܬ݂', 'suriṯ'], // alt spelling
    ['”ܘܦܠܝܼܛ ܠܹܗ“', '“w-pliṭ lēh”'],
    ['’ܘܨܠܹܐ‘', '‘w-ṣlē’'],
    ['ܘܐܡܝܼܪܹܗ ܐܸܠܵܝܗܝ:', 'w-mirrēh illāyh:'],
    ['ܒܹܐܡܵܪܵܐ:', 'bēmārā:'],
    ['ܡܲܕܢ̱ܚܵܐ', 'madenḥā'],
    ['ܚܲܪܕ̄ܠܵܐ', 'ḥardelā'],
    ['ܐܣܝܼܩ ܠܝܼ', 'siq lī'],
    ['ܕܝܼܫܘܿܥ', 'd-īšoʿ'],
    ['ܠܗ̇ܘ', 'l-awa'],
    ['ܠܐܝܼܣܚܵܩ', 'l-īsḥāq'],
    ['ܠܐܲܠܩܘܿܫ', 'l-alqoš'],
    ['ܒܐܵܗܵܐ', 'b-āhā'],
    ['ܕܘܼܟܹܐ', 'dukē'],
    ['ܟܠܵܐ', 'klā'],
    ['ܘܒܗ̇ܘ', 'w-b-awa'],
    ['ܘܠܐܵܒ݂ܝܼܗܘܼ،', 'w-l-āḇihu,'],
    ['ܘܠܐܲܪܥܵܐ', 'w-l-arʿā'],
    ['ܚܲܫܵܢܬܵܐ', 'ḥašāntā'],
    ['ܫܡܲܝܵܐ', 'šmayā'],
    ['ܗܲܝܲܪܬܵܐ', 'hayartā'],
    ['ܡܲܚܸܒ', 'maḥib'],
    ['ܕܵܐܟ݂ܝܼܘܵܬܝܼ̈', 'dāḵīwātī'],
    ['ܡܸܢܘܼܗ̇', 'minnoh'],
    ['ܟܠܚܲܕ݇', 'kulḥa'],
    ['ܟܠܚܕ݂ܵܐ', 'kulḥḏā'],
    ['ܟܠܫܲܢ݇ܬ', 'kulšat'],
    ['ܒܢܲܦ̮ܫܹܗ', 'bnošēh'],
    ['ܛܘܼܦ̮ܣܵܐ', 'ṭusā'],
    ['ܙܲܒ݂ܢܵܐ', 'zawnā'],
    ['ܐܲܒ݂ܪܵܡ', 'awrām'],
    ['ܐܲܒ݂ܵܗܵܝ̈ܗܝ', 'aḇḇāhāyh'],
    ['ܕܲܠܩܘܼܒ݂ܠ', 'dalqul'],
    ['ܫܘܼܒ݂ܗܵܪܵܐ', 'šuhārā'],
    ['ܕܘܼܪܕܸܫ̃ܵܐ', 'durdižā'],
    ['ܒܝܼܗܘܼܕܵܐ', 'b-īhudā'],
    ['ܫܡܝܼܥ', 'šmīʿ'],
    ['ܕܝܑܼܠܹܗ', 'd-īlēh'],
    ['ܐ', 'ʾ'],
    ['ܡܒܲܝܸܐ', 'mbayiʾ'],
    ['ܒܲܝܸܐܝ', 'bayiʾ'],
    ['ܡܒܘܼܝܸܐ ܠܵܘܟ݂ܘܿܢ', 'mbuyiʾ lāwḵon'],
    // past tense conjugations for root ending in r where yudh+kwasa should be
    ['ܥܒ݂ܝܼܪܵܟ݂ܝ', 'ʿḇirrāḵ'],
    ['ܥܒ݂ܝܼܪܹܗ', 'ʿḇirrēh'],
    ['ܥܒ݂ܝܼܪܵܗ̇', 'ʿḇirrāh'],
    ['ܥܒ݂ܝܼܪܲܢ', 'ʿḇirran'],
    ['ܥܒ݂ܝܼܪܵܘܟ݂ܘܿܢ', 'ʿḇirrāwḵon'],
    // past tense conjugations for root ending in a
    ['ܡܠܹܐ       ܠܝܼ', 'mlē       lī'],
    ['ܡܠܹܐ ܠܘܼܟ݂', 'mlē luḵ'],
    ['ܫܡܹܥ', 'šmīʿ'],
    ['ܫܡܹܥܝ', 'šmīʿ'],
    ['ܫܡܹܥܡܘܼܢ', 'šmīʿmun'],
    // NFC test cases https://www.mediawiki.org/wiki/Unicode_normalization_considerations
    ['ܟ̰ܹܟܡܲܟ̰ܵܐ', 'čēkmačā'], // COMBINING_TILDE_BELOW then ZQAPHA
    ['ܟ̰ܹܟܡܲܟ̰ܵܐ', 'čēkmačā'], // ZQAPHA then COMBINING_TILDE_BELOW
    ['ܣܵܒ݂ܵܐ', 'sāḇā'], // RUKKAKHA then ZQAPHA
    ['ܣܵܒ݂ܵܐ', 'sāḇā'], // ZQAPHA then RUKKAKHA
  ];

  const ana = 'ܐܵܢܵܐ';
  const wen = 'ܝܘܸܢ';
  const sDelimiter = ' ❋ ';
  const eDelimiter = ' ❊ ';

  const toBeSansKhwasaExamples = [
    // start and end delimiters for transliteration highlighting
    [`${ana} ${sDelimiter}${wen}`, `ana-${sDelimiter}wen`],
    [`${ana}${sDelimiter} ${wen}`, `ana-${sDelimiter}wen`],
    [`${ana} ${eDelimiter}${wen}`, `ana${eDelimiter}-wen`],
    [`${ana}${eDelimiter} ${wen}`, `ana${eDelimiter}-wen`],
  ];

  let anyErrors = false;

  examples.forEach((pair) => {
    const [aii, expected] = pair;
    const actual = aiiTranslit(aii).latin;
    console.assert(actual === expected, '%o', { actual, expected });
    if (actual !== expected) { anyErrors = true; }
  });

  toBeSansKhwasaExamples.forEach((pair) => {
    const [aii, expected] = pair;
    const actual = aiiTranslit(aii).phonetic;
    console.assert(actual === expected, '%o', { actual, expected });
    if (actual !== expected) { anyErrors = true; }
  });

  if (anyErrors) {
    throw new Error('Fix transliteration errors');
  }
}

testTranslit();

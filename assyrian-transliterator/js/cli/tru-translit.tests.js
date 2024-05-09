const {
  truTranslit,
} = require('../tru-translit');

function testTranslit() {
  const examples = [
    ['ܐܰܕܡܐ', 'admo'],
    ['ܐܰܒܪܐ', 'abro'],
    ['ܐܰܕ݂ܢܐ', 'aḏno'],
    ['ܐܷܫܬܐ', 'ëšto'],
    ['ܫܰܘܥܐ', 'šawco'],
    ['ܬܡܰܢܝܐ', 'tmanyo'],
    ['ܬܷܫܥܐ', 'tëšco'],
    ['ܚܰܡܫܐ', 'ḥamšo'],
    ['ܐܰܪܒܥܐ', 'arbco'],
    ['ܬܠܳܬ݂ܐ', 'tloṯo'],
    ['ܬܪܶܐ', 'tre'],
    ['ܚܰܐ', 'ḥa'],
    ['ܬܡܝܢܳܝܐ', 'tminoyo'],
    ['ܕܰܬ ܬܡܰܢܝܐ', 'dat tmanyo'],
    ['ܬܡܳܢܰܥܣܰܪ', 'tmonacsar'],
    ['ܐܰܕܥܰܨܪܝـܝܶܐ', 'adcaṣriye'],
    ['ܐܰܕܠܰܠܝܐ', 'adlalyo'],
    ['ܐܰܕܨܰܦܪܐ', 'adṣafro'],
    ['ܐܰܕܝܰܘܡܰܐ', 'adyawma'],
    ['ܐܰܬ݂ܡܷܠ', 'aṯmël'],
    ['ܐܰܬ݂ܝܳܢܐ', 'aṯyono'],
    ['ܐܰܙܙܝ', 'azzi'],
    ['ܒܰܛܝܠܶܐ ܢܶܐ', 'baṭile ne'],
    ['ܒܢܳܝܐ', 'bnoyo'],
    ['ܕܰܪܓ݂ܶܐ', 'darġe'],
    ['ܕܘܥܪܝܢܰܐ', 'ducrina'],
    ['ܕܘܪܳܫܶܐ ܓܘܫܡܳܢܳܝܶܐ', 'duroše gušmonoye'],
    ['ܦܰܠܩܐ', 'falqo'],
    ['ܠܰܫܰܢ', 'lašan'],
    ['ܡܶܐ ܙܰܒܢܐ ܠܙܰܒܢܐ', 'me zabno lzabno'],
    ['ܩܷܛܪܐ', 'qëṭro'],
    ['ܣܚܳܝܐ', 'sḥoyo'],
    ['ܬܰܡܐ', 'tamo'],
    ['ܘܰܥܕܐ', 'wacdo'],
    ['ܙܰܒܢܐ', 'zabno'],
    ['ܢܚܝܪܐ', 'nḥiro'],
    ['ܢܳܫܐ', 'nošo'],
    ['ܪܝܫܐ', 'rišo'],
    ['ܫܰܒܬ݂ܐ', 'šabṯo'],
    ['ܐܘܥܕܐ', 'ucdo'],
    ['ܘܳܠܝܬ݂ܐ', 'woliṯo'],
    ['ܙܥܘܪܐ', 'zcuro'],
    ['ܙܥܘܪܬܐ', 'zcurto'],
    ['ܕܰܫܷܫܬܐ', 'dašëšto'],
    ['ܥܷܢܘܶܐ', 'cënwe'],
    ['ܨܷܪܬܐ', 'ṣërto'],
    ['ܘܰܟ݂ܰܡ', 'waxam'],
    ['ܙܷܒܕܐ', 'zëbdo'],
    ['ܐܰܝ ܝܰܘܡܰܢܝ', 'ay yawmani'],
    ['ܙ̰ܱܒܰܫܶܐ', 'žäbaše'], // COMBINING_TILDE_BELOW then PTHAHA
    ['ܙܱ̰ܒܰܫܶܐ', 'žäbaše'], // PTHAHA then COMBINING_TILDE_BELOW
    ['ܦ݁ܠܰܢ', 'plan'],
    ['ܒ݂ܝܠܠܰܐ', 'villa'],
    ['ܐܳܢܳܐ', 'ono'],
    ['ܗܰܬܘ', 'hatu'],
    ['ܐܝـܝܰܪ', 'iyar'],
    ['ܐܰܘ', 'aw'],
    ['”ܝܐ.“', '“yo.”'],
    ['ܒܷܬ݂ܷܪ', 'bëṯër'], // RUKKAKHA then RBASA
    ['ܒܷܬܷ݂ܪ', 'bëṯër'], // RBASA then RUKKAKHA
    ['ܐܰܘܪܘܦ݁ܰܐ', 'awrupa'], // QUSHSHAYA then PTHAHA
    ['ܐܰܘܪܘܦܰ݁ܐ', 'awrupa'], // PTHAHA then QUSHSHAYA
    ['(ܣܘܪܝܳܝܐ)', '(suryoyo)'],
    ['ܣܘܪܝܳܝܐ܆', 'suryoyo;'],
    ['ܡܳܪܝ', 'mor'],
    ['ܕܡܳܪܝ', 'dmor'],
    ['ܛܒܷܥܥܶܗ', 'ṭbëceh'],
    ['ܦܬܷܚܚܶܗ', 'ftëḥeh'],
    ['ܘܡܰܠܘܰܫܫܶܗ', 'umalwašeh'],
    ['ܝܘܠܦܳܢܰܬ݂ܬ݂ܶܗ', 'yulfonaṯeh'],
    ['ܡܰܠܰܟ݂ܟ݂ܶܗ', 'malaxeh'],
    ['ܡ̈ܶܠܐ', 'melo'],

    // NFC test cases https://www.mediawiki.org/wiki/Unicode_normalization_considerations
    ['ܟ݂ܰܒܪܐ', 'xabro'], // RUKKAKHA then PTHAHA
    ['ܟ݂ܰܒܪܐ', 'xabro'], // PTHAHA then RUKKAKHA
    ['ܫ̰ܰܢܛܰܐ', 'čanṭa'], // TILDE_BELOW then PTHAHA
    ['ܫ̰ܰܢܛܰܐ', 'čanṭa'], // PTHAHA then TILDE_BELOW
  ];

  let anyErrors = false;

  examples.forEach((pair) => {
    const [tru, expected] = pair;
    const actual = truTranslit(tru).latin;
    console.assert(actual === expected, '%o', { actual, expected });
    if (actual !== expected) { anyErrors = true; }
  });
  if (anyErrors) {
    throw new Error('Fix transliteration errors');
  }
}

testTranslit();

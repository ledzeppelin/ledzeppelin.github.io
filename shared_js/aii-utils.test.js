const {
  AiiUtils,
} = require('./aii-utils');

function stripMarkers() {
  const examples = [
    // common words
    ['ܠܹܗ', 'ܠܗ'],
    ['ܡ̣ܢ', 'ܡܢ'],
    ['ܠܗܘܿܢ', 'ܠܗܘܢ'],
    ['ܒܸܬ', 'ܒܬ'],
    ['ܝܠܹܗ', 'ܝܠܗ'],
    ['ܣܵܒܵܒ', 'ܣܒܒ'],
    ['ܐܝܼܢܵܐ', 'ܐܝܢܐ'],
    ['ܠܹܐ', 'ܠܐ'],
    ['ܟܹܐ', 'ܟܐ'],
    ['ܠܝܼ', 'ܠܝ'],
    ['ܠܵܐ', 'ܠܐ'],
    ['ܓܵܘ', 'ܓܘ'],
    ['ܝܼܫܘܿܥ', 'ܝܫܘܥ'],
    ['ܗ̇ܘ', 'ܗܘ'],
    ['ܐܵܗܵܐ', 'ܐܗܐ'],
    // edge cases
    ['ܐܲܩܠܵܐ', 'ܐܩܠܐ'],
    ['ܬܸܦ̮ܠܵܐ', 'ܬܦܠܐ'],
    ['ܓ̰ܵܘܹܓ̰', 'ܓܘܓ'],
    ['ܡܲܕܢ̱ܚܵܐ', 'ܡܕܢܚܐ'],
    ['ܡܲܩܕ̄ܫܵܐ', 'ܡܩܕܫܐ'],
    ['ܫ̃', 'ܫ'],
  ];

  examples.forEach((pair) => {
    const [aii, expected] = pair;
    const actual = AiiUtils.stripMarkers(aii);
    console.assert(actual === expected, '%o', { actual, expected });
  });
}
stripMarkers();

function atLeastOneAiiLetter() {
  const examples = [
    ['', false],
    [' ', false],
    ['ܐ', true],
    ['ܐܵ', true],
    ['aܒa', true],
    ['aa', false],
    ['ܹ', false], // zlama angular
  ];

  examples.forEach((pair) => {
    const [aii, expected] = pair;
    const actual = AiiUtils.atLeastOneAiiLetter(aii);
    console.assert(actual === expected, '%o', { actual, expected });
  });
}
atLeastOneAiiLetter();

function atLeastOneDiacritic() {
  const examples = [
    ['', false],
    [' ', false],
    ['ܐ', false],
    ['ܐܵ', true],
    ['aܒa', false],
    ['aa', false],
    ['ܹ', true], // zlama angular
  ];

  examples.forEach((pair) => {
    const [aii, expected] = pair;
    const actual = AiiUtils.atLeastOneDiacritic(aii);
    console.assert(actual === expected, '%o', { actual, expected });
  });
}
atLeastOneDiacritic();

function atLeastOneAiiVChar() {
  const examples = [
    ['', false],
    [' ', false],
    ['ܐ', true],
    ['ܐܵ', true],
    ['aܒa', true],
    ['aa', false],
    ['ܹ', true], // zlama angular
  ];

  examples.forEach((pair) => {
    const [aii, expected] = pair;
    const actual = AiiUtils.atLeastOneAiiVChar(aii);
    console.assert(actual === expected, '%o', { actual, expected });
  });
}
atLeastOneAiiVChar();

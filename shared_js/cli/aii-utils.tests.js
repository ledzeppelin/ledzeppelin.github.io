const {
  AiiUtils,
} = require('../aii-utils');

let anyErrors = false

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
    if (actual !== expected) { anyErrors = true; }
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
    if (actual !== expected) { anyErrors = true; }
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
    if (actual !== expected) { anyErrors = true; }
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
    if (actual !== expected) { anyErrors = true; }
  });
}
atLeastOneAiiVChar();

function paramsToString() {
  const params1 = new URLSearchParams([['latin', 1], ['dialect', 2]]);
  const params2 = new URLSearchParams([['latin', 1], ['dialect', 2], ['assyrian', 'ܐ']]);
  const params3 = new URLSearchParams([['latin', 1], ['dialect', 2]]);

  const examples = [
    // dictionary
    [
      [['tag', 'from:Classical Syriac']],
      null,
      'tag=from:Classical+Syriac',
    ],
    [
      [['search', 'a\'s']],
      null,
      'search=a%27s',
    ],

    // transliterator
    [
      [['assyrian', 'ܪܬܡܐ']],
      null,
      'assyrian=%DC%AA%DC%AC%DC%A1%DC%90',
    ],
    [
      [['assyrian', 'ܪܬܡܐ']],
      params1,
      'latin=1&dialect=2&assyrian=%DC%AA%DC%AC%DC%A1%DC%90',
    ],
    [
      [['assyrian', 'ܐ']],
      params2,
      'latin=1&dialect=2&assyrian=%DC%90',
    ],
    [
      [['assyrian', 'ܒ']],
      params2,
      'latin=1&dialect=2&assyrian=%DC%92',
    ],
    [
      [],
      params3,
      'latin=1&dialect=2',
    ],
  ];

  examples.forEach((trio) => {
    const [newKeyValues, currentSearchParams, expected] = trio;
    const actual = AiiUtils.paramsToString(newKeyValues, currentSearchParams);
    console.assert(actual === expected, '%o', { actual, expected });
    if (actual !== expected) { anyErrors = true; }
  });
}
paramsToString();

if (anyErrors) {
  throw new Error('Fix utils errors');
}

const aiiReplacements = {
  'ܕܡܸܕܪܹܐ (ܕܡܸܢ݇ܕܪܹܫ݇) ܡܲܩܸܡܲܚ': 'ܕܡܸܢ݇ܕܪܹܫ݇ ܡܲܩܸܡܲܚ',
  'ܬܘܼܠܩܵܐ (ܛܘܼܠܩܵܐ) ܠܝܵܪܬܘܼܬܵܐ': 'ܛܘܼܠܩܵܐ ܠܝܵܪܬܘܼܬܵܐ',
  'ܕܗܹܒ݂ܝܼܹ̈ܐ ܬܠܝܼܩܹ̈ܐ (ܛܠܝܼܩܹ̈ܐ)': 'ܕܗܹܒ݂ܝܼܹ̈ܐ ܛܠܝܼܩܹ̈ܐ',

};

const aiiReplacementsForTR = {
  'ܕܐܵܢܝܼ݇ ܐܲܒ݂ܵܗܵܬܲ̈ܢ': 'ܕܐܵܢ ܐܲܒ݂ܵܗܵܬܲ̈ܢ',
};

const poemTranslation = [
  {
    title: 'ܥܘܼܢܝܼܬܵܐ ܩܲܕ݇ܡܵܝܬܵܐ',
    title_translation: 'Verse 1',
    lines: [
      // {
      //   aii: 'ܘܒܩܛܵܥܬܘܼܗܝ ܠܫܘܼܘܫܵܛܵܐ',
      //   eng: 'And recognized for his resolve for advancement',
      //   start: 0,
      // },
      {
        aii: 'ܬܹܝܡܘܼܢ ܝܵܐ ܒܢܘܿܢܹ̈ܐ',
        eng: 'O come all you the sons',
        start: 0,
      },
      {
        aii: 'ܬܹܝܡܘܼܢ ܝܵܐ ܒܢܵܬܹ̈ܐ',
        eng: 'O come all you the daughters',
        start: 1.98,
      },
      {
        aii: 'ܕܗ̇ܝ ܐܵܬܘܿܪ ܪܲܒܬܵܐ',
        eng: 'Of that great Assyria',
        start: 3.63,
      },
      {
        aii: 'ܓ̰ܵܡܥܲܚ ܠܐܘܼܕܵܠܹܐ',
        eng: 'Let us come together',
        start: 5.67,
      },
      {
        aii: 'ܐܲܚܟ̰ܝܼ ܠܚܲܕ݇ ܢܝܼܫܵܐ',
        eng: 'Only with one objective',
        start: 7.68,
      },
      {
        aii: 'ܕܡܸܕܪܹܐ (ܕܡܸܢ݇ܕܪܹܫ݇) ܡܲܩܸܡܲܚ',
        eng: 'To resurrect again',
        start: 9.84,
      },
      {
        aii: 'ܠܐܲܬܪܵܐ ܚܲܒܝܼܒ݂ܵܐ',
        eng: 'The beloved country',
        start: 11.59,
      },
      {
        aii: 'ܕܐܵܢܝܼ݇ ܐܲܒ݂ܵܗܵܬܲ̈ܢ',
        eng: 'Of our ancestors',
        start: 13.33,
      },
      {
        aii: 'ܡ̣ܢ ܟܠ ܚܕܵܐ ܥܹܕܬܵܐ',
        eng: 'Regardless what church we belong to',
        start: 16.01,
      },
      {
        aii: 'ܒܝܼ ܟܠ ܚܲܕ݇ ܠܸܥܙܵܐ',
        eng: 'Regardless what dialect we speak',
        start: 18.12,
      },
      {
        aii: 'ܟܠܲܢ ܩܲܢܛܪܸܢܲܚ',
        eng: 'Let us all focus',
        start: 19.85,
      },
      {
        aii: 'ܠܢܝܼܫܵܐ ܐܲܨܠܵܝܵܐ',
        eng: 'On the main objective',
        start: 21.62,
      },
      {
        aii: 'ܡܲܦܠܸܚܲܚ ܟܠܚܲܕ݇',
        eng: 'Let us use any',
        start: 23.98,
      },
      {
        aii: 'ܡܲܒܘܼܥܵܐ  ܕܐܝܼܬ ܠܲܢ',
        eng: 'Means and capability we have',
        start: 25.84,
      },
      {
        aii: 'ܠܐܘܼܪܚܵܐ ܕܚܹܐܪܘܼܬܵܐ',
        eng: 'For the liberation',
        start: 27.57,
      },
      {
        aii: 'ܕܐܵܬܘܿܪ ܥܲܬܝܼܩܬܵܐ',
        eng: 'Of the ancient Assyria',
        start: 29.45,
      },
    ],
  },
  {
    title: 'ܥܘܼܢܵܝܵܐ',
    title_translation: 'Chorus',
    lines: [
      {
        aii: 'ܕܠܵܐ ܐ݇ܚܹܪ݇ܢܵܐ ܦܗܵܝܵܐ',
        eng: 'So that we would no longer',
        start: 31.97,
      },
      {
        aii: 'ܥܲܠ ܦܵܬܵܐ ܕܒܪܝܼܬܵܐ',
        eng: 'Wander on the earth',
        start: 33.86,
      },
      {
        aii: 'ܐܲܝܟ݂ ܚܲܕ݇ ܕܩܵܐ ܕܗܵܘܹܐ',
        eng: 'Like one who has',
        start: 35.9,
      },
      {
        aii: 'ܬܘܼܠܩܵܐ (ܛܘܼܠܩܵܐ) ܠܝܵܪܬܘܼܬܵܐ',
        eng: 'Lost his heritage',
        start: 37.62,
      },
      {
        aii: 'ܐܸܠܵܐ ܒܸܚܵܝܵܐ',
        eng: 'But to live like one who',
        start: 39.88,
      },
      {
        aii: 'ܒܚܲܕ݇ ܩܸܨܵܐ ܪܵܡܵܐ',
        eng: 'Is holding his head up',
        start: 41.44,
      },
      {
        aii: 'ܟܲܕ ܝܕܝܼܥܵܐ  ܒܐܲܬܪܘܼܗܝ',
        eng: 'As recognized for having a country',
        start: 43.16,
      },
      {
        aii: 'ܘܒܩܛܵܥܬܘܼܗܝ  ܠܫܘܼܘܫܵܛܵܐ',
        eng: 'And recognized for his resolve for advancement',
        start: 44.93,
      },
      {
        aii: 'ܕܠܵܐ ܐ݇ܚܹܪ݇ܢܵܐ ܛܡܝܼܪܹ̈ܐ',
        eng: 'So that we would no longer endure',
        start: 47.29,
      },
      {
        aii: 'ܒܚܲܫܵܐ ܘܐܘܼܠܨܵܢܵܐ',
        eng: 'Sorrow and anguish',
        start: 49.03,
      },
      {
        aii: 'ܕܗܹܒ݂ܝܼܹ̈ܐ ܬܠܝܼܩܹ̈ܐ (ܛܠܝܼܩܹ̈ܐ)',
        eng: 'Of the lost hopes',
        start: 50.75,
      },
      {
        aii: 'ܕܕܲܥܒ݂ܲܪ ܚܸܫܟܵܢܵܐ',
        eng: 'Of the dark past',
        start: 52.19,
      },
      {
        aii: 'ܐܸܠܵܐ ܒܸܪܘܵܚܵܐ',
        eng: 'But we would grow',
        start: 54.42,
      },
      {
        aii: 'ܒܚܲܝܠܵܐ ܘܒܚܸܟ݂ܡ̱ܬܵܐ',
        eng: 'In power and wisdom',
        start: 55.73,
      },
      {
        aii: 'ܙܲܪܒܘܼܢܹܐ  ܘܦܫܵܛܵܐ',
        eng: 'And compellingly transition',
        start: 57.65,
      },
      {
        aii: 'ܠܕܲܥܬܝܼܕ ܒܲܗ݇ܪܵܢܵܐ',
        eng: 'Into a bright future',
        start: 59.68,
      },
    ],
  },
  {
    title: 'ܥܘܼܢܝܼܬܵܐ ܬܪܲܝܵܢܬܵܐ',
    title_translation: 'Verse 2',
    lines: [
      {
        aii: 'ܒܹܝܬ ܢܲܗܪ̈ܝܼܢ ܚܕܲܬܵܐ',
        eng: 'The new Bet Nahrain',
        start: 62.91,
      },
      {
        aii: 'ܒܸܣܒܵܪܵܐ ܡܒܢܘܿܢ̈ܘܼܗ̇',
        eng: 'Is expecting her sons',
        start: 64.49,
      },
      {
        aii: 'ܒܸܣܒܵܪܵܐ ܡܒܢܵܬ̈ܘܼܗ̇',
        eng: 'Is expecting her daughters',
        start: 66.37,
      },
      {
        aii: 'ܕܫܵܒ݂ܩܝܼ ܠܦܘܼܪ̈ܫܵܢܹܐ',
        eng: 'To leave behind the differences',
        start: 68.2,
      },
      {
        aii: 'ܕܝܢܵܐ ܡܘܼܪ̈ܚܸܩܲܢ',
        eng: 'That have pulled us distant',
        start: 70.2,
      },
      {
        aii: 'ܡܢܝܼܫܵܐ ܐܲܨܠܵܝܵܐ',
        eng: 'From the main objective',
        start: 72.02,
      },
      {
        aii: 'ܝܲܢ ܙܹܐ ܡܘܼܪ̈ܚܸܩܲܢ',
        eng: 'That have pulled us distant',
        start: 74.33,
      },
      {
        aii: 'ܚܲܕ݇ ܡ̣ܢ ܗ̇ܘ ܐ݇ܚܹܪ݇ܢܵܐ',
        eng: 'From each other',
        start: 76.25,
      },
      {
        aii: 'ܗܵܘܹܐ ܠܲܢ ܐܲܬܪܵܐ',
        eng: 'We should have a country',
        start: 78.46,
      },
      {
        aii: 'ܚܹܐܪܵܐ ܩܵܐ ܓܵܢܲܢ',
        eng: 'Sovereign of our own',
        start: 80.22,
      },
      {
        aii: 'ܕܐܲܝܟܵܐ ܕܓܵܘ ܬܹܒ݂ܹܝܠ',
        eng: 'So that wherever in the world',
        start: 82.01,
      },
      {
        aii: 'ܗܵܘܲܚ ܒܸܥܡܵܪܵܐ',
        eng: 'We live',
        start: 83.92,
      },
      {
        aii: 'ܝܵܕܥܲܚ ܕܟܹܐ ܡܵܨܲܚ',
        eng: 'We know that we can',
        start: 85.64,
      },
      {
        aii: 'ܕܝܵܪܵܐ ܠܒܹܝܬ ܓܵܘܣܵܐ',
        eng: 'Return to our sanctuary',
        start: 87.84,
      },
      {
        aii: 'ܚܦܵܩܵܐ ܚܘܼܒܵܢܵܐ',
        eng: 'The benevolent arms',
        start: 89.85,
      },
      {
        aii: 'ܕܒܹܝܬ ܢܲܗܪ̈ܝܼܢ ܝܸܡܵܐ',
        eng: 'Of Mother Bet Nahrain',
        start: 91.8,
      },
    ],
  },
  {
    title: 'ܥܘܼܢܝܼܬܵܐ ܬܠܝܼܬܵܝܬܵܐ',
    title_translation: 'Verse 3',
    lines: [
      {
        aii: 'ܩܵܘܡܵܐ ܕܚܲܕ݇ ܝܵܘܡܵܐ',
        eng: 'Let a day',
        start: 94.77,
      },
      {
        aii: 'ܐܵܬܹܐ ܒܓ̰ܲܠܕܘܼܬܵܐ',
        eng: 'Come soon',
        start: 96.37,
      },
      {
        aii: 'ܕܓܵܘܵܐ ܕܒܹܝܬ ܢܲܗܪ̈ܝܼܢ',
        eng: 'So that in Bet Nahrain',
        start: 98.07,
      },
      {
        aii: 'ܡ̣ܢ ܟܠ ܚܕܵܐ ܦܢܝܼܬܵܐ',
        eng: 'From all over the places',
        start: 99.92,
      },
      {
        aii: 'ܓ̰ܡܝܼܥܹ̈ܐ ܠܐܘܼܕܵܠܹܐ',
        eng: 'Gathered together',
        start: 102.09,
      },
      {
        aii: 'ܗܵܘܲܚ ܡܙܲܝܘܼܚܹܐ',
        eng: 'We celebrate',
        start: 104.18,
      },
      {
        aii: 'ܠܡܵܘܠܵܕܵܐ  ܚܲܕ݇ܬܵܐ',
        eng: 'The new birth',
        start: 105.97,
      },
      {
        aii: 'ܕܒܹܝܬ ܢܲܗܪ̈ܝܼܢ ܐܲܬܪܲܢ',
        eng: 'Of our land Bet Nahrain',
        start: 107.89,
      },
      {
        aii: 'ܬܹܝܡܘܼܢ ܝܵܐ ܒܢܘܿܢܹ̈ܐ',
        eng: 'O come all you the sons',
        start: 110.13,
      },
      {
        aii: 'ܬܹܝܡܘܼܢ ܝܵܐ ܒܢܵܬܹ̈ܐ',
        eng: 'O come all you the daughters',
        start: 112.08,
      },
      {
        aii: 'ܕܗ̇ܝ ܐܵܬܘܿܪ ܪܲܒܬܵܐ',
        eng: 'Of that great Assyria',
        start: 113.8,
      },
      {
        aii: 'ܓ̰ܵܡܥܲܚ ܠܐܘܼܕܵܠܹܐ',
        eng: 'Let us come together',
        start: 115.45,
      },
      {
        aii: 'ܐܲܚܟ̰ܝܼ ܠܚܲܕ݇ ܢܝܼܫܵܐ',
        eng: 'Only with one objective',
        start: 117.72,
      },
      {
        aii: 'ܕܡܸܕܪܹܐ ܡܲܩܸܡܲܚ',
        eng: 'To resurrect again',
        start: 120.03,
      },
      {
        aii: 'ܠܐܲܬܪܵܐ ܚܲܒܝܼܒ݂ܵܐ',
        eng: 'The beloved country',
        start: 121.87,
      },
      {
        aii: 'ܕܐܵܢܝܼ݇ ܐܲܒ݂ܵܗܵܬܲ̈ܢ',
        eng: 'Of our ancestors',
        start: 123.69,
      },
    ],
  },
];

// this allows us to run code in a Node context and also browser-side js
if (typeof module === 'object') {
  module.exports = {
    poemTranslation,
  };
}

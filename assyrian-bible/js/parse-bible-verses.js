const fs = require('fs');

const data = fs.readFileSync('./bible-verses.json');
const bibleVerses = {};
// convert array of objects to single object with key/values for all verses, ex.
// [{'JUD.1.NLT:2': 'Mercy, peace, and love be yours richly.'},]
// to
// {'JUD.1.NLT:2': 'Mercy, peace, and love be yours richly.', }
JSON.parse(data).forEach((verse) => { bibleVerses[verse.meta] = verse.body; });

// taken from scrape_bible_chapters.py
// array to ensure chronological order of books
const booksChapters = [
  ['PSA', 150],
  ['MAT', 28],
  ['MRK', 16],
  ['LUK', 24],
  ['JHN', 21],
  ['ACT', 28],
  ['ROM', 16],
  ['1CO', 16],
  ['2CO', 13],
  ['GAL', 6],
  ['EPH', 6],
  ['PHP', 4],
  ['COL', 4],
  ['1TH', 5],
  ['2TH', 3],
  ['1TI', 6],
  ['2TI', 4],
  ['TIT', 3],
  ['PHM', 1],
  ['HEB', 13],
  ['JAS', 5],
  ['1PE', 5],
  ['2PE', 3],
  ['1JN', 5],
  ['2JN', 1],
  ['3JN', 1],
  ['JUD', 1],
  ['REV', 22],
];

// initialize the bible as an object which maps books to a 2d array[chapters][verses]
// ex. { '3JN': [ [] ], JUD: [ [] ] }
const bible = {};
booksChapters.forEach((booksChapter) => {
  const [book, chapters] = booksChapter;
  // https://stackoverflow.com/a/53029734
  bible[book] = [...Array(chapters)].map(() => []);
});

// for each chapter, insert each verse until there are no more verses
Object.entries(bible).forEach(([book, chapters]) => {
  chapters.forEach((chapter, chapterIdx) => {
    let curVerse = 1;
    while (true) {
      // ex. JUD.1.AII:1
      const nltVerse = `${book}.${chapterIdx + 1}.NLT:${curVerse}`;
      const aiiVerse = `${book}.${chapterIdx + 1}.AII:${curVerse}`;

      if (nltVerse in bibleVerses && aiiVerse in bibleVerses) {
        const translationPairs = [bibleVerses[nltVerse], bibleVerses[aiiVerse]];

        const headerKeys = [`${book}.${chapterIdx + 1}.AII:${curVerse}:header:1`,
          `${book}.${chapterIdx + 1}.AII:${curVerse}:reference:1`,
          `${book}.${chapterIdx + 1}.AII:${curVerse}:header:2`,
        ];

        headerKeys.forEach((headerKey) => {
          if (headerKey in bibleVerses) {
            translationPairs.push(bibleVerses[headerKey]);
          }
        });

        bible[book][chapterIdx].push(translationPairs);
      } else { break; }
      curVerse += 1;
    }
  });
});

console.log('const bible = ');
// depth, maxArrayLength: https://nodejs.org/api/util.html#utilinspectobject-showhidden-depth-colors
console.dir(bible, { depth: null, maxArrayLength: null });

// should print out this:
// const bible = {
//   PSA: [
//     [
//       [
//         'Happy are those who don’t listen to the wicked, who...',
//         'ܛܘܼܒ݂ܵܐ ܠܐܢܵܫܵܐ ܕܒܡܸܠܟܵܐ ܕܒܝܼܫܹ̈ܐ ܠܵܐ ܚܕܝܼܪܹܗ، ܘܒܐܘܼܪܚܵܐ ܕܚܲܛܵܝܹ̈ܐ ܠܵܐ...',
//         'ܣܸܦܪܵܐ ܩܲܕܡܵܝܵܐ',
//         'ܡܙܡܘܪ̈ܐ 1‏‐41'
//       ],
//       [
//         'They love the L ord ’s teachings, and they think about those...',
//         'ܐܸܠܵܐ ܒܢܵܡܘܿܣܵܐ ܕܡܵܪܝܵܐ ܝܠܹܗ ܒܘܼܣܵܡܹܗ، ܘܒܢܵܡܘܿܣܹܗ ܟܹܐ ܗܲܓܹܐ ܐܝܼܡܵܡܵܐ ܘܠܲܝܠܹܐ؛'
//       ],
//     ],
//   ],
// };


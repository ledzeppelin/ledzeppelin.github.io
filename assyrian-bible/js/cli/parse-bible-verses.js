const fs = require('fs');

const data = fs.readFileSync('./bible-verses.json');
const {
  booksChapters,
} = require('../../../shared_js/consts/books-chapters');

const bibleVerses = {};
// convert array of objects to single object with key/values for all verses, ex.
// [{'JUD.1.NLT:2': 'Mercy, peace, and love be yours richly.'},]
// to
// {'JUD.1.NLT:2': 'Mercy, peace, and love be yours richly.', }
JSON.parse(data).forEach((verse) => { bibleVerses[verse.meta] = verse.body; });

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
    const prefix = `${book}.${chapterIdx + 1}`;
    const nltVersePrefix = `${prefix}.NLT:`;
    const aiiVersePrefix = `${prefix}.AII:`;

    while (`${nltVersePrefix}${curVerse}` in bibleVerses && `${aiiVersePrefix}${curVerse}` in bibleVerses) {
      const verseSection = {};

      const verseMeta = {
        h1: 'header:1',
        r1: 'referenceHTML:1',
        h2: 'header:2',
      };
      const verseMetaPrefix = `${prefix}.AII:${curVerse}:`;

      // for (const [verseMetaKey, verseMetaVal] of Object.entries(object)) {
      Object.keys(verseMeta).forEach((verseMetaKey) => {
        // ex. PSA.1.AII:1:referenceHTML:1
        const fullVerseMetaKey = `${verseMetaPrefix}${verseMeta[verseMetaKey]}`;
        // console.log(fullVerseMetaKey);

        if (fullVerseMetaKey in bibleVerses) {
          verseSection[verseMetaKey] = bibleVerses[fullVerseMetaKey];
        }
      });

      verseSection.v = [
        [
          bibleVerses[`${nltVersePrefix}${curVerse}`],
          bibleVerses[`${aiiVersePrefix}${curVerse}`],
        ],
      ];
      curVerse += 1;

      // while there's verses w/o headers, we continue pushing them to this section
      // hard to do this logic cleanly in js, easier if ported to python
      while (`${nltVersePrefix}${curVerse}` in bibleVerses && `${aiiVersePrefix}${curVerse}` in bibleVerses) {
        let headersExist = false;

        const verseMetaPrefix2 = `${prefix}.AII:${curVerse}:`;
        Object.values(verseMeta).forEach((verseMetaName) => {
          const fullVerseMetaKey = `${verseMetaPrefix2}${verseMetaName}`;
          if (fullVerseMetaKey in bibleVerses) {
            headersExist = true;
          }
        });

        if (headersExist) {
          break;
        }

        verseSection.v.push(
          [
            bibleVerses[`${nltVersePrefix}${curVerse}`],
            bibleVerses[`${aiiVersePrefix}${curVerse}`],
          ],
        );
        curVerse += 1;
      }

      bible[book][chapterIdx].push(verseSection);
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


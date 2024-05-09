const fs = require('fs');

const data = fs.readFileSync('../../assyrian-bible/js/bible-verses.json');
const {
  booksChapters,
} = require('../../../shared_js/consts/books-chapters');

const {
  aiiTranslit,
} = require('../../../assyrian-transliterator/js/aii-translit');

const {
  AiiUtils,
} = require('../../../shared_js/aii-utils');

const bibleVerses = {};
// convert array of objects to single object with key/values for all verses, ex.
// [{'JUD.1.NLT:2': 'Mercy, peace, and love be yours richly.'},]
// to
// {'JUD.1.NLT:2': 'Mercy, peace, and love be yours richly.', }
JSON.parse(data).forEach((verse) => { bibleVerses[verse.meta] = verse.body; });

const searchableBible = [];
booksChapters.forEach((booksChapter) => {
  const [book, chapters] = booksChapter;
  for (let chapter = 1; chapter <= chapters; chapter += 1) {
    let verse = 1;
    while (true) {
      const nltVerse = `${book}.${chapter}.NLT:${verse}`;
      const aiiVerse = `${book}.${chapter}.AII:${verse}`;
      if (nltVerse in bibleVerses && aiiVerse in bibleVerses) {
        searchableBible.push({
          book,
          chapter,
          verse,
          aii: bibleVerses[aiiVerse],
          aii_strip: AiiUtils.stripMarkers(bibleVerses[aiiVerse]),
          tr: aiiTranslit(bibleVerses[aiiVerse]).phonetic,
          eng: bibleVerses[nltVerse],
        });
        verse += 1;
      } else {
        break;
      }
    }
  }
});

console.log('const searchableBible = ');
// depth, maxArrayLength: https://nodejs.org/api/util.html#utilinspectobject-showhidden-depth-colors
console.dir(searchableBible, { depth: null, maxArrayLength: null });
console.log(`// this allows use to run code in a Node context and also browser-side js
if (typeof module === 'object') {
  module.exports = {
    searchableBible,
  };
}`);

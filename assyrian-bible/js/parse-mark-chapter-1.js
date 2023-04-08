// based of parse-bible-verses.js

const fs = require('fs');

const {
  aiiTranslit,
} = require('../../assyrian-transliterator/js/aii-translit');

const data = fs.readFileSync('./bible-verses.json');
const bibleVerses = {};
JSON.parse(data).forEach((verse) => { bibleVerses[verse.meta] = verse.body; });

const chapters = [];

let curVerse = 1;
while (true) {
  const aiiVerse = `MRK.1.AII:${curVerse}`;

  if (aiiVerse in bibleVerses) {
    const translitPairs = [bibleVerses[aiiVerse], aiiTranslit(bibleVerses[aiiVerse]).phonetic];

    chapters.push(translitPairs);
  } else { break; }
  curVerse += 1;
}

const jsonString = JSON.stringify(chapters, null, 2);
console.log(jsonString);

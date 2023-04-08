// based of parse-bible-verses.js

const fs = require('fs');

const data = fs.readFileSync('./bible-verses.json');
const bibleVerses = {};
JSON.parse(data).forEach((verse) => { bibleVerses[verse.meta] = verse.body; });

const numChaptersMark = 16;
const verses = [];

Array.from(Array(numChaptersMark)).forEach((_, chapterIdx) => {
  let curVerse = 1;
  while (true) {
    const aiiVerse = `MRK.${chapterIdx + 1}.AII:${curVerse}`;
    if (aiiVerse in bibleVerses) {
      verses.push(bibleVerses[aiiVerse]);
    } else { break; }
    curVerse += 1;
  }
});

console.log('const aiiMark = ');
console.dir(verses, { depth: null, maxArrayLength: null });

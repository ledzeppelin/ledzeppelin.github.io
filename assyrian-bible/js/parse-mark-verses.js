// based of parse-bible-verses.js

const fs = require('fs');

const data = fs.readFileSync('./bible-verses.json');
const bibleVerses = {};
JSON.parse(data).forEach((verse) => { bibleVerses[verse.meta] = verse.body; });

const numChaptersMark = 16;
const verses = {};

// populate dictionary mapping text to chapter and verse, ex.
// 'ܐܵܗܵܐ ܝܠܹܗ ܫܘܼܪܵܝܵܐ ܕܐܹܘܲܢܓܲܠܝܼܘܿܢ ܕܝܼܫܘܿܥ ܡܫܝܼܚܵܐ ܒܪܘܿܢܵܐ ܕܐܲܠܵܗܵܐ.': [ 1, 1 ],
Array.from(Array(numChaptersMark)).forEach((_, chapterIdx) => {
  let curVerse = 1;
  while (true) {
    const aiiVerse = `MRK.${chapterIdx + 1}.AII:${curVerse}`;
    if (aiiVerse in bibleVerses) {
      verses[bibleVerses[aiiVerse]] = [chapterIdx + 1, curVerse];
    } else { break; }
    curVerse += 1;
  }
});

// Goldilocks principle for verse length
// We want the middle half of verses sorted by verse length
const sortedArr = Object.keys(verses).sort((a, b) => a.length - b.length);
const quartile1 = Math.floor(sortedArr.length * 0.25);
// const quartile2 = Math.floor(sortedArr.length / 2);
const quartile3 = Math.floor(sortedArr.length * 0.75);

const middleVerses = {};

for (let i = quartile1; i < quartile3; i += 1) {
  const verse = sortedArr[i];
  middleVerses[verse] = verses[verse];
}

// console.log(middleVerses);

console.log('/* eslint-disable array-bracket-spacing */');
console.log('const aiiMark = ');
// console.dir(verses, { depth: null, maxArrayLength: null });
console.dir(middleVerses, { depth: null, maxArrayLength: null });

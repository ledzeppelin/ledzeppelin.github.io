const {
  searchableBible,
} = require('../searchable-bible.min');

let maxLength = 0;

searchableBible.forEach((verse) => {
  if (verse.tr.length > maxLength) {
    maxLength = verse.tr.length;
    console.log(verse.tr);
  }
  // maxLength = Math.max(maxLength, verse.tr.length);
});

console.log(maxLength);

const {
  searchableBible,
} = require('../searchable-bible.min');

let maxLength = 0;

searchableBible.forEach((verse) => {
  verse.tr.split(' ').forEach((word) => {
    if (word.length > maxLength) {
      maxLength = word.length;
      console.log(word, word.length);
    }
  });
  // maxLength = Math.max(maxLength, verse.tr.length);
});

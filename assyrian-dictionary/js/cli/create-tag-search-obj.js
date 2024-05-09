const fs = require('fs');

const json = fs.readFileSync('./json/indexed-tags.json', 'utf-8');
const tags = JSON.parse(json);

console.log(`const aiiDictionaryTags = ${JSON.stringify(tags, undefined, 2)};
// this allows use to run code in a Node context and also browser-side js
if (typeof module === 'object') {
  module.exports = {
    aiiDictionaryTags,
  };
}`);

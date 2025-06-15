const tags = require('../json/indexed-tags.json');

console.log(`const aiiDictionaryTags = ${JSON.stringify(tags, undefined, 2)};
// this allows use to run code in a Node context and also browser-side js
if (typeof module === 'object') {
  module.exports = {
    aiiDictionaryTags,
  };
}`);

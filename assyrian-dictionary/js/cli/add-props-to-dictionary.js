const fs = require('fs');

const {
  aiiTranslit,
} = require('../../../assyrian-transliterator/js/aii-translit');

const json = fs.readFileSync('./json/aii-dict-no-tr.json', 'utf-8');

const aiiDictionary = JSON.parse(json);

// we can safely add key value pairs to the objects since they are passed by reference
aiiDictionary.forEach((item) => {
  item.aii_v_s.forEach((item1) => {
    const tr = aiiTranslit(item1.aii_v).phonetic;
    if (item1.jsonlines[0].pos === 'root') {
      // eslint-disable-next-line no-param-reassign
      item1.aii_v_tr = tr.split(' ').join('-');
    } else {
      // eslint-disable-next-line no-param-reassign
      item1.aii_v_tr = aiiTranslit(item1.aii_v).phonetic;
    }
  });
});

// console.log(JSON.stringify(aiiDictionary));

console.log(`const aiiDictionary = ${JSON.stringify(aiiDictionary, undefined, 2)};
// this allows use to run code in a Node context and also browser-side js
if (typeof module === 'object') {
  module.exports = {
    aiiDictionary,
  };
}`);

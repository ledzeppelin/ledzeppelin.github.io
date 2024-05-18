const fs = require('fs');

const {
  aiiTranslit,
} = require('../../../assyrian-transliterator/js/aii-translit');

const {
  AiiUtils,
} = require('../../../shared_js/aii-utils');

const {
  aiiTranslitWrapper,
} = require('../aii-translit-wrapper');

const json = fs.readFileSync('./json/aii-dict-no-tr.json', 'utf-8');

const aiiDictionary = JSON.parse(json);

// we can safely add key value pairs to the objects since they are passed by reference
aiiDictionary.forEach((item) => {
  item.aii_v_s.forEach((item1) => {
    // eslint-disable-next-line no-param-reassign
    item1.aii_v_tr = aiiTranslitWrapper(item1.aii_v, AiiUtils.validLetters, aiiTranslit);
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

// eslint-disable-next-line import/no-extraneous-dependencies
const Fuse = require('fuse.js');
const {
  aiiDictionary,
} = require('../consts/aii-dict');

const optionsExtended = {
  includeScore: true,
  keys: [
    // english
    // 'aii_v_s.jsonlines.senses.gloss',
    // 'aii_v_s.jsonlines.senses.examples.english',
    // 'aii_v_s.jsonlines.senses.examples.text_tr',
    // 'aii_v_s.aii_v_tr',

    // aii vocalized
    'aii_v_s.aii_v',
    'aii_v_s.jsonlines.senses.examples.text',
  ],
  includeMatches: true,
  useExtendedSearch: true,
};

const fuseExtended = new Fuse(aiiDictionary, optionsExtended);

function query() {
  // long string test
  // ܐܲܡܝܼܪ̈ܘܵܬܹܐ ܥܵܪ̈ܵܒܵܝܵܬܹܐ ܡܚܲܝܕܵܬܹ̈ܐ

  // const searchStr = 'kalba';
  const searchStr = 'ܫܠܵܡܵܐ';

  const startsWith = fuseExtended.search(`^"${searchStr}"`);
  const includes = fuseExtended.search(`'" ${searchStr}"`);
  const includes2 = fuseExtended.search(`'"${searchStr}"`);

  // const startsWith = fuseExtended.search(`^"${searchStr}"`, { limit: 1 });
  // const includes = fuseExtended.search(`'" ${searchStr}"`, { limit: 1 });
  // const includes2 = fuseExtended.search(`'"${searchStr}"`, { limit: 1 });

  // console.log(startsWith.length, includes.length, includes2.length);
  const resultsDupes = [...startsWith, ...includes, ...includes2];
  const resultsDeduped = new Map();
  resultsDupes.forEach((item) => {
    resultsDeduped.set(item.refIndex, item);
  });

  // console.log([...resultsDeduped.values()]);
  console.log([...resultsDeduped.values()].length);

  // return [...resultsDeduped.values()];
}

console.time('test');
query();
query();
console.timeEnd('test');

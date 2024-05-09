// eslint-disable-next-line import/no-extraneous-dependencies
const Fuse = require('fuse.js');
const {
  aiiDictionaryTags,
} = require('../consts/aii-dict-tags');

const optionsExtended = {
  includeScore: true,
  keys: ['name'],
  includeMatches: true,
  useExtendedSearch: true,
};

const fuseExtended = new Fuse(aiiDictionaryTags, optionsExtended);

function query() {
  // long string test

  const searchStr = 'in';

  const startsWith = fuseExtended.search(`^"${searchStr}"`);
  const includes = fuseExtended.search(`'" ${searchStr}"`);
  const includes2 = fuseExtended.search(`'"${searchStr}"`);

  const resultsDupes = [...startsWith, ...includes, ...includes2];
  const resultsDeduped = new Map();
  resultsDupes.forEach((item) => {
    resultsDeduped.set(item.refIndex, item);
  });

  // console.log([...resultsDeduped.values()]);
  // console.log([...resultsDeduped.values()].length);

  return [...resultsDeduped.values()];
}

console.time('test');
query();
console.log(query());
console.timeEnd('test');

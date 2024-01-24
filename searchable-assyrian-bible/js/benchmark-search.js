// eslint-disable-next-line import/no-extraneous-dependencies
const Fuse = require('fuse.js');
const {
  searchableBible,
} = require('./searchable-bible.min');

const optionsExtended = {
  includeScore: true,
  keys: ['eng', 'tr'],
  // keys: ['aii'],
  // keys: ['aii_strip'],
  includeMatches: true,
  useExtendedSearch: true,
};

const fuseExtended = new Fuse(searchableBible, optionsExtended);
// const myIndex = Fuse.createIndex(optionsExtended.keys, searchableBible);
// const fuseExtended = new Fuse(searchableBible, optionsExtended, myIndex);

function parseHrtimeToSeconds(hrtime) {
  const seconds = (hrtime[0] + (hrtime[1] / 1e9)).toFixed(3);
  return seconds;
}

function measureExtendedSearch() {
  const startTime = process.hrtime();
  // long string test
  // ܐܲܡܝܼܪ̈ܘܵܬܹܐ ܥܵܪ̈ܵܒܵܝܵܬܹܐ ܡܚܲܝܕܵܬܹ̈ܐ

  const searchStr = 'but';
  // const searchStr = 'ܡܲܥܡܘܼܕܹܐ ܝܗ݇ܘܵܐ ܓܵܘ ܒܲܪܝܼܵܐ ܘܡܲܟܪܘܼܙܹܐ ܡܲܥܡܘܿܕܝܼܬܵܐ ܕܬܝܵܒ݂ܘܼܬܵܐ';
  // const searchStr = 'ܟܬܒܐ';

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

  const elapsedSeconds = parseHrtimeToSeconds(process.hrtime(startTime));
  // console.log([...resultsDeduped.values()].length);

  console.log(`It takes ${elapsedSeconds} seconds, extended search`);

  // return [...resultsDeduped.values()];
}

measureExtendedSearch();
measureExtendedSearch();

const optionsFuzzy = {
  includeScore: true,
  keys: ['tr'],
  includeMatches: true,
  distance: 575,
};
const fuseFuzzy = new Fuse(searchableBible, optionsFuzzy);
// const myIndex = Fuse.createIndex(optionsFuzzy.keys, searchableBible);
// const fuseFuzzy = new Fuse(searchableBible, optionsFuzzy, myIndex);

function measureFuzzySearch(searchStr) {
  const startTime = process.hrtime();
  // long string test
  // ܐܲܡܝܼܪ̈ܘܵܬܹܐ ܥܵܪ̈ܵܒܵܝܵܬܹܐ ܡܚܲܝܕܵܬܹ̈ܐ

  const results = fuseFuzzy.search(searchStr);
  // console.log(results[0]);
  // const results = fuseFuzzy.search(searchStr, { limit: 1 });

  const elapsedSeconds = parseHrtimeToSeconds(process.hrtime(startTime));
  console.log(`It takes ${elapsedSeconds} seconds, fuzzy search`);

  // return [...results.values()];
}

['o', 'on', 'ono', 'onom', 'onoma', 'onomat', 'onomato',
  'onomatop', 'onomatopo', 'onomatopoe', 'onomatopoei', 'onomatopoeia',
  // 's', 'shlama', 'isho', 'eesho', 'hello omg this is long',
  // 'dear brothers and sisters',
  // 'dear brothers and sisters dear brothers and sisters dear brothers and sisters dear brothers',
].forEach((searchStr) => {
  // measureFuzzySearch(searchStr);
});

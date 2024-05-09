let searchQuery = null;
const PAGINATE_AMT = 10;
const INITIAL_AMT = 30;
const IS_DICTIONARY = false;

// console.time('test');
const keys2D = [
  ['eng', 'tr'],
  ['aii'],
  ['aii_strip'],
];
const [fuseEng, fuseAiiVocalized, fuseAiiUnvocalized] = createFuseInstances(keys2D, searchableBible);
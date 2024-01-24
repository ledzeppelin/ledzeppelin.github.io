function extendedSearchOptions(keys) {
  return {
    includeScore: true,
    keys,
    useExtendedSearch: true,
    includeMatches: true,
  };
}

const fuseEng = new Fuse(searchableBible, extendedSearchOptions(['eng', 'tr']));
const fuseAiiVocalized = new Fuse(searchableBible, extendedSearchOptions(['aii']));
const fuseAiiUnvocalized = new Fuse(searchableBible, extendedSearchOptions(['aii_strip']));

// // translit
// const MAX_TR_LENGTH = 345; // from max-tr-length.js
// const TR_THRESHOLD = 0.6;
// const optionsTr = {
//   includeScore: true,
//   keys: ['tr'],
//   // ignoreLocation: true,
//   // ignoreFieldNorm: true,
//   includeMatches: true,
//   // distance: Math.floor(MAX_TR_LENGTH / TR_THRESHOLD),
//   threshold: TR_THRESHOLD,
// };
// // console.log(Math.floor(MAX_TR_LENGTH / TR_THRESHOLD));
// const fuseTr = new Fuse(searchableBible, optionsTr);

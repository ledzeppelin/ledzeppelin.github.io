let searchQuery = null;
const PAGINATE_AMT = 1;
const IS_DICTIONARY = true;

const keys2D = [
  [
    'aii_v_s.jsonlines.senses.gloss',
    'aii_v_s.aii_v_tr',
  ],
  [
    'aii_v_s.aii_v',
  ],
  [
    'aii_not_v',
  ],
];

let fuseEng, fuseAiiVocalized, fuseAiiUnvocalized, fuseTagsExact;

const dictionaryReady = new Promise((resolve) => {
  const script = document.createElement('script');
  script.src = 'js/consts/aii-dict.min.js';
  script.onload = () => {
    [fuseEng, fuseAiiVocalized, fuseAiiUnvocalized] = createFuseInstances(keys2D, aiiDictionary);

    const optionsTagged = {
      isCaseSensitive: true, // otherwise "reduce" in minVocalizedTR() fails since array is empty
      includeScore: true,
      keys: [
        'tier0_tags',
        'aii_v_s.tier1_tags',
        'aii_v_s.jsonlines.tier2_tags',
        'aii_v_s.jsonlines.senses.tier3_tags',
      ],
      useExtendedSearch: true,
      includeMatches: true,
    };
    fuseTagsExact = new Fuse(aiiDictionary, optionsTagged);

    resolve();
  };
  document.head.appendChild(script);
});

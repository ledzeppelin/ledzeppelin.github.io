let searchQuery = null;
const PAGINATE_AMT = 10;
const IS_DICTIONARY = true;

// console.time('test');
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
const [fuseEng, fuseAiiVocalized, fuseAiiUnvocalized] = createFuseInstances(keys2D, aiiDictionary);

const optionsTagged = {
  isCaseSensitive: true, // otherwise "reduce" in minVocalizedTR() fails since array is empty
  includeScore: true,
  keys: [
    'aii_v_s.tier1_tags',
    'aii_v_s.jsonlines.tier2_tags',
    'aii_v_s.jsonlines.senses.tier3_tags',
  ],
  useExtendedSearch: true,
  includeMatches: true,
};
const fuseTagsExact = new Fuse(aiiDictionary, optionsTagged);

const optionsTags = {
  includeScore: true,
  keys: [
    'name',
    'children.name',
  ],
  useExtendedSearch: true,
  includeMatches: true,
};
const fuseTags = new Fuse(aiiDictionaryTags, optionsTags);

function createFuseInstances(keys2D, searchObjectArray) {
  const instances = [];

  keys2D.forEach((keys) => {
    const options = {
      includeScore: true,
      keys,
      useExtendedSearch: true,
      includeMatches: true,
    };

    instances.push(new Fuse(searchObjectArray, options));
  });

  return instances;
}

function runExtendedSearchQuery(searchStr, fuse, isAii = false) {
  // https://www.fusejs.io/examples.html#extended-search
  // a good test case for this is the query "ear" - check ordering of "ear", "earth", "appear"
  // short words which are substrings of many other words are good to test as well
  // others: "me", "my", "so", "no", etc... (other two-letter words)
  //
  // for purposes of testing, when using extended search, query speed isn't too affected by query
  // length, so you can just key tapping a key to append to the query string when benchmarking
  //
  // empirically it seems that query speed increases by 25% every time dictionary size doubles

  // console.time('q speed');

  const COMMA = isAii ? '،' : ',';
  const CLOSE_PAREN = ')'; // changes to ')' for aii

  // comma suffix has precedence over space, ie "water," over compound words like "water cooler"
  const queryStrings = [
    // matches word isolates
    `="${searchStr}"`, // exact match
    `^"${searchStr}${COMMA}"`, // would match "Eat,"
    `^"${searchStr} "`, // would match "Eat "
    `'" ${searchStr}${COMMA}"`, // would match  " eat,"
    `'" ${searchStr}${CLOSE_PAREN}"`, // would match  " eat)", " ground)"
    `" ${searchStr}"$`, // would match sentence ending in " eat"
    `'" ${searchStr} "`, // would match " eat "
    // matches word isolates

    `^"${searchStr}"`, // would match "Eating "
    `'" ${searchStr}"`, // would match " eatery"
    `'"${searchStr}"`, // would match "feature", "weather", also ensures "b" highlights ḇarḇer instead of ḇarber
  ];

  // -------------------------------------------------------
  // results sorted by extended search type, then by score |
  // -------------------------------------------------------
  const resultsDeduped = new Map();
  queryStrings.forEach((queryString) => {
    fuse.search(queryString).forEach((item) => {
      resultsDeduped.set(item.refIndex, item);
    });
  });

  // console.timeEnd('q speed');

  // console.log([...resultsDeduped.values()].length);
  return [...resultsDeduped.values()];
}

function highlightEngIndices(s, indices) {
  // const indicies = [[0, 1], [3, 6]];
  // https://stackoverflow.com/a/42357954
  const fragment = $(document.createDocumentFragment());
  let i = 0;

  indices.forEach((index) => {
    const [start, end] = index;
    if (start > i) {
      // test case - match starts at i = 0
      fragment.append(s.slice(i, start));
    }
    fragment.append(
      $('<span/>', { class: 'highlighted', text: s.slice(start, end + 1) }),
    );
    i = end + 1;
  });
  if (i < s.length) {
    fragment.append(s.slice(i, s.length));
  }
  return fragment;
}

// i = 0
// [1, 3], [42, 54]
//  i
// -***------
// 0123456789

function wordRegexAiiV(aiiVQuery) {
  const firstChar = aiiVQuery[0];
  const lastChar = aiiVQuery.slice(-1);

  // conditionals safeguard against aiiVQuery padded with spaces or a punctuation marks
  let captureGroup = '(';
  if (AiiUtils.atLeastOneAiiVChar(firstChar)) {
    captureGroup += `${AiiUtils.aiiVCharClass}*`;
  }
  captureGroup += escapeStringRegexp(aiiVQuery);

  // console.log(aiiVQuery);
  // console.log(escapeStringRegexp(aiiVQuery));
  if (AiiUtils.atLeastOneAiiVChar(lastChar)) {
    captureGroup += `${AiiUtils.aiiVCharClass}*`;
  }
  captureGroup += ')';

  return new RegExp(captureGroup, 'g');
}

function wordRegexAiiNotV(aiiNotVQuery) {
  // ܐ ܒ ܓ ܕ
  const firstChar = aiiNotVQuery[0];
  const lastChar = aiiNotVQuery.slice(-1);

  // conditionals safeguard against aiiNotVQuery padded with spaces or a punctuation marks
  let captureGroup = '(';
  if (AiiUtils.atLeastOneAiiLetter(firstChar)) {
    captureGroup += `${AiiUtils.aiiVCharClass}*`;
  }
  const aiiChars = aiiNotVQuery.split('').map((char) => escapeStringRegexp(char));
  const sandwich = aiiChars.join(`${AiiUtils.diacriticCharClass}*`);
  captureGroup += sandwich;
  if (AiiUtils.atLeastOneAiiLetter(lastChar)) {
    captureGroup += `${AiiUtils.aiiVCharClass}*`;
  }
  captureGroup += ')';

  return new RegExp(captureGroup, 'g');
}

function regexHighlight(s, re, highlightClass) {
  const fragment = $(document.createDocumentFragment());
  let i = 0;
  s.replace(re, (match, $1, start) => {
    // https://stackoverflow.com/a/49262416
    if (start > i) {
      // test case - match starts at i = 0
      fragment.append(s.slice(i, start));
    }
    fragment.append(
      $('<span/>', { class: highlightClass, text: $1 }),
    );
    i = start + match.length;
    // Return the replacement leveraging the parameters.
  });
  if (i < s.length) {
    fragment.append(s.slice(i, s.length));
  }

  return fragment;
}

function padAiiV(aiiV, re) {
  // takes an aii string and pads the matching words w/ delimiters
  const sDelimiter = ' ❋ '; // we use uncommon dingbat
  const eDelimiter = ' ❊ '; // we use uncommon dingbat
  return aiiV.replaceAll(re, `${sDelimiter}$1${eDelimiter}`);
}

function highlightPaddedTr(tr) {
  const sDelimiter = ' ❋ '; // we use uncommon dingbat
  const eDelimiter = ' ❊ '; // we use uncommon dingbat

  const re = new RegExp(`${sDelimiter}(.*?)${eDelimiter}`, 'g');
  return regexHighlight(tr, re, 'highlighted2');
}

// from https://github.com/sindresorhus/escape-string-regexp/blob/main/index.js
function escapeStringRegexp(string) {
  if (typeof string !== 'string') {
    throw new TypeError('Expected a string');
  }

  // Escape characters with special meaning either inside or outside character sets.
  // Use a simple backslash escape when it’s always valid, and a `\xnn` escape when
  // the simpler form would be disallowed by Unicode patterns’ stricter grammar.
  return string
    .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
    .replace(/-/g, '\\x2d');
}

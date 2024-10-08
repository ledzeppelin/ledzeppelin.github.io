$(document).ready(() => {
  function paramsToString2(key, value) {
    // https://stackoverflow.com/a/14269897
    // we use don't want to percent encode colon since it affects human-readability of url
    const params = new URLSearchParams();
    params.set(key, value);
    // return params.toString();
    return params.toString().replaceAll('%3A', ':');
  }

  const DICT_CANONICAL_URL = 'https://www.sharrukin.io/assyrian-dictionary/'; // window.location.href
  let searchQuery;
  function shouldLoadMore() {
    const lastRes = $('#search-results').children().last();
    if (lastRes.length) {
      // https://stackoverflow.com/a/3898152
      const isTopOfLastVisible = $(window).scrollTop() + $(window).height() >= lastRes.offset().top;
      // eslint-disable-next-line max-len
      if (isTopOfLastVisible && searchQuery !== null && searchQuery.i < searchQuery.results.length) {
        return true;
      }
    }
    return false;
  }

  $(window).scroll(() => {
    if (shouldLoadMore()) {
      loadResults(searchQuery, PAGINATE_AMT);
    }
  });

  // ---------
  // hotkeys |
  // ---------
  document.addEventListener('keydown', (event) => {
    if (event.key === '/' && !$('#searchbar').is(':focus')) {
      // otherwise '/' gets typed into #searchbar, per
      // https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/
      event.preventDefault();
      $('#searchbar').focus();
    } else if (event.key === 'Escape' && $('#searchbar').is(':focus')) {
      $('#searchbar').blur();
    }
  });

  $('#searchbar').on('focus', () => {
    $('#autofocus-tip-container').hide();
  });

  $('#searchbar').on('blur', (e) => {
    if ($(e.currentTarget).val().length === 0) {
      // console.log('showing');
      $('#autofocus-tip-container').show();
    }
  });

  function minVocalizedTR(searchStr, aiiVs) {
    // we want to sort by those transliterations which will be shown, otherwise
    // 'from:Sumerian' would have 'gareh' as the first since its sorting by 'aghra' (not shown)

    // gather all tags into set
    const translits = [];

    aiiVs.forEach((aiiV) => {
      const tags = new Set();

      if ('tier1_tags' in aiiV) {
        aiiV.tier1_tags.forEach((tag) => tags.add(tag));
      }

      aiiV.jsonlines.forEach((jsonline) => {
        if ('tier2_tags' in jsonline) {
          jsonline.tier2_tags.forEach((tag) => tags.add(tag));
        }

        if ('senses' in jsonline) {
          jsonline.senses.forEach((sense) => {
            if ('tier3_tags' in sense) {
              sense.tier3_tags.forEach((tag) => tags.add(tag));
            }
          });
        }
      });

      if (tags.has(searchStr)) {
        translits.push(aiiV.aii_v_tr);
      }
    });

    return translits.reduce((min, c) => (c < min ? c : min));
  }

  $('#searchbar').on('input', (e) => {
    const searchStr = $(e.currentTarget).val();

    if (IS_DICTIONARY) {
      tagSearchClearHighlightedMatches();
      $('#numbers-table').children().hide();
      $('#tagged-results-meta').hide();
    }

    if (searchStr.length === 0) {
      // https://stackoverflow.com/a/51169659
      $('#searchbar').removeClass('aii-search-text');
      $('#clear-text').hide();
      $('#search-results').empty();
      searchQuery = null; // not needed but helps readability
      window.history.replaceState(null, document.title, window.location.pathname);
    } else {
      $('#clear-text').show();

      if (AiiUtils.atLeastOneAiiLetter(searchStr)) {
        $('#searchbar').addClass('aii-search-text');
        $('#clear-text').addClass('clear-aii-text');

        if (AiiUtils.atLeastOneDiacritic(searchStr)) {
          // console.log('vocalized search');
          const normalizedSearchStr = searchStr.normalize('NFC');
          searchQuery = {
            results: runExtendedSearchQuery(normalizedSearchStr, fuseAiiVocalized, true),
            aii_v_query: normalizedSearchStr,
          };
        } else {
          // console.log('unvocalized search');
          searchQuery = {
            results: runExtendedSearchQuery(searchStr, fuseAiiUnvocalized, true),
            aii_not_v_query: searchStr,
          };
        }
      } else {
        // console.log('hello');
        $('#searchbar').removeClass('aii-search-text');
        $('#clear-text').removeClass('clear-aii-text');
        // handles english query for both dictionary and searchable bible

        if (IS_DICTIONARY) {
          const tagSearchResults = fuseTags.search(`'"${searchStr}"`);
          tagSearchHighlightMatches(tagSearchResults);
        }

        searchQuery = {
          // eslint-disable-next-line max-len
          results: runExtendedSearchQuery(searchStr, fuseEng),
        };
      }

      searchQuery.i = 0;
      // console.time('test2');
      $('#search-results').empty();

      if (IS_DICTIONARY) {
        // shouldLoadMore needs at least 1 element to determine if we've scrolled past any part of
        //  that element so we call it once before while loop
        loadResults(searchQuery, 1);
        while (shouldLoadMore()) {
          loadResults(searchQuery, 1);
        }
      } else {
        loadResults(searchQuery, INITIAL_AMT);
      }

      const url = new URL(window.location.href);
      url.search = paramsToString2('search', searchStr);
      window.history.replaceState(null, '', url);
    }
  });

  $('#clear-text').on('click', () => {
    // we trigger input to both clear results and hide clear-text
    $('#searchbar').val('').focus().trigger('input');
  });

  if (IS_DICTIONARY) {
    $('#tag-search-results').html(createTagSearchFragment(aiiDictionaryTags));
    $('#numbers-table').html(createTableFrag(aiiNumbersTable));
  }

  // read query string params if set
  const url = new URL(window.location.href);
  const params = new URLSearchParams(document.location.search);

  if (IS_DICTIONARY && params.has('tag-search')) {
    const tagSearchParam = params.get('tag-search');
    if (tagSearchParam.length) {
      let tagExactSearchResults = [];
      let shouldLoadTagExactSearchResults = false;
      // console.time('tag');
      tagExactSearchResults = fuseTagsExact.search(`="${tagSearchParam}"`);

      if (tagSearchParam === 'table:Numbers Table') {
        searchQuery = {
          results: [],
        };

        tagSearchHighlightExactMatch(tagSearchParam);
        $('#numbers-table').children().show();
      } else if (tagSearchParam === 'special:Common Words') {
        const compareFn = (a, b) => (
          a.item.min_common_word_idx < b.item.min_common_word_idx ? -1 : 1
        );

        tagSearchHighlightExactMatch(tagSearchParam);
        searchQuery = {
          results: tagExactSearchResults.sort(compareFn),
          searchingCommonWords: true,
        };
        shouldLoadTagExactSearchResults = true;
      } else if (tagSearchParam === 'pos:numeral') {
        const compareFn = (a, b) => (
          a.item.min_numeral_idx < b.item.min_numeral_idx ? -1 : 1
        );

        tagSearchHighlightExactMatch(tagSearchParam);
        searchQuery = {
          results: tagExactSearchResults.sort(compareFn),
          searchingCommonWords: true,
        };
        shouldLoadTagExactSearchResults = true;
      } else if (tagExactSearchResults.length) {
        const compareFn = (a, b) => (
          // eslint-disable-next-line max-len
          minVocalizedTR(tagSearchParam, a.item.aii_v_s) < minVocalizedTR(tagSearchParam, b.item.aii_v_s) ? -1 : 1
        );

        tagSearchHighlightExactMatch(tagSearchParam);
        searchQuery = {
          results: tagExactSearchResults.sort(compareFn),
        };
        shouldLoadTagExactSearchResults = true;
      }

      if (shouldLoadTagExactSearchResults) {
        const matchNotTopTag = $('#tag-search-results').find('.exact-search-match').length === 0;
        if (matchNotTopTag) {
          const matchedTagName = tagSearchParam.split(/:(.+)/)[1];
          $('#matched-tag').text(matchedTagName);
          $('#tagged-results-meta').show();
        }
        searchQuery.i = 0;
        loadResults(searchQuery, 1);
        while (shouldLoadMore()) {
          loadResults(searchQuery, 1);
        }

        url.search = paramsToString2('tag-search', tagSearchParam);
        window.history.replaceState(null, '', url);
      }
    } else {
      window.history.replaceState(null, document.title, window.location.pathname);
    }
  } else if (IS_DICTIONARY && params.has('aii-exact-search')) {
    const aiiExactSearchParam = params.get('aii-exact-search');
    if (aiiExactSearchParam.length) {
      searchQuery = {
        results: fuseAiiVocalized.search(`="${aiiExactSearchParam}"`),
        aii_v_query: aiiExactSearchParam,
        i: 0,
      };
      loadResults(searchQuery, 1, true);
      const search = paramsToString2('aii-exact-search', aiiExactSearchParam);
      $('#canonical-link').attr('href', `${DICT_CANONICAL_URL}?${search}`);
      url.search = search;
      window.history.replaceState(null, '', url);
    } else {
      window.history.replaceState(null, document.title, window.location.pathname);
    }
  } else if (params.has('search')) {
    const searchParam = params.get('search');
    if (searchParam.length) {
      // console.log('hide it');
      $('#autofocus-tip-container').hide();
      $('#searchbar').val(searchParam).trigger('input');
    } else {
      window.history.replaceState(null, document.title, window.location.pathname);
    }
  }
});

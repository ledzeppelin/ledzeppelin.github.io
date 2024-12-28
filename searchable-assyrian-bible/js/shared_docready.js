$(document).ready(() => {
  console.time('shared docready load');
  const DICT_APP_NAME = 'assyrian-dictionary';
  const APP_NAME = IS_DICTIONARY ? DICT_APP_NAME : 'searchable-assyrian-bible';

  let searchQuery;
  function shouldLoadMore() {
    const lastRes = $('#search-results').children().last();
    if (lastRes.length) {
      // https://stackoverflow.com/a/3898152
      // lastRes.offset().top means distance from top of doc to top border of element

      const viewportHeight = Math.max(
        window.visualViewport ? window.visualViewport.height : 0,
        $(window).height(),
      );

      const slack = 0; // if scroll is choppy, increase this

      // eslint-disable-next-line max-len
      const isTopOfLastVisible = $(window).scrollTop() + viewportHeight + slack >= lastRes.offset().top;
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

  $('#searchbar').on('input', (e) => {
    // when people use auto-complete on mobile, trim trailing whitespace
    console.time('keystroke');
    const searchStr = $(e.currentTarget).val().trim();

    if (IS_DICTIONARY) {
      topTagsMenuClearHighlightedMatches();
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
      $('#canonical-link').attr('href', `https://www.sharrukin.io/${APP_NAME}/`);
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
            ...(IS_DICTIONARY && { queryType: DictionaryQueryType.AII_VOCALIZED }),
          };
        } else {
          // console.log('unvocalized search');
          searchQuery = {
            results: runExtendedSearchQuery(searchStr, fuseAiiUnvocalized, true),
            aii_not_v_query: searchStr,
            ...(IS_DICTIONARY && { queryType: DictionaryQueryType.AII_UNVOCALIZED }),
          };
        }
      } else {
        // console.log('hello');
        $('#searchbar').removeClass('aii-search-text');
        $('#clear-text').removeClass('clear-aii-text');
        // handles english query for both dictionary and searchable bible

        if (IS_DICTIONARY) {
          const tagSearchResults = fuseTags.search(`'"${searchStr}"`);
          topTagsMenuHighlightMatches(tagSearchResults);
        }

        searchQuery = {
          // eslint-disable-next-line max-len
          results: runExtendedSearchQuery(searchStr, fuseEng),
          ...(IS_DICTIONARY && { queryType: DictionaryQueryType.ENG }),
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
      AiiUtils.updateURL(url, APP_NAME, [['search', searchStr]]);
    }
    console.timeEnd('keystroke');
  });

  $('#clear-text').on('click', () => {
    // we trigger input to both clear results and hide clear-text
    $('#searchbar').val('').focus().trigger('input');
  });

  if (IS_DICTIONARY) {
    $('#top-tags-menu').html(createTopTagsMenuFragment(aiiDictionaryTags));
  }

  // read query string params if set
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  if (IS_DICTIONARY && params.has('tag-search')) {
    const tagSearchParam = params.get('tag-search');
    if (tagSearchParam.length) {
      let tagExactSearchResults = [];
      let shouldLoadTagExactSearchResults = false;
      // console.time('tag');
      tagExactSearchResults = fuseTagsExact.search(`="${tagSearchParam}"`);

      if (tagSearchParam === 'special:numbers table') {
        searchQuery = {
          results: [],
        };

        $('#numbers-table').html(createTableFrag(aiiNumbersTable)).children().show();
        shouldLoadTagExactSearchResults = true;
      } else if (tagSearchParam === 'special:common word') {
        const compareFn = (a, b) => (
          a.item.min_common_word_idx < b.item.min_common_word_idx ? -1 : 1
        );

        searchQuery = {
          results: tagExactSearchResults.sort(compareFn),
          queryType: DictionaryQueryType.TAG,
        };
        shouldLoadTagExactSearchResults = true;
      } else if (tagSearchParam === 'pos:numeral') {
        const compareFn = (a, b) => (
          a.item.min_numeral_idx < b.item.min_numeral_idx ? -1 : 1
        );

        searchQuery = {
          results: tagExactSearchResults.sort(compareFn),
          queryType: DictionaryQueryType.TAG,
        };
        shouldLoadTagExactSearchResults = true;
      } else if (tagExactSearchResults.length) {
        const compareFn = (a, b) => (
          // eslint-disable-next-line max-len
          minVocalizedTR(tagSearchParam, a.item.aii_v_s) < minVocalizedTR(tagSearchParam, b.item.aii_v_s) ? -1 : 1
        );

        searchQuery = {
          results: tagExactSearchResults.sort(compareFn),
          queryType: DictionaryQueryType.TAG,
        };
        shouldLoadTagExactSearchResults = true;
      }

      if (shouldLoadTagExactSearchResults) {
        highlightExactMatchInTopTagsMenu(tagSearchParam);
        const matchedTagName = tagSearchParam.split(/:(.+)/)[1];
        $('#matched-tag').text(matchedTagName);
        $('#tagged-results-meta').show();

        searchQuery.i = 0;
        loadResults(searchQuery, 1);
        while (shouldLoadMore()) {
          loadResults(searchQuery, 1);
        }

        AiiUtils.updateURL(url, DICT_APP_NAME, [['tag-search', tagSearchParam]]);
      }
    } else {
      window.history.replaceState(null, document.title, window.location.pathname);
      $('#canonical-link').attr('href', `https://www.sharrukin.io/${DICT_APP_NAME}/`);
    }
  } else if (IS_DICTIONARY && params.has('aii-exact-search')) {
    const aiiExactSearchParam = params.get('aii-exact-search');
    if (aiiExactSearchParam.length) {
      searchQuery = {
        results: fuseAiiVocalized.search(`="${aiiExactSearchParam}"`),
        aii_v_query: aiiExactSearchParam,
        i: 0,
        queryType: DictionaryQueryType.AII_EXACT_SEARCH,
      };
      loadResults(searchQuery, 1);

      AiiUtils.updateURL(url, DICT_APP_NAME, [['aii-exact-search', aiiExactSearchParam]]);
    } else {
      window.history.replaceState(null, document.title, window.location.pathname);
      $('#canonical-link').attr('href', `https://www.sharrukin.io/${DICT_APP_NAME}/`);
    }
  } else if (params.has('search')) {
    const searchParam = params.get('search');
    if (searchParam.length) {
      // console.log('hide it');
      $('#autofocus-tip-container').hide();
      $('#searchbar').val(searchParam).trigger('input');
    } else {
      window.history.replaceState(null, document.title, window.location.pathname);
      $('#canonical-link').attr('href', `https://www.sharrukin.io/${APP_NAME}/`);
    }
  }

  console.timeEnd('shared docready load');
});

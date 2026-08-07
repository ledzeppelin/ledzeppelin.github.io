$(document).ready(() => {
  console.time('shared docready load');

  // TEMP -- remove before committing
  // document.body.style.backgroundColor = '#e4f0f6'; // blue

  const DICT_APP_NAME = 'assyrian-dictionary';
  const APP_NAME = IS_DICTIONARY ? DICT_APP_NAME : 'searchable-assyrian-bible';
  const DICT_TAG_SEARCH_PARAM = 'tag';
  const DICT_AII_EXACT_SEARCH_PARAM = 'assyrian-word';
  const ASSYRIAN_ENGLISH_DICTIONARY = 'assyrian-english dictionary';

  let searchQuery;

  const updateDictionaryTitle = (title = ASSYRIAN_ENGLISH_DICTIONARY) => {
    // so SERP will contain the updated title
    document.title = title;
    document.querySelector('meta[property="og:title"]').content = title;
    document.querySelector('meta[name="twitter:title"]').content = title;
  };

  const tagQueryStringToGroupAndTitle = (str, l2FullNames) => {
    const colon = str.indexOf(':');
    const key = str.slice(0, colon);
    const value = str.slice(colon + 1);

    return [l2FullNames[key], value];
  };

  // ----------------------------------------------
  // infinite scroll, via a sentinel after the list |
  // ----------------------------------------------
  const sentinel = document.createElement('div');
  sentinel.id = 'load-more-sentinel';
  sentinel.style.height = '1px'; // a zero-area target always reports intersectionRatio 0
  document.querySelector('#search-results').after(sentinel);

  let observerCallbacks = 0;

  // eslint-disable-next-line no-unused-vars
  function renderLoadMoreDebug(entry) {
    observerCallbacks += 1;

    // rootBounds is the viewport the browser resolved, rootMargin included. positive means
    // the sentinel has crossed the load line, negative means it hasn't reached it yet.
    const pxPastLoadLine = entry.rootBounds
      ? Math.round(entry.rootBounds.bottom - entry.boundingClientRect.top)
      : 'n/a';

    $('#scroll-debug').text(`\nobserver callbacks  ${observerCallbacks}\nsentinel            ${entry.isIntersecting ? 'in view' : 'out of view'}\npx past load        ${pxPastLoadLine}\n---\nloaded              ${searchQuery ? `${searchQuery.i} / ${searchQuery.results.length}` : '0 / 0'}`);
  }

  // callback runs when sentinel enters, leaves, or when scheduleLoadMoreCheck() is invoked
  const loadMoreObserver = new IntersectionObserver(([entry]) => {
    // renderLoadMoreDebug(entry);

    if (!entry.isIntersecting) {
      return;
    }

    // == checks if null or undefined, as opposed to ===
    if (searchQuery == null || searchQuery.i >= searchQuery.results.length) {
      return;
    }

    // appears as several vocalized per unvocalized "result"
    loadResults(searchQuery, PAGINATE_AMT);

    scheduleLoadMoreCheck();
  }, {
    rootMargin: '0px 0px 400px 0px',
  });

  function scheduleLoadMoreCheck() {
    // forces the callback to run with the sentinel's current state.
    loadMoreObserver.unobserve(sentinel);
    loadMoreObserver.observe(sentinel);
  }

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

  // dismiss the mobile keyboard once a drag starts, to free up room for results.
  const blurSearchbarOnDrag = (e) => {
    // closest() so a text-selection drag inside the input is left alone
    if (!e.target.closest('#searchbar-container')) {
      $('#searchbar').blur();
    }
  };

  $('#searchbar').on('focus', () => {
    $('#autofocus-tip-container').hide();

    document.body.classList.add('search-engaged');
    document.addEventListener('touchmove', blurSearchbarOnDrag, {passive: true});
  });

  $('#searchbar').on('blur', (e) => {
    document.removeEventListener('touchmove', blurSearchbarOnDrag);
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
      $('#numbers-table').children().hide();
      if (searchStr.length === 0) {
        $('#top-tags-container').show();
      } else {
        $('#top-tags-container').hide();
      }
    }

    if (searchStr.length === 0) {
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

        if (AiiUtils.atLeastOneDiacritic(searchStr)) {
          // console.log('vocalized search');
          const normalizedSearchStr = searchStr.normalize('NFC');
          searchQuery = {
            results: runExtendedSearchQuery(normalizedSearchStr, fuseAiiVocalized, true),
            aii_v_query: normalizedSearchStr,
            ...(IS_DICTIONARY && {queryType: DictionaryQueryType.AII_VOCALIZED}),
          };
        } else {
          // console.log('unvocalized search');
          searchQuery = {
            results: runExtendedSearchQuery(searchStr, fuseAiiUnvocalized, true),
            aii_not_v_query: searchStr,
            ...(IS_DICTIONARY && {queryType: DictionaryQueryType.AII_UNVOCALIZED}),
          };
        }
      } else {
        $('#searchbar').removeClass('aii-search-text');

        searchQuery = {
          results: runExtendedSearchQuery(searchStr, fuseEng),
          ...(IS_DICTIONARY && {queryType: DictionaryQueryType.ENG}),
        };
      }

      searchQuery.i = 0;
      // console.time('test2');
      $('#search-results').empty();

      loadResults(searchQuery, INITIAL_AMT);
      scheduleLoadMoreCheck();

      if (IS_DICTIONARY && document.title !== ASSYRIAN_ENGLISH_DICTIONARY) {
        updateDictionaryTitle();
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

  // read query string params if set
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  if (IS_DICTIONARY) {
    const shouldLimit = params.has(DICT_TAG_SEARCH_PARAM) || params.has(DICT_AII_EXACT_SEARCH_PARAM);
    $('#top-tags-menu').html(createTopTagsMenuFragment(aiiDictionaryTags, shouldLimit));
  }

  if (IS_DICTIONARY && params.has(DICT_TAG_SEARCH_PARAM)) {
    const tagSearchParam = params.get(DICT_TAG_SEARCH_PARAM);
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
      } else if (tagSearchParam === 'special:commonly used') {
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
      } else if (tagSearchParam === 'special:assyrian alphabet') {
        const compareFn = (a, b) => (
          a.item.alpha_idx < b.item.alpha_idx ? -1 : 1
        );

        searchQuery = {
          results: tagExactSearchResults.sort(compareFn),
          queryType: DictionaryQueryType.TAG,
        };
        shouldLoadTagExactSearchResults = true;
      } else if (tagExactSearchResults.length) {
        const compareFn = (a, b) => (
          minVocalizedTR(tagSearchParam, a.item) < minVocalizedTR(tagSearchParam, b.item) ? -1 : 1
        );

        searchQuery = {
          results: tagExactSearchResults.sort(compareFn),
          queryType: DictionaryQueryType.TAG,
        };
        shouldLoadTagExactSearchResults = true;
      }

      if (shouldLoadTagExactSearchResults) {
        searchQuery.i = 0;
        loadResults(searchQuery, INITIAL_AMT);
        scheduleLoadMoreCheck();

        const [tagSection, tagName] = tagQueryStringToGroupAndTitle(
          tagSearchParam,
          Object.fromEntries(aiiDictionaryTags.map(({tag_key, name}) => [tag_key, name])),
        );

        $('#search-results').prepend(createTagMetaFrag(tagName, tagSection));

        updateDictionaryTitle(`${tagSection}: ${tagName}`);
        AiiUtils.updateURL(url, DICT_APP_NAME, [[DICT_TAG_SEARCH_PARAM, tagSearchParam]]);
      }
    } else {
      window.history.replaceState(null, document.title, window.location.pathname);
      $('#canonical-link').attr('href', `https://www.sharrukin.io/${DICT_APP_NAME}/`);
    }
  } else if (IS_DICTIONARY && params.has(DICT_AII_EXACT_SEARCH_PARAM)) {
    const aiiExactSearchParam = params.get(DICT_AII_EXACT_SEARCH_PARAM);
    if (aiiExactSearchParam.length) {
      searchQuery = {
        results: fuseAiiVocalized.search(`="${aiiExactSearchParam}"`),
        aii_v_query: aiiExactSearchParam,
        i: 0,
        queryType: DictionaryQueryType.AII_EXACT_SEARCH,
      };

      // we set this to surface typos where a vocalized headword appears in different
      // unvocalized articles, ex. ܒܪ̈ܲܚܡܹܐ
      const maxNumUnvocalized = 5;
      loadResults(searchQuery, maxNumUnvocalized);

      updateDictionaryTitle(aiiExactSearchParam);
      AiiUtils.updateURL(url, DICT_APP_NAME, [[DICT_AII_EXACT_SEARCH_PARAM, aiiExactSearchParam]]);
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

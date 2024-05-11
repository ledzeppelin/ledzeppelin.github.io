$(document).ready(() => {
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

  // function minVocalized(aiiVs) {
  //   return aiiVs.reduce((prev, curr) => {
  //     if (prev.aii_v_tr < curr.aii_v_tr) {
  //       return prev;
  //     }
  //     return curr;
  //   }).aii_v_tr;
  // }

  function minVocalized(searchStr, aiiVs) {
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
    }

    if (searchStr.length === 0) {
      // https://stackoverflow.com/a/51169659
      $('#searchbar').removeClass('aii-search-text');
      $('#clear-text').hide();
      $('#search-results').empty();
      searchQuery = null; // not needed but helps readability
      window.history.replaceState({}, document.title, window.location.pathname);
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
            aii_v_query: searchStr,
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
        let tagExactSearchResults = [];
        if (IS_DICTIONARY) {
          // console.time('tag');
          tagExactSearchResults = fuseTagsExact.search(`="${searchStr}"`);
          const searchingCommonWords = searchStr === 'special:Common Words';
          if (searchingCommonWords) {
            const compareFn = (a, b) => (
              a.item.min_common_word_idx < b.item.min_common_word_idx ? -1 : 1
            );

            tagSearchHighlightExactMatch(searchStr);
            searchQuery = {
              results: tagExactSearchResults.sort(compareFn),
              searchingCommonWords: true,
            };
          } else if (tagExactSearchResults.length) {
            // console.log(tagExactSearchResults);
            const compareFn = (a, b) => (
              // eslint-disable-next-line max-len
              minVocalized(searchStr, a.item.aii_v_s) < minVocalized(searchStr, b.item.aii_v_s) ? -1 : 1
              // a.item.aii_v_s[0].aii_v_tr < b.item.aii_v_s[0].aii_v_tr ? -1 : 0
            );

            tagSearchHighlightExactMatch(searchStr);
            searchQuery = {
              results: tagExactSearchResults.sort(compareFn),
            };
          } else {
            // console.time('tag search');
            // todo: prefix, then includes for fuse
            const tagSearchResults = fuseTags.search(`'"${searchStr}"`);

            tagSearchHighlightMatches(tagSearchResults);
            searchQuery = {
              results: runExtendedSearchQuery(searchStr, fuseEng),
            };
          }
        } else {
          searchQuery = {
            // eslint-disable-next-line max-len
            results: runExtendedSearchQuery(searchStr, fuseEng),
          };
        }
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
      // console.timeEnd('test2');

      const url = new URL(window.location);
      url.searchParams.set('search', searchStr);
      // https://stackoverflow.com/a/14269897
      // we use don't want to percent encode colon since it affects human-readability of url
      // percent encoded colon '%3A' can only occur in query string parameter's value
      // therefore we can replace all without breaking url.origin or url.pathname
      window.history.replaceState(null, '', url.toString().replaceAll('%3A', ':'));
    }
  });

  $('#clear-text').on('click', () => {
    // we trigger input to both clear results and hide clear-text
    $('#searchbar').val('').focus().trigger('input');
  });

  if (IS_DICTIONARY) {
    $('#tag-search-results').html(createTagSearchFragment(aiiDictionaryTags));
  }

  // trigger input on loading if query string param is set
  const url = new URL(window.location);
  const params = new URLSearchParams(document.location.search);
  if (params.has('search')) {
    // this will decode qs param and it ultimately gets encoded again
    // when calling window.history.replaceState - we want this so spaces
    // are normalized from "hello world" to "hello+world" instad of "hello%20world"
    const searchParam = params.get('search');
    if (searchParam.length) {
      // console.log('hide it');
      $('#autofocus-tip-container').hide();
      $('#searchbar').val(searchParam).trigger('input');
    } else {
      url.searchParams.delete('search');
      // window.history.replaceState(null, '', url.toString());
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }
});

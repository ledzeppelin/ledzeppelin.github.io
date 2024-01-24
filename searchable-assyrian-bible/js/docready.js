$(document).ready(() => {
  let searchQuery = null;
  const PAGINATE_AMT = 10;
  const INITIAL_AMT = 30;

  $(window).scroll(() => {
    const lastResult = $('#search-results').children().last();
    // not sure if this if statement is needed since we only expect scroll event
    // to fire if #search-results is empty

    if (lastResult.length) {
      const topOffset = lastResult.offset().top;
      // https://stackoverflow.com/a/3898152
      const distanceFromLoadMore = topOffset - $(window).scrollTop() - $(window).height();
      const shouldLoadMore = distanceFromLoadMore < 0;
      // console.log($(document).height());
      if (shouldLoadMore) {
        // console.log('start loading more');
        if (searchQuery !== null && searchQuery.i < searchQuery.results.length) {
          // console.time('test');
          loadResults(searchQuery, PAGINATE_AMT);
          // console.timeEnd('test');
        }
      }
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
    const searchStr = $(e.currentTarget).val();

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
            results: runExtendedSearchQuery(normalizedSearchStr, fuseAiiVocalized),
            aii_v_query: searchStr,
          };
        } else {
          // console.log('unvocalized search');
          searchQuery = {
            results: runExtendedSearchQuery(searchStr, fuseAiiUnvocalized),
            aii_not_v_query: searchStr,
          };
        }
      } else {
        // console.log('hello');
        $('#searchbar').removeClass('aii-search-text');
        $('#clear-text').removeClass('clear-aii-text');

        searchQuery = {
          results: runExtendedSearchQuery(searchStr, fuseEng),
        };
        // console.log(engResults.length, results.length);
      }
      searchQuery.i = 0;
      // console.time('test2');
      $('#search-results').empty();
      loadResults(searchQuery, INITIAL_AMT);
      // console.timeEnd('test2');

      const url = new URL(window.location);
      url.searchParams.set('search', searchStr);
      window.history.replaceState(null, '', url.toString());
    }
  });

  $('#clear-text').on('click', () => {
    $('#searchbar').val('').focus().trigger('input'); // we trigger input to both clear results and hide clear-text
  });

  // trigger input on loading if query string param is set
  const url = new URL(window.location);
  const params = new URLSearchParams(document.location.search);
  if (params.has('search')) {
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

$(document).ready(() => {
  $('#reading-level').change((e) => {
    const readingLevelInit = parseInt($(e.currentTarget).val(), 10);
    // this logic is all copied from query string parameter logic later in this file
    // eslint-disable-next-line max-len
    const [readingLevelUnused, bookShortName, chapter, startHighlight, endHighlight] = processQueryStringParams();
    if (bookShortName !== null && chapter !== null && startHighlight !== null) {
      // the purpose of this logic is to maintain highlights when someone changes reading level
      const parents = ['.aii-verse', '.aii-tr', '.eng-verse'];
      if (endHighlight !== null) {
        // 1. highlight range of verses
        const highlightVerses = `${chapter}:${startHighlight}-${endHighlight}`;
        // eslint-disable-next-line max-len, object-curly-newline
        setDisplayedVerses({ readingLevelInit, bookShortNameInit: bookShortName, chapterInit: chapter, highlightVerses });
        parents.forEach((parent) => $(`${parent} .highlightable`).slice(startHighlight - 1, endHighlight).addClass('highlighted'));
      } else {
        // 2. highlight a single verse
        const highlightVerses = `${chapter}:${startHighlight}`;
        // eslint-disable-next-line max-len, object-curly-newline
        setDisplayedVerses({ readingLevelInit, bookShortNameInit: bookShortName, chapterInit: chapter, highlightVerses });
        parents.forEach((parent) => $(`${parent} .highlightable`).slice(startHighlight - 1, startHighlight).addClass('highlighted'));
      }
    } else {
      setDisplayedVerses({ readingLevelInit });
    }
  });

  // https://stackoverflow.com/a/40309949
  // $(e.currentTarget) instead of $(this) for es6 arrow syntax
  $('#books').change((e) => {
    const bookShortName = $(e.currentTarget).val();
    setNumChapters(bible[bookShortName].length);
    setDisplayedVerses({ bookShortNameInit: bookShortName, chapterInit: 1 });
    scrollToStartOfBook();
  });

  $('#chapters').change((e) => {
    setDisplayedVerses({ chapterInit: parseInt($(e.currentTarget).val(), 10) });
    scrollToStartOfBook();
  });

  $('#next-chapter').click(() => {
    // https://stackoverflow.com/a/43138852
    if ($('#chapters option:selected').next().length > 0) {
      $('#chapters option:selected').next().prop('selected', 'selected');
      setDisplayedVerses({});
      scrollToStartOfBook();
    } else if ($('#books option:selected').next().length > 0) {
      $('#books option:selected').next().prop('selected', 'selected');
      const bookShortName = $('#books').find(':selected').val();
      setNumChapters(bible[bookShortName].length);
      setDisplayedVerses({ bookShortNameInit: bookShortName });
      scrollToStartOfBook();
    }
  });

  $('#prev-chapter').click(() => {
    if ($('#chapters option:selected').prev().length > 0) {
      $('#chapters option:selected')
        .prev()
        .prop('selected', 'selected');
      setDisplayedVerses({});
      scrollToStartOfBook();
    } else if ($('#books option:selected').prev().length > 0) {
      $('#books option:selected')
        .prev()
        .prop('selected', 'selected');
      const bookShortName = $('#books').find(':selected').val();
      setNumChapters(bible[bookShortName].length);
      $('#chapters').val(bible[bookShortName].length);
      // eslint-disable-next-line max-len
      setDisplayedVerses({ bookShortNameInit: bookShortName, chapterInit: bible[bookShortName].length });
      scrollToStartOfBook();
    }
  });

  $('#books').empty();
  // Order of books is chronological since object keys are sorted by insertion order per
  // parse-bible-verses.js
  // https://dev.to/frehner/the-order-of-js-object-keys-458d
  Object.entries(bible).forEach(([bookShortName], idx) => {
    // https://stackoverflow.com/a/64067400
    $('<option/>')
      .val(bookShortName)
      .text(bookDisplayName[bookShortName][0])
      .appendTo('#books');
  });

  // eslint-disable-next-line max-len
  const [readingLevel, bookShortName, chapter, startHighlight, endHighlight] = processQueryStringParams();
  if (readingLevel != null) {
    $('#reading-level').val(readingLevel);
  }

  if (bookShortName !== null) {
    // attempt to load from query string parameters
    // there's 5 cases (see below, ordered by specificity)
    $('#books').val(bookShortName);
    setNumChapters(bible[bookShortName].length);
    if (chapter !== null) {
      $('#chapters').val(chapter);

      if (startHighlight !== null) {
        const parents = ['.aii-verse', '.aii-tr', '.eng-verse'];
        if (endHighlight !== null) {
          // 1. highlight range of verses
          const highlightVerses = `${chapter}:${startHighlight}-${endHighlight}`;
          // eslint-disable-next-line max-len
          setDisplayedVerses({ bookShortNameInit: bookShortName, chapterInit: chapter, highlightVerses });
          parents.forEach((parent) => $(`${parent} .highlightable`).slice(startHighlight - 1, endHighlight).addClass('highlighted'));
        } else {
          // 2. highlight a single verse
          const highlightVerses = `${chapter}:${startHighlight}`;
          // eslint-disable-next-line max-len
          setDisplayedVerses({ bookShortNameInit: bookShortName, chapterInit: chapter, highlightVerses });
          parents.forEach((parent) => $(`${parent} .highlightable`).slice(startHighlight - 1, startHighlight).addClass('highlighted'));
        }
        scrollToVerse(() => {
          const selector = $('.aii-verse').eq(startHighlight - 1); // zero-based index
          const height = selector.offset().top - $('#bible-controls-container').outerHeight(true);
          const offset = (window.innerHeight - $('#bible-controls-container').outerHeight(true)) / 2;
          const halfHeight = Math.max(height - offset, 0);

          // we introduce some delay in the scroll, otherwise some browsers like chrome attempt to
          // jump to previous scroll position on a reload (though we don't know exactly "when")
          // https://stackoverflow.com/a/21765504
          // $('html,body').animate({ scrollTop: scrollPosition }, 600);
          setTimeout(() => {
            $('html,body').scrollTop(halfHeight);
          }, 100);
        });
      } else {
        // 3. specific chapter in book
        setDisplayedVerses({ bookShortNameInit: bookShortName, chapterInit: chapter });
      }
    } else {
      // 4. specific book
      $('#chapters').val(1);
      setDisplayedVerses({ bookShortNameInit: bookShortName, chapterInit: 1 });
    }
  } else {
    // 5. use defaults
    // TODO confirm what happens w.o setting chapterInit
    const defaultBook = 'MRK';
    const CHAPTER_ONE = 1;
    $('#books').val(defaultBook);
    setNumChapters(bible[defaultBook].length);
    $('#chapters').val(CHAPTER_ONE);
    setDisplayedVerses({ bookShortNameInit: defaultBook, chapterInit: CHAPTER_ONE });
  }
});

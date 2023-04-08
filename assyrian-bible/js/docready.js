$(document).ready(() => {
  $('#difficulty-level').change((e) => {
    // when someone changes difficulty
    if ($(e.currentTarget).val() == 3) {
      $('#title,#subtitle').addClass('hardmode');
    } else {
      $('#title,#subtitle').removeClass('hardmode');
    }

    $('#book-chapters option:selected')
      .trigger('change', [true]);
  });

  // https://stackoverflow.com/a/40309949
  // $(e.currentTarget) instead of $(this) for es6 arrow syntax
  $('#bible-books').change((e, isInitialLoad, selectLastChap = false) => {
    // console.log(`selectLastChap: ${selectLastChap}`);
    const numChapters = bible[$(e.currentTarget).val()].length;
    setNumChapters(numChapters);
    if (selectLastChap) { $('#book-chapters').val(numChapters); }

    const whichChapter = selectLastChap ? numChapters : 1;
    setDisplayedVerses($(e.currentTarget).val(), whichChapter, !isInitialLoad);
  });

  $('#book-chapters').change((e, changeDifficulty = false) => {
    // when someone changes chapter
    const bookShortName = $('#bible-books').find(':selected').val();
    setDisplayedVerses(bookShortName, $(e.currentTarget).val(), !changeDifficulty);
  });

  $('#bible').on('click', '#next-chapter', () => {
    // https://stackoverflow.com/a/43138852
    if ($('#book-chapters option:selected').next().length > 0) {
      $('#book-chapters option:selected')
        .next()
        .prop('selected', 'selected')
        .trigger('change');
    } else if ($('#bible-books option:selected').next().length > 0) {
      $('#bible-books option:selected')
        .next()
        .prop('selected', 'selected')
        .trigger('change');
    }
  });

  $('#bible').on('click', '#prev-chapter', () => {
    if ($('#book-chapters option:selected').prev().length > 0) {
      $('#book-chapters option:selected')
        .prev()
        .prop('selected', 'selected')
        .trigger('change');
    } else if ($('#bible-books option:selected').prev().length > 0) {
      $('#bible-books option:selected')
        .prev()
        .prop('selected', 'selected')
        .trigger('change', [false, true]);
    }
  });

  $('#bible-books').empty();
  // Order of books is chronological since object keys are sorted by insertion order per
  // parse-bible-verses.js
  // https://dev.to/frehner/the-order-of-js-object-keys-458d
  Object.entries(bible).forEach(([bookShortName], idx) => {
    // https://stackoverflow.com/a/64067400
    $('<option/>')
      .val(bookShortName)
      .text(bookDisplayName[bookShortName][0])
      .appendTo('#bible-books');
    if (idx === 2) {
      // https://stackoverflow.com/a/33252307
      $('#bible-books').val(bookShortName).trigger('change', [true]);
    }
  });
});

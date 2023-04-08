const bookDisplayName = {
  PSA: ['Psalms', 'ܡܙܡܘܪܐ'],
  MAT: ['Matthew', 'ܡܬܝ'],
  MRK: ['Mark', 'ܡܪܩܘܣ'],
  LUK: ['Luke', 'ܠܘܩܐ'],
  JHN: ['John', 'ܝܘܚܢܢ'],
  ACT: ['Acts', 'ܣܘܥܪ̈ܢܐ ܕܫܠܝܚ̈ܐ'],
  ROM: ['Romans', 'ܪ̈ܗܘܡܝܐ'],
  '1CO': ['1 Corinthians', 'ܐ ܩܘܪ̈ܢܬܝܐ'],
  '2CO': ['2 Corinthians', 'ܒ ܩܘܪ̈ܢܬܝܐ'],
  GAL: ['Galatians', 'ܓܠܛܝ̈ܐ'],
  EPH: ['Ephesians', 'ܐܦܣܝ̈ܐ'],
  PHP: ['Philippians', 'ܦܝܠܝܦܣܝ̈ܐ'],
  COL: ['Colossians', 'ܩܘܠܣܝ̈ܐ'],
  '1TH': ['1 Thessalonians', 'ܐ ܬܣܠܘܢܝܩܝ̈ܐ'],
  '2TH': ['2 Thessalonians', 'ܒ ܬܣܠܘܢܝܩܝ̈ܐ'],
  '1TI': ['1 Timothy', 'ܐ ܛܝܡܬܐܘܣ'],
  '2TI': ['2 Timothy', 'ܒ ܛܝܡܬܐܘܣ'],
  TIT: ['Titus', 'ܛܛܘܣ'],
  PHM: ['Philemon', 'ܦܝܠܡܘܢ'],
  HEB: ['Hebrews', 'ܥܒ݂ܪ̈ܝܐ'],
  JAS: ['James', 'ܝܥܩܘܒ݂'],
  '1PE': ['1 Peter', 'ܐ ܦܛܪܘܣ'],
  '2PE': ['2 Peter', 'ܒ ܦܛܪܘܣ'],
  '1JN': ['1 John', 'ܐ ܝܘܚܢܢ'],
  '2JN': ['2 John', 'ܒ ܝܘܚܢܢ'],
  '3JN': ['3 John', 'ܓ ܝܘܚܢܢ'],
  JUD: ['Jude', 'ܝܗܘܕܐ'],
  REV: ['Revelation', 'ܓܠܝܢܐ'],
};

function setNumChapters(n) {
  $('#book-chapters').empty();
  for (let i = 1; i <= n; i += 1) {
    // console.log($("#book-chapters option:selected").index());
    $('<option/>')
      .val(i)
      .text(i)
      .appendTo('#book-chapters');
  }
}

function setDisplayedVerses(bookShortName, chapter, scrollToTop = true) {
  // console.log(`scrollToTop: ${scrollToTop}`)

  $('#bible').empty();
  $('#bible').append(
    $('<div/>', { class: 'aii-book-name', text: bookDisplayName[bookShortName][1] }),
  );

  bible[bookShortName][chapter - 1].forEach((verse, idx) => {
    const engVerse = $('#difficulty-level').val() == 1
      ? $('<div/>', { class: 'eng' }).append(
        verse[0] == null
          ? $('<span/>', { class: 'missing-verse', text: 'NLT Translation not available' })
          : verse[0],
      )
      : null;

    const aiiLatinVerse = $('#difficulty-level').val() < 3
      ? $('<div/>', { class: 'aii-translit' }).append(
        aiiTranslit(verse[1]).phonetic,
      )
      : null;

    verse.slice(2).forEach((header, hIdx) => {
      if (hIdx === 0) {
        $('#bible').append($('<div/>', { class: 'header', text: header }));
      } else if (hIdx === 1) {
        $('#bible').append($('<div/>', { class: 'reference', text: header }));
      } else if (hIdx === 2) {
        $('#bible').append($('<div/>', { class: 'header-2', text: header }));
      }
    });

    const superscript = idx === 0
      ? $('<span/>', { class: 'first-verse-num', text: chapter })
      : $('<span/>', { class: 'verse-num', text: idx + 1 });

    // https://amiyasahu.github.io/create-nested-html-elements-in-jquery.html
    $('#bible').append(
      $('<div/>', { class: 'row' }).append(
        $('<div/>', { class: 'aii' }).append(superscript, verse[1]),
        aiiLatinVerse,
        engVerse,
      ),
    );
  });

  // var abc = 0
  const ncvCopyright = $('#difficulty-level').val() == 1
    ? $('<div/>', { class: 'copyright' }).append(
      $('<span/>', { class: 'emphasis-bible', text: 'Holy Bible' }),
      ', New Living Translation, copyright ©1996, 2004, 2015 by Tyndale House Foundation. Used by permission of Tyndale House Publishers, Carol Stream, Illinois 60188. All rights reserved.',
    )
    : null;

  $('#bible').append(
    $('<div/>', { id: 'arrow-container' }).append(
      $('<button/>', { id: 'prev-chapter', text: '‹' }),
      $('<button/>', { id: 'next-chapter', text: '›' }),
    ),
    $('<div/>', { id: 'aramaic-history' }).append(
      '~98% of worldwide first language Aramaic speakers are ',
      $('<a/>', { class: 'understate', href: 'https://en.wikipedia.org/wiki/Assyrian_people', text: 'ethnic Assyrians' }),
      ' who speak ',
      $('<a/>', { class: 'understate', href: 'https://en.wikipedia.org/wiki/Suret_language', text: 'Eastern' }),
      ' and ',
      $('<a/>', { class: 'understate', href: 'https://en.wikipedia.org/wiki/Turoyo_language', text: 'Western' }),
      ' dialects of an Akkadianized flavor of Aramaic.  Since Aramaic was the language spoken by Christ, Assyrians feel an ethnoreligous commitment to keep it alive 💪 for millennia to come.',
    ),
    $('<div/>', { class: 'copyright', text: '© 2014, Aramaic Bible Translation, Inc. All rights reserved.' }),
  );

  $('#bible').append(
    ncvCopyright,
  );

  if (scrollToTop === true) {
    // https://stackoverflow.com/a/30317344
    // const actualBottom = $("#subtitle").offset().top + $("#subtitle").outerHeight(true);
    const actualBottom = $('#author').offset().top + $('#author').outerHeight(true);
    $(window).scrollTop(actualBottom);
  }
}

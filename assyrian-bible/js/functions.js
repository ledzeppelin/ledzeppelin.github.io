const bookDisplayName = {
  PSA: ['Psalms', 'ܡܙܡܘܪܐ'],
  MAT: ['Matthew', 'ܡܬ‌ܝ'],
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

function playSound(svgSpeaker) {
  svgSpeaker.addClass('request-mp3');
  const sound = new Howl({
    // https://commons.wikimedia.org/wiki/Category:Audio_files
    src: [`mp3s/${svgSpeaker.attr('data-filename')}`],
    onplay: () => {
      svgSpeaker.removeClass('request-mp3').addClass('playing');
    },
    onend: () => {
      svgSpeaker.removeClass('playing');
    },
  });
  sound.play();
}

function setNumChapters(n) {
  $('#book-chapters').empty();
  for (let i = 1; i <= n; i += 1) {
    // console.log($("#book-chapters option:selected").index());
    $('<option/>')
      .val(i)
      .html(i)
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
    const filename = `${bookShortName}.${chapter}.AII.${idx + 1}.mp3`;

    const speakerSVG = `<svg data-filename="${filename}" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>`;

    const engVerseHTML = verse[0] == null ? $('<span/>', { class: 'missing-verse', text: 'NLT Translation not available' }) : verse[0];
    const engVerse = $('#difficulty-level').val() == 1 ? $('<div/>', { class: 'eng', html: engVerseHTML }) : null;
    const aiiLatinVerse = $('#difficulty-level').val() < 3 ? $('<div/>', { class: 'aii-latin', html: `${AssyrianText(verse[1]).latin.replaceAll('š', 'sh')} ${speakerSVG}` }) : null;

    let isHeader = true;
    verse.slice(2).forEach((header) => {
      $('#bible').append(
        $('<div/>', { class: isHeader === true ? 'header' : 'reference', text: header }),
      );
      isHeader = !isHeader;
    });

    const superscript = idx === 0
      ? $('<span/>', { class: 'first-verse-num', text: chapter })
      : $('<span/>', { class: 'verse-num', text: idx + 1 });

    // https://amiyasahu.github.io/create-nested-html-elements-in-jquery.html
    $('#bible').append(
      $('<div/>', { class: 'row' }).append(
        $('<div/>', { class: 'aii' }).append(superscript, `&thinsp;${verse[1]}`),
        aiiLatinVerse,
        engVerse,
      ),
    );
  });

  const ncvCopyright = $('#difficulty-level').val() == 1 ? $('<div/>', { class: 'copyright', html: '<span class="emphasis-bible">Holy Bible</span>, New Living Translation, copyright ©1996, 2004, 2015 by Tyndale House Foundation. Used by permission of Tyndale House Publishers, Carol Stream, Illinois 60188. All rights reserved.' }) : null;
  const aramaicHistory = $('<div/>', { id: 'aramaic-history', html: '~98% of worldwide first language Aramaic speakers are <a href="https://en.wikipedia.org/wiki/Assyrian_people">ethnic Assyrians</a> who speak <a href="https://en.wikipedia.org/wiki/Suret_language">Eastern</a> and <a href="https://en.wikipedia.org/wiki/Turoyo_language">Western</a> dialects of an Akkadianized flavor of Aramaic.  Since Aramaic was the language spoken by Christ, Assyrians feel an ethnoreligous commitment to keep it alive 💪 for millennia to come.' });

  $('#bible').append(
    $('<div/>', { id: 'arrow-container' }).append(
      $('<button/>', { id: 'prev-chapter', html: '‹' }),
      $('<button/>', { id: 'next-chapter', html: '›' }),
    ),
  );

  $('#bible').append(
    aramaicHistory,
    $('<div/>', { class: 'copyright', text: '© 2014, Aramaic Bible Translation, Inc. All rights reserved.' }),
    ncvCopyright,
  );

  if (scrollToTop === true) {
    // https://stackoverflow.com/a/30317344
    // const actualBottom = $("#subtitle").offset().top + $("#subtitle").outerHeight(true);
    const actualBottom = $('#tts').offset().top + $('#tts').outerHeight(true);
    $(window).scrollTop(actualBottom);
  }
}

function getRandomInt(minArg, maxArg) {
  const min = Math.ceil(minArg);
  const max = Math.floor(maxArg);
  return Math.floor(Math.random() * (max - min) + min);
}

function isInvalidSyrc(text) {
  const validLetters = 'ܦܒܬܛܕܟܓܩܔܣܨܙܫܚܥܗܡܢܪܠܐܘܝ';
  const re = new RegExp(`([${validLetters} ])`, 'g');
  return text.match(re) == null;
}

function usingTruVowels(text) {
  const RBASA_BELOW = '\u{0737}';
  const PTHAHA_BELOW = '\u{0731}';
  const RBASA = '\u{0736}';
  const ZQAPHA = '\u{0733}';
  const PTHAHA = '\u{0730}';
  const truVowelCaptureGroup = `([${RBASA_BELOW}${PTHAHA_BELOW}${RBASA}${ZQAPHA}${PTHAHA}])`;

  const re = new RegExp(truVowelCaptureGroup, 'g');
  return text.match(re) != null;
}

function usingAiiVowels(text) {
  const HBASA = '\u{073C}';
  const RWAHA = '\u{073F}';
  const ZLAMA_ANGULAR = '\u{0739}';
  const ZLAMA_HORIZONTAL = '\u{0738}';
  const PTHAHA = '\u{0732}';
  const ZQAPHA = '\u{0735}';
  const vowelsCapture = `([${HBASA}${RWAHA}${ZLAMA_ANGULAR}${ZLAMA_HORIZONTAL}${PTHAHA}${ZQAPHA}])`;

  const re = new RegExp(vowelsCapture, 'g');
  return text.match(re) != null;
}

// these regexes include all the combining marks https://r12a.github.io/scripts/syrc/aii.html#index_cchars
// in the transliterator which are only replaced while attached to a letter
// as opposed to being standalone find-and-replace'd, ie they are potentially dangle-able

function aiiBottomMarkRegex() {
  const HBASA = '\u{073C}';
  const RUKKAKHA = '\u{0742}';
  const COMBINING_DOT_BELOW = '\u{0323}';
  const bottomMarks = [
    HBASA,
    RUKKAKHA,
    COMBINING_DOT_BELOW,
  ];

  return new RegExp(`([${bottomMarks.join('')}])`, 'g');
}

function aiiTopMarkRegex() {
  const RWAHA = '\u{073F}';
  const QUSHSHAYA = '\u{0741}';
  const topMarks = [
    RWAHA,
    QUSHSHAYA,
  ];

  return new RegExp(`([${topMarks.join('')}])`, 'g');
}

function aiiOtherMarkRegex() {
  const COMBINING_BREVE_BELOW = '\u{032E}';
  const COMBINING_TILDE_BELOW = '\u{0330}';
  const COMBINING_MACRON_BELOW = '\u{0331}';
  const COMBINING_TILDE_ABOVE = '\u{0303}';
  const COMBINING_MACRON = '\u{0304}';
  const TALQANA_ABOVE = '\u{0747}';

  const otherMarks = [
    COMBINING_BREVE_BELOW,
    COMBINING_TILDE_BELOW,
    COMBINING_MACRON_BELOW,
    COMBINING_TILDE_ABOVE,
    COMBINING_MACRON,
    TALQANA_ABOVE,
  ];

  return new RegExp(`([${otherMarks.join('')}])`, 'g');
}

function truTopMarkRegex() {
  const HBASA_ABOVE = '\u{073A}'; // ḥboṣo
  const ESASA_ABOVE = '\u{073D}'; // cṣoṣo

  // omit according to https://userblogs.fu-berlin.de/wp-includes/ms-files.php?path=/aramaic-ol/&file=2017/08/Surayt-Orthography.pdf
  const topMarks = [
    HBASA_ABOVE,
    ESASA_ABOVE,
  ];

  return new RegExp(`([${topMarks.join('')}])`, 'g');
}

function truOtherMarkRegex() {
  // common typos
  const COMBINING_TILDE_ABOVE = '\u{0303}';
  const COMBINING_DOT_ABOVE = '\u{0307}';
  const COMBINING_MACRON_BELOW = '\u{0331}';
  const COMBINING_DOT_BELOW = '\u{0323}';
  const HBASA_BELOW = '\u{073B}';
  const HBASA_ESASA_DOTTED = '\u{073C}';
  const ESASA_BELOW = '\u{073E}';
  const RWAHA = '\u{073F}';
  const COMBINING_RING_BELOW = '\u{0325}';

  // vowel diacritics not included since they are always replaced by transliterator
  const COMBINING_TILDE_BELOW = '\u{0330}';
  const QUSHSHAYA = '\u{0741}';
  const RUKKAKHA = '\u{0742}';

  const otherMarks = [
    COMBINING_TILDE_ABOVE,
    COMBINING_DOT_ABOVE,
    COMBINING_MACRON_BELOW,
    COMBINING_DOT_BELOW,
    HBASA_BELOW,
    HBASA_ESASA_DOTTED,
    ESASA_BELOW,
    RWAHA,
    COMBINING_RING_BELOW,

    COMBINING_TILDE_BELOW,
    QUSHSHAYA,
    RUKKAKHA,
  ];

  return new RegExp(`([${otherMarks.join('')}])`, 'g');

  // const vowels = 'wyëäeoaiu37()';
  // return new RegExp(`([^${otherMarks.join('')}${vowels}fbtṭdkgqjsṣzšḥchmnrlvžpvṯḏxġ ,.;])`, 'g');
}

function resizeSyrcHeight() {
  $('#syrc').css({ height: 0 });
  const syrcScrollHeight = $('#syrc').prop('scrollHeight');
  $('#syrc').css({ height: `${syrcScrollHeight}px` });
}

function updateTransliteration(syrcResize = false) {
  const syrc = $('#syrc').val();
  const autoDialectSelector = $('#syrc-dialect option[value="0"]');
  const selectedDialect = $('#syrc-dialect').find(':selected').val();
  const usingAutoDetect = (selectedDialect == 0);

  const usingTruVowelsRes = usingTruVowels(syrc);
  const useTru = (selectedDialect == 2 || (usingAutoDetect && usingTruVowelsRes));

  if (useTru) {
    $('#syrc').addClass('suryoyo');
    $('#suryoyo-caption').show();
  } else {
    $('#syrc').removeClass('suryoyo');
    $('#suryoyo-caption').hide();
  }

  if (syrc.trim().length === 0) {
    $('#clear-text').fadeOut(0);
  } else {
    $('#clear-text').fadeIn(0);
  }

  if (syrc.trim().length === 0) {
    $('#syrc-caption').text('');
    autoDialectSelector.text('Detect Dialect');
    $('#latin').text('');
    $('#copy-text').fadeOut(0);
    $('#bottom-mark-caption, #top-mark-caption, #other-mark-caption, #latin-caption-rationale').hide();
  } else if (isInvalidSyrc(syrc)) {
    $('#syrc-caption').text('Enter Assyrian letters');
    autoDialectSelector.text('Detect Dialect');
    $('#latin').text('');
    $('#copy-text').fadeOut(0);
    $('#bottom-mark-caption, #top-mark-caption, #other-mark-caption, #latin-caption-rationale').hide();
  } else {
    autoDialectSelector.text(usingTruVowelsRes ? 'West Assyrian - detected' : 'Assyrian - detected');
    if ((useTru && !usingTruVowelsRes) || (!useTru && !usingAiiVowels(syrc))) {
      const abc = '<span style="font-size: 50px"> ◌ܲ ◌ܵ ◌ܸ ◌ܼ ◌ܿ ◌ܹ </span>';
      $('#syrc-caption').text('Use vowel marks');
    } else {
      $('#syrc-caption').text('');
    }

    const translitType = ($('.eng-column button').index($('.active')) == 0) ? 'phonetic' : 'latin';
    // transliterator doesn't have logic to understand newlines as word boundary (#) so we split
    const syrcLines = syrc.split(/\r?\n/);
    const translitLines = syrcLines.map((text) => {
      const translitLine = useTru ? truTranslit(text) : aiiTranslit(text);
      return translitLine[translitType];
    });

    let translit = translitLines.join('\n');

    const reAiiBottom = aiiBottomMarkRegex();
    const reAiiTop = aiiTopMarkRegex();
    const reAiiOther = aiiOtherMarkRegex();
    const reTruTop = truTopMarkRegex();
    const reTruOther = truOtherMarkRegex();

    if (!translit.trim().length) {
      $('#latin').text('');
      $('#copy-text').fadeOut(0);
      $('#bottom-mark-caption, #top-mark-caption, #other-mark-caption, #latin-caption-rationale').hide();
    } else {
      if (!useTru && reAiiBottom.test(translit)) {
        translit = translit.replaceAll(reAiiBottom, '<span class="typo-circle bottom-mark">$1</span>');
        $('#bottom-mark-caption').show();
      } else {
        $('#bottom-mark-caption').hide();
      }

      if (!useTru && reAiiTop.test(translit)) {
        translit = translit.replaceAll(reAiiTop, '<span class="typo-circle top-mark">$1</span>');
        $('#top-mark-caption .caption-text').removeClass('using-suryoyo');
        $('#top-mark-caption').show();
      } else if (useTru && reTruTop.test(translit)) {
        translit = translit.replaceAll(reTruTop, '<span class="typo-circle top-mark">$1</span>');
        $('#top-mark-caption .caption-text').addClass('using-suryoyo');
        $('#top-mark-caption').show();
      } else {
        $('#top-mark-caption').hide();
      }

      if (!useTru && reAiiOther.test(translit)) {
        translit = translit.replaceAll(reAiiOther, '<span class="typo-circle other-mark">$1</span>');
        $('#other-mark-caption').show();
      } else if (useTru && reTruOther.test(translit)) {
        translit = translit.replaceAll(reTruOther, '<span class="typo-circle other-mark">$1</span>');
        $('#other-mark-caption').show();
      } else {
        $('#other-mark-caption').hide();
      }

      if ($('#latin-caption ul:first-child').children(':visible').length) {
        $('#latin-caption-rationale').show();
        $('#latin-caption').addClass('ul-gap');
      } else {
        $('#latin-caption-rationale').hide();
        $('#latin-caption').removeClass('ul-gap');
      }

      $('#latin').html(translit);
      $('#copy-text').fadeIn(0);
      // if (msg != null) { $('#syrc-caption').text(msg); }
    }
  }

  if (syrcResize === true) {
    resizeSyrcHeight();
  }
}

function typeWriter(txt, i = 0) {
  // https://www.w3schools.com/howto/howto_js_typewriter.asp
  const speed = 50; /* The speed/duration of the effect in milliseconds */
  if (i < txt.length) {
    $('#syrc').val($('#syrc').val() + txt.charAt(i));
    updateTransliteration(true);
    setTimeout(typeWriter, speed, txt, i + 1);

    // hide typos while typing for words like ܡ̣ܢ
    $('#latin-caption ul:first-child').hide();
  } else {
    // enable button again
    $('#roll-dice-aii,#roll-dice-tru').prop('disabled', false);
    $('#latin-caption ul:first-child').show();
  }
}

// function typeWriterDemo() {
//   // change speed to 100
//   const east = 'ܫܠܵܡܵܐ ܠܘܼܟ݂';
//   const west = 'ܐܰܝܕܰܪܒܐ ܗܰܬܘ؟';

//   typeWriter(east);
//   setTimeout(() => {
//     $('#syrc').val(' ');
//     updateTransliteration(true);
//     typeWriter(west);
//   }, 2500);
// }

$(document).ready(() => {
  // https://stackoverflow.com/a/10750699
  // we resize when someone drags browser width
  // we disregard vertical resizing since mobile triggers that when pasting large amt of text
  let lastWidth = $(window).width();
  $(window).resize(() => {
    if ($(window).width() !== lastWidth) {
      lastWidth = $(window).width();
      resizeSyrcHeight();
    }
  });

  // $('#title').click(() => {
  //   typeWriterDemo();
  // });

  const syrcScrollHeight = $('#syrc').prop('scrollHeight');
  $('#syrc').css({ height: `${syrcScrollHeight}px`, 'overflow-y': 'hidden' });

  $('#syrc').on('input', () => {
    updateTransliteration(true);
  });

  $('.eng-column .btn-group > .btn').click((e) => {
    $('.eng-column .btn-group > .btn').removeClass('active');
    $(e.currentTarget).addClass('active');
    updateTransliteration();
  });

  $('#roll-dice-aii').click((e) => {
    $(e.currentTarget).prop('disabled', true);
    $('#roll-dice-tru').prop('disabled', true);
    $('#syrc').val('');
    // Goldilocks principle for verse length
    const sortedArr = aiiMark.sort((a, b) => a.length - b.length);
    const quartile1 = Math.floor(sortedArr.length * 0.25);
    const quartile2 = Math.floor(sortedArr.length / 2);
    const quartile3 = Math.floor(sortedArr.length * 0.75);
    const ouputs = [
      sortedArr[0],
      sortedArr[quartile1],
      sortedArr[quartile2],
      sortedArr[quartile3],
      sortedArr[sortedArr.length - 1],
    ];

    // ouputs.map((verse) => console.log(verse.length));

    const nthShortestVerse = getRandomInt(quartile1, quartile3);
    // console.log(sortedArr[quartile1].length); // 83
    // console.log(sortedArr[quartile3].length); // 138
    const rand = sortedArr[nthShortestVerse];
    typeWriter(rand);
    // typeWriter('”ܠܹܐ ܝܘܸܬ ܪܸܚܩܵܐ ܡ̣ܢ ܡܲܠܟܘܼܬܵܐ ܕܐܲܠܵܗܵܐ.“ ܘܠܵܐ ܐܢܵܫܵܐ ܩܘܼܫܕܸܪܹܗ ܙܵܘܕܵܐ ܠܒܲܩܘܼܪܹܗ.');
  });

  $('#roll-dice-tru').click((e) => {
    $(e.currentTarget).prop('disabled', true);
    $('#roll-dice-aii').prop('disabled', true);
    $('#syrc').val('');
    const nthShortestVerse = getRandomInt(0, truSentences.length - 1);
    const rand = truSentences[nthShortestVerse];
    typeWriter(rand);
  });

  $('#syrc-dialect').change(() => {
    // TODO: only call if dialect is changed
    updateTransliteration();
    resizeSyrcHeight();
  });

  $('#copy-text').click((e) => {
    const text = $('#latin').text();

    $(e.currentTarget).fadeOut(0).text('done').fadeIn(400, () => {
      setTimeout(() => {
        $(e.currentTarget).text('copy');
      }, 400);
    });
    // clipboard supported via https (won't work when running webapp locally over http via docker)
    navigator.clipboard.writeText(text);
  });

  $('#clear-text').click(() => {
    $('#syrc').val('');
    updateTransliteration(true);
  });
});

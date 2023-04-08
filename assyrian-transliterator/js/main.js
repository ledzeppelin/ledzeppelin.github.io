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
  } else {
    $('#syrc').removeClass('suryoyo');
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
  } else if (isInvalidSyrc(syrc)) {
    $('#syrc-caption').text('Enter Assyrian characters');
    autoDialectSelector.text('Detect Dialect');
    $('#latin').text('');
    $('#copy-text').fadeOut(0);
  } else {
    $('#syrc-caption').text('');

    autoDialectSelector.text(usingTruVowelsRes ? 'West Assyrian - detected' : 'Assyrian - detected');
    // transliterator doesn't have logic to understand newlines as newlines so we split
    const syrcLines = syrc.split(/\r?\n/);
    if ((useTru && !usingTruVowelsRes) || (!useTru && !usingAiiVowels(syrc))) {
      const abc = '<span style="font-size: 50px"> ◌ܲ ◌ܵ ◌ܸ ◌ܼ ◌ܿ ◌ܹ </span>';
      $('#syrc-caption').text('Use vowel markers');
    }

    const translitType = ($('.eng-column button').index($('.active')) == 0) ? 'phonetic' : 'latin';
    const translitLines = syrcLines.map((text) => {
      const translitLine = useTru ? truTranslit(text) : aiiTranslit(text);
      return translitLine[translitType];
    });

    const translit = translitLines.join('\n');
    if (!translit.trim().length) {
      $('#latin').text('');
      $('#copy-text').fadeOut(0);
    } else {
      $('#latin').text(translit);
      $('#copy-text').fadeIn(0);
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
  } else {
    // enable button again
    $('#roll-dice-aii,#roll-dice-tru').prop('disabled', false);
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
  $(window).resize(() => {
    resizeSyrcHeight();
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
  });

  $('#copy-text').click((e) => {
    const text = $('#latin').text();

    $(e.currentTarget).fadeOut(0).text('done').fadeIn(400, () => {
      setTimeout(() => {
        $(e.currentTarget).text('copy');
      }, 400);
    });
    navigator.clipboard.writeText(text);
  });

  $('#clear-text').click(() => {
    $('#syrc').val('');
    updateTransliteration(true);
  });

  $('#syrc-dialect').change(() => {
    resizeSyrcHeight();
  });
});

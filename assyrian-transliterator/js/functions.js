function getRandomInt(minArg, maxArg) {
  const min = Math.ceil(minArg);
  const max = Math.floor(maxArg);
  return Math.floor(Math.random() * (max - min) + min);
}

function urlEncodeSpecialChars(txt) {
  // When pasting this url
  // https://ledzeppelin.github.io/assyrian-transliterator/?assyrian=ܒܲܢܵܝܹ̈ܐ،+ܒܲܢܵܝܹ̈ܐ،+ܒܲܢܵܝܹ̈ܐ
  // into iMessage (mobile or desktop), a line break occurs at the first arabic comma.
  // so we need to manually encode the following characters.  However when we do that,
  // it double encodes in other browsers like desktop Chrome, so we decide not to use this
  // function since this is the edgiest of edge cases
  //
  // Note that copying url from mobile safari, copies it unencoded but chrome automatically encodes.
  // also note that copying url from desktop safari and pasting into text editor is unencoded
  // however pasting into imessage is encoded

  const ARABIC_QUESTION_MARK = '؟';
  const ARABIC_COMMA = '،';
  const ARABIC_SEMICOLON = '؛';

  return txt.replaceAll(ARABIC_QUESTION_MARK, '%D8%9F').replaceAll(ARABIC_COMMA, '%D8%8C').replaceAll(ARABIC_SEMICOLON, '%D8%9B');
}

function isInvalidSyrc(text) {
  // this contains gamal garshuni which is why we don't use
  // AiiUtils.validLetters from /shared_js/aii-utils.js
  const validLetters = 'ܦܒܬܛܕܟܓܩܔܣܨܙܫܚܥܗܡܢܪܠܐܘܝ';
  const re = new RegExp(`([${validLetters}])`, 'g');
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

  const ZERO_WIDTH_NON_JOINER = '\u{200C}';
  const LEFT_TO_RIGHT_MARK = '\u{200E}';

  const otherMarks = [
    COMBINING_BREVE_BELOW,
    COMBINING_TILDE_BELOW,
    COMBINING_MACRON_BELOW,
    COMBINING_TILDE_ABOVE,
    COMBINING_MACRON,
    TALQANA_ABOVE,

    ZERO_WIDTH_NON_JOINER,
    LEFT_TO_RIGHT_MARK,
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

  const ZERO_WIDTH_NON_JOINER = '\u{200C}';
  const LEFT_TO_RIGHT_MARK = '\u{200E}';

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

    ZERO_WIDTH_NON_JOINER,
    LEFT_TO_RIGHT_MARK,
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
  const selectedDialect = parseInt($('#syrc-dialect').find(':selected').val(), 10);
  // const selectedDialect = $('#syrc-dialect').find(':selected').val();
  const usingAutoDetect = selectedDialect === 0;

  const usingTruVowelsRes = usingTruVowels(syrc);
  const useTru = (selectedDialect === 2 || (usingAutoDetect && usingTruVowelsRes));

  if (useTru) {
    $('#syrc').addClass('suryoyo');
  } else {
    $('#syrc').removeClass('suryoyo');
  }

  if (syrc.length === 0) {
    $('#clear-text').fadeOut(0);
  } else {
    $('#clear-text').fadeIn(0);
  }

  const invalidSyrc = syrc.trim().length === 0 || isInvalidSyrc(syrc);

  if (invalidSyrc) {
    autoDialectSelector.text('Detect Dialect');
  } else {
    autoDialectSelector.text(usingTruVowelsRes ? 'West Assyrian - detected' : 'Assyrian - detected');
  }

  if (syrc.trim().length === 0) {
    $('#syrc-error-msg').empty();
  } else if (isInvalidSyrc(syrc)) {
    $('#syrc-error-msg').text('Enter Assyrian letters');
  } else if ((useTru && !usingTruVowelsRes) || (!useTru && !usingAiiVowels(syrc))) {
    // const abc = '<span style="font-size: 50px"> ◌ܲ ◌ܵ ◌ܸ ◌ܼ ◌ܿ ◌ܹ </span>';
    $('#syrc-error-msg').text('Use vowel marks');
  } else {
    $('#syrc-error-msg').empty();
  }

  let translit = '';

  if (!invalidSyrc) {
    const translitType = ($('#latin-btn-group button').index($('.active')) == 1) ? 'phonetic' : 'latin';
    // transliterator doesn't have logic to understand newlines as word boundary (#) so we split
    const syrcLines = syrc.split(/\r?\n/);
    const translitLines = syrcLines.map((text) => {
      const translitLine = useTru ? truTranslit(text) : aiiTranslit(text);
      return translitLine[translitType];
    });
    translit = translitLines.join('\n');
  }

  if (translit.trim().length === 0) {
    $('#latin').empty();
    $('#copy-text').fadeOut(0);
    $('#aii-typo-caption, #tru-typo-caption').hide();
  } else {
    $('#copy-text').fadeIn(0);

    const reAiiBottom = aiiBottomMarkRegex();
    const reAiiTop = aiiTopMarkRegex();
    const reAiiOther = aiiOtherMarkRegex();
    const reTruTop = truTopMarkRegex();
    const reTruOther = truOtherMarkRegex();

    if (!useTru) {
      $('#aii-typo-caption').show();
      $('#tru-typo-caption').hide();
      if (reAiiBottom.test(translit)) {
        translit = translit.replaceAll(reAiiBottom, '<span class="typo-circle bottom-mark">$1</span>');
        $('#aii-bottom-mark-caption').show();
      } else {
        $('#aii-bottom-mark-caption').hide();
      }

      if (reAiiTop.test(translit)) {
        translit = translit.replaceAll(reAiiTop, '<span class="typo-circle top-mark">$1</span>');
        $('#aii-top-mark-caption').show();
      } else {
        $('#aii-top-mark-caption').hide();
      }

      if (reAiiOther.test(translit)) {
        translit = translit.replaceAll(reAiiOther, '<span class="typo-circle other-mark">$1</span>');
        $('#aii-other-mark-caption').show();
      } else {
        $('#aii-other-mark-caption').hide();
      }
    } else {
      $('#tru-typo-caption').show();
      $('#aii-typo-caption').hide();

      if (reTruTop.test(translit)) {
        translit = translit.replaceAll(reTruTop, '<span class="typo-circle top-mark">$1</span>');
        $('#tru-top-mark-caption').show();
      } else {
        $('#tru-top-mark-caption').hide();
      }

      if (reTruOther.test(translit)) {
        translit = translit.replaceAll(reTruOther, '<span class="typo-circle other-mark">$1</span>');
        $('#tru-other-mark-caption').show();
      } else {
        $('#tru-other-mark-caption').hide();
      }
    }

    $('#latin').html(translit);
  }

  if (selectedDialect === 1) {
    // manual aii
    $('#aii-orthography').show();
    $('#tru-orthography').hide();
  } else if (selectedDialect === 2) {
    // manual tru
    $('#aii-orthography').hide();
    $('#tru-orthography').show();
  } else if (translit.trim().length === 0) {
    // autodetect empty translit
    $('#aii-orthography').hide();
    $('#tru-orthography').hide();
  } else if (usingTruVowelsRes) {
    // autodetect non-empty translit w/ tru vowels
    $('#aii-orthography').hide();
    $('#tru-orthography').show();
  } else {
    $('#aii-orthography').show();
    $('#tru-orthography').hide();
  }

  if (syrcResize === true) {
    resizeSyrcHeight();
  }
}

function typeWriter(txt) {
  // iterative approach to the recursive https://www.w3schools.com/howto/howto_js_typewriter.asp

  // Usually we want to update query string parameters after state change, however this time we do
  // so BEFORE state has changed. This is because of the way some browsers handle state with
  // textarea/input.  For example, uncomment logic inside setTimeout block which sets query string
  // params and observe that the content inside of the textarea gets played on top of snapshot
  // cache of intial load when doing the following:
  //
  // In chrome, access the html file (ie not from http://localhost:8000/), click button to
  // generate sentence, then click link to go to source and go back in browser.  Restarting desktop
  // doesn't affect state.  Note playback still occurs in current configuration but it's the lesser
  // of two evils when compared to setting parameters AFTER state change because we can see the
  // transliteration and clear/copy icons
  //
  // Prior to adding support for query string parameters, restarting mobile would result in a
  // similar effect of syrc having text but no transliteration or copy/clear text icons showing.
  // This is because the textarea content was played on top of cache snapshot of first load.  This
  // was further complicated by the fact that it was hard to reproduce because only after enough
  // minutes had passed would the browser actually decide to keep textarea contents for subsequent
  // playback on top of the restored frozen mobile page.
  //
  // we don't update qs parameters with each character due to throttling on browsers like safari
  // https://github.com/47ng/next-usequerystate?tab=readme-ov-file#throttling-url-updates

  const url = new URL(window.location);
  url.searchParams.set('assyrian', txt);
  window.history.replaceState(null, '', url.toString());

  // hide typos while typing for words like ܡ̣ܢ
  $('#aii-typo-caption, #tru-typo-caption').css('visibility', 'hidden');
  // $('#syrc-error-msg').css('visibility', 'hidden');
  $('#syrc-error-msg').hide();
  const delay = 50;

  for (let i = 0; i < txt.length; i += 1) {
    setTimeout(() => {
      $('#syrc').val($('#syrc').val() + txt.charAt(i));
      updateTransliteration(true);
    }, delay * i);
  }

  // https://medium.com/teads-engineering/the-most-accurate-way-to-schedule-a-function-in-a-web-browser-eadcd164da12
  // setTimeout can have low precision but it's okay because we don't really care about order
  // so long as this is guaranteed to execute
  setTimeout(() => {
    // enable button again
    $('#roll-dice-aii,#roll-dice-tru').prop('disabled', false);
    $('#aii-typo-caption, #tru-typo-caption').css('visibility', 'visible');

    // const url = new URL(window.location);
    // url.searchParams.set('assyrian', txt);
    // window.history.replaceState(null, '', url.toString());
  }, delay * txt.length);

  // disable error msg for first few chars to avoid it looking glitchy
  const NUM_CHARS = 10;
  setTimeout(() => {
    // $('#syrc-error-msg').css('visibility', 'visible');
    $('#syrc-error-msg').show();
  }, delay * NUM_CHARS);
}

function processQueryStringParams() {
  const url = new URL(window.location);
  const params = new URLSearchParams(document.location.search);
  let updateParams = false;

  if (params.has('dialect')) {
    const dialect = parseInt(params.get('dialect'), 10);
    if (dialect === 1 || dialect === 2) {
      $('#syrc-dialect option').eq(dialect).prop('selected', true);
      // test case for this logic is empty assyrian qs param
      if (dialect === 1) {
        $('#aii-orthography').show();
        $('#tru-orthography').hide();
      } else {
        $('#aii-orthography').hide();
        $('#tru-orthography').show();
      }
    } else {
      updateParams = true;
      url.searchParams.delete('dialect');
    }
  }

  if (params.has('latin')) {
    const latin = parseInt(params.get('latin'), 10);
    if (latin === 1) {
      $('#latin-btn-group .btn').removeClass('active');
      $('#latin-btn-group button:nth-child(1)').addClass('active');
    } else {
      updateParams = true;
      url.searchParams.delete('latin');
    }
  }

  // order we process qs params matters because we can't update transliteration unless latin/dialect
  // are set
  if (params.has('assyrian')) {
    const assyrian = params.get('assyrian');
    if (assyrian.length) {
      $('#syrc').val(assyrian);
      updateTransliteration(true);
    } else {
      updateParams = true;
      url.searchParams.delete('assyrian');
    }
  }
  if (updateParams) {
    // console.log('updating params');
    window.history.replaceState(null, '', url.toString());
  }
}

// https://stackoverflow.com/a/70477376
function onLoad(callback) {
  if (document.readyState === 'complete') {
    // compare to scrollToVerse for assyrian bible when clicking on backlinks
    //
    // This condtional runs in desktop safari when you enter assyrian text,
    // then click the url bar and hit enter to reload
    callback();
    // $('body').css('background-color', 'red');
  } else {
    window.addEventListener('load', callback);
  }
}

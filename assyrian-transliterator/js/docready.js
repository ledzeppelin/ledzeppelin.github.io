$(document).ready(() => {
  const TR_APP_NAME = 'assyrian-transliterator';

  $('#syrc').on('input', (e) => {
    $('#rand-sentence-ref').empty();
    updateTransliteration(true);

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    if (e.target.value.length) {
      AiiUtils.updateURL(url, TR_APP_NAME, [['assyrian', e.target.value]], params);
    } else if (params.has('assyrian')) {
      params.delete('assyrian');
      AiiUtils.updateURL(url, TR_APP_NAME, [], params);
    }
  });

  $('#latin-btn-group .btn').click((e) => {
    if (!$(e.currentTarget).hasClass('active')) {
      $('#latin-btn-group .btn').removeClass('active');
      $(e.currentTarget).addClass('active');
      updateTransliteration();
    }

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    if ($(e.currentTarget).index() === 0) {
      AiiUtils.updateURL(url, TR_APP_NAME, [['latin', 1]], params);
    } else if (params.has('latin')) {
      params.delete('latin');
      AiiUtils.updateURL(url, TR_APP_NAME, [], params);
    }
  });

  $('#syrc-dialect').change((e) => {
    // TODO: take into account autodetect and only call if dialect is implicitly changed
    updateTransliteration(true);

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const dialect = parseInt($(e.currentTarget).val(), 10);
    if (dialect === 1 || dialect === 2) {
      AiiUtils.updateURL(url, TR_APP_NAME, [['dialect', dialect]], params);
    } else if (params.has('dialect')) {
      params.delete('dialect');
      AiiUtils.updateURL(url, TR_APP_NAME, [], params);
    }
  });

  $('#clear-text').click(() => {
    $('#rand-sentence-ref').empty();
    $('#syrc').val('');
    updateTransliteration(true);

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.delete('assyrian');
    AiiUtils.updateURL(url, TR_APP_NAME, [], params);
  });

  $('#roll-dice-aii').click((e) => {
    $(e.currentTarget).prop('disabled', true);
    $('#roll-dice-tru').prop('disabled', true);
    $('#syrc').val('');

    // from: https://stackoverflow.com/a/37401010
    const randVerse = Object.keys(aiiMark)[Math.floor(Math.random() * Object.keys(aiiMark).length)];
    const chapter = `${aiiMark[randVerse][0]}:${aiiMark[randVerse][1]}`;

    const abc = 'ܐܝܼܢܵܐ ܐܵܢܝܼ ܠܵܐ ܡ̣ܢ ܦܘܼܪܡܹܐ ܠܗܘܿܢ'; // min ܡ̣ܢ to test flicker
    typeWriter(randVerse);

    $('#rand-sentence-ref').empty().append(
      $('<span/>', { class: 'webapp-backlink-meta', text: 'sentence from 🔵 ' }),
      $('<a/>', { class: 'webapp-backlink-href', text: `mark ${chapter}, assyrian bible`, href: `../assyrian-bible/?book=MRK&chapter=${chapter}` }),
    );
  });

  $('#roll-dice-tru').click((e) => {
    $('#rand-sentence-ref').empty().append(
      $('<span/>', { text: 'sentence from ' }),
      $('<a/>', { text: 'Šlomo Surayt Corpus', href: 'https://corpus.surayt.com/search.html?q=' }),
    );

    $(e.currentTarget).prop('disabled', true);
    $('#roll-dice-aii').prop('disabled', true);
    $('#syrc').val('');
    const nthShortestVerse = getRandomInt(0, truSentences.length - 1);
    const rand = truSentences[nthShortestVerse];
    typeWriter(rand);
  });

  $('#copy-text').click((e) => {
    $(e.currentTarget).fadeOut(0).text('check').fadeIn(400, () => {
      setTimeout(() => {
        $(e.currentTarget).text('content_copy');
      }, 400);
    });
    // clipboard supported via https (won't work when running webapp locally over http via docker)
    const text = $('#latin').text();
    navigator.clipboard.writeText(text);
  });

  // https://stackoverflow.com/a/10750699
  // when width of browser window on desktop is decreased and text is cut off
  // because textarea height has not resized
  // also for when phone switches from landscape to portrait orientation
  let lastWidth = $(window).width();
  $(window).resize(() => {
    if ($(window).width() !== lastWidth) {
      // https://stackoverflow.com/a/27966414
      // we disregard vertical resizing since on mobile the browser nav bar shows/hides on scroll
      // this tends to happen if you paste large amt of text and scroll up and down between the
      // the aii and the translit
      lastWidth = $(window).width();
      resizeSyrcHeight();
    }
  });

  onLoad(() => {
    // if transliteration updates before css/fonts load, sizing is off, copy/paste this
    // and reload from querystring parameters
    //
    // eslint-disable-next-line max-len
    // ܓ̰ܘܼܘܸܒ ܠܹܗ ܝܼܫܘܿܥ ܒܹܐܡܵܪܵܐ: ”ܐܵܢܵܐ ܝܘܸܢ. ܘܒܸܬ ܚܵܙܹܝܬܘܿܢ ܒܪܘܿܢܵܐ ܕܐܢܵܫܵܐ ܝܬܝܼܒ݂ܵܐ ܡ̣ܢ ܝܲܡܝܼܢܵܐ ܕܚܲܝܠܬܵܢܵܐ ܘܒܹܐܬܵܝܵܐ ܥܲܠ ܥܢܵܢܵܐ ܕܫܡܲܝܵܐ.“
    processQueryStringParams();
  });

  const syrcScrollHeight = $('#syrc').prop('scrollHeight');
  $('#syrc').css({ height: `${syrcScrollHeight}px`, 'overflow-y': 'hidden' });
});

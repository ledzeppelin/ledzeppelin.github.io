$(document).ready(() => {
  $('#poem-body').html(poemToHTML(poemTranslation, aiiReplacements, aiiReplacementsForTR));

  function scrollToMiddle(selector) {
    if (!$('html, body').is(':animated')) {
      $('html, body').animate({ scrollTop: getScrollPosition(selector) }, 300);
    }
  }

  function getScrollPosition(selector) {
    const $element = $(selector);
    const elementTop = $element.offset().top;
    const elementHeight = $element.outerHeight();
    const windowHeight = $(window).height();
    const scrollPosition = elementTop - (windowHeight / 2) + (elementHeight / 2);
    return scrollPosition;
  }

  // ///////////////////////
  // audio event handlers //
  // ///////////////////////
  const audio = $('#recitation')[0];
  const startTimes = generateStartTimes(poemTranslation);

  $(audio).on('timeupdate', () => {
    // console.log(audio.currentTime);
    const lyricIdx = findLastIndexSmallerThan(startTimes, audio.currentTime);

    // console.log(audio.currentTime, lyricIdx);

    $('.section-line').slice(0, lyricIdx + 1).addClass('recite-past-pres');
    $('.section-line').slice(lyricIdx + 1).removeClass('recite-past-pres');

    const cur = formatTime(audio.currentTime);
    const end = formatTime(audio.duration);
    $('#scan-poem-time').text(`${cur} / ${end}`);
  });

  const playPauseButton = $('#play-pause-button');

  $(audio).on('play', () => {
    // event fires when click pause button, press pause on keyboard, click section
    playPauseButton.text('pause');
  });

  $(audio).on('pause', () => {
    // event fires when click pause button, press pause on keyboard
    playPauseButton.text('play_arrow');
  });

  $(audio).on('ended', () => {
    audio.currentTime = 0;
    playPauseButton.text('play_arrow');
  });

  // ///////////////////////
  // click event handlers //
  // ///////////////////////

  playPauseButton.click(() => {
    if (audio.paused) {
      const scrollIdx = Math.max($('.recite-past-pres').length - 1, 0);
      // console.log(scrollIdx);
      scrollToMiddle($('.section-line').eq(scrollIdx));
      audio.play();
    } else {
      audio.pause();
    }
  });

  $('.section-line').click((e) => {
    const index = $(e.currentTarget).index('.section-line');
    audio.currentTime = startTimes[index] + 0.01; // otherwise delay when tapping
    if (audio.paused) {
      audio.play();
    }
  });
});

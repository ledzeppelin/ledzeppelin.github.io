$(document).ready(() => {
  const SPEED_MS = 200;

  // disable since we require interaction to trigger playback
  // otherwise iphone safari has issue with playing first ipa, scrolling down,
  // collapsing audio of dynamic content and tapping play (it requires two taps)
  Howler.autoUnlock = false;

  $('#tag-search-results').on('click', '.expandable > a', (e) => {
    $(e.currentTarget).parent().toggleClass('expanded');
    $(e.currentTarget).next().children(':not(.always-show)').slideToggle(SPEED_MS);
  });

  $('#search-results').on('click', '.more-vocalized', (e) => {
    $(e.currentTarget).siblings('.aii-v-word-container:not(.always-show)').slideToggle(SPEED_MS);
    $(e.currentTarget).children('.more-vocalized-icon').toggleClass('expanded');
  });

  $('#search-results').on('click', '.more-sounds-button', (e) => {
    $(e.currentTarget).parent().next()
      .children('.sound-container:not(.always-show)')
      .slideToggle(SPEED_MS);

    $(e.currentTarget).parent().next()
      .children('.ipa-info:not(.always-show)')
      .slideToggle(SPEED_MS);

    $(e.currentTarget).toggleClass('expanded');
  });

  $('#search-results').on('click', '.more-defs-button-container', (e) => {
    $(e.currentTarget).children('.more-defs-button').toggleClass('expanded');

    $(e.currentTarget).parent().siblings('.senses')
      .children('.gloss-container:not(.always-show)')
      .slideToggle(SPEED_MS);

    $(e.currentTarget).parent().parent().find('.more-info:not(.always-show)')
      .slideToggle(SPEED_MS);
  });

  $('#search-results').on('click', '.show-linkages', (e) => {
    if ($(e.currentTarget).text() === 'show more...') {
      $(e.currentTarget).text('show less...');
    } else {
      $(e.currentTarget).text('show more...');
    }

    $(e.currentTarget).next().slideToggle(SPEED_MS);
  });

  $('#search-results').on('click', '.play-sound', (e) => {
    $(e.currentTarget).addClass('waiting');

    const sound = new Howl({
      src: [$(e.currentTarget).data('filename')],
      html5: true,
      onplay: () => {
        $(e.currentTarget).removeClass('waiting').addClass('playing-sound');
        $(e.currentTarget).next().children('.ipa').addClass('playing-sound');
      },
      onend: () => {
        $(e.currentTarget).removeClass('playing-sound');
        $(e.currentTarget).next().children('.ipa').removeClass('playing-sound');
      },
    });
    sound.play();
  });
});

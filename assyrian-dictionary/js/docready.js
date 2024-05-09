$(document).ready(() => {
  const SPEED_MS = 200;

  $('#tag-search-results').on('click', '.expandable > a', (e) => {
    $(e.currentTarget).parent().toggleClass('expanded');
    $(e.currentTarget).next().children(':not(.always-show)').slideToggle(SPEED_MS);
  });

  $('#search-results').on('click', '.more-vocalized', (e) => {
    $(e.currentTarget).siblings('.aii-v-word-container:not(.always-show)').slideToggle(SPEED_MS);
    $(e.currentTarget).children('.more-vocalized-icon').toggleClass('expanded');
  });

  $('#search-results').on('click', '.more-sounds-button-container', (e) => {
    $(e.currentTarget).parent().next()
      .children('.sound-container:not(.always-show)')
      .slideToggle(SPEED_MS);

    $(e.currentTarget).parent().next()
      .children('.ipa-info:not(.always-show)')
      .slideToggle(SPEED_MS);

    $(e.currentTarget).children('.more-sounds-button').toggleClass('expanded');
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

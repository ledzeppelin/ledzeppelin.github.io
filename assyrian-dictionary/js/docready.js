$(document).ready(() => {
  const SPEED_MS = 200;

  // disable since we require interaction to trigger playback
  // otherwise iphone safari has issue with playing first ipa, scrolling down,
  // collapsing audio of dynamic content and tapping play (it requires two taps)
  Howler.autoUnlock = false;

  $('#top-tags-menu').on('click', '.tag-menu-btn-l1', (e) => {
    $(e.currentTarget).children('.expandable-btn-icon').toggleClass('expanded');
    $(e.currentTarget).siblings('.top-tags-group:not(.always-show)').toggle();
  });

  $('#top-tags-menu').on('click', '.tag-menu-btn-l2', (e) => {
    $(e.currentTarget).children('.expandable-btn-icon').toggleClass('expanded');
    $(e.currentTarget).next('.top-tags-items').children('.always-show').last()
      .toggleClass('hide-divider');

    // we can't toggle() for display:inline-block when it's initially not shown
    const $elements = $(e.currentTarget).next('.top-tags-items').children('.top-tag-li:not(.always-show)');
    $elements.each((index, element) => {
      const $element = $(element); // Use `element` instead of `this`
      if ($element.css('display') === 'none') {
        $element.css('display', 'inline-block');
      } else {
        $element.css('display', 'none');
      }
    });
  });

  $('#search-results').on('click', '.more-sounds-button', (e) => {
    $(e.currentTarget).toggleClass('expanded').parent().next('.sound-containers')
      .slideToggle(SPEED_MS);
  });

  $('#search-results').on('click', '.more-defs-button-container', (e) => {
    $(e.currentTarget).children('.more-defs-button').toggleClass('expanded');

    $(e.currentTarget).parent().parent().find('.more-info.has-heading')
      .slideToggle(SPEED_MS);
  });

  $('#search-results').on('click', '.show-other-forms-btn', (e) => {
    $(e.currentTarget).next('.more-info').slideToggle(SPEED_MS);
    $(e.currentTarget).children('.expandable-btn-icon').toggleClass('expanded');
  });

  $('#search-results').on('click', '.show-examples-btn, .show-gloss-terms-btn', (e) => {
    $(e.currentTarget).next('.t3-linkages-and-examples').slideToggle(SPEED_MS);
    $(e.currentTarget).children('.expandable-btn-icon').toggleClass('expanded');
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

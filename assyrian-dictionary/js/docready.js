$(document).ready(() => {
  const SPEED_MS = 200;
  const howlCache = {};

  $(document).on('touchstart', '.free-text-search-result', () => {
    // workaround for iOS chrome
    // 1. touch tag or type one char
    // 2. flick to scroll down w/ infinite scroll
    // 3. tapping .free-text-search-result requires a 2nd tap
    // happens w/ dictionary not searchable bible, not sure why
    //
    // https://github.com/wp-media/wp-rocket/issues/3142#issuecomment-1899980159
    // https://stackoverflow.com/questions/74532312/dynamically-added-link-causes-doubletap-issue-in-chrome-on-ios-looking-for-fix
    // order of processing are touchstart → touchmove → touchend then a click is triggered
    // this "primes" the link so that when its tapped, iOS correctly registers the click event
  });

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
    const filename = $(e.currentTarget).data('filename');
    if (!howlCache[filename]) { // caching doesn't seem to be needed if we don't use html5
      $(e.currentTarget).addClass('waiting');
      howlCache[filename] = new Howl({
        src: [filename],
        html5: true, // so it works in silent mode
        onplay: () => {
          $(e.currentTarget).removeClass('waiting').addClass('playing-sound');
          $(e.currentTarget).next().children('.ipa').addClass('playing-sound');
        },
        onend: () => {
          $(e.currentTarget).removeClass('playing-sound');
          $(e.currentTarget).next().children('.ipa').removeClass('playing-sound');
        },
      });
    }

    const sound = howlCache[filename];
    sound.play();
  });
});

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

  $('#top-tags-menu').on('click', '.top-tags-menu-item', (e) => {
    const tagName = $(e.currentTarget).data('tagName');

    $('#top-tags-menu .top-tags-menu-item.active').removeClass('active');
    $(e.currentTarget).addClass('active');

    $('#top-tags-children').html(
      createTopTagsChildrenFragment(aiiDictionaryTags, tagName),
    );
  });

  $('#top-tags-menu').on('click', '.top-tags-menu-more', (e) => {
    const $li = $(e.currentTarget).parent();
    const $ul = $li.parent();

    $li.remove();
    $ul.children().show();
  });

  $('#search-results').on('click', '.more-sounds-button', (e) => {
    $(e.currentTarget).toggleClass('expanded').parent().next('.sound-containers')
      .slideToggle(SPEED_MS);
  });

  $('#search-results').on('click', '.inflections-button-container', (e) => {
    $(e.currentTarget).children('.inflections-button').toggleClass('expanded');
    const mainConj = $(e.currentTarget).closest('.jsonline').children('.more-info.has-heading');
    if (mainConj.is(':visible')) { // checks if any one of the top-level tables are visible
      // sliding up
      $(e.currentTarget).closest('.jsonline').children('.more-paradigms').children('.more-info.has-heading')
        .slideUp(SPEED_MS);
    } else {
      $(e.currentTarget).closest('.jsonline').children('.more-paradigms').children('.more-info.has-heading.more-paradigms-was-clicked')
        .slideDown(SPEED_MS);
    }
    mainConj.slideToggle(SPEED_MS);
  });

  $('#search-results').on('click', '.more-paradigms-button', (e) => {
    $(e.currentTarget).toggleClass('expanded');
    $(e.currentTarget).parent().parent().next('.more-paradigms')
      .children('.more-info.has-heading')
      .slideToggle(SPEED_MS)
      .toggleClass('more-paradigms-was-clicked');
  });

  $('#search-results').on('click', '.show-other-forms-btn', (e) => {
    $(e.currentTarget).next('.more-info').slideToggle(SPEED_MS);
    $(e.currentTarget).children('.expandable-btn-icon').toggleClass('expanded');
  });

  $('#search-results').on('click', '.show-examples-btn, .show-gloss-terms-btn', (e) => {
    $(e.currentTarget).next('.t3-linkages-and-examples').slideToggle(SPEED_MS);
    $(e.currentTarget).children('.expandable-btn-icon').toggleClass('expanded');
  });

  $('#search-results').on('change', '#collapsed-paradigms-1, #collapsed-paradigms-2', (e) => {
    const slice = $(e.currentTarget).data('slice');
    const idx = $(e.currentTarget).val();
    $(e.currentTarget).parent().parent().parent()
      .next('.headered-rows')
      .html(COLLAPSED_CHILDREN_TABLE_ROWS[slice][idx].clone());
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

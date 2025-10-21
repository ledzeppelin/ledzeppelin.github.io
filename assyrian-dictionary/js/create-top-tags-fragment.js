function createTopTagsMenuFragment(dictTags, shouldLimit) {
  const frag = $(document.createDocumentFragment());
  dictTags.forEach((item) => {
    frag.append(
      $('<li/>').append(
        $('<button/>', {
          class: 'top-tags-menu-item',
          html: `${item.emoji}&nbsp;&nbsp;${item.name}`,
          'data-tag-name': item.name,
        }),
      ),
    );
  });

  if (shouldLimit) {
    const vw = document.documentElement.clientWidth; // viewport width

    let limit = 1;
    if (vw >= 582) { // max_width
      limit = 3;
    } else if (vw >= 428) { // iphone 12 pro max
      limit = 2;
    }

    const $lis = frag.children('li');

    $('<li/>')
      .append($('<button/>', { class: 'top-tags-menu-more', text: 'More' }))
      .insertAfter($lis.eq(limit - 1));

    $lis.slice(limit).hide();
  }

  return frag;
}


const url_2 = new URL(window.location.href);
const params_2 = new URLSearchParams(url_2.search);
const DICT_TAG_SEARCH_PARAM_2 = 'tag';
const DICT_AII_EXACT_SEARCH_PARAM_2 = 'assyrian-word';

const shouldLimit = params_2.has(DICT_TAG_SEARCH_PARAM_2) || params_2.has(DICT_AII_EXACT_SEARCH_PARAM_2);
$('#top-tags-menu').html(createTopTagsMenuFragment(aiiDictionaryTags, shouldLimit));

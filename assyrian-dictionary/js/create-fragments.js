// const LOCAL_DEVELOPMENT = true;
const LOCAL_DEVELOPMENT = false; // for cleaner urls in prod

const INDEX_HTML = LOCAL_DEVELOPMENT ? 'index.html' : '';

const TAG_SEARCH_PARAM = 'tag-search';
const AII_EXACT_SEARCH_PARAM = 'aii-exact-search';

function createFreeTextResultFrag(aiiV) {
  return $('<a/>', {
    class: 'free-text-search-result',
    href: `./${INDEX_HTML}?${AiiUtils.paramsToString([[AII_EXACT_SEARCH_PARAM, aiiV]])}`,
  });
}

function createTopTagsMenuButton(buttonClassName, buttonText, useTriRootChevron = false) {
  const chevronFrag = $(document.createDocumentFragment());
  if (useTriRootChevron) {
    chevronFrag.append(
      $('<span/>', { class: 'expandable-btn-icon expandable-btn-icon-green material-symbols-rounded', text: 'keyboard_arrow_right' }),
      $('<span/>', { class: 'expandable-btn-icon expandable-btn-icon-red material-symbols-rounded', text: 'keyboard_arrow_right' }),
      $('<span/>', { class: 'expandable-btn-icon expandable-btn-icon-blue material-symbols-rounded', text: 'keyboard_arrow_right' }),
    );
  } else {
    chevronFrag.append(
      $('<span/>', { class: 'expandable-btn-icon material-symbols-rounded', text: 'keyboard_arrow_right' }),
    );
  }
  return $('<button/>', { class: `expandable-btn ${buttonClassName}` }).append(
    $('<span/>', { class: 'expandable-btn-text', text: buttonText }),
    chevronFrag,
  );
}

function createTopTagsMenuFragment(dictTags) {
  const frag = $(document.createDocumentFragment());
  frag.append(createTopTagsMenuButton('tag-menu-btn-l1', 'Most Popular'));

  dictTags.forEach((item) => {
    const itemsFrag = $('<ul/>', { class: 'top-tags-items' });
    item.children.forEach((child) => {
      itemsFrag.append(
        $('<li/>', { class: 'top-tag-li' }).append(
          $('<a/>', {
            class: 'top-tag-anchor',
            text: child.name,
            href: `./${INDEX_HTML}?${AiiUtils.paramsToString([[TAG_SEARCH_PARAM, child.tag]])}`,
          }),
        ),
      );
    });

    frag.append(
      $('<ul/>', { class: 'top-tags-group' }).append(
        $('<li/>').append(
          createTopTagsMenuButton('tag-menu-btn-l2', item.name),
          itemsFrag,
        ),
      ),
    );
  });

  return frag;
}

function topTagsMenuHighlightMatches(results) {
  let maxTags = 20;
  // maxTags = 9999;
  if (results.length > 0) {
    results.forEach((tagGroup) => {
      tagGroup.matches.forEach((match) => {
        // console.log(match);
        if (match.key === 'name') {
          const ele = $('#top-tags-menu').find('.top-tags-group').eq(tagGroup.refIndex);
          ele.addClass('always-show').find('.expandable-btn-text').html(highlightEngIndices(match.value, match.indices));
        } else if (match.key === 'children.name' && maxTags > 0) {
          const ele = $('#top-tags-menu')
            .find('.top-tags-items').eq(tagGroup.refIndex)
            .children('.top-tag-li')
            .eq(match.refIndex);

          ele.addClass('always-show').children('a').html(highlightEngIndices(match.value, match.indices));
          ele.closest('.top-tags-group').addClass('always-show');
          maxTags -= 1;
        }
      });
    });

    $('#top-tags-menu .top-tags-group').each((_, element) => {
      const lastAlwaysShow = $(element).find('.top-tag-li.always-show').last();
      if (lastAlwaysShow.length) {
        lastAlwaysShow.addClass('hide-divider');
      }
    });
  }
}

function topTagsMenuClearHighlightedMatches() {
  $('#top-tags-menu').find('.expanded').removeClass('expanded');
  $('#top-tags-menu').find('.highlighted').contents().unwrap();
  $('#top-tags-menu').find('.hide-divider').removeClass('hide-divider');
  $('#top-tags-menu').find('.exact-search-match').removeClass('exact-search-match');

  $('#top-tags-menu .always-show').removeClass('always-show');
  // we remove inline styles set by toggle, to test
  // type "cate", click "Most Popular" to show more, then delete "cate"
  const hideOrShow = '.top-tags-group, .top-tag-li';
  $('#top-tags-menu').find(hideOrShow).removeAttr('style');
}

function highlightExactMatchInTopTagsMenu(tagSearchParam) {
  const href = `./${INDEX_HTML}?${AiiUtils.paramsToString([[TAG_SEARCH_PARAM, tagSearchParam]])}`;

  $('#top-tags-menu')
    .find(`a[href="${href}"]`).addClass('exact-search-match')
    // eslint-disable-next-line newline-per-chained-call
    .parent().addClass('always-show hide-divider')
    // eslint-disable-next-line newline-per-chained-call
    .closest('.top-tags-group').addClass('always-show');
}

function createAiiVFrag(aiiV, anyJsonlineRoot) {
  if (anyJsonlineRoot) {
    const innerFrag = $(document.createDocumentFragment());
    aiiV.split(' ').forEach((char) => {
      innerFrag.append(
        $('<span/>', { class: 'atuta-box-large', text: char }),
      );
    });
    return $('<div/>', { class: 'aii-v-word' }).append(innerFrag);
  }

  return $('<div/>', { class: 'aii-v-word', text: aiiV });
}

function createWiktionaryFrag(aiiNotV) {
  const anchor = $('<a/>', {
    text: aiiNotV,
    href: `https://en.wiktionary.org/wiki/${aiiNotV}#Assyrian_Neo-Aramaic`,
  });

  const firstChar = aiiNotV.substring(0, 1);

  if (firstChar === 'ܓ') {
    anchor.addClass('indent-word');
  } else if (firstChar === 'ܢ') {
    anchor.addClass('indent-word-more');
  }

  return $('<div/>', { class: 'wiktionary-link-container' }).append(
    $('<span/>', { text: 'from wiktionary ' }),
    anchor,
  );
}

function createCommonWordFrag() {
  const frag = $(document.createDocumentFragment());
  frag.append(
    $('<a/>', {
      class: 'tier1-tag',
      text: 'common word',
      href: `./${INDEX_HTML}?${AiiUtils.paramsToString([[TAG_SEARCH_PARAM, 'special:common word']])}`,
    }),
    ' ',
  );
  return frag;
}

function createInNumbersTableFrag() {
  const frag = $(document.createDocumentFragment());
  const txt = 'numbers table';
  frag.append(
    ' in ',
    $('<a/>', {
      class: 'in-numbers-table',
      text: txt,
      href: `./${INDEX_HTML}?${AiiUtils.paramsToString([[TAG_SEARCH_PARAM, `special:${txt}`]])}`,
    }),
    ' ',
  );

  return frag;
}

function createT1IntoPOSFrag(aiiV, singletonJsonline) {
  const frag = $(document.createDocumentFragment());

  if (singletonJsonline) {
    if ('is_common_word' in aiiV) {
      frag.append(
        ', ',
        createCommonWordFrag(),
      );
    }

    if ('in_numbers_table' in aiiV) {
      frag.append(
        createInNumbersTableFrag(),
      );
    }

    if ('tier1_etymology' in aiiV) {
      frag.append(
        createEtymologyFrag('tier1_etymology', aiiV, 'tier1-tag', 'tier1-tag-etymology'),
      );
    }
  }

  return frag;
}

function createTier1TagsFrag(aiiV, singletonJsonline) {
  const frag = $(document.createDocumentFragment());
  let notEmpty = false;
  if (!singletonJsonline) {
    if ('is_common_word' in aiiV) {
      notEmpty = true;
      frag.append(
        createCommonWordFrag(),
      );
    }

    if ('in_numbers_table' in aiiV) {
      notEmpty = true;
      frag.append(
        createInNumbersTableFrag(),
      );
    }

    if ('tier1_etymology' in aiiV) {
      notEmpty = true;
      frag.append(
        createEtymologyFrag('tier1_etymology', aiiV, 'tier1-tag', 'tier1-tag-etymology'),
      );
    }
  }

  if (notEmpty) {
    return $('<div/>', { class: 'aii-v-meta-container' }).append(frag);
  }

  return frag;
}

function createIpaContainerFrag(aiiV) {
  let frag = $(document.createDocumentFragment());
  if ('ipas' in aiiV) {
    frag = $('<div/>', { class: 'sound-containers' });
    const accentCounts = {};
    aiiV.ipas.forEach(([accents, ipa, ipaHash]) => {
      frag.append(
        createSoundContainerFrag(accents, ipa, ipaHash, accentCounts),
      );
    });
    frag.append(
      $('<div/>', { class: 'ipa-info' }).append(
        $('<span/>', { text: 'audio is machine-generated from ipa' }),
      ),
    );
  }
  return frag;
}

function createIpaAccentNameContainers(accents, accentCounts) {
  const frag = $(document.createDocumentFragment());
  accents.forEach((accent) => {
    let accentOrdinal = '';
    if (accent in accentCounts) {
      accentCounts[accent] += 1;
      const cnt = accentCounts[accent];
      const alt = 'alternate';
      accentOrdinal = cnt === 1 ? ` ${alt}` : ` ${cnt}${getOrdinal(cnt)} ${alt}`;
    } else {
      accentCounts[accent] = 0;
    }

    frag.append(
      $('<div/>', { class: 'accent-name-container' }).append(
        $('<a/>', {
          class: 'accent-name tier1-tag tier1-tag-ipa',
          text: accent,
          href: `./${INDEX_HTML}?${AiiUtils.paramsToString([[TAG_SEARCH_PARAM, `ipa:${accent}`]])}`,
        }),
        accentOrdinal,
      ),
    );
  });
  return frag;
}

function createSoundContainerFrag(accents, ipa, ipaHash, accentCounts) {
  return $('<div/>', { class: 'sound-container' }).append(
    $('<div/>', { class: 'play-sound-container' }).append(
      // https://stackoverflow.com/a/62414510
      $('<button/>', {
        class: 'material-symbols-rounded play-sound',
        text: 'volume_up',
        'data-filename': `./audio/${ipaHash}.mp3`,
      }),
      $('<div/>').append(
        $('<div/>', { class: 'ipa', text: ipa }),
        createIpaAccentNameContainers(accents, accentCounts),
      ),
    ),
  );
}

function createPOSPrefixFrag(jsonline) {
  const frag = $(document.createDocumentFragment());
  if ('gender' in jsonline) {
    frag.append(
      $('<span/>', {
        text: ` (${jsonline.gender})`,
      }),
    );
  }
  return frag;
}

function createPOSFrag(pos) {
  return $('<a/>', {
    class: 'tier2-tag',
    text: pos,
    href: `./${INDEX_HTML}?${AiiUtils.paramsToString([[TAG_SEARCH_PARAM, `pos:${pos}`]])}`,
  });
}

function createRootLettersFrag(key, obj) {
  const frag = $(document.createDocumentFragment());
  if (key in obj) {
    frag.append(
      ' (',
      $('<a/>', {
        class: 'tier2-tag',
        text: obj[key],
        href: `./${INDEX_HTML}?${AiiUtils.paramsToString([[TAG_SEARCH_PARAM, `root:${obj[key]}`]])}`,
      }),
      ')',
    );
  }
  return frag;
}

function createVisVerbFrag(key, obj, tierTag) {
  const frag = $(document.createDocumentFragment());
  if (key in obj) {
    frag.append(
      ' (',
      $('<a/>', {
        class: tierTag,
        text: obj[key].stem,
        href: `./${INDEX_HTML}?${AiiUtils.paramsToString([[TAG_SEARCH_PARAM, `stem:${obj[key].stem}`]])}`,
      }),
    );
    if ('pattern' in obj[key]) {
      frag.append(
        ', ',
        $('<a/>', {
          class: tierTag,
          text: obj[key].pattern,
          href: `./${INDEX_HTML}?${AiiUtils.paramsToString([[TAG_SEARCH_PARAM, `pattern:${obj[key].pattern}`]])}`,
        }),
      );
    }
    frag.append(')');
  }
  return frag;
}

function createEtymologyFrag(etyKey, obj, tierTag) {
  const frag = $(document.createDocumentFragment());

  frag.append(
    ' from ',
  );
  obj[etyKey].forEach((et, i) => {
    frag.append(
      $('<a/>', {
        class: tierTag,
        text: et,
        href: `./${INDEX_HTML}?${AiiUtils.paramsToString([[TAG_SEARCH_PARAM, `from:${et}`]])}`,
      }),
    );

    const secondToLast = i === obj[etyKey].length - 2;
    if (secondToLast) {
      frag.append(' and ');
    } else if (i < obj[etyKey].length - 1) {
      frag.append(', ');
    }
  });

  return frag;
}

function regexAtwatehBoxes(templateStr, templateAtwateh, breakLigatures) {
  const fragment = $(document.createDocumentFragment());
  let i = 0;
  let atutaIdx = 0;
  // eslint-disable-next-line prefer-regex-literals
  const re = new RegExp(`(?:{{{[0-9]}}})(${AiiUtils.diacriticCharClass})*`, 'g');
  templateStr.replace(re, (match, $1, strMatchIdx) => {
    // https://stackoverflow.com/a/49262416
    if (strMatchIdx > i) {
      // test case - match starts at i = 0
      fragment.append(templateStr.slice(i, strMatchIdx));
    }

    const [rootIdx, atuta] = templateAtwateh[atutaIdx];

    const rootLetterText = $1 === undefined ? atuta : `${atuta}${$1}`;

    const atutaFirstChar = (i === 0 && strMatchIdx === 0) ? ' atuta-box-small-is-first' : '';

    const brLig = breakLigatures ? ' break-ligatures' : '';

    fragment.append(
      $('<span/>', { class: `atuta-box-small${brLig} atuta-box-clr-${rootIdx}${atutaFirstChar}`, text: rootLetterText }),
    );
    i = strMatchIdx + match.length;
    atutaIdx += 1;
    // Return the replacement leveraging the parameters.
  });
  if (i < templateStr.length) {
    fragment.append(templateStr.slice(i, templateStr.length));
  }

  return fragment;
}

function createAtwatehBoxesFrag(templateStr, templateAtwateh, breakLigatures) {
  return $('<div/>', { class: 'atwateh-boxes' }).append(
    regexAtwatehBoxes(templateStr, templateAtwateh, breakLigatures),
  );
}

function createTableRowsFrag(table, aiiV) {
  const tableRows = $(document.createDocumentFragment());
  table.rows.forEach((row) => {
    let extraYPadding = row.values.length > 1 ? 'rows-y-padding' : '';

    const rowValues = $(document.createDocumentFragment());
    row.values.forEach((aii) => {
      if ('template_str' in aii) {
        rowValues.append(createAtwatehBoxesFrag(aii.template_str, aii.template_atwateh, 'break_ligatures' in aii));
        extraYPadding = 'rows-y-padding';
      }

      const rowValue = $(document.createDocumentFragment());
      if ('cog_value' in aii) {
        rowValues.append(
          $('<div/>', { class: 'cog-val-container', text: aii.cog_value }),
        );
      } else {
        let valFrag;
        let doesMatch = '';
        if (aii.value === aiiV) {
          valFrag = $('<span/>', { class: 'infl-val does-match', text: aii.value });
          doesMatch = ' does-match';
        } else if (fuseAiiVocalized.search(`="${aii.value}"`).length > 0) {
          // fuseAiiVocalized a global which is imported before this file is imported
          // but this function gets called from shared_docready.js which is imported later
          valFrag = $('<a/>', {
            class: 'infl-val-anchor',
            text: aii.value,
            href: `./${INDEX_HTML}?${AiiUtils.paramsToString([[AII_EXACT_SEARCH_PARAM, aii.value]])}`,
          });
        } else {
          valFrag = $('<span/>', { class: 'infl-val', text: aii.value });
        }

        const tr = aiiTranslitWrapper(aii.value, AiiUtils.validLetters, aiiTranslit);
        // const tr = aiiTranslit(aii.value).phonetic;
        rowValue.append(
          valFrag,
          ' ',
          $('<span/>', { class: `infl-tr${doesMatch}`, text: tr }),
        );

        rowValues.append(
          $('<div/>', { class: 'infl-val-container' }).append(
            rowValue,
          ),
        );
      }
    });

    tableRows.append(
      $('<div/>', { class: `infl-row ${extraYPadding}` }).append(
        $('<div/>', { class: 'infl-meta', text: row.meta }),
        $('<div/>', { class: 'infl-vals' }).append(rowValues),
      ),
    );
  });

  return tableRows;
}

function createTableFrag(table, aiiV = null) {
  // rest of table
  const tableRows = createTableRowsFrag(table, aiiV);
  const frag = $('<div/>', { class: 'more-info' });

  // heading
  if ('heading' in table) {
    frag.addClass('has-heading');
    frag.append(
      $('<div/>', { class: 'infl-row is-heading' }).append(
        $('<div/>', { class: 'infl-meta', text: table.heading }),
      ),
    );
    if ('heading_2' in table) {
      const heading2 = $('<div/>', { class: 'infl-vals' });
      table.heading_2.forEach((val) => {
        heading2.append(
          $('<div/>', { class: 'infl-val-container' }).append(
            $('<span/>', { class: 'infl-val-eng', text: val }),
          ),
        );
      });
      frag.find('.infl-row').append(heading2);
    }
    return frag.append(
      $('<div/>', { class: 'headered-rows' }).append(tableRows),
    );
  }

  return frag.append(tableRows);
}

function createGlossFrag(sense, j) {
  return $('<li/>', { class: 'gloss-container', val: j + 1 }).append(
    $('<span/>', { class: 'gloss', text: sense.gloss }),
    createTier3CategoriesFrag(sense),
    createGlossTermsButtonFrag(sense),
    createGlossTermsTableFrag(sense),
    createExamplesButtonFrag(sense),
    createExamplesTableFrag(sense),
  );
}

function createOtherFormsFrag(jsonline, aiiV) {
  if ('other_forms' in jsonline) {
    return createTableFrag(jsonline.other_forms, aiiV);
  }
  return $(document.createDocumentFragment());
}

function colorfulRelatedTerms(jsonline) {
  return (
    // eslint-disable-next-line max-len
    jsonline?.other_forms?.rows?.some((row) => row?.values?.some((value) => value?.template_str)) || false
  );
}

function createOtherFormsButtonFrag(jsonline) {
  if ('other_forms' in jsonline) {
    return createTopTagsMenuButton('show-other-forms-btn', 'related terms', colorfulRelatedTerms(jsonline));
  }
  return $(document.createDocumentFragment());
}

function createInflFrag(jsonline, aiiV) {
  if ('table' in jsonline) {
    return createTableFrag(jsonline.table, aiiV);
  }
  return $(document.createDocumentFragment());
}

function createConjFrag(jsonline, aiiV) {
  const frag = $(document.createDocumentFragment());
  if ('conj' in jsonline) {
    jsonline.conj.tenses.forEach((tense) => {
      frag.append(createTableFrag(tense, aiiV));
    });
  }
  return frag;
}

function createGlossTermsButtonFrag(sense) {
  if ('other_forms' in sense) {
    return createTopTagsMenuButton('show-gloss-terms-btn', 'gloss terms');
  }
  return $(document.createDocumentFragment());
}

function createGlossTermsTableFrag(sense) {
  if ('other_forms' in sense) {
    const frag = $('<div/>', { class: 't3-linkages-and-examples' });
    // set_linkage_table in datadump_to_dict.py ensures aiiV is omitted from t3 table
    frag.append(createTableRowsFrag(sense.other_forms, null));
    return frag;
  }
  return $(document.createDocumentFragment());
}

function createExamplesButtonFrag(sense) {
  if ('examples' in sense) {
    return createTopTagsMenuButton('show-examples-btn', 'examples');
  }
  return $(document.createDocumentFragment());
}

function createExamplesTableFrag(sense) {
  if ('examples' in sense) {
    const frag = $('<div/>', { class: 't3-linkages-and-examples' });
    sense.examples.forEach((example) => {
      frag.append(
        $('<div/>', { class: 'example-row' }).append(
          $('<div/>', { class: 'example-row-vals' }).append(
            $('<div/>', { class: 'example-text', text: example.text }),
            $('<div/>', { class: 'example-tr', text: aiiTranslit(example.text).phonetic }),
            $('<div/>', { class: 'example-english', text: example.english }),
          ),
        ),
      );
    });
    return frag;
  }
  return $(document.createDocumentFragment());
}

function createTier3CategoriesFrag(sense) {
  const frag = $(document.createDocumentFragment());

  if ('tier3_categories' in sense) {
    sense.tier3_categories.forEach((tier3Category) => {
      frag.append(
        $('<li/>').append(
          $('<a/>', {
            class: 'tier3-tag',
            text: tier3Category,
            href: `./${INDEX_HTML}?${AiiUtils.paramsToString([[TAG_SEARCH_PARAM, `category:${tier3Category}`]])}`,
          }),
        ),
      );
    });
    return $('<ul/>', { class: 't3-categories', html: frag });
  }

  return frag;
}

function getOrdinal(n) {
  // https://www.sitepoint.com/convert-numbers-to-ordinals-javascript/
  let ord = 'th';

  if (n % 10 === 1 && n % 100 !== 11) {
    ord = 'st';
  } else if (n % 10 === 2 && n % 100 !== 12) {
    ord = 'nd';
  } else if (n % 10 === 3 && n % 100 !== 13) {
    ord = 'rd';
  }

  return ord;
}

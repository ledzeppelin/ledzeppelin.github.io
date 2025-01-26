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

function createTopTagsMenuButton(buttonClassName, buttonText) {
  return $('<button/>', { class: `expandable-btn ${buttonClassName}` }).append(
    $('<span/>', { class: 'expandable-btn-text', text: buttonText }),
    $('<span/>', { class: 'expandable-btn-icon material-symbols-rounded', text: 'keyboard_arrow_right' }),
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

function createAiiVFrag(aiiV) {
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

function createShowInflectionsButton(jsonline) {
  const isInflection = 'table' in jsonline;
  const isVerbConj = 'verb_conjugation' in jsonline;
  const isColorfulVerbConj = jsonline?.verb_conjugation?.strong_radicals?.length;

  if (isInflection || isVerbConj || isColorfulVerbConj) {
    const buttonStyle = isColorfulVerbConj ? 'verb-conj-button' : 'not-verb-conj-button';
    return $('<button/>', { class: `more-defs-button-container ${buttonStyle}` }).append(
      $('<span/>', { class: 'material-symbols-rounded more-defs-button', text: 'keyboard_arrow_down' }),
    );
  }
  return null;
}

function createVerbPatternFrag(key, obj, tierTag) {
  const frag = $(document.createDocumentFragment());
  if (key in obj) {
    frag.append(
      ' (',
      $('<a/>', {
        class: tierTag,
        text: obj[key].pattern,
        href: `./${INDEX_HTML}?${AiiUtils.paramsToString([[TAG_SEARCH_PARAM, `pattern:${obj[key].pattern}`]])}`,
      }),
      ')',
    );
  }
  return frag;
}

function createEtymologyFrag(etyKey, obj, tierTag) {
  const frag = $(document.createDocumentFragment()).append(' from ');

  const innerFrag = $('<ul/>', { class: 'ety-list' });
  obj[etyKey].forEach((et) => {
    innerFrag.append(
      $('<li/>').append(
        $('<a/>', {
          class: tierTag,
          text: et,
          href: `./${INDEX_HTML}?${AiiUtils.paramsToString([[TAG_SEARCH_PARAM, `from:${et}`]])}`,
        }),
      ),
    );
  });

  frag.append(innerFrag);

  return frag;
}

function createAtwatehBoxesFrag(templateStr, templateAtwateh) {
  const tripleBraceRegex = new RegExp(`{{{([1-9ܐܝܘ])}}}(${AiiUtils.diacriticCharClass}*)`, 'g');
  const fragment = $(document.createDocumentFragment());
  let i = 0;
  let matchCount = 0;
  let digitIndex = 0;

  templateStr.replace(tripleBraceRegex, (match, radical, diacritics, offset) => {
    if (offset > i) {
      fragment.append(templateStr.slice(i, offset));
    }
    let letter;
    let cssClass;
    if (/\d/.test(radical)) {
      letter = templateAtwateh[digitIndex] + (diacritics || '');
      cssClass = `atuta-box-small atuta-box-clr-${matchCount}`;
      digitIndex += 1;
    } else {
      letter = radical + (diacritics || '');
      cssClass = 'atuta-box-small atuta-box-clr-weak';
    }
    if (offset === 0) {
      cssClass += ' atuta-box-small-is-first';
    }
    fragment.append($('<span/>', { class: cssClass, text: letter }));
    i = offset + match.length;
    matchCount += 1;
    return '';
  });

  if (i < templateStr.length) {
    fragment.append(templateStr.slice(i));
  }

  return $('<div/>', { class: 'atwateh-boxes' }).append(fragment);
}

function createTableRowsFrag(table, aiiV) {
  const tableRows = $(document.createDocumentFragment());
  table.rows.forEach((row) => {
    let extraYPadding = row.values.length > 1 ? 'rows-y-padding' : '';
    const rowValues = $(document.createDocumentFragment());
    row.values.forEach((aii) => {
      if ('template_str' in aii) {
        rowValues.append(createAtwatehBoxesFrag(aii.template_str, aii.template_atwateh));
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

function createFromRootFrag(jsonline) {
  if ('of_root' in jsonline) {
    const frag = $(document.createDocumentFragment());
    let rootHtml;
    if (fuseAiiVocalized.search(`="${jsonline.of_root}"`).length > 0) {
      // fuseAiiVocalized a global which is imported before this file is imported
      // but this function gets called from shared_docready.js which is imported later
      rootHtml = $('<a/>', {
        class: 'of-root-aii',
        text: jsonline.of_root,
        href: `./${INDEX_HTML}?${AiiUtils.paramsToString([[AII_EXACT_SEARCH_PARAM, jsonline.of_root]])}`,
      });
    } else {
      rootHtml = $('<span/>', { class: 'of-root-aii', text: jsonline.of_root });
    }

    const rootTr = $('<span/>', {
      class: 'of-root-tr',
      text: aiiTranslitWrapper(jsonline.of_root, AiiUtils.validLetters, aiiTranslit),
    });

    return frag.append(
      ' of root ',
      $('<span/>', { class: 'of-root-container' }).append(
        rootTr,
        '&nbsp;&nbsp;',
        rootHtml,
      ),
    );
  }
  return null;
}

function createOtherFormsFrag(jsonline, aiiV) {
  if ('other_forms' in jsonline) {
    return createTableFrag(jsonline.other_forms, aiiV);
  }
  return null;
}

function createOtherFormsButtonFrag(jsonline) {
  if ('other_forms' in jsonline) {
    return createTopTagsMenuButton('show-other-forms-btn', 'related terms');
  }
  return null;
}

function createInflFrag(jsonline, aiiV) {
  if ('table' in jsonline) {
    return createTableFrag(jsonline.table, aiiV);
  }
  return null;
}

function replacePlaceholders(inputString, strongRadicals) {
  // Only capture a single digit [1-9] or weak radical (Alap, Yudh, Waw)
  const tripleBraceRegex = /{{{([1-9ܐܝܘ])}}}/g;

  return inputString.replace(tripleBraceRegex, (_, placeholder) => {
    // If the placeholder is a digit (1–9), use it to index into strongRadicals.
    if (/\d/.test(placeholder)) {
      const numericIndex = parseInt(placeholder, 10);
      // Index is 1-based in the placeholder, so subtract 1.
      return strongRadicals[numericIndex - 1] || '';
    }

    // placeholder must be Alap, Yudh, Waw
    return placeholder;
  });
}

function createVerbConjPreTable(schemaTense, patternArguments, strongRadicals, isIrregular) {
  return {
    heading: schemaTense.left_heading,
    heading_2: [schemaTense.right_heading],
    rows: schemaTense.rows.map(([formMeta, grammaticalPerson]) => ({
      meta: formMeta,
      values: [
        {
          value: replacePlaceholders(patternArguments[grammaticalPerson], strongRadicals),
          ...(!isIrregular && {
            template_str: patternArguments[grammaticalPerson],
            template_atwateh: strongRadicals,
          }),
        },
      ],
    })),
  };
}

function createConjFrag(jsonline, aiiV) {
  if ('verb_conjugation' in jsonline) {
    const frag = $(document.createDocumentFragment());

    const { schema } = jsonline.verb_conjugation;
    const patternKey = jsonline.verb_conjugation.alt_pattern || jsonline.verb_conjugation.pattern;
    const patternArguments = conjPatterns[patternKey].parameters;

    verbConjSchemas[schema].forEach((schemaTense) => {
      const preTable = createVerbConjPreTable(
        schemaTense,
        patternArguments,
        jsonline.verb_conjugation.strong_radicals,
        'alt_pattern' in jsonline.verb_conjugation,
      );
      frag.append(createTableFrag(preTable, aiiV));
    });
    return frag;
  }
  return null;
}

function createGlossTermsButtonFrag(sense) {
  if ('other_forms' in sense) {
    return createTopTagsMenuButton('show-gloss-terms-btn', 'gloss terms');
  }
  return null;
}

function createGlossTermsTableFrag(sense) {
  if ('other_forms' in sense) {
    const frag = $('<div/>', { class: 't3-linkages-and-examples' });
    // set_linkage_table in datadump_to_dict.py ensures aiiV is omitted from t3 table
    frag.append(createTableRowsFrag(sense.other_forms, null));
    return frag;
  }
  return null;
}

function createExamplesButtonFrag(sense) {
  if ('examples' in sense) {
    return createTopTagsMenuButton('show-examples-btn', 'examples');
  }
  return null;
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
  return null;
}

function createTier3CategoriesFrag(sense) {
  if ('tier3_categories' in sense) {
    const frag = $(document.createDocumentFragment());
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

  return null;
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

// This allows us to run code in a Node.js context and also in browser-side JavaScript
if (typeof module === 'object') {
  module.exports = {
    createAtwatehBoxesFrag,
    replacePlaceholders,
  };
}

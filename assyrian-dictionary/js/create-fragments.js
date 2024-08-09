// const LOCAL_DEVELOPMENT = true;
const LOCAL_DEVELOPMENT = false; // for cleaner urls in prod

const INDEX_HTML = LOCAL_DEVELOPMENT ? 'index.html' : '';

function createTagSearchFragment(dictTags, depth = 0) {
  const frag = $(document.createDocumentFragment());
  // nested list based on guidlines: https://stackoverflow.com/a/5899394

  dictTags.forEach((item) => {
    const isExpandable = 'children' in item && !('are_children_inline' in item);
    if (isExpandable) {
      frag.append(
        $('<li/>', { class: `l${depth}-tag expandable` }).append(
          $('<a/>', {
            text: item.name,
            // we set href otherwise click area of adjacent anchors interferes on mobile
            href: '#',
            // we invalidate href since we only want to expand
            onclick: 'return false;',
          }),
          $('<ul/>').append(createTagSearchFragment(item.children, depth + 1)),
        ),
      );
    } else {
      frag.append(
        $('<li/>', { class: `l${depth}-tag` }).append(
          $('<a/>', {
            text: item.name,
            href: `./${INDEX_HTML}?search=${item.tag}`,
          }),
          createTagSearchInlineFragment(item, depth + 1),
        ),
      );
    }
  });

  return frag;
}

function createTagSearchInlineFragment(item, depth) {
  const frag = $(document.createDocumentFragment());

  if ('children' in item && 'are_children_inline' in item) {
    item.children.forEach((inlineChild, idx) => {
      frag.append(
        $('<li/>', { class: `l${depth}-tag l-inline-tag` }).append(
          $('<a/>', {
            text: inlineChild.name,
            href: `./${INDEX_HTML}?search=${inlineChild.tag}`,
          }),
        ),
        idx < item.children.length - 1 ? ', ' : '',
      );
    });
    const outerFrag = $(document.createDocumentFragment());
    return outerFrag.append(
      ' (',
      $('<ul/>', { class: 'inline-tags' }).append(
        frag,
      ),
      ')',
    );
  }
  return frag;
}

function tagSearchClearHighlightedMatches() {
  // console.time('start');
  const expandable = '.l0-tag, .l1-tag:not(.l-inline-tag), .l2-tag:not(.l-inline-tag)';
  $('#tag-search-results').find(expandable).removeClass('expanded');

  // reset slideToggle inline styles via .removeAttr('style') otherwise issues when
  // 1. search "from:Aramaic", 2. then expand Etymologies, 3. then search "Akkadian"
  const hideOrShow = '.l1-tag, .l2-tag, .l3-tag:not(.l-inline-tag)'; // corresponds to selectors in style.sass
  $('#tag-search-results').find(hideOrShow).removeClass('always-show').removeAttr('style');

  $('#tag-search-results').find('.exact-search-match').removeClass('exact-search-match');
  $('#tag-search-results').find('.highlighted').contents().unwrap();
  // console.timeEnd('start');
}

function tagSearchHighlightExactMatch(queryString) {
  // console.log(queryString);

  $('#tag-search-results').find(`a[href$="${queryString}"]`).each((i, ele) => {
    $(ele).addClass('exact-search-match');
    const eleP = $(ele).parent();

    let remDepth = 0;

    ['l1-tag', 'l2-tag', 'l3-tag', 'l4-tag'].forEach((className, idx) => {
      if (eleP.hasClass(className)) {
        remDepth = idx + 1;
      }
    });

    if (eleP.hasClass('l-inline-tag')) {
      remDepth -= 1;
    }

    // console.log(remDepth);
    while (remDepth > 0) {
      eleP.closest(`.l${remDepth}-tag`).addClass('always-show');
      remDepth -= 1;
    }
  });

  // const frag = $('<span/>', { class: 'highlighted exact-search-match', text: ele.text() });
  // ele.replaceWith(frag);
}

function tagSearchHighlightMatches(results) {
  // if there's any matches, we always expect aiiDictionaryTags.length == 1
  if (results.length === 1) {
    // number of rows shown is minShowCount + (max depth - 1)
    // we use 10 since searching "stem" will show all the stems
    let minShowCount = 10; // to test, change to 1 and query "pattern", then 2 and query "pattern"

    const result = results[0];
    // console.log(result);

    const indexedFields = {
      'children.name': 1,
      'children.children.name': 2,
      'children.children.children.name': 3,
      'children.children.children.children.name': 4,
    };

    result.matches.forEach((match) => {
      // console.log(match);
      if (match.key in indexedFields) {
        const depth = indexedFields[match.key];
        let remDepth = depth;
        const tagClass = `.l${depth}-tag`;
        const ele = $('#tag-search-results').find(tagClass).eq(match.refIndex);

        if (!ele.hasClass('expandable')) {
          // when matched string is the prefix of an expandable element
          // UI on iPhone safari is quirky, ex. 'part' positions 'Parts of Speech' below ::marker
          // so we only highlight non-expandable elements
          ele.children('a').html(highlightEngIndices(match.value, match.indices));
        }

        if (minShowCount > 0) {
          if (ele.hasClass('l-inline-tag')) {
            remDepth -= 1;
          }

          while (remDepth > 0) {
            const curElement = ele.closest(`.l${remDepth}-tag`);
            if (!curElement.hasClass('always-show')) {
              curElement.addClass('always-show');
              minShowCount -= 1;
            }
            remDepth -= 1;
          }
        }
      }
      // console.log(result);
    });
  }
}

function createAiiVFrag(aiiV, anyJsonlineRoot) {
  if (anyJsonlineRoot) {
    const innerFrag = $(document.createDocumentFragment());
    aiiV.split(' ').forEach((char, idx) => {
      innerFrag.append(
        $('<span/>', { class: `aii-v-atuta-box atuta-box-${idx}`, text: char }),
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
      href: `./${INDEX_HTML}?search=special:Common Words`,
    }),
    ' ',
  );
  return frag;
}

function createInNumbersTableFrag() {
  const frag = $(document.createDocumentFragment());

  frag.append(
    ' in ',
    $('<a/>', {
      class: 'in-numbers-table',
      text: 'numbers table',
      href: `./${INDEX_HTML}?search=table:Numbers Table`,
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
    const accentCount = {};
    aiiV.ipas.forEach(([accent, ipa, ipaHash]) => {
      if (accent in accentCount) {
        // console.log(accent, accentCount[accent]);
        accentCount[accent] += 1;
        frag.append(
          createIpaFrag(accent, ipa, ipaHash, accentCount[accent]),
        );
      } else {
        accentCount[accent] = 0;
        frag.append(
          createIpaFrag(accent, ipa, ipaHash, null),
        );
      }
    });
  }
  return frag;
}

function createIpaFrag(accent, ipa, ipaHash, accentCount) {
  let frag = $(document.createDocumentFragment());
  if (accentCount) {
    const ord = accentCount === 1 ? '' : `${accentCount}${getOrdinal(accentCount)} `;
    frag = ` ${ord}alternate`;
  }

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
        $('<div/>', { class: 'accent-name-container' }).append(
          $('<a/>', {
            class: 'accent-name tier1-tag tier1-tag-ipa',
            text: accent,
            href: `./${INDEX_HTML}?search=ipa:${accent}`,
          }),
          frag,
        ),
      ),

    ),
  );
}

function createPOSFrag(pos) {
  return $('<a/>', {
    class: 'tier2-tag',
    text: pos,
    href: `./${INDEX_HTML}?search=pos:${pos}`,
  });
}

function createRootLettersFrag(key, obj) {
  const frag = $(document.createDocumentFragment());
  if (key in obj) {
    frag.append(
      ' (',
      $('<a/>', {
        class: 'tier2-tag',
        text: `${obj[key]}-letters`,
        href: `./${INDEX_HTML}?search=root:${obj[key]}-letters`,
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
        href: `./${INDEX_HTML}?search=stem:${obj[key].stem}`,
      }),
      ', ',
      $('<a/>', {
        class: tierTag,
        text: `${obj[key].pattern} pattern`,
        href: `./${INDEX_HTML}?search=pattern:${obj[key].pattern}`,
      }),
      ')',
    );
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
        href: `./${INDEX_HTML}?search=from:${et}`,
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

    const atutaFirstChar = (i === 0 && strMatchIdx === 0) ? 'atuta-box-is-first' : '';

    const brLig = breakLigatures ? ' break-ligatures' : '';

    fragment.append(
      $('<span/>', { class: `atuta-box${brLig} atuta-box-${rootIdx} ${atutaFirstChar}`, text: rootLetterText }),
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

function createTableRowsFrag(table) {
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
        if ('matches_aii_v' in aii) {
          valFrag = $('<span/>', { class: 'infl-val does-match', text: aii.value });
          doesMatch = ' does-match';
        } else if ('anchor' in aii) {
          valFrag = $('<a/>', {
            class: 'infl-val-anchor',
            text: aii.value,
            href: `./${INDEX_HTML}?search=${aii.value}`,
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

function createTableFrag(table) {
  // rest of table
  const tableRows = createTableRowsFrag(table);
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

function createGlossFrag(sense, showAll, j) {
  return $('<li/>', { class: `gloss-container${showAll}`, val: j + 1 }).append(
    $('<span/>', { class: 'gloss', text: sense.gloss }),
    createTier3CategoriesFrag(sense),
  );
}

function createOtherFormsFrag(jsonline) {
  if ('other_forms' in jsonline) {
    return createTableFrag(jsonline.other_forms);
  }
  return $(document.createDocumentFragment());
}

function createInflFrag(jsonline) {
  if ('table' in jsonline) {
    return createTableFrag(jsonline.table);
  }
  return $(document.createDocumentFragment());
}

function createConjFrag(jsonline) {
  const frag = $(document.createDocumentFragment());
  if ('conj' in jsonline) {
    jsonline.conj.tenses.forEach((tense) => {
      frag.append(createTableFrag(tense));
    });
  }
  return frag;
}

function createT3LinkagesAndExamplesFrag(sense) {
  const frag = $('<div/>', { class: 't3-linkages-and-examples' });
  if ('other_forms' in sense) {
    frag.append(createTableRowsFrag(sense.other_forms));
  }

  if ('examples' in sense) {
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
  }

  return frag;
}

function createTier3CategoriesFrag(sense) {
  const frag = $(document.createDocumentFragment());
  let anyListItems = false;
  if ('tier3_categories' in sense) {
    anyListItems = true;
    sense.tier3_categories.forEach((tier3Category) => {
      frag.append(
        $('<li/>').append(
          $('<a/>', {
            class: 'tier3-tag',
            text: tier3Category,
            href: `./${INDEX_HTML}?search=category:${tier3Category}`,
          }),
        ),
      );
    });
  }

  if ('examples' in sense || 'other_forms' in sense) {
    anyListItems = true;
    frag.append(
      $('<li/>').append(
        $('<a/>', {
          class: 'show-linkages',
          text: 'show more...',
          // we set href (and invalidate it) otherwise
          // click area of adjacent anchors interferes
          href: '#',
          onclick: 'return false;',
        }),
        createT3LinkagesAndExamplesFrag(sense),
      ),
    );
  }

  if (anyListItems) {
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

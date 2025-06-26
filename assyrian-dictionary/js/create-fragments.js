// const LOCAL_DEVELOPMENT = true;
const LOCAL_DEVELOPMENT = false; // for cleaner urls in prod

const INDEX_HTML = LOCAL_DEVELOPMENT ? 'index.html' : '';

const TAG_SEARCH_PARAM = 'tag';
const AII_EXACT_SEARCH_PARAM = 'assyrian-word';

function createTagMetaFrag(tagName) {
  return $('<div/>', {
    id: 'tagged-results-meta',
  }).append(
    'results tagged with ',
    $('<span/>', {
      id: 'matched-tag',
      text: tagName,
    }),
  );
}

function createFreeTextResultFrag(aiiV) {
  return $('<a/>', {
    class: 'free-text-search-result',
    href: `./${INDEX_HTML}?${AiiUtils.paramsToString([[AII_EXACT_SEARCH_PARAM, aiiV]])}`,
  });
}

function createChevronExpanderButton(buttonClassName, buttonText) {
  return $('<button/>', { class: `expandable-btn ${buttonClassName}` }).append(
    $('<span/>', { class: 'expandable-btn-text', text: buttonText }),
    $('<span/>', { class: 'expandable-btn-icon material-symbols-rounded', text: 'keyboard_arrow_right' }),
  );
}

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

function createTopTagsChildrenFragment(dictTags, parentName) {
  const frag = $(document.createDocumentFragment());

  dictTags.forEach((item) => {
    if (item.name === parentName) {
      item.children.forEach((child) => {
        frag.append(
          $('<a/>', {
            text: child.name,
            href: `./${INDEX_HTML}?${AiiUtils.paramsToString([[TAG_SEARCH_PARAM, `${item.tag_key}:${child.name}`]])}`,
          }),
        );
      });
    }
  });

  return frag;
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
      text: 'commonly used',
      href: `./${INDEX_HTML}?${AiiUtils.paramsToString([[TAG_SEARCH_PARAM, 'special:commonly used']])}`,
    }),
    ' ',
  );
  return frag;
}

function createAlphabetLetterFrag() {
  const frag = $(document.createDocumentFragment());
  frag.append(
    $('<a/>', {
      class: 'tier1-tag',
      text: 'assyrian alphabet',
      href: `./${INDEX_HTML}?${AiiUtils.paramsToString([[TAG_SEARCH_PARAM, 'special:assyrian alphabet']])}`,
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

    if ('is_alphabet_letter' in aiiV) {
      frag.append(
        ', ',
        createAlphabetLetterFrag(),
      );
    }

    if ('in_numbers_table' in aiiV) {
      frag.append(
        createInNumbersTableFrag(),
      );
    }

    if ('tier1_etymology' in aiiV) {
      frag.append(
        createEtymologyFrag('tier1_etymology', aiiV, 'tier1-tag'),
      );
    }

    frag.append(
      createFromRootFrag(aiiV),
    );
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

    if ('is_alphabet_letter' in aiiV) {
      notEmpty = true;
      frag.append(
        createAlphabetLetterFrag(),
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
        createEtymologyFrag('tier1_etymology', aiiV, 'tier1-tag'),
      );
    }

    if ('of_root' in aiiV) {
      notEmpty = true;
      frag.append(
        createFromRootFrag(aiiV),
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

function createRadicalLegend(strongRadicals) {
  if (strongRadicals.length < 2 || strongRadicals.length > 5) {
    console.error('The strongRadicals array must have between 2 and 5 items.');
    return $(document.createDocumentFragment());
  }

  const legend = $('<div/>', { class: 'microrad-legend' });
  for (let i = 0; i < strongRadicals.length; i += 1) {
    const clrClass = strongRadicals[i] === false ? 'rad-is-weak' : `rad-clr-${i}`;
    const microrad = $('<div/>', { class: `microrad ${clrClass}`, text: i + 1 });
    legend.prepend(microrad);
  }
  return legend;
}

function createShowInflectionsButton(jsonline) {
  const isInflection = ('table' in jsonline) || ('dynamic_noun_template' in jsonline);

  const isVerbConj = 'verb_conjugation' in jsonline;
  const isColorfulVerbConj = jsonline?.verb_conjugation?.strong_radicals?.length;

  if (isInflection || isVerbConj || isColorfulVerbConj) {
    const frag = $('<button/>', { class: 'inflections-button-container' }).append(
      $('<span/>', { class: 'material-symbols-rounded inflections-button', text: 'keyboard_arrow_down' }),
    );

    if (isColorfulVerbConj) {
      const strongRadicals = conjPatterns[jsonline.verb_conjugation.pattern].is_radical_strong;
      const wrapper = $('<div/>', { class: 'colorful-verb-wrapper' });

      strongRadicals.forEach((isRadicalStrong, i) => {
        const clrClass = isRadicalStrong === false ? 'rad-is-weak' : `rad-clr-${i}`;
        const square = $('<div/>', { class: `microrad microrad-along-arc-${i} ${clrClass}`, text: i+1 });
        wrapper.append(square);
      });
      return wrapper.append(frag);
    }

    return frag;
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
  // eslint-disable-next-line no-param-reassign
  templateStr = correctedProgressive(templateStr, templateAtwateh);

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
      cssClass = `tinyrad rad-clr-${matchCount}`;
      digitIndex += 1;
    } else {
      letter = radical + (diacritics || '');
      cssClass = 'tinyrad rad-is-weak';
    }
    if (offset === 0) {
      cssClass += ' tinyrad-is-first';
    }
    fragment.append($('<span/>', { class: cssClass, text: letter }));
    i = offset + match.length;
    matchCount += 1;
    return '';
  });

  if (i < templateStr.length) {
    fragment.append(templateStr.slice(i));
  }

  return $('<div/>', { class: 'radical-highlighted-verb-form' }).append(fragment);
}

function createTableRowsFrag(table, aiiV) {
  // tables where the will be fuse searches
  // if (table.disable_fuse === undefined && table.heading_2) {
  //   console.log(table.disable_fuse, table.heading_2);
  // }
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
        } else if (table.disable_fuse === undefined && fuseAiiVocalized.search(`="${aii.value}"`).length > 0) {
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

function createTableFrag(table, aiiV = null, useProgressivePrefix = false) {
  // rest of table
  const tableRows = createTableRowsFrag(table, aiiV);
  const frag = $('<div/>', { class: 'more-info' });

  // heading
  if ('heading' in table) {
    frag.addClass('has-heading');
    const headingMeta = $('<div/>', { class: 'infl-meta' });
    if (table.heading === 'Subject Pronoun') {
      headingMeta.append(
        $('<a/>', {
          text: table.heading,
          href: `./${INDEX_HTML}?${AiiUtils.paramsToString([[TAG_SEARCH_PARAM, 'pos:subject pronoun']])}`,
        }),
      );
    } else {
      headingMeta.text(table.heading);
    }

    frag.append(
      $('<div/>', { class: 'infl-row is-heading' }).append(
        headingMeta,
      ),
    );
    if ('heading_2' in table) {
      const heading2 = $('<div/>', { class: 'infl-vals' });
      table.heading_2.forEach((val) => {
        const heading2Meta = $('<span/>', { class: 'infl-val-eng' });

        if (useProgressivePrefix && val === 'Present Participle') {
          const progPrefix = 'ܒܸ-';
          heading2Meta.append(
            $('<a/>', {
              text: 'Prefixed',
              href: `./${INDEX_HTML}?${AiiUtils.paramsToString([[AII_EXACT_SEARCH_PARAM, progPrefix]])}`,
            }),
            ` ${val}`,
          );
        } else {
          heading2Meta.append(val);
        }

        heading2.append(
          $('<div/>', { class: 'infl-val-container' }).append(
            heading2Meta,
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
    createCategoriesFrag(sense, '3'),
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
      // ' of root of root of root of root of root of root of root of root of root of',
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
    return createChevronExpanderButton('show-other-forms-btn', 'related terms');
  }
  return null;
}

function createInflFrag(jsonline, aiiV) {
  if ('table' in jsonline) {
    // eslint-disable-next-line no-param-reassign
    jsonline.table.disable_fuse = true;
    return createTableFrag(jsonline.table, aiiV);
  }

  if ('dynamic_noun_template' in jsonline) {
    const template = jsonline.dynamic_noun_template;
    const rows = aiiInflNoun(template.name, template['1'], template.optional_args);
    const preTable = createDynamicNounInflPreTable(rows);
    preTable.disable_fuse = true;
    return createTableFrag(preTable, aiiV);
  }

  return null;
}

function aiiInflNounM(
  stem,
  {
    irs,
    irp,
    sirs,
    fempl = false,
    'sg-3cp': sg3cp,
  },
  groups,
  suffixes,
) {
  /* ── plural suffix sets ── */
  const plMasIRS = {
    'pl.1cs': ['ܝܼ', 'ܵܬ݂ܝܼ'],
    'pl.1cp': ['ܲܢ', 'ܵܬ݂ܲܢ'],
    'pl.2ms': ['ܘܼܟ݂', 'ܵܬ݂ܘܼܟ݂'],
    'pl.2fs': ['ܵܟ݂ܝ', 'ܵܬ݂ܵܟ݂ܝ'],
    'pl.2cp': ['ܲܘܟ݂ܘܿܢ', 'ܵܬ݂ܲܘܟ݂ܘܿܢ'],
    'pl.3ms': ['ܘܼܗܝ', 'ܵܬ݂ܹܗ'],
    'pl.3fs': ['ܘܼܗ̇', 'ܵܬ݂ܵܗ̇'],
    'pl.3cp': ['ܲܝܗܘܿܢ', 'ܵܬ݂ܗܘܿܢ'],
  };

  const plMasNO = {
    'pl.1cs': ['ܝܼ̈', 'ܵܬ݂ܝܼ̈'],
    'pl.1cp': ['ܲܢ̈', 'ܵܬ݂ܲܢ̈'],
    'pl.2ms': ['ܘܼ̈ܟ݂', 'ܵܬ݂ܘܼ̈ܟ݂'],
    'pl.2fs': ['ܵܟ݂ܝ̈', 'ܵܬ݂ܵܟ݂ܝ̈'],
    'pl.2cp': ['ܲܘ̈ܟ݂ܘܿܢ', 'ܵܬ݂ܲܘ̈ܟ݂ܘܿܢ'],
    'pl.3ms': ['ܘܼ̈ܗܝ', '̈ܵܬ݂ܹܗ'],
    'pl.3fs': ['ܘܼ̈ܗ̇', '̈ܵܬ݂ܵܗ̇'],
    'pl.3cp': ['ܲܝ̈ܗܘܿܢ', 'ܵܬ݂ܗ̈ܘܿܢ'],
  };

  const build = (key) => {
    // singular column
    if (key.startsWith('sg.')) {
      const base = key === 'sg.3cp' && sg3cp !== undefined ? sg3cp : stem;
      return `${base}${suffixes.sgCore[key]}`;
    }

    // plural column
    const needsIrs = irs !== undefined || (/pl\.3[mf]s/.test(key) && fempl && sirs !== undefined);

    const base = needsIrs ? (irs ?? sirs) : (irp ?? stem);
    const set = needsIrs ? plMasIRS : plMasNO;
    const col = fempl ? 1 : 0;

    return `${base}${set[key][col]}`;
  };

  return groups.map(([meta, [sg, pl]]) => ({
    meta,
    values: [{ value: build(sg) }, { value: build(pl) }],
  }));
}

function aiiInflNounF(
  stem,
  {
    irs,
    irp,
    sirs,
    ircstr,
    mpl = false,
    st = false,
  },
  groups,
  suffixes,
) {
  const plFemIRS = {
    'pl.1cs': ['ܝܼ', 'ܵܬ݂ܝܼ'],
    'pl.1cp': ['ܲܢ', 'ܵܬ݂ܲܢ'],
    'pl.2ms': ['ܘܼܟ݂', 'ܵܬ݂ܘܼܟ݂'],
    'pl.2fs': ['ܵܟ݂ܝ', 'ܵܬ݂ܵܟ݂ܝ'],
    'pl.2cp': ['ܲܘܟ݂ܘܿܢ', 'ܵܬ݂ܲܘܟ݂ܘܿܢ'],
    'pl.3ms': ['ܘܼܗܝ', 'ܵܬ݂ܹܗ'],
    'pl.3fs': ['ܘܼܗ̇', 'ܵܬ݂ܵܗ̇'],
    'pl.3cp': ['ܲܝܗܘܿܢ', 'ܵܬ݂ܗܘܿܢ'],
  };

  const plFemNO = {
    'pl.1cs': ['ܝܼ̈', 'ܵܬ݂ܝܼ̈'],
    'pl.1cp': ['ܲܢ̈', 'ܵܬ݂ܲܢ̈'],
    'pl.2ms': ['ܘܼ̈ܟ݂', 'ܵܬ݂ܘܼ̈ܟ݂'],
    'pl.2fs': ['ܵܟ݂ܝ̈', 'ܵܬ݂ܵܟ݂ܝ̈'],
    'pl.2cp': ['ܲܘ̈ܟ݂ܘܿܢ', 'ܵܬ݂ܲܘ̈ܟ݂ܘܿܢ'],
    'pl.3ms': ['ܘܼ̈ܗܝ', '̈ܵܬ݂ܹܗ'],
    'pl.3fs': ['ܘܼ̈ܗ̇', '̈ܵܬ݂ܵܗ̇'],
    'pl.3cp': ['ܲܝ̈ܗܘܿܢ', 'ܵܬ݂ܗ̈ܘܿܢ'],
  };

  const build = (key) => {
    /* singular logic unchanged */
    if (key.startsWith('sg.')) {
      const t = st ? 'ܬ݂' : 'ܬ';
      return `${stem}${t}${suffixes.sgCore[key]}`;
    }

    const irregular = irs !== undefined || ((key === 'pl.3ms' || key === 'pl.3fs') && sirs !== undefined);

    /* ↓ only this line changed: insert ircstr before stem */
    const base = irregular
      ? (irs ?? sirs ?? ircstr ?? stem)
      : (irp ?? ircstr ?? stem);

    const set = irregular ? plFemIRS : plFemNO;
    const col = mpl ? 0 : 1;

    return `${base}${set[key][col]}`;
  };

  return groups.map(
    ([meta, [sg, pl]]) => ({
      meta,
      values: [
        { value: build(sg) },
        { value: build(pl) },
      ],
    }),
  );
}

function aiiInflNounFVowel(
  stem,
  {
    irs,
    irp,
    sirs,
    o = false,
  },
  groups,
  suffixes,
) {
  const plFemIRS = {
    'pl.1cs': ['ܝܼ', 'ܵܬ݂ܝܼ'],
    'pl.1cp': ['ܲܢ', 'ܵܬ݂ܲܢ'],
    'pl.2ms': ['ܘܼܟ݂', 'ܵܬ݂ܘܼܟ݂'],
    'pl.2fs': ['ܵܟ݂ܝ', 'ܵܬ݂ܵܟ݂ܝ'],
    'pl.2cp': ['ܲܘܟ݂ܘܿܢ', 'ܵܬ݂ܲܘܟ݂ܘܿܢ'],
    'pl.3ms': ['ܘܼܗܝ', 'ܵܬ݂ܹܗ'],
    'pl.3fs': ['ܘܼܗ̇', 'ܵܬ݂ܵܗ̇'],
    'pl.3cp': ['ܲܝܗܘܿܢ', 'ܵܬ݂ܗܘܿܢ'],
  };

  const plFemNO = {
    'pl.1cs': ['ܝܼ̈', 'ܵܬ݂ܝܼ̈'],
    'pl.1cp': ['ܲܢ̈', 'ܵܬ݂ܲܢ̈'],
    'pl.2ms': ['ܘܼ̈ܟ݂', 'ܵܬ݂ܘܼ̈ܟ݂'],
    'pl.2fs': ['ܵܟ݂ܝ̈', 'ܵܬ݂ܵܟ݂ܝ̈'],
    'pl.2cp': ['ܲܘ̈ܟ݂ܘܿܢ', 'ܵܬ݂ܲܘ̈ܟ݂ܘܿܢ'],
    'pl.3ms': ['ܘܼ̈ܗܝ', '̈ܵܬ݂ܹܗ'],
    'pl.3fs': ['ܘܼ̈ܗ̇', '̈ܵܬ݂ܵܗ̇'],
    'pl.3cp': ['ܲܝ̈ܗܘܿܢ', 'ܵܬ݂ܗ̈ܘܿܢ'],
  };

  const build = (key) => {
    if (key.startsWith('sg.')) {
      const diac = o ? 'ܿ' : 'ܼ';
      return `${stem}${diac}ܬ݂${suffixes.sgCore[key]}`;
    }

    const irregular = irs !== undefined
      || ((key === 'pl.3ms' || key === 'pl.3fs') && sirs !== undefined);

    const base = irregular ? (irs ?? sirs) : (irp ?? stem);
    const set = irregular ? plFemIRS : plFemNO;

    return `${base}${set[key][1]}`; // column 1 only
  };

  return groups.map(
    ([meta, [sg, pl]]) => ({
      meta,
      values: [
        { value: build(sg) },
        { value: build(pl) },
      ],
    }),
  );
}

function aiiInflNoun(template, stem, opts) {
  const groups = [
    ['my', ['sg.1cs', 'pl.1cs']],
    ['our', ['sg.1cp', 'pl.1cp']],
    ['your (to a man)', ['sg.2ms', 'pl.2ms']],
    ['your (to a woman)', ['sg.2fs', 'pl.2fs']],
    ['your (to a group)', ['sg.2cp', 'pl.2cp']],
    ['his', ['sg.3ms', 'pl.3ms']],
    ['her', ['sg.3fs', 'pl.3fs']],
    ['their', ['sg.3cp', 'pl.3cp']],
  ];

  const suffixes = {
    sgCore: {
      'sg.1cs': 'ܝܼ',
      'sg.2ms': 'ܘܼܟ݂',
      'sg.2fs': 'ܵܟ݂ܝ',
      'sg.3ms': 'ܹܗ',
      'sg.3fs': 'ܵܗ̇',
      'sg.1cp': 'ܲܢ',
      'sg.2cp': 'ܲܘܟ݂ܘܿܢ',
      'sg.3cp': 'ܗܘܿܢ',
    },
  };

  const map = {
    'aii-infl-noun/m': aiiInflNounM,
    'aii-infl-noun/f': aiiInflNounF,
    'aii-infl-noun/f-vowel': aiiInflNounFVowel,
  };

  const fn = map[template];
  return fn(stem, opts, groups, suffixes);
}

function createDynamicNounInflPreTable(inflRows) {
  // console.log(schemaTense.right_heading);

  return {
    heading: 'Possessive Determiner',
    heading_2: ['one', 'two or more'],
    rows: inflRows,
  };
}

function correctedProgressive(inputString, strongRadicals) {
  if (strongRadicals.length === 0) {
    return inputString;
  }

  const gStrongPRP = 'ܒܸ{{{1}}}{{{2}}}ܵ{{{3}}}ܵܐ';
  const gWeak3PRP = 'ܒܸ{{{1}}}{{{2}}}ܵ{{{ܝ}}}ܵܐ';
  const ALAP = 'ܐ';
  const YUDH = 'ܝ';

  if (inputString === gStrongPRP && strongRadicals[0] === YUDH) {
    // eslint-disable-next-line no-param-reassign
    return 'ܒ{{{1}}}ܼ{{{2}}}ܵ{{{3}}}ܵܐ';
  }
  if (inputString === gWeak3PRP) {
    if (strongRadicals[0] === YUDH) {
      return 'ܒ{{{1}}}ܼ{{{2}}}ܵ{{{ܝ}}}ܵܐ';
    }
    if (strongRadicals[0] === ALAP) {
      return 'ܒܹ{{{1}}}{{{2}}}ܵ{{{ܝ}}}ܵܐ';
    }
  }
  return inputString;
}

function replacePlaceholders(inputString, strongRadicals) {
  // eslint-disable-next-line no-param-reassign
  inputString = correctedProgressive(inputString, strongRadicals);

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

function createVerbConjPreTable(schemaTense, patternArguments, strongRadicals, isVisualConj) {
  return {
    heading: schemaTense.left_heading,
    heading_2: schemaTense.right_heading,
    rows: schemaTense.rows.map(({ left, right }) => ({
      meta: left,
      values: right.map(({ value, type }) => ({
        value: replacePlaceholders(patternArguments[value], strongRadicals),
        ...(isVisualConj && {
          template_str: patternArguments[value],
          template_atwateh: strongRadicals,
        }),
      })),
    })),
    ...(schemaTense.disable_fuse === true && { disable_fuse: schemaTense.disable_fuse }),
  };
}

function createVerbConjPreTable2(schemaTense, patternArguments, strongRadicals) {
  // console.log(schemaTense.right_heading);

  const MASC_ENDING = 'ܝܠܹܗ ܗ݇ܘܵܐ';
  const FEM_ENDING = 'ܝܠܵܗ̇ ܗ݇ܘܵܐ';
  const GENDERED_NEW_ENDING = 'ܝܗ݇ܘܵܐ';
  const genderedEndingRx = new RegExp(`(?:${MASC_ENDING}|${FEM_ENDING})$`, 'u');

  const PLURAL_ENDING = 'ܝܢܵܐ ܗ݇ܘܵܐ';
  const PLURAL_NEW_ENDING = 'ܝܗ݇ܘܵܘ';
  const pluralEndingRx = new RegExp(`(?:${PLURAL_ENDING})$`, 'u');

  const MASC_START = 'ܝܼܠܹܗ ܗ݇ܘܵܐ';
  const FEM_START = 'ܝܼܠܵܗ̇ ܗ݇ܘܵܐ';
  const GENDERED_NEW_START = 'ܝܼܗ݇ܘܵܐ';
  const genderedStartingRx = new RegExp(`^(?:${MASC_START}|${FEM_START})`, 'u');

  const PLURAL_START = 'ܝܼܢܵܐ ܗ݇ܘܵܐ';
  const PLURAL_NEW_START = 'ܝܼܗ݇ܘܵܘ';
  const pluralStartingRx = new RegExp(`^(?:${PLURAL_START})`, 'u');

  return {
    heading: schemaTense.left_heading,
    heading_2: schemaTense.right_heading,
    rows: schemaTense.rows.map(({ left, right }) => {
      const aiiWords = [];

      right.forEach(({ value, type }) => {
        if (type === 'arg') {
          const resolved = replacePlaceholders(
            patternArguments[value],
            strongRadicals,
          );
          aiiWords.push(resolved);
        } else if (type === 'literal') {
          aiiWords.push(value);
        } else if (type === 'arg-infix-wa') {
          const HAWEH_WA = 'ܗ݇ܘܵܐ';
          const resolved = replacePlaceholders(
            patternArguments[value].replace(' ', ` ${HAWEH_WA} `),
            strongRadicals,
          );
          aiiWords.push(resolved);
        }
      });

      // console.log(aiiWords.join(' ').replace(ENDING_PATTERN, NEW_ENDING))
      return {
        meta: left,
        values: [{
          value: aiiWords.join(' ')
            .replace(genderedEndingRx, GENDERED_NEW_ENDING)
            .replace(pluralEndingRx, PLURAL_NEW_ENDING)
            .replace(genderedStartingRx, GENDERED_NEW_START)
            .replace(pluralStartingRx, PLURAL_NEW_START),
        }],
      };
    }),
    disable_fuse: true,
  };
}

const COLLAPSED_CHILDREN_TABLE_ROWS = {
  1: [],
  2: [],
};

function createCollapsedParadigmFrag(
  schemaTense,
  patternArguments,
  jsonline,
  aiiV,
  useProgressivePrefix,
  slice,
) {
  const children = schemaTense[`collapsed_children_${slice}`];
  if (!children?.length) {
    return null;
  }

  const preTables = children.map((child) =>
    createVerbConjPreTable2(
      child,
      patternArguments,
      jsonline.verb_conjugation.strong_radicals,
      false,
    ));

  COLLAPSED_CHILDREN_TABLE_ROWS[slice].push(
    ...preTables.map((t) => createTableRowsFrag(t, aiiV)),
  );

  const menuIdx = 5;

  const selectMenu = $('<select>', { class: 'infl-val-eng', id: `collapsed-paradigms-${slice}`, 'data-slice': slice })
    .append(
      children.map(({ right_heading: [label] }, i) => $('<option>', { value: i, text: label })),
    ).val(menuIdx);

  const $collapsedTableFrag = createTableFrag(preTables[menuIdx], aiiV, useProgressivePrefix);

  $collapsedTableFrag.children('.infl-row.is-heading').children('.infl-vals').children('.infl-val-container').last()
    .html(selectMenu);

  return $collapsedTableFrag;
}

function createConjFrag(jsonline, aiiV) {
  if ('verb_conjugation' in jsonline) {
    const frag = $(document.createDocumentFragment());

    const { schema } = jsonline.verb_conjugation;
    const patternKey = jsonline.verb_conjugation.alt_pattern || jsonline.verb_conjugation.pattern;
    const patternArguments = conjPatterns[patternKey].parameters;
    const useProgressivePrefix = ['irregular', 'g-strong', 'g-weak-1', 'g-weak-2', 'g-weak-3'].includes(jsonline.verb_conjugation.pattern);

    verbConjSchemas[schema].forEach((schemaTense) => {
      const preTable = createVerbConjPreTable(
        schemaTense,
        patternArguments,
        jsonline.verb_conjugation.strong_radicals,
        !('alt_pattern' in jsonline.verb_conjugation),
      );
      const tableFrag = createTableFrag(preTable, aiiV, useProgressivePrefix);
      if (schemaTense.children?.length) {
        const $paradigmsButton = $('<button/>', { class: 'material-symbols-rounded more-paradigms-button', text: 'keyboard_arrow_down' });
        tableFrag.append(
          $('<div/>', { class: 'more-paradigms-button-container' }).append(
            $paradigmsButton,
          ),
        );

        const $moreParadigms = $('<div/>', {
          class: 'more-paradigms',
        });

        $paradigmsButton.one('click', () => {
          schemaTense.children.forEach((schemaTense2) => {
            const preTable2 = createVerbConjPreTable2(
              schemaTense2,
              patternArguments,
              jsonline.verb_conjugation.strong_radicals,
              false,
            );
            $moreParadigms.append(
              createTableFrag(preTable2, aiiV, useProgressivePrefix),
            );
          });

          [1, 2].forEach((idx) => {
            $moreParadigms.append(
              createCollapsedParadigmFrag(
                schemaTense,
                patternArguments,
                jsonline,
                aiiV,
                useProgressivePrefix,
                idx,
              ),
            );
          });
        });
        frag.append(tableFrag, $moreParadigms);
      } else {
        frag.append(tableFrag);
      }
    });
    return frag;
  }
  return null;
}

function createGlossTermsButtonFrag(sense) {
  if ('other_forms' in sense) {
    return createChevronExpanderButton('show-gloss-terms-btn', 'gloss terms');
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
    return createChevronExpanderButton('show-examples-btn', 'examples');
  }
  return null;
}

function createExamplesTableFrag(sense) {
  if (!('examples' in sense)) return null;

  const frag = $('<div/>', { class: 't3-linkages-and-examples' });

  sense.examples.forEach((example) => {
    const aiiText = example.is_quotation ? `”${example.text}“` : example.text;

    const englishDiv = $('<div/>', { class: 'example-english' });
    const englishText = example.is_quotation ? `"${example.english}"` : example.english;

    if (example.english_ref) {
      englishDiv.append(
        englishText,
        ' - ',
        $('<span/>', {
          class: 'example-english-ref',
          text: example.english_ref,
        }),
      );
    } else {
      englishDiv.text(englishText);
    }

    let literalDiv = null;
    if (example.literal_meaning) {
      literalDiv = $('<div/>', {
        class: 'example-english',
        text: `(literally, "${example.literal_meaning}")`,
      });
    }

    frag.append(
      $('<div/>', { class: 'example-row' }).append(
        $('<div/>', { class: 'example-row-vals' }).append(
          $('<div/>', { class: 'example-text', text: aiiText }),
          $('<div/>', { class: 'example-tr', text: aiiTranslit(aiiText).phonetic }),
          englishDiv,
          literalDiv,
        ),
      ),
    );
  });

  return frag;
}

function createCategoriesFrag(sense, tierN) {
  const tierNCatergory = `tier${tierN}_categories`;
  const tierNTag = `tier${tierN}-tag`;

  if (tierNCatergory in sense) {
    const frag = $(document.createDocumentFragment());
    sense[tierNCatergory].forEach((category) => {
      frag.append(
        $('<li/>').append(
          $('<a/>', {
            class: tierNTag,
            text: category,
            href: `./${INDEX_HTML}?${AiiUtils.paramsToString([[TAG_SEARCH_PARAM, `category:${category}`]])}`,
          }),
        ),
      );
    });
    return $('<ul/>', { class: `t${tierN}-categories`, html: frag });
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
    aiiInflNoun,
  };
}

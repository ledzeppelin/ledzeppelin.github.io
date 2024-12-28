const DictionaryQueryType = Object.freeze({
  ENG: 'eng',
  AII_VOCALIZED: 'aii_vocalized',
  AII_UNVOCALIZED: 'aii_unvocalized',
  TAG: 'tag',
  AII_EXACT_SEARCH: 'aii_exact',
});

const TO_BE_REMOVED = 'to-be-removed';
const TO_BE_REMOVED_CLASS = `.${TO_BE_REMOVED}`;

function isColorfulFreeText(jsonline) {
  // TODO: this needs to be cleaned up once conjugations are done on client-side

  // eslint-disable-next-line max-len
  const isColorfulVerb = jsonline?.conj?.tenses?.[0]?.rows?.[0]?.values?.[0]?.template_str !== undefined;
  // eslint-disable-next-line max-len
  const isColorfulRoot = jsonline?.other_forms?.rows?.[0]?.values?.[0]?.template_str !== undefined;
  return isColorfulVerb || isColorfulRoot;
}

function generateFreeTextTier1Skeleton(aiiV) {
  const frag = $(document.createDocumentFragment());
  const classes = `free-text-t1 tier1-tag ${TO_BE_REMOVED}`;

  aiiV.ipas?.forEach(([accents, ipa]) => {
    accents.forEach((accent) => {
      // eslint-disable-next-line max-len
      // const longIpa = '[bʃɪmmɑː‿dbaːbaː‿wbroːnaː‿wruːħaː‿dquðʃaː] [bʃɪmmɑː‿dbaːbaː‿wbroːnaː‿wruːħaː‿dquðʃaː]';
      frag.append(
        $('<div/>', { class: `${classes} free-text-t1-ipa-container` }).append(
          $('<span/>', { class: 'material-symbols-rounded free-text-t1-play-sound', text: 'volume_up' }),
          $('<div/>').append(
            $('<div/>', { class: 'free-text-accent-name', text: accent }),
            $('<div/>', { class: 'free-text-ipa', text: ipa }),
          ),
        ),
      );
    });
  });

  if ('is_common_word' in aiiV) {
    frag.append($('<div/>', { class: classes, text: 'common word' }));
  }

  aiiV.tier1_etymology?.forEach((ety) => {
    frag.append($('<div/>', { class: classes, text: ety }));
  });

  return frag;
}

function generateFreeTextTier2Skeleton(jsonline) {
  const frag = $(document.createDocumentFragment());
  const classes = `free-text-t2 tier2-tag ${TO_BE_REMOVED}`;

  frag.append($('<div/>', { class: classes, text: jsonline.pos }));

  if ('root_tag_val' in jsonline) {
    frag.append($('<div/>', { class: classes, text: jsonline.root_tag_val }));
  }

  if ('tier2_vis_verb' in jsonline) {
    frag.append($('<div/>', { class: classes, text: jsonline.tier2_vis_verb.pattern }));
  }

  jsonline.tier2_etymology?.forEach((ety) => {
    frag.append($('<div/>', { class: classes, text: ety }));
  });

  return frag;
}

function createFragmentsGroupedByUnvocalizedSpelling(result, isTagSearch = false) {
  const isRoot = Array.isArray(result.item.aii_not_v);

  const resultFragmentsGrouped = $(document.createDocumentFragment());
  result.item.aii_v_s.forEach((aiiV) => {
    const resultFragment = createFreeTextResultFrag(aiiV.aii_v).addClass(TO_BE_REMOVED);
    resultFragment.append(
      createAiiVFrag(aiiV.aii_v, isRoot),
      $('<div/>', { class: 'aii-v-word-tr-container' }).append(
        $('<div/>', { class: 'aii-v-word-tr', text: aiiV.aii_v_tr }),
      ),
    );
    if (isTagSearch) {
      resultFragment.append(generateFreeTextTier1Skeleton(aiiV));
    }

    aiiV.jsonlines.forEach((jsonline) => {
      const sensesFragment = $('<ul/>', { class: `free-text-senses ${TO_BE_REMOVED}` });
      if (isColorfulFreeText(jsonline)) {
        resultFragment.addClass('colorful-verb');
      }
      jsonline.senses.forEach((sense) => {
        const liFrag = $('<li/>', {
          class: `free-text-gloss ${TO_BE_REMOVED}`,
          text: sense.gloss,
        });
        if (isTagSearch) {
          sense.tier3_categories?.forEach((tier3Category) => {
            liFrag.append(
              $('<div/>', {
                class: `tier3-tag ${TO_BE_REMOVED}`,
                text: tier3Category,
              }),
            );
          });
        }
        sensesFragment.append(liFrag);
      });
      if (isTagSearch) {
        resultFragment.append(generateFreeTextTier2Skeleton(jsonline));
      }
      resultFragment.append(sensesFragment);
    });

    resultFragmentsGrouped.append(resultFragment);
  });
  return resultFragmentsGrouped;
}

function loadResults(searchQuery, PAGINATE_AMT) {
  // console.time('test');
  // console.log(searchQuery.results);
  const indexedAiiV = {
    'aii_v_s.aii_v': '.aii-v-word',
  };

  const indexedEng = {
    'aii_v_s.jsonlines.senses.gloss': '.free-text-gloss',
    'aii_v_s.aii_v_tr': '.aii-v-word-tr',
  };

  const indexedTags = {
    'aii_v_s.tier1_tags': '.tier1-tag',
    'aii_v_s.jsonlines.tier2_tags': '.tier2-tag',
    'aii_v_s.jsonlines.senses.tier3_tags': '.tier3-tag',
  };

  searchQuery.results.slice(searchQuery.i, searchQuery.i + PAGINATE_AMT).forEach((result) => {
    if (searchQuery.queryType === DictionaryQueryType.ENG) {
      // 1. create fragments
      const resultFragmentsGrouped = createFragmentsGroupedByUnvocalizedSpelling(result);

      // 2. remove TO_BE_REMOVED, highlight matches
      result.matches.forEach((match) => {
        const frag = resultFragmentsGrouped.find(indexedEng[match.key]).eq(match.refIndex);
        if (match.key === 'aii_v_s.jsonlines.senses.gloss') {
          frag.removeClass(TO_BE_REMOVED)
            .parent('.free-text-senses').removeClass(TO_BE_REMOVED);
        }
        if (match.key === 'aii_v_s.aii_v_tr') {
          // if tr matches, show all glosses
          frag.parent().siblings('.free-text-senses').removeClass(TO_BE_REMOVED)
            .children('.free-text-gloss')
            .removeClass(TO_BE_REMOVED);
        }
        frag.closest('.free-text-search-result').removeClass(TO_BE_REMOVED);

        const abc = highlightEngIndices(match.value, match.indices); // tr or gloss
        frag.html(abc);
      });

      // 3. remove unmatched glosses and .free-text-senses
      resultFragmentsGrouped.find(TO_BE_REMOVED_CLASS).remove();
      $('#search-results').append(resultFragmentsGrouped);
    } else if (searchQuery.queryType === DictionaryQueryType.AII_VOCALIZED) {
      // 1. create fragments
      const resultFragmentsGrouped = createFragmentsGroupedByUnvocalizedSpelling(result);

      // 2. remove TO_BE_REMOVED, highlight matches
      result.matches.forEach((match) => {
        const frag = resultFragmentsGrouped.find(indexedAiiV[match.key]).eq(match.refIndex);
        frag.next('.aii-v-word-tr-container').siblings('.free-text-senses').removeClass(TO_BE_REMOVED)
          .children('.free-text-gloss')
          .removeClass(TO_BE_REMOVED);
        frag.parent('.free-text-search-result').removeClass(TO_BE_REMOVED);
        highlightAiiText(frag, match.value, searchQuery.aii_v_query, true);
      });

      // 3. remove unmatched glosses and .free-text-senses
      resultFragmentsGrouped.find(TO_BE_REMOVED_CLASS).remove();

      $('#search-results').append(resultFragmentsGrouped);
    } else if (searchQuery.queryType === DictionaryQueryType.AII_UNVOCALIZED) {
      // 1. create fragments
      const resultFragmentsGrouped = createFragmentsGroupedByUnvocalizedSpelling(result);

      // 2. remove TO_BE_REMOVED, highlight matches
      const isRoot = Array.isArray(result.item.aii_not_v);
      resultFragmentsGrouped.find('.aii-v-word').each((_, frag) => {
        // eslint-disable-next-line newline-per-chained-call
        $(frag).next('.aii-v-word-tr-container').siblings('.free-text-senses').removeClass(TO_BE_REMOVED).children('.free-text-gloss').removeClass(TO_BE_REMOVED);
        $(frag).parent('.free-text-search-result').removeClass(TO_BE_REMOVED);
        if (isRoot) {
          $(frag).find('.atuta-box-large').addClass('highlighted');
        } else {
          highlightAiiText($(frag), $(frag).text(), searchQuery.aii_not_v_query, false);
        }
      });

      // 3. remove unmatched glosses and .free-text-senses
      resultFragmentsGrouped.find(TO_BE_REMOVED_CLASS).remove();
      $('#search-results').append(resultFragmentsGrouped);
    } else if (searchQuery.queryType === DictionaryQueryType.TAG) {
      // 1. create fragments
      const resultFragmentsGrouped = createFragmentsGroupedByUnvocalizedSpelling(result, true);

      // // 2. remove TO_BE_REMOVED, highlight matches
      result.matches.forEach((match) => {
        const frag = resultFragmentsGrouped.find(indexedTags[match.key]).eq(match.refIndex);
        if (match.key === 'aii_v_s.tier1_tags') {
          frag.addClass('tag-highlight').removeClass(TO_BE_REMOVED)
            .parent('.free-text-search-result').removeClass(TO_BE_REMOVED);
          frag.siblings('.free-text-senses').removeClass(TO_BE_REMOVED)
            .children('.free-text-gloss').removeClass(TO_BE_REMOVED);
        } else if (match.key === 'aii_v_s.jsonlines.tier2_tags') {
          frag.addClass('tag-highlight').removeClass(TO_BE_REMOVED)
            .parent('.free-text-search-result').removeClass(TO_BE_REMOVED);
          frag.nextAll('.free-text-senses').first().removeClass(TO_BE_REMOVED)
            .children('.free-text-gloss')
            .removeClass(TO_BE_REMOVED);
        } else if (match.key === 'aii_v_s.jsonlines.senses.tier3_tags') {
          frag.addClass('tag-highlight').removeClass(TO_BE_REMOVED)
            .parent('.free-text-gloss').removeClass(TO_BE_REMOVED)
            .parent('.free-text-senses')
            .removeClass(TO_BE_REMOVED);
          frag.closest('.free-text-search-result').removeClass(TO_BE_REMOVED);
        }
      });

      // 3. remove unmatched glosses and .free-text-senses
      resultFragmentsGrouped.find(TO_BE_REMOVED_CLASS).remove();

      // 4. add ordinals to if ipa is matching
      // eslint-disable-next-line func-names
      $(resultFragmentsGrouped).children('.free-text-search-result').each(function () {
        // eslint-disable-next-line func-names
        $(this).children('.free-text-t1-ipa-container').each(function (idx) {
          if (idx > 0) {
            let str = ' alternate';
            if (idx > 1) {
              str = ` ${idx}${getOrdinal(idx)}${str}`;
            }
            const span = $('<span>', { class: 'free-text-ordinal' }).text(str);
            $(this).find('.free-text-accent-name').append(span);
          }
        });
      });

      $('#search-results').append(resultFragmentsGrouped);
    } else if (searchQuery.queryType === DictionaryQueryType.AII_EXACT_SEARCH) {
      const resultFragment = $('<div/>', { class: 'search-result' });

      const isRoot = Array.isArray(result.item.aii_not_v);
      const aiiNotV = isRoot ? result.item.aii_not_v[0] : result.item.aii_not_v;

      result.item.aii_v_s.forEach((aiiV) => {
        const jsonlinesFragment = $('<div/>', { class: 'jsonlines' });

        const singletonJsonline = aiiV.jsonlines.length === 1;
        // const singletonJsonline = false;

        aiiV.jsonlines.forEach((jsonline) => {
          const sensesFragment = $('<ol/>', { class: 'senses' });
          jsonline.senses.forEach((sense, j) => {
            sensesFragment.append(createGlossFrag(sense, j));
          });

          const jsonlineFragment = $('<div/>', { class: 'jsonline' }).append(
            $('<div/>', { class: 'pos' }).append(
              $('<div/>', { class: 'pos-meta' }).append(
                createPOSFrag(jsonline.pos),
                createPOSPrefixFrag(jsonline),
                isRoot ? createRootLettersFrag('root_tag_val', jsonline) : '',
                createVisVerbFrag('tier2_vis_verb', jsonline, 'tier2-tag'),
                createT1IntoPOSFrag(aiiV, singletonJsonline),
                'tier2_etymology' in jsonline ? createEtymologyFrag('tier2_etymology', jsonline, 'tier2-tag') : '',
              ),
            ),
            createInflFrag(jsonline, aiiV.aii_v),
            createConjFrag(jsonline, aiiV.aii_v),
            createOtherFormsButtonFrag(jsonline),
            createOtherFormsFrag(jsonline, aiiV.aii_v),
            sensesFragment,
          );
          jsonlinesFragment.append(jsonlineFragment);
        });

        const moreSoundsButton = aiiV.ipas
          ? $('<button/>', { class: 'material-symbols-rounded more-sounds-button' })
          : null;

        resultFragment.append(
          $('<div/>', { class: 'aii-v-word-container' }).append(
            createAiiVFrag(aiiV.aii_v, isRoot),
            $('<div/>', { class: 'aii-v-word-tr-container' }).append(
              moreSoundsButton,
              $('<div/>', { class: 'aii-v-word-tr', text: aiiV.aii_v_tr }),
            ),
            createIpaContainerFrag(aiiV),
            createTier1TagsFrag(aiiV, singletonJsonline),
            jsonlinesFragment,
          ),
        );
      });
      resultFragment.append(createWiktionaryFrag(aiiNotV));

      const DEBUG_HIGHLIGHT = false;
      if (DEBUG_HIGHLIGHT === false) {
        // eslint-disable-next-line max-len
        highlightAiiExactSearchFragment(result, resultFragment, searchQuery, isRoot, indexedAiiV, indexedTags);
      }

      showMore(resultFragment);
      setTrBacklink(resultFragment);

      $('#search-results').append(resultFragment);
    }
  });

  // eslint-disable-next-line no-param-reassign
  searchQuery.i += PAGINATE_AMT;
  // console.timeEnd('test');
}

function highlightAiiExactSearchFragment(result, resultFragment, searchQuery, isRoot, indexedAiiV, indexedTags) {
  result.matches.forEach((match) => {
    // this block only runs if there were any actual results from the exact search
    const isSpacedRoot = isRoot && searchQuery.aii_v_query === result.item.aii_not_v[0];
    if (isSpacedRoot) {
      resultFragment.find('.aii-v-word').addClass('exact-aii-search-match');
    } else if (match.key in indexedAiiV) {
      const aiiVEle = resultFragment.find(indexedAiiV[match.key]).eq(match.refIndex);
      aiiVEle.addClass('exact-aii-search-match');
      aiiVEle.parent().addClass('show-first');
    }
  });
}

function showMore(resultFragment) {
  // show the first gloss if no glosses are shown
  // and create button if there are more defs
  resultFragment.find('.senses').each((i, senses) => {
    const hideMarker = $(senses).find('.gloss').length === 1;
    if (hideMarker) {
      $(senses).addClass('only-one-gloss');
    }

    const showInflections = $(senses).parent().find('.more-info.has-heading').length > 0;

    if (showInflections) {
      const numVisualVerbConj = $(senses).parent().find('.atwateh-boxes').length;
      const buttonStyle = numVisualVerbConj > 0 ? 'verb-conj-button' : 'not-verb-conj-button';
      $(senses).siblings('.pos').append(
        $('<button/>', { class: `more-defs-button-container ${buttonStyle}` }).append(
          $('<span/>', { class: 'material-symbols-rounded more-defs-button', text: 'keyboard_arrow_down' }),
        ),
      );
    }
  });
}

function setTrBacklink(resultFragment) {
  const ele = resultFragment.find('.show-first .aii-v-word-tr');
  ele.wrap(
    $('<div/>', { class: 'aii-v-word-tr-broad-container' }),
  ).parent().append(
    $('<div/>', { class: 'tr-backlink-container' }).append(
      $('<span/>', { class: 'webapp-backlink-meta', text: '^ generated by 🟠 ' }),
      $('<a/>', { class: 'webapp-backlink-href', href: '../assyrian-transliterator/', text: 'assyrian transliterator' }),
    ),
  );
}

// element, aiiV text, querystring, isVocalized
function highlightAiiText(aiiVEle, aiiVText, query, isVocalized) {
  const re = isVocalized ? wordRegexAiiV(query) : wordRegexAiiNotV(query);
  const abc = regexHighlight(aiiVText, re, 'highlighted');
  aiiVEle.html(abc);
}

function minVocalizedTR(tagSearchParam, aiiVs) {
  // we want to sort by those transliterations which will be shown, otherwise
  // 'from:Sumerian' would have 'gareh' as the first since its sorting by 'aghra' (not shown)

  // for an unvocalized spelling,
  // find the minimum (alphabetically sorted) transliteration of its vocalized spellings
  // which contain a matching tag

  let minTranslit = null;

  function updateMin(currentMin, candidate) {
    if (currentMin === null || candidate < currentMin) {
      return candidate;
    }
    return currentMin;
  }

  aiiVs.forEach((aiiV) => {
    if (aiiV.tier1_tags?.includes(tagSearchParam)) {
      minTranslit = updateMin(minTranslit, aiiV.aii_v_tr);
      return; // skip t2, t3
    }

    aiiV.jsonlines.forEach((jsonline) => {
      if (jsonline.tier2_tags?.includes(tagSearchParam)) {
        minTranslit = updateMin(minTranslit, aiiV.aii_v_tr);
        return; // skip t3
      }

      jsonline.senses?.forEach((sense) => {
        if (sense.tier3_tags?.includes(tagSearchParam)) {
          minTranslit = updateMin(minTranslit, aiiV.aii_v_tr);
          // return; // return not needed
        }
      });
    });
  });

  return minTranslit;
}

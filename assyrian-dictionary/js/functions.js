const DictionaryQueryType = Object.freeze({
  ENG: 'eng',
  AII_VOCALIZED: 'aii_vocalized',
  AII_UNVOCALIZED: 'aii_unvocalized',
  TAG: 'tag',
  AII_EXACT_SEARCH: 'aii_exact',
});

const TO_BE_REMOVED = 'to-be-removed';
const TO_BE_REMOVED_CLASS = `.${TO_BE_REMOVED}`;

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

  searchQuery.results.slice(searchQuery.i, searchQuery.i + PAGINATE_AMT).forEach((result, i) => {
    if (searchQuery.queryType === DictionaryQueryType.ENG) {
      const isRoot = Array.isArray(result.item.aii_not_v);

      const resultFragmentsGrouped = $(document.createDocumentFragment());
      result.item.aii_v_s.forEach((aiiV) => {
        const resultFragment = createFreeTextResultFrag(aiiV.aii_v).addClass(TO_BE_REMOVED);
        const sensesFragment = $('<ul/>', { class: 'free-text-senses' });
        aiiV.jsonlines.forEach((jsonline) => {
          // TODO: this needs to be cleaned up once conjugations are done on client-side
          // eslint-disable-next-line max-len
          const isColorfulVerb = jsonline?.conj?.tenses?.[0]?.rows?.[0]?.values?.[0]?.template_str !== undefined;
          // eslint-disable-next-line max-len
          const isColorfulRoot = jsonline?.other_forms?.rows?.[0]?.values?.[0]?.template_str !== undefined;
          if (isColorfulVerb || isColorfulRoot) {
            resultFragment.addClass('colorful-verb');
          }
          jsonline.senses.forEach((sense) => {
            sensesFragment.append(
              $('<li/>', {
                class: `free-text-gloss ${TO_BE_REMOVED}`,
                text: sense.gloss,
              }),
            );
          });
        });

        resultFragment.append(
          createAiiVFrag(aiiV.aii_v, isRoot),
          $('<div/>', { class: 'aii-v-word-tr-container' }).append(
            $('<div/>', { class: 'aii-v-word-tr', text: aiiV.aii_v_tr }),
          ),
          sensesFragment,
        );
        resultFragmentsGrouped.append(resultFragment);
      });

      // console.log(result);
      result.matches.forEach((match) => {
        const abc = highlightEngIndices(match.value, match.indices);
        const frag = resultFragmentsGrouped.find(indexedEng[match.key]).eq(match.refIndex);
        if (match.key === 'aii_v_s.jsonlines.senses.gloss') {
          frag.removeClass(TO_BE_REMOVED);
        }
        frag.closest('.free-text-search-result').removeClass(TO_BE_REMOVED);

        frag.html(abc);
      });

      resultFragmentsGrouped.find('.free-text-senses').each((_, senses) => {
        const $senses = $(senses);
        const totalChildren = $senses.children().length;
        const removableChildren = $senses.children(TO_BE_REMOVED_CLASS).length;

        if (totalChildren === removableChildren) {
          $senses.children().first().removeClass(TO_BE_REMOVED);
        }
      });

      resultFragmentsGrouped.find(TO_BE_REMOVED_CLASS).remove();
      $('#search-results').append(resultFragmentsGrouped);
    } else {
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
            sensesFragment,
            createOtherFormsButtonFrag(jsonline),
            createOtherFormsFrag(jsonline, aiiV.aii_v),
          );
          jsonlinesFragment.append(jsonlineFragment);
        });

        resultFragment.append(
          $('<div/>', { class: 'aii-v-word-container' }).append(
            createAiiVFrag(aiiV.aii_v, isRoot),
            $('<div/>', { class: 'aii-v-word-tr-container' }).append(
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
        highlightResultFragment(result, resultFragment, searchQuery, isRoot, indexedAiiV, indexedTags);
      }

      showMoreSounds(resultFragment, aiiNotV);
      showMore(resultFragment);
      setTrBacklink(resultFragment);

      $('#search-results').append(resultFragment);
    }
  });

  // eslint-disable-next-line no-param-reassign
  searchQuery.i += PAGINATE_AMT;
  // console.timeEnd('test');
}

function highlightResultFragment(result, resultFragment, searchQuery, isRoot, indexedAiiV, indexedTags) {
  result.matches.forEach((match) => {
    // these conditionals represent the 4 distinct types of query strings
    // 1. at least one aii char with diacritics
    // 2. at least one aii char without diacritics
    // 3. english search
    // 4. tagged search

    if (searchQuery.queryType === DictionaryQueryType.AII_EXACT_SEARCH) {
      // this block only runs if there were any actual results from the exact search
      const isSpacedRoot = isRoot && searchQuery.aii_v_query === result.item.aii_not_v[0];
      if (isSpacedRoot) {
        const aiiVWords = resultFragment.find('.aii-v-word');
        aiiVWords.each((_, ele) => {
          $(ele).find('.atuta-box-large').each((index, element) => {
            $(element).addClass(`atuta-box-clr-${index}`);
          });
          $(ele).find('a').contents().unwrap();
        });
      } else if (match.key in indexedAiiV) {
        const aiiVEle = resultFragment.find(indexedAiiV[match.key]).eq(match.refIndex);
        aiiVEle.addClass('exact-aii-search-match');
        aiiVEle.parent().addClass('show-first');
      }
    } else if (match.key in indexedAiiV) {
      const aiiVEle = resultFragment.find(indexedAiiV[match.key]).eq(match.refIndex);
      // eslint-disable-next-line max-len
      highlightUnvocalizedAiiText(aiiVEle, match.value, searchQuery.aii_v_query, true);
    } else if (match.key === 'aii_not_v') {
      if (isRoot) {
        resultFragment.find('.atuta-box-large').addClass('highlighted');
      } else {
        // ex. ܒ-
        resultFragment.find('.aii-v-word').each((_, ele) => {
          // eslint-disable-next-line max-len
          highlightUnvocalizedAiiText($(ele), $(ele).text(), searchQuery.aii_not_v_query, false);
        });
      }
    } else if (match.key in indexedTags) {
      const frag = resultFragment.find(indexedTags[match.key]).eq(match.refIndex);
      frag.addClass('tag-highlight');
      if (match.key === 'aii_v_s.tier1_tags' && frag.hasClass('tier1-tag-ipa')) {
        frag.closest('.sound-container').addClass('always-show');
      }
      // replace <a> with <span> so cursor is pointer
      const replaceFrag = $('<span/>', { class: frag.attr('class'), text: frag.text() });
      frag.replaceWith(replaceFrag);
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

function showMoreSounds(resultFragment) {
  resultFragment.find('.sound-containers').each((i, ele) => {
    const improveIpaFrag = $('<div/>', { class: 'ipa-info' }).append(
      $('<span/>', { text: 'audio is machine-generated from ipa' }),
    );

    if ($(ele).children('.sound-container:not(.always-show)').length > 0) {
      $(ele).prev().prepend(
        $('<button/>', { class: 'material-symbols-rounded more-sounds-button' }),
      );
    }
    if ($(ele).children('.sound-container.always-show').length > 0) {
      improveIpaFrag.addClass('always-show');
    }

    $(ele).append(improveIpaFrag);
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
function highlightUnvocalizedAiiText(aiiVEle, aiiVText, query, isVocalized) {
  const re = isVocalized ? wordRegexAiiV(query) : wordRegexAiiNotV(query);
  const abc = regexHighlight(aiiVText, re, 'highlighted');
  aiiVEle.html(abc);
}

function minVocalizedTR(searchStr, aiiVs) {
  // we want to sort by those transliterations which will be shown, otherwise
  // 'from:Sumerian' would have 'gareh' as the first since its sorting by 'aghra' (not shown)

  // gather all tags into set
  const translits = [];

  aiiVs.forEach((aiiV) => {
    const tags = new Set();

    if ('tier1_tags' in aiiV) {
      aiiV.tier1_tags.forEach((tag) => tags.add(tag));
    }

    aiiV.jsonlines.forEach((jsonline) => {
      if ('tier2_tags' in jsonline) {
        jsonline.tier2_tags.forEach((tag) => tags.add(tag));
      }

      if ('senses' in jsonline) {
        jsonline.senses.forEach((sense) => {
          if ('tier3_tags' in sense) {
            sense.tier3_tags.forEach((tag) => tags.add(tag));
          }
        });
      }
    });

    if (tags.has(searchStr)) {
      translits.push(aiiV.aii_v_tr);
    }
  });

  return translits.reduce((min, c) => (c < min ? c : min));
}

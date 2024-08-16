function loadResults(searchQuery, PAGINATE_AMT) {
  // console.time('test');
  // console.log(searchQuery.results);
  const indexedAiiV = {
    'aii_v_s.aii_v': '.aii-v-word',
  };

  const indexedEng = {
    'aii_v_s.jsonlines.senses.gloss': '.gloss',
    'aii_v_s.aii_v_tr': '.aii-v-word-tr',
  };

  const indexedTags = {
    'aii_v_s.tier1_tags': '.tier1-tag',
    'aii_v_s.jsonlines.tier2_tags': '.tier2-tag',
    'aii_v_s.jsonlines.senses.tier3_tags': '.tier3-tag',
  };

  searchQuery.results.slice(searchQuery.i, searchQuery.i + PAGINATE_AMT).forEach((result, i) => {
    const resultFragment = $('<div/>', { class: 'search-result' });

    const isRoot = Array.isArray(result.item.aii_not_v);
    const aiiNotV = isRoot ? result.item.aii_not_v[0] : result.item.aii_not_v;

    result.item.aii_v_s.forEach((aiiV) => {
      const jsonlinesFragment = $('<div/>', { class: 'jsonlines' });

      const singletonJsonline = aiiV.jsonlines.length === 1;
      // const singletonJsonline = false;

      aiiV.jsonlines.forEach((jsonline) => {
        const sensesFragment = $('<ol/>', { class: 'senses' });
        const commonWordTagSearch = 'searchingCommonWords' in searchQuery;
        const showAll = (isRoot || commonWordTagSearch) ? ' always-show' : '';
        jsonline.senses.forEach((sense, j) => {
          sensesFragment.append(createGlossFrag(sense, showAll, j));
        });

        const jsonlineFragment = $('<div/>', { class: 'jsonline' }).append(
          $('<div/>', { class: 'pos' }).append(
            $('<div/>', { class: 'pos-meta' }).append(
              createPOSFrag(jsonline.pos),
              isRoot ? createRootLettersFrag('root_num_letters', jsonline) : '',
              createVisVerbFrag('tier2_vis_verb', jsonline, 'tier2-tag'),
              createT1IntoPOSFrag(aiiV, singletonJsonline),
              'tier2_etymology' in jsonline ? createEtymologyFrag('tier2_etymology', jsonline, 'tier2-tag') : '',
            ),
          ),
          sensesFragment,
          createOtherFormsFrag(jsonline),
          createInflFrag(jsonline),
          createConjFrag(jsonline),
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
      result.matches.forEach((match) => {
        // these conditionals represent the 4 distinct types of query strings
        // 1. at least one aii char with diacritics
        // 2. at least one aii char without diacritics
        // 3. english search
        // 4. tagged search

        if (match.key in indexedAiiV) {
          const aiiVEle = resultFragment.find(indexedAiiV[match.key]).eq(match.refIndex);
          highlightUnvocalizedAiiText(aiiVEle, match.value, searchQuery.aii_v_query, true);
          aiiVEle.parent().addClass('always-show');
        } else if (match.key === 'aii_not_v') {
          resultFragment.children('.aii-v-word-container').addClass('always-show');
          if (isRoot) {
            resultFragment.find('.aii-v-atuta-box').addClass('highlighted');
          } else {
            resultFragment.find('.aii-v-word').each((_, ele) => {
              // eslint-disable-next-line max-len
              highlightUnvocalizedAiiText($(ele), $(ele).text(), searchQuery.aii_not_v_query, false);
            });
          }
        } else if (match.key in indexedEng) {
          const abc = highlightEngIndices(match.value, match.indices);
          const frag = resultFragment.find(indexedEng[match.key]).eq(match.refIndex);
          frag.html(abc);
          if (match.key === 'aii_v_s.jsonlines.senses.gloss') {
            frag.closest('.aii-v-word-container').addClass('always-show');
            frag.closest('.gloss-container').addClass('always-show');
          } else if (match.key === 'aii_v_s.aii_v_tr') {
            // console.log('hello!');
            frag.parent().parent().addClass('always-show');
          }
          // console.log(resultFragment.find('.aii-v-word-container').length);
        } else if (match.key in indexedTags) {
          const frag = resultFragment.find(indexedTags[match.key]).eq(match.refIndex);
          frag.addClass('tag-highlight');
          frag.closest('.aii-v-word-container').addClass('always-show');
          if (match.key === 'aii_v_s.tier1_tags' && frag.hasClass('tier1-tag-ipa')) {
            frag.closest('.sound-container').addClass('always-show');
          } else if (match.key === 'aii_v_s.jsonlines.senses.tier3_tags') {
            frag.closest('.gloss-container').addClass('always-show');
          }
          // replace <a> with <span> so cursor is pointer
          const replaceFrag = $('<span/>', { class: frag.attr('class'), text: frag.text() });
          frag.replaceWith(replaceFrag);
        }
      });
    }

    showMoreVocalized(resultFragment);
    showMoreSounds(resultFragment, aiiNotV);
    showMore(resultFragment);
    setTrBacklink(searchQuery, i, resultFragment);

    $('#search-results').append(resultFragment);

    // console.log(result.item);
  });

  // eslint-disable-next-line no-param-reassign
  searchQuery.i += PAGINATE_AMT;
  // console.timeEnd('test');
}

function showMore(resultFragment) {
  // show the first gloss if no glosses are shown
  // and create button if there are more defs
  resultFragment.find('.senses').each((i, senses) => {
    const hideMarker = $(senses).find('.gloss').length === 1;
    if (hideMarker) {
      $(senses).addClass('only-one-gloss');
    }

    if ($(senses).children('.gloss-container.always-show').length === 0) {
      $(senses).children('.gloss-container').first().addClass('always-show');
    }

    const numHiddenGloss = $(senses).children('.gloss-container:not(.always-show)').length;
    const numHiddenInfl = $(senses).parent().find('.more-info').length; // matches tier2 tables
    const shouldShowMoreDefs = (numHiddenGloss + numHiddenInfl) > 0;

    if (shouldShowMoreDefs) {
      const numVisualVerbConj = $(senses).parent().find('.atwateh-boxes').length;
      const buttonStyle = numVisualVerbConj > 0 ? 'verb-conj-button' : 'not-verb-conj-button';
      $(senses).siblings('.pos').append(
        $('<button/>', { class: `more-defs-button-container ${buttonStyle}` }).append(
          $('<span/>', { class: 'material-symbols-rounded more-defs-button', text: 'expand_more' }),
        ),
      );
    }
  });
}

function showMoreSounds(resultFragment, aiiNotV) {
  resultFragment.find('.sound-containers').each((i, ele) => {
    const improveIpaFrag = $('<div/>', { class: 'ipa-info' }).append(
      $('<span/>', { text: 'Audio is machine-generated.  Correctness can be improved by ' }),
      $('<a/>', {
        text: 'updating the IPA',
        href: `https://en.wiktionary.org/wiki/${aiiNotV}#Assyrian_Neo-Aramaic`,
      }),
      $('<span/>', { text: '.' }),
    );

    if ($(ele).children('.sound-container:not(.always-show)').length > 0) {
      $(ele).prev().prepend(
        $('<button/>', { class: 'more-sounds-button-container' }).append(
          $('<span/>', { class: 'material-symbols-rounded more-sounds-button', text: 'expand_more' }),
        ),
      );
    }
    if ($(ele).children('.sound-container.always-show').length > 0) {
      improveIpaFrag.addClass('always-show');
    }

    $(ele).append(improveIpaFrag);
  });
}

function showMoreVocalized(resultFragment) {
  const shouldShowMore = resultFragment.children('.aii-v-word-container:not(.always-show)').length > 0;
  if (shouldShowMore) {
    resultFragment.prepend(
      $('<button/>', { class: 'more-vocalized' }).append(
        $('<span/>', { class: 'material-symbols-rounded more-vocalized-icon', text: 'expand_more' }),
      ),
    );
  }
}

function setTrBacklink(searchQuery, i, resultFragment) {
  const isFirstResult = searchQuery.i === 0 && i === 0;
  if (isFirstResult) {
    const ele = resultFragment.find('.aii-v-word-container.always-show').first().find('.aii-v-word-tr');
    ele.wrap(
      $('<div/>', { class: 'aii-v-word-tr-broad-container' }),
    ).parent().append(
      $('<div/>', { class: 'tr-backlink-container' }).append(
        $('<span/>', { class: 'webapp-backlink-meta', text: '^ generated by 🟠 ' }),
        $('<a/>', { class: 'webapp-backlink-href', href: '../assyrian-transliterator/', text: 'assyrian transliterator' }),
      ),
    );
  }
}

// element, aiiV text, querystring, isVocalized
function highlightUnvocalizedAiiText(aiiVEle, aiiVText, query, isVocalized) {
  const re = isVocalized ? wordRegexAiiV(query) : wordRegexAiiNotV(query);
  const abc = regexHighlight(aiiVText, re, 'highlighted');
  aiiVEle.html(abc);
}

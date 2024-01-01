const bookDisplayName = {
  PSA: ['Psalms', 'ܡܙܡܘܪܐ'],
  MAT: ['Matthew', 'ܡܬܝ'],
  MRK: ['Mark', 'ܡܪܩܘܣ'],
  LUK: ['Luke', 'ܠܘܩܐ'],
  JHN: ['John', 'ܝܘܚܢܢ'],
  ACT: ['Acts', 'ܣܘܥܪ̈ܢܐ ܕܫܠܝܚ̈ܐ'],
  ROM: ['Romans', 'ܪ̈ܗܘܡܝܐ'],
  '1CO': ['1 Corinthians', 'ܐ ܩܘܪ̈ܢܬܝܐ'],
  '2CO': ['2 Corinthians', 'ܒ ܩܘܪ̈ܢܬܝܐ'],
  GAL: ['Galatians', 'ܓܠܛܝ̈ܐ'],
  EPH: ['Ephesians', 'ܐܦܣܝ̈ܐ'],
  PHP: ['Philippians', 'ܦܝܠܝܦܣܝ̈ܐ'],
  COL: ['Colossians', 'ܩܘܠܣܝ̈ܐ'],
  '1TH': ['1 Thessalonians', 'ܐ ܬܣܠܘܢܝܩܝ̈ܐ'],
  '2TH': ['2 Thessalonians', 'ܒ ܬܣܠܘܢܝܩܝ̈ܐ'],
  '1TI': ['1 Timothy', 'ܐ ܛܝܡܬܐܘܣ'],
  '2TI': ['2 Timothy', 'ܒ ܛܝܡܬܐܘܣ'],
  TIT: ['Titus', 'ܛܛܘܣ'],
  PHM: ['Philemon', 'ܦܝܠܡܘܢ'],
  HEB: ['Hebrews', 'ܥܒ݂ܪ̈ܝܐ'],
  JAS: ['James', 'ܝܥܩܘܒ݂'],
  '1PE': ['1 Peter', 'ܐ ܦܛܪܘܣ'],
  '2PE': ['2 Peter', 'ܒ ܦܛܪܘܣ'],
  '1JN': ['1 John', 'ܐ ܝܘܚܢܢ'],
  '2JN': ['2 John', 'ܒ ܝܘܚܢܢ'],
  '3JN': ['3 John', 'ܓ ܝܘܚܢܢ'],
  JUD: ['Jude', 'ܝܗܘܕܐ'],
  REV: ['Revelation', 'ܓܠܝܢܐ'],
};

function processQueryStringParams() {
  let readingLevel = null;
  let bookShortName = null;
  let chapter = null;
  let startHighlight = null;
  let endHighlight = null;

  const params = new URLSearchParams(document.location.search);
  if (params.has('reading_level')) {
    const readingLevelTemp = parseInt(params.get('reading_level'), 10);
    if (readingLevelTemp === 2 || readingLevelTemp === 3) {
      readingLevel = readingLevelTemp;
    }
  }

  // 5. use defaults
  if (params.has('book') && params.get('book') in bookDisplayName) {
    // 4. specific book
    bookShortName = params.get('book');

    if (params.has('chapter')) {
      const chapterAndVerses = params.get('chapter').split(':');
      const tmpChapter = parseInt(chapterAndVerses[0], 10);
      // eslint-disable-next-line max-len
      const isValidChapter = Number.isInteger(tmpChapter) && tmpChapter > 0 && tmpChapter - 1 < bible[bookShortName].length;
      if (isValidChapter) {
        // 3. specific chapter in book
        chapter = tmpChapter;
        if (chapterAndVerses.length > 1) {
          const verses = chapterAndVerses[1].split('-');
          const tmpStartHighlight = parseInt(verses[0], 10);
          // eslint-disable-next-line max-len
          if (Number.isInteger(tmpStartHighlight) && tmpStartHighlight >= 1) {
            let numVersesInChapter = 0;
            bible[bookShortName][chapter - 1].forEach((verseSection) => {
              if ('v' in verseSection) { // not sure if this conditional is needed since v should be guaranteed to exist
                numVersesInChapter += verseSection.v.length;
              }
            });
            if (tmpStartHighlight - 1 < numVersesInChapter) {
              // 2. highlight a single verse
              startHighlight = tmpStartHighlight;
              if (verses.length > 1) {
                const tmpEndHighlight = parseInt(verses[1], 10);
                // eslint-disable-next-line max-len
                if (Number.isInteger(tmpEndHighlight) && tmpEndHighlight > startHighlight && tmpEndHighlight - 1 < numVersesInChapter) {
                  // 1. highlight range of verses
                  endHighlight = tmpEndHighlight;
                }
              }
            }
          }
        }
      }
    }
  }

  return [readingLevel, bookShortName, chapter, startHighlight, endHighlight];
}

function setNumChapters(n) {
  $('#chapters').empty();
  for (let i = 1; i <= n; i += 1) {
    // console.log($("#chapters option:selected").index());
    $('<option/>')
      .val(i)
      .text(i)
      .appendTo('#chapters');
  }
}

function setDisplayedVerses({
  readingLevelInit = null, bookShortNameInit = null, chapterInit = null, highlightVerses = null,
}) {
  // this assumes readingLevelInit and chapterInit are of Int type
  let readingLevel = readingLevelInit;
  let bookShortName = bookShortNameInit;
  let chapter = chapterInit;

  if (readingLevel == null) {
    readingLevel = parseInt($('#reading-level').val(), 10);
  }
  if (bookShortName == null) {
    bookShortName = $('#books').find(':selected').val();
  }
  if (chapter == null) {
    chapter = parseInt($('#chapters').val(), 10);
  }

  $('#bible').empty();
  $('#bible').append(
    $('<div/>', { class: 'aii-book-name', text: bookDisplayName[bookShortName][1] }),
  );

  let idx = 0;
  bible[bookShortName][chapter - 1].forEach((verseSection, i) => {
    const verseMeta = {
      h1: 'header',
      r1: 'reference',
      h2: 'header-2',
    };

    Object.entries(verseMeta).forEach(([verseMetaKey, className]) => {
      if (verseMetaKey in verseSection) {
        if (verseMetaKey === 'r1') {
          $('#bible').append($('<div/>', { class: className, html: verseSection[verseMetaKey] }));
        } else {
          $('#bible').append($('<div/>', { class: className, text: verseSection[verseMetaKey] }));
        }
      }
    });

    const versesOL = $('<ol/>', { class: 'verses-ol' });
    verseSection.v.forEach((verse, j) => {
      const engVerse = readingLevel === 1
        ? $('<li/>', { class: 'eng-verse' }).append(
          $('<span/>', { class: 'marker', text: `${idx + 1} ` }),
          verse[0] == null
            ? $('<span/>', { class: 'missing-verse highlightable', text: 'NLT Translation not available' })
            : $('<span/>', { class: 'highlightable', text: verse[0] }),
        )
        : ''; // use empty string instead of null https://stackoverflow.com/a/22657035

      let aiiLatinVerse = '';
      if (i === 0 && j === 0) {
        const fragment = $('<div/>', { id: 'search-bible-backlink-container' }).append(
          $('<a/>', { class: 'eng-backlink', text: '🔎 Search this Bible', href: '../assyrian-bible-search' }),
        );
        // $('#bible').append(fragment);
      }
      if (readingLevel < 3) {
        if (i === 0 && j === 0) {
          aiiLatinVerse = $('<li/>', { class: 'aii-tr' }).append(
            $('<span/>', { class: 'highlightable', text: aiiTranslit(verse[1]).phonetic }),
            $('<sup/>', { class: 'tr-sup' }).append(
              $('<span/>', { text: 'generated by ' }),
              $('<a/>', { class: 'eng-backlink', text: 'Assyrian Transliterator', href: '../assyrian-transliterator' }),
            ),
          );
        } else {
          aiiLatinVerse = $('<li/>', { class: 'aii-tr' }).append(
            $('<span/>', { class: 'highlightable', text: aiiTranslit(verse[1]).phonetic }),
          );
        }
      }

      // https://amiyasahu.github.io/create-nested-html-elements-in-jquery.html
      $(versesOL).append(
        $('<li/>', { class: 'aii-verse' }).append(
          $('<span/>', { class: 'marker', text: `${aiiNumeral[idx + 1]} ` }),
          $('<span/>', { class: 'highlightable', text: verse[1] }),
        ),
        aiiLatinVerse,
        engVerse,
      );

      idx += 1;
    });
    $('#bible').append(versesOL);
  });

  // https://stackoverflow.com/a/60400017
  if (readingLevel === 2 || readingLevel === 3) {
    $('.bible-backlink').attr('href', (i, value) => `${value}&reading_level=${readingLevel}`);
  }

  if (readingLevel === 1) {
    $('#eng-copyright').show();
  } else {
    $('#eng-copyright').hide();
  }

  // set query string after updating verses
  const url = new URL(window.location);
  // per https://stackoverflow.com/a/70591485
  url.searchParams.set('book', bookShortName);
  // console.log(typeof chapter);
  url.searchParams.set('chapter', highlightVerses == null ? chapter : highlightVerses);
  // set reading level
  if (readingLevel > 1) {
    url.searchParams.set('reading_level', readingLevel);
  } else if (url.searchParams.has('reading_level')) {
    url.searchParams.delete('reading_level');
  }
  window.history.replaceState(null, '', url.toString());
}

function scrollToStartOfBook() {
  // https://stackoverflow.com/a/30317344
  // https://stackoverflow.com/a/33434424
  const scrollVal = $('#reading-level-container').offset().top + $('#reading-level-container').outerHeight(true);
  $(window).scrollTop(Math.min(window.pageYOffset, scrollVal));
}

// https://stackoverflow.com/a/70477376
function scrollToVerse(callback) {
  // scrolling is unreliable until we wait for fonts (imported via css) to complete loading
  if (document.readyState === 'complete') {
    // for safari when accessing from file url and clicking on bible backlinks
    callback();
    // $('body').css('background-color', '#ddd');
  } else {
    window.addEventListener('load', callback);
  }
}

/* eslint-disable lines-between-class-members */
class AiiUtils {
  static validLetters = 'ܦܒܬܛܕܟܓܩܣܨܙܫܚܥܗܡܢܪܠܐܘܝ';

  static COMBINING_TILDE_ABOVE = '\u{0303}';
  static COMBINING_MACRON = '\u{0304}';
  static COMBINING_DOT_ABOVE = '\u{0307}';
  static COMBINING_DIAERESIS = '\u{0308}';
  static COMBINING_DOT_BELOW = '\u{0323}';
  static COMBINING_BREVE_BELOW = '\u{032E}';
  static COMBINING_TILDE_BELOW = '\u{0330}';
  static COMBINING_MACRON_BELOW = '\u{0331}';
  static SUPERSCRIPT_ALAPH = '\u{0711}';

  static SYRIAC_START = '\u{0730}';
  static SYRIAC_END = '\u{074A}';

  static otherMarksArr = [
    AiiUtils.COMBINING_TILDE_ABOVE,
    AiiUtils.COMBINING_MACRON,
    AiiUtils.COMBINING_DOT_ABOVE,
    AiiUtils.COMBINING_DIAERESIS,
    AiiUtils.COMBINING_DOT_BELOW,
    AiiUtils.COMBINING_BREVE_BELOW,
    AiiUtils.COMBINING_TILDE_BELOW,
    AiiUtils.COMBINING_MACRON_BELOW,
    AiiUtils.SUPERSCRIPT_ALAPH,
  ];

  // changes beyond this point should be verified due to linter limitations
  // ex. calling AiiUtils.aiiVCharClass() instead of AiiUtils.aiiVCharClass
  static diacriticRangeStr = `${AiiUtils.otherMarksArr.join('')}${AiiUtils.SYRIAC_START}-${AiiUtils.SYRIAC_END}`;
  static diacriticCharClass = `[${AiiUtils.diacriticRangeStr}]`;
  static aiiVCharClass = `[${AiiUtils.diacriticRangeStr}${AiiUtils.validLetters}]`;

  static atLeastOneAiiLetter(str) {
    const re = new RegExp(`(?:[${AiiUtils.validLetters}])`);
    return re.test(str);
  }

  static atLeastOneDiacritic(str) {
    const re = new RegExp(`(?:${AiiUtils.diacriticCharClass})`);
    return re.test(str);
  }

  static atLeastOneAiiVChar(str) {
    const re = new RegExp(`(?:${AiiUtils.aiiVCharClass})`);
    return re.test(str);
  }

  static stripMarkers(aiiV) {
    // This is a js port of https://en.wiktionary.org/wiki/Module:Syrc-entryname
    const nonCaptureGroup = `(?:${AiiUtils.diacriticCharClass})`;
    const re = new RegExp(nonCaptureGroup, 'g');
    return aiiV.replaceAll(re, '');
  }

  static paramsToString(newKeyValues, currentSearchParams = null) {
    const searchParams = currentSearchParams === null ? new URLSearchParams() : currentSearchParams;
    newKeyValues.forEach(([key, value]) => {
      searchParams.set(key, value);
    });

    // https://stackoverflow.com/a/14269897
    // Prevent percent encoding of colons for better human readability
    return searchParams.toString().replaceAll('%3A', ':');
  }
}

// this allows us to run code in a Node context and also browser-side js
if (typeof module === 'object') {
  module.exports = {
    AiiUtils,
  };
}

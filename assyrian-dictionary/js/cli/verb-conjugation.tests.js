const { JSDOM } = require('jsdom');
const jQuery = require('jquery');

// Create a virtual DOM
const { window } = new JSDOM('<!DOCTYPE html>');

// Set up global objects
global.window = window;
global.document = window.document;
global.$ = jQuery(window);

const {
  aiiDictionary,
} = require('../consts/aii-dict.min');

global.AiiUtils = require('../../../shared_js/aii-utils').AiiUtils;

const {
  replacePlaceholders,
  createAtwatehBoxesFrag,
} = require('../create-fragments');

const {
  conjPatterns,
} = require('../consts/conj-patterns');

const denominalForms = require('../json/verb-denominal-forms.json');

// Extract verb conjugation
aiiDictionary.forEach((aiiNotV) => {
  aiiNotV.aii_v_s.forEach((aiiV) => {
    aiiV.jsonlines.forEach((jsonline) => {
      if (jsonline.verb_conjugation) {
        const key = jsonline.verb_conjugation.alt_pattern || jsonline.verb_conjugation.pattern;
        const params = conjPatterns[key].parameters;
        Object.entries(params).forEach(([grammaticalPerson, templateStr]) => {
          const form = replacePlaceholders(templateStr, jsonline.verb_conjugation.strong_radicals);
          // eslint-disable-next-line max-len
          const htmlForm = createAtwatehBoxesFrag(templateStr, jsonline.verb_conjugation.strong_radicals);

          console.assert(
            denominalForms[aiiV.aii_v].includes(form),
            `form ${key} for ${grammaticalPerson} needs to be corrected, see ${aiiV.aii_v}`,
          );

          console.assert(
            denominalForms[aiiV.aii_v].includes(htmlForm.text()),
            `html form ${key} for ${grammaticalPerson} needs to be corrected, see ${aiiV.aii_v}`,
          );
        });
      }
    });
  });
});

const {
  aiiInflNoun,
} = require('../create-fragments');

const aiiDynamicNounForms = require('../json/dynamic-noun-forms.json');

Object.entries(aiiDynamicNounForms).forEach(([aiiWord, jsonlines]) => {
  jsonlines.forEach((jsonline) => {
    const rows = aiiInflNoun(jsonline.call_site.name, jsonline.call_site['1'], jsonline.call_site.optional_args);
    const same = JSON.stringify(jsonline.rows) === JSON.stringify(rows);
    console.assert(
      same,
      `${aiiWord} `
      ,
    );
  });
});

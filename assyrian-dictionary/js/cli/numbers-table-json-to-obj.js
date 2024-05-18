const fs = require('fs');

const json = fs.readFileSync('./json/aii-numbers-table-no-tr.json', 'utf-8');

const aiiNumbersTable = JSON.parse(json);

console.log(`const aiiNumbersTable = ${JSON.stringify(aiiNumbersTable, undefined, 2)};
// this allows use to run code in a Node context and also browser-side js
if (typeof module === 'object') {
  module.exports = {
    aiiNumbersTable,
  };
}`);

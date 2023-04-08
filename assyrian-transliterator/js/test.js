const tt = {
  ܦ: 'p',
  ܒ: 'b',
  ܬ: 't',
  ܛ: 'ṭ',
  ܕ: 'd',
  ܟ: 'k',
  ܓ: 'g',
  ܩ: 'q',
  ܔ: 'j',
  ܣ: 's',
  ܨ: 'ṣ',
  ܙ: 'z',
  ܫ: 'š',
  ܚ: 'ḥ',
  ܥ: 'ʿ',
  ܗ: 'h',
  ܡ: 'm',
  ܢ: 'n',
  ܪ: 'r',
  ܠ: 'l',
};
const ttKeysCapture = `([${Object.keys(tt).join('')}])`;
const ttValues = `([${Object.values(tt).join('')}])`;

console.log(ttValues);

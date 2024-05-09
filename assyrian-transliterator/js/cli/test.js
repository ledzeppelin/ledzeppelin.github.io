const tt = {
  ܦ: 'p',
  ܒ: 'b',
  ܬ: 't',
  ܛ: 'ṭ',
  ܕ: 'd',
  ܟ: 'k',
  ܓ: 'g',
  ܩ: 'q',
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

// function isNonLatinCharacters(s) {
//   return /[^\u0710-\u074F]/.test(s);
// }

// console.log(isNonLatinCharacters("ܐܒ"));// Japanese
// console.log(isNonLatinCharacters("测试"));// Chinese
// console.log(isNonLatinCharacters("حمید"));// Persian
// console.log(isNonLatinCharacters("테스트"));// Korean
// console.log(isNonLatinCharacters("परीक्षण"));// Hindi
// console.log(isNonLatinCharacters("מִבְחָן"));// Hebrew

const a = '([abc]?)';
const b = '([123])';

const re = new RegExp(`${a}${b}`, 'g');
let translit = 'xx1xxx';
console.log(translit);
translit = translit.replaceAll(re, ' $1$2 ');
console.log(translit);

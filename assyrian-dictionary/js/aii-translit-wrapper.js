function aiiTranslitWrapper(vocalizedSpelling, validLetters, aiiTranslit_) {
  const regex = new RegExp(`^(?:[${validLetters}] ){2,4}[${validLetters}]$`);
  const isRoot = regex.test(vocalizedSpelling);
  if (isRoot) {
    const trAtwateh = aiiTranslit_(vocalizedSpelling).phonetic;
    return trAtwateh.replaceAll(' ', '-');
  }

  return aiiTranslit_(vocalizedSpelling).phonetic;
}

// this allows us to run code in a Node context and also browser-side js
if (typeof module === 'object') {
  module.exports = {
    aiiTranslitWrapper,
  };
}

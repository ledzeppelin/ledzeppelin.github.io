// eslint.config.cjs  (CommonJS version)
const js = require('@eslint/js');
const globals = require('globals');
const { defineConfig } = require('eslint/config');

module.exports = defineConfig([
  {
    files: ['**/*.{js,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    rules: { semi: ['error', 'always'] },
  },
  { files: ['**/*.{js,cjs}'], languageOptions: { globals: globals.browser } },
  {
    files: ['**/*.{js,cjs}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jquery,
      },
    },
  },
]);

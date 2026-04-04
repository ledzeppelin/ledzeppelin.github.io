// eslint.config.cjs  (CommonJS version)
const js = require('@eslint/js');
const globals = require('globals');
const {defineConfig} = require('eslint/config');

// TODO: cross-file globals
// npx eslint . 2>&1 | grep 'no-undef$' | grep -oE "'[^']+'" | sort | uniq -c | sort -rn


module.exports = defineConfig([
  {ignores: ['venv/**']},
  {
    files: ['**/*.{js,cjs}'],
    plugins: {js},
    extends: ['js/recommended'],
    rules: {semi: ['error', 'always'], indent: ['error', 2]},
  },
  {
    files: ['**/*.js'],
    ignores: ['**/cli/**/*.js', 'sandbox/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jquery,
        module: 'readonly',
        // CDN
        Fuse: 'readonly',
        Chart: 'readonly',
        Howl: 'readonly',
        // cross-file functions
        aiiTranslit: 'readonly',
        // cross-file consts
        // aiiDictionary: 'readonly',
      },
    },
  },
  {
    files: ['**/cli/**/*.js', 'sandbox/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
]);

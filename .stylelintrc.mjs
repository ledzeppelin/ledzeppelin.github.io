export default {
  extends: 'stylelint-config-standard-scss',
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-alphabetical-order': true,
    'scss/dollar-variable-empty-line-before': null,
    'scss/double-slash-comment-empty-line-before': null,
    'font-family-no-missing-generic-family-keyword': null,
    'import-notation': null,

    // TODO: temporarily disabled, re-enable and fix violations
    'declaration-block-no-redundant-longhand-properties': null,
    'property-no-vendor-prefix': null,
  },
};

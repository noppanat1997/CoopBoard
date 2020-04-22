module.exports = {
  extends: 'airbnb-base',
  rules: {
    'no-console': 0,
    'no-param-reassign': [2, { props: false }],
    'prefer-destructring': 0,
    'arrow-body-style': 0,
    'comma-dangle': 0,
    'linebreak-style': 0,
    'arrow-parens': 0,
    'no-restricted-globals': 0,
    'object-curly-newline': 0,
    'max-len': 0,
    'implicit-arrow-linebreak': 0,
    // treatUndefinedAsUnspecified: true
    camelcase: 0
  },
  env: {
    commonjs: true,
    node: true,
    mocha: true
  }
};

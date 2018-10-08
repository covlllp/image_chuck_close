module.exports = {
  extends: ['airbnb', 'prettier'],
  parser: 'typescript-eslint-parser',
  plugins: ['typescript'],
  env: {
    browser: true,
  },
  rules: {
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'react/jsx-filename-extension': 0,
    'no-undef': 0,
    'react/prop-types': 0,
    'no-restricted-globals': 0,
  },
};

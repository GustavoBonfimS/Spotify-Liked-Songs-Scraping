module.exports = {
  env: {
    es2021: true,
    node: true,
    browser: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'warn',
    quotes: ['warn', 'single', { allowTemplateLiterals: true }],
    'class-methods-use-this': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': 'warn',
    'no-restricted-syntax': 'off',
  },
};

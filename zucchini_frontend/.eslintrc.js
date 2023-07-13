module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb', 'prettier/react', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'linebreak-style': 0,
  },
};

module.exports = {
  extends: [
    'airbnb-base',
    'prettier',
  ],
  plugins: [
    'prettier',
  ],
  rules: {
    'prettier/prettier': ['error', {
      singleQuote: true,
      trailingComma: true,
    }]
  },
  env: {
    browser: true,
  },
};
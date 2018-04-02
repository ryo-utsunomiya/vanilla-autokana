const fs = require('fs');
const prettierConfig = JSON.parse(fs.readFileSync('./.prettierrc', 'utf8'));

module.exports = {
  extends: [
    'airbnb-base',
    'prettier',
  ],
  plugins: [
    'prettier',
  ],
  rules: {
    'prettier/prettier': ['error', prettierConfig]
  },
  env: {
    browser: true,
  },
};
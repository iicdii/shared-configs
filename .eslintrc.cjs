const path = require('path');

require('./packages/eslint-config/patch');

const tsconfig = path.join(process.cwd(), 'tsconfig.json');

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['./packages/eslint-config'],
  ignorePatterns: ['vite.config.ts'],
  parserOptions: {
    project: tsconfig,
    tsconfigRootDir: __dirname,
  },
};

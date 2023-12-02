/* eslint-env node */
require('@iicdii/eslint-config/patch');

module.exports = {
  root: false,
  env: { browser: true, es2020: true },
  extends: ['@iicdii/eslint-config', '@iicdii/eslint-config/mixins/react'],
  settings: {
    react: {
      // 현재 React 버전을 명시합니다. 명시하지 않을 경우(기본값 'detect') React 라이브러리 전체를 불러오므로
      // 린트 과정에서 속도가 느려질 수 있습니다.
      // 예: '16.9', '17.0', '18.0' 등
      version: '18.2',
    },
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  }
};

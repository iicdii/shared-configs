module.exports = {
  plugins: ['no-relative-import-paths'],
  extends: [
    '@rushstack/eslint-config/profile/web-app',
    'plugin:storybook/recommended',
    'plugin:cypress/recommended',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // 근거: 타입 추론으로 충분한 곳에 타이핑을 강요함
        '@rushstack/typedef-var': 'off',
        // 근거: React 컴포넌트의 경우 17 이하에서는 `undefined`가 아닌 `null`을 리턴할 수 있기 때문에 사용하지 않음
        '@rushstack/no-new-null': 'off',
        // 근거: 상황에 따라 리턴 타입을 타입 추론에 맡기는 것이 나을수도 있음
        '@typescript-eslint/explicit-function-return-type': 'off',
        // 근거: 문서에 의하면 클래스를 많이 사용하는 프로젝트에서 사용할 수 있으나,
        //       팀 내 개발 패턴은 함수형을 지향하므로 불필요함
        '@typescript-eslint/explicit-member-accessibility': 'off',
        // 근거: useEffect 안에서 await 사용 불가
        '@typescript-eslint/no-floating-promises': 'off',
        // 네이밍 컨벤션
        // - 헝가리안 표기법 금지
        // - 기본 변수는 camelCase, PascalCase, UPPER_CASE 허용
        // 근거: IDE 기능이 발전하여 헝가리안 표기법을 이용한 타입 표기는 현재 시점에서 무의미함
        '@typescript-eslint/naming-convention': [
          'warn',
          // camelCase 변수, PascalCase 변수, UPPER_CASE 변수 허용
          {
            selector: 'variable',
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          },
          // camelCase 함수, PascalCase 함수 허용
          {
            selector: 'function',
            format: ['camelCase', 'PascalCase'],
          },
          // PascalCase 클래스, interfaces, type aliases, enums 허용
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
          // interface 앞에 I 사용 불가
          {
            selector: 'interface',
            format: ['PascalCase'],
            custom: {
              regex: '^I[A-Z]',
              match: false,
            },
          },
          // typeAlias 앞에 T 사용 불가
          {
            selector: 'typeAlias',
            format: ['PascalCase'],
            custom: {
              regex: '^T[A-Z]',
              match: false,
            },
          },
          // typeParameter 앞에 T 사용 불가
          {
            selector: 'typeParameter',
            format: ['PascalCase'],
            custom: {
              regex: '^T[A-Z]',
              match: false,
            },
          },
        ],
        // 참고 : https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/member-ordering.md#default-configuration
        '@typescript-eslint/member-ordering': ['error'],
      },
    },
  ],
  rules: {
    // 같은 폴더인 경우를 제외하고 import 경로는 항상 절대 경로를 사용
    'no-relative-import-paths/no-relative-import-paths': [
      'warn',
      { allowSameFolder: true, rootDir: 'src', prefix: '@' },
    ],

    // 근거: @typescript-eslint/naming-convention 규칙에서 전체 네이밍 컨벤션을 관리
    camelcase: 'off',

    // 참고: https://github.com/airbnb/javascript#naming--PascalCase
    'new-cap': [
      'error',
      {
        newIsCap: true,
        newIsCapExceptions: [],
        capIsNew: false,
        capIsNewExceptions: [],
      },
    ],

    // 참고: https://github.com/airbnb/javascript#iterators--nope
    // 근거: 에어비앤비에선 구형 브라우저에서 성능 상의 이유로 for..of를 금지하지만,
    //       당시 구형 브라우저는 regenerator runtime 환경이 없는 Safari < 10, IE 에 해당되므로
    //       현재 시점에서 무의미하기 때문에 규칙에서 제외함
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],

    // 객체를 선언할 때는 구조 분해 할당을 사용하도록 강제하지만, 배열에서는 그렇지 않으며,
    // 할당 표현식에서는 배열이나 객체 모두 구조 분해 할당을 사용하지 않아도 된다는 규칙을 설정
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
    ],
  },
};

module.exports = {
  env: {
    jest: true,
    browser: true,
    es6: true,
    node: true
  },
  root: true,
  extends: ['standard'],
  plugins: ['standard', 'react', '@emotion'],
  rules: {
    'no-console': 'warn',
    'no-var': 'error', // optional, recommended when using es6+
    'no-unused-vars': 1, // recommended
    'arrow-spacing': ['error', { before: true, after: true }], // recommended
    indent: 0,
    'no-mixed-spaces-and-tabs': 1,
    'no-tabs': 0,
    'comma-dangle': [
      'error',
      {
        objects: 'only-multiline',
        arrays: 'only-multiline',
        imports: 'never',
        exports: 'never',
        functions: 'never',
      },
    ],

    // options to emulate prettier setup
    semi: ['error', 'never'],
    'template-curly-spacing': ['error', 'always'],
    'arrow-parens': ['error', 'as-needed'],

    // standard.js
    'space-before-function-paren': [
      'error',
      {
        named: 'always',
        anonymous: 'always',
        asyncArrow: 'always',
      },
    ],

    // standard plugin - options
    'standard/object-curly-even-spacing': ['error', 'either'],
    'standard/array-bracket-even-spacing': ['error', 'either'],
    'standard/computed-property-even-spacing': ['error', 'even'],
    'standard/no-callback-literal': ['error', ['cb', 'callback']],

    // react plugin - options
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
  },
  parser: 'babel-eslint',
  settings: {
    'import/core-modules': ['gatsby']
  },
  globals: {
    graphql: true,
    browser: true
  },
  parserOptions: {
    ecmaVersion: 8, // optional, recommended 6+
  },
}

const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const typescriptEslintEslintPlugin = require('@typescript-eslint/eslint-plugin');
const typescriptEslintParser = require('@typescript-eslint/parser');
const globals = require('globals');

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
});

module.exports = [
    js.configs.recommended,
    ...compat.extends('plugin:@typescript-eslint/recommended'),
    { plugins: { '@typescript-eslint': typescriptEslintEslintPlugin } },
    {
        languageOptions: {
            parser: typescriptEslintParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            globals: { ...globals.browser, ...globals.es2022 },
        },
    },
    {
        rules: {
            indent: ['error', 4],
            'linebreak-style': ['error', 'unix'],
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
        },
    },
];

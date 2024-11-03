/** @type {import('eslint').Linter.FlatConfig[]} */

import typescriptEslint from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import prettierPlugin from 'eslint-plugin-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const nuxtConfig = await import('@nuxtjs/eslint-config-typescript')
const prettierConfig = await import('eslint-config-prettier')

export default [
  {
    ignores: ['node_modules/**'],
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      '@typescript-eslint': typescriptEslint,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'import/order': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'vue/require-default-prop': 'off',
      'no-throw-literal': 'off',
      'vue/no-v-html': 'off',
      camelcase: 'off',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
  {
    plugins: {
      vue: (await import('eslint-plugin-vue')).default,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      ...nuxtConfig.rules,
    },
  },
  {
    rules: {
      ...prettierConfig.rules,
    },
  },
]

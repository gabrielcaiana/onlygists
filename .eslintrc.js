/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
  plugins: ['simple-import-sort'],
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
  },
}

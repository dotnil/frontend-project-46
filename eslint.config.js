import globals from 'globals'
import pluginJs from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'

export default [
  pluginJs.configs.recommended,
  stylistic.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['tests/**/*.js', '**/*.test.js'],
    languageOptions: {
      globals: globals.jest,
    },
  },
  {
    ignores: [
      'dist/',
      'coverage/',
      '__fixtures__/',
    ],
  },
]

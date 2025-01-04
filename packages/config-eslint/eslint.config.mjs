import pluginJs from '@eslint/js';
import * as pluginImport from 'eslint-plugin-import';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export const config = [
   { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
   {
      languageOptions: {
         globals: { ...globals.browser, ...globals.node },
         parserOptions: {},
      },
   },
   pluginJs.configs.recommended,
   ...tseslint.configs.recommended,
   pluginReact.configs.flat.recommended,
   pluginJsxA11y.flatConfigs.recommended,
   pluginImport.flatConfigs.recommended,
   pluginReactRefresh.configs.recommended,
   {
      rules: {
         'no-console': 'off',
         'react/prop-types': 'off',
         'react/jsx-uses-react': 'off',
         'react/react-in-jsx-scope': 'off',
         'react-hooks/exhaustive-deps': 'off',
         'jsx-a11y/click-events-have-key-events': 'warn',
         'jsx-a11y/interactive-supports-focus': 'warn',
         'jsx-a11y/media-has-caption': 'off',
         'no-unused-vars': 'off',
         '@typescript-eslint/consistent-type-imports': 'error',
         '@typescript-eslint/no-unused-vars': [
            'warn',
            {
               args: 'after-used',
               ignoreRestSiblings: false,
               argsIgnorePattern: '^_.*?$',
            },
         ],
         'import/no-unresolved': 'off',
         // 'import/extensions': ['.ts', '.tsx'],
         'import/order': [
            'warn',
            {
               groups: [
                  'type',
                  'builtin',
                  'object',
                  'external',
                  'internal',
                  'parent',
                  'sibling',
                  'index',
               ],
               pathGroups: [
                  {
                     pattern: '~/**',
                     group: 'external',
                     position: 'after',
                  },
               ],
               'newlines-between': 'always',
            },
         ],
         'react/self-closing-comp': 'warn',
         'react/jsx-sort-props': [
            'warn',
            {
               callbacksLast: true,
               shorthandFirst: true,
               noSortAlphabetically: false,
               reservedFirst: true,
            },
         ],
         'padding-line-between-statements': [
            'warn',
            { blankLine: 'always', prev: '*', next: 'return' },
            { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
            { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
         ],
         'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      },
   },
];

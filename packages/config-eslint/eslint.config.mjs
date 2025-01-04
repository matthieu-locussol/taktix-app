import pluginJs from '@eslint/js';
import * as pluginImport from 'eslint-plugin-import';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export const config = [
   { ignores: ['**/.next/**', '**/dist/**', '**/node_modules/**', '**/src-tauri/target/**'] },
   { files: ['**/*.{js,mjs,cjs,ts,mts,jsx,tsx}'] },
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
         // TODO: remove these rules one by one
         '@typescript-eslint/no-namespace': 'off',

         'import/no-unresolved': [
            'error',
            { caseSensitive: true, ignore: ['@prisma/extension-accelerate'] },
         ],
         'import/extensions': ['error', 'ignorePackages', { checkTypeImports: true }],
         'import/named': 'off',
         'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 0, maxBOF: 0 }],
         '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
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
               varsIgnorePattern: '^z',
            },
         ],
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
         'react-refresh/only-export-components': [
            'warn',
            {
               allowConstantExport: true,
               allowExportNames: ['getServerSideProps'],
            },
         ],
      },
   },
];

module.exports = {
   extends: ['../../packages/config-eslint/node.json'],
   parserOptions: {
      project: ['./tsconfig.json'],
      tsconfigRootDir: __dirname,
   },
   rules: {
      'class-methods-use-this': 'off',
      'import/no-cycle': 'off',
   },
};

module.exports = {
   extends: ['../../packages/config-eslint/node.json'],
   parserOptions: {
      project: ['./tsconfig.json'],
      tsconfigRootDir: __dirname,
   },
};

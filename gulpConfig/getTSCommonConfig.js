'use strict';

const fs = require('fs');
const assign = require('object-assign');
const requireJSON5 = require('require-json5');
const { getProjectPath } = require('./utils/projectHelper');

module.exports = function() {
  let my = {};
  if (fs.existsSync(getProjectPath('tsconfig.json'))) {
    my = requireJSON5(getProjectPath('tsconfig.json'));
  }
  return assign(
    {
      noUnusedParameters: true,
      noUnusedLocals: true,
      strictNullChecks: true,
      target: 'es6',
      jsx: 'preserve',
      moduleResolution: 'node',
      declaration: true,
      allowSyntheticDefaultImports: true,
    },
    my.compilerOptions,
  );
};

'use strict';

const { dirname } = require('path');
const fs = require('fs');
const { getProjectPath } = require('./utils/projectHelper');

function replacePath(path) {
  // 如果有源代码，并且源代码中存在 /lib/ 字符串，就将/lib/转换为 /es/
  // 获取node_modules 下是不是存在esPath目录，如果存在，当前目录的源码就是那个目录
  if (path.node.source && /\/lib\//.test(path.node.source.value)) {
    const esModule = path.node.source.value.replace('/lib/', '/es/');
    const esPath = dirname(getProjectPath('node_modules', esModule));
    if (fs.existsSync(esPath)) {
      path.node.source.value = esModule;
    }
  }
}

function replaceLib() {
  return {
    // 自定义插件开发
    visitor: {
      ImportDeclaration: replacePath,
      ExportNamedDeclaration: replacePath,
    },
  };
}

module.exports = replaceLib;

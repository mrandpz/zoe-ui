npm install --save react react-dom @types/react @types/react-dom

添加开发依赖   
npm install --save-dev typescript awesome-typescript-loader source-map-loader 
awesome-typescript-loader可以让Webpack使用TypeScript的标准配置文件 tsconfig.json编译TypeScript代码。  
source-map-loader使用TypeScript输出的sourcemap文件来告诉webpack何时生成 自己的sourcemaps。 这就允许你在调试最终生成的文件时就好像在调试TypeScript源码一样。 

创建一个tsconfig.json 文件
创建一个tslint.json 文件，作为代码规范,
yarn add --dev tslint tslint-react tslint-eslint-rules tslint-config-prettier

增加stylelint
yarn add stylelint-config-standard stylelint-config-rational-order stylelint-config-prettier stylelint-order stylelint-declaration-block-no-ignored-properties --dev

安装husky+lint-staged
yarn add  husky lint-staged --dev
配置package.json在commit（自行决定）的时候执行检查
"lint:ts": "tslint -c tslint.json 'components/**/*.tsx'"
```

 "lint-staged": {
    "**/*.{js,jsx,less}": [
      "prettier --write",
      "git add"
    ],
    "**/*.{js,jsx}": "npm run lint-staged:js",
    "**/*.less": "stylelint --syntax less"
  },
   "husky": {
    "hooks": {
      "pre-commit": "npm run lint-staged"
    }
  }
```

创建文档 docz  
yarn add docz docz-theme-default --dev

支持scss，postcss
yarn add docz-plugin-css --dev

.docz 有缓存，每次启动都重新清缓存
yarn add rimraf --dev

此时启动docz会有报错，Cannot read property 'expirationTime' of undefined， 安装热更新文件
yarn add react-hot-loader@latest --dev

package.json  
```  
"scripts": {
  "start": "rimraf .docz && docz dev",
  "build": "docz build"
},
```  

创建示例：button文件夹，创建一个webpack配置文件,简易版打包
yarn add webpack webpack-cli --dev

增加 .prettierrc
项目根目录添加tslint.json, 这里使用官方推荐配置: 

```  
{
  "extend": [ "tslint-config-prettier"],
}
```  
增加 .prettierignore


TODO: ant的css是单独引入的，如果要以es6的方式去引入，则需要借助[babel-plugin-import](https://github.com/ant-design/babel-plugin-import/blob/master/src/Plugin.js)

写一个gulp用来从 .scss 输出css 安装gulp-sass gulp-css

用gulp分别规范，本地测试流程，打包流程(设置版本号，提交代码，等)

增加测试：

1.安装
npm i jest @types/jest ts-jest -D

增加jest.config.js 文件
```
module.exports = {
  "roots": [
    "<rootDir>/components"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
}
```

2.enzyme
npm i enzyme @types/enzyme enzyme-to-json enzyme-adapter-react-16 @types/enzyme-adapter-react-16  -D

```
module.exports = {
  // OTHER PORTIONS AS MENTIONED BEFORE

  // Setup Enzyme
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "setupTestFrameworkScriptFile": "<rootDir>/src/setupEnzyme.ts",
}
```

```
"test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
```

tips：
手动增加gulp编译antd.less


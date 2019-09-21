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



写一个gulp用来从 .less 输出css 安装gulp-less gulp-css

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

tips：整理文档

至此：开始抄袭ant-tool
1：首先确定以gulpfile.js作为入口打包文件

2：配置生成es，lib文件的 gulp任务，主要执行函数在tool-config.js 中,finalizeDist生成zoe.less,finalizeCompile获取所有组件的css，和生成版本号文件

3：写babelify函数用于编译js文件

4：写compile函数，执行  merge2([less, tsFilesStream, tsd, assets]) less，ts，
d.ts,静态文件的生成

5：dist函数用webpack用于生成dist目录的 .js 文件

6：写index.js解决webpack打包没有成功打包 zoe.css的问题，


使用 babel-plugin-import
```js
// .babelrc or babel-loader option
// 在ant-pro中使用就在webpack中添加
{
  "plugins": [
    ["import", {
      "libraryName": "zoe",
      "libraryDirectory": "es",
      "style": "css" // `style: true` 会加载 less 文件
    }]
  ]
}
```

// babel-plugin-import 会帮助你加载 JS 和 CSS  
```js
import { Button } from 'zoe'  
想当于  
import Button  from 'zoe/Button'  
import Button  from 'zoe/Button/style'  
```

# 开始写组件：

### 查看antd 的目录结构
```
├── color           5：颜色变化，如贝塞尔曲线
│   ├── bezierEasing.less
│   ├── colorPalette.less
│   ├── colors.less
│   └── tinyColor.less
├── core            4：css核心代码
│   ├── base.less
│   ├── iconfont.less
│   ├── index.less
│   ├── motion      4.1：运动函数
│   │   ├── fade.less
│   │   ├── move.less
│   │   ├── other.less
│   │   ├── slide.less
│   │   ├── swing.less
│   │   └── zoom.less
│   └── motion.less
├── index.less
├── index.tsx         2：引入themes,引入core
├── mixins            6：定义一些常用的样式函数，比如clearfix
│   ├── clearfix.less
│   ├── compatibility.less
│   ├── iconfont.less
│   ├── index.less
│   ├── motion.less
│   ├── operation-unit.less
│   ├── reset.less
│   └── size.less
├── themes
│   ├── default.less 
│   └── index.less    3：定义主题变量
├── reset.less 
└── reset.tsx         1：重置浏览器样式
```

查看顺序：  
1：reset重置浏览器样式

2：引入themes，引入core  
  - themes 引入了default.less 为什么不是index.less？可能是因为扩展的原因
  - core 

3：在core中需要对mixins的引用  
4： 创建好文件之后，在写的过程填充需要的样式

## 写组件之前 => 想要什么样的组件？

### 写第一个组件

button 
---
支持主题颜色，透明颜色，支持占据父元素的宽度

input 
---
支持点击搜索，支持一件删除，支持限制最多英文字母，汉字；限制数字


静态组件：
- textarea 与input相同
- password 支持点击查看
- 紧凑模式的输入框



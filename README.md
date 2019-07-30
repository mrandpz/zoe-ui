### React(hooks)16.8.6+TS(3.5.2)+docz(1.2.0)+webpack+gulp+stylelint

#### tslint+eslint+prettier+jest+husky

## 整理一下组件库的构建思路：
生成lib目录文件
生成es文件，可以用于一些类似 electron 本身支持es6

gulp编译所有的tsx文件到对应的目录生成
gulp编译所有的js文件到对应的目录生成
gulp编译所有的scss(less)文件到对应文件生成

webpack只处理js文件，以及根据编译后的css文件，生成一个统一的css文件
webpack打包生成js文件
webpack根据打包后的样式文件"../lib/style/components.less"和index.less;'，生成一个 name.css


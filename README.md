# vue-element-ui-scaffold-webpack4
本项目为vue下使用了element-ui并基于webpack4构建的多页面、多环境方案脚手架项目。

[项目效果预览](https://hzsrc-vue-webpack4-elementui.netlify.com/)

[master分支](https://github.com/hzsrc/vue-element-ui-scaffold-webpack4.git)基于vue-cli@2，如需@vue/cli版本，请切换到 [cli3分支](https://github.com/hzsrc/vue-element-ui-scaffold-webpack4/tree/cli3) (cli3分支尚待完善，仅供参考，不建议直接用).

## 1. 安装
```
git clone https://github.com/hzsrc/vue-element-ui-scaffold-webpack4.git
cd vue-element-ui-scaffold-webpack4
npm install
```

## 2. 特性
### 基于webpack4 + babel@7 构建
更快的构建速度，更小的打包文件体积。

### 多页面实现
两种方式，自动输出html页面文件（html-webpack-plugin实现）：
*  在src/pages目录下添加任意js文件。js文件作为webpack入口；html页面模板是public/index.html，页面的文件名为js的文件名。
*  在src/pages目录下建立任意文件夹，包含entry.js、template.html两个文件。entry.js作为webpack入口；html页面模板是template.html，页面的文件名为建立的文件夹名。

### 自动用svg生成iconfont字体图标，支持webpack热重载
开发时在src/iconfont/svgs目录下，修改或添加、删除svg文件，可自动生成字体图标（支持ttf,woff2,woff,eot,svg）及配套的css样式、html预览；同时热重载立即可以看到效果。
也可npm run build-font手动生成这些文件。
无需再手动去icomoon.io或iconfont.cn生成和修改字体图标、css、图标预览了。
基于[webpack-iconfont-plugin-nodejs](https://github.com/hzsrc/webpack-iconfont-plugin-nodejs)实现。

### mock数据实现
项目可采用[dynamic-mocker](https://github.com/hzsrc/dynamic-mocker)作为后端接口的数据模拟。
模拟数据位于mock文件夹下，采用js文件实现，易于理解且方便灵活。

启用方法：
1、npm run dev默认会同时启动mock服务。
2、单独运行：npm run mock

配置文件：
1、config/serverMap.js中的接口服务地址为：base: '"//localhost:8085"'
2、mock/mock-config.js文件配置mock各种参数。

### element-ui按需加载，主题色全局切换
css按需加载的来源直接指向element-ui的scss文件，而不是预编译的css文件。通过join-file-content-plugin插件在编译时将src/assets/css/element-theme/theme-changed.scss文件 附加到element-ui主题变量文件element-theme-chalk/src/common/var.scss之前，实现了在修改scss变量后即可立马查看效果，无需预先编译element-ui的scss文件为css文件。同时可以在项目任意地方引用element-ui的scss变量。

### 运行时动态调整主题色（含自写的主题样式）
利用[webpack-theme-color-replacer](https://github.com/hzsrc/webpack-theme-color-replacer)插件，在webpack构建时提取css中含有主题色的样式规则，生成一个css/theme-colors.css文件。然后在网页运行时，下载这个css文件，动态替换其中的颜色为自定义主题色。由于只提取了颜色相关的css，故速度比下载element-ui整个css要快很多。而且不仅仅是element-ui的样式，项目中的自写样式的主题色也可以一并替换掉。

### 源码映射
发布代码时生成源码映射文件到统一的源码映射文件夹，并在测试环境自动映射。生产环境为了代码安全，不进行自动映射，如需调试支持chrome通过url手动映射源码。
根据安全要求，这个源码映射文件夹名是只有开发者知道的文件夹名。或采是用动态加密算法生成此文件夹名。或者将这些源码映射文件放到需要进行登录验证的网站目录下。目录的名称请根据需要自行在`config/index.js`文件的`getSourceMapPath`函数中修改。
这样既可在出现bug需要进行线上调试时，快速手动添加源码映射来方便调试，又避免了源码泄露。

### 响应式布局
采用vw+rem的简洁方案实现响应式布局。
使用postcss-pxtorem插件自动将css中的单位由px转化为rem，开发时仍使用px做为css长度单位。1rem = 100px，调试时换算方便。pc和移动端通用（移动端最好将element-ui换为其他UI框架）。

### 浏览器兼容性
兼容IE10及以上、Chrome、Firefox、Safari、QQ、360、2345等浏览器。如果需要改为移动端，请修改.browsersrc为移动端版本。

## 3. 命令说明
### 本地开发
```
npm run dev
```
本地开发调试。使用config/serverMap.js中的dev配置的后端接口服务地址。

### 发布测试环境
```
npm run build-test
```
用于测试环境部署。js带源码映射，css无源码映射。使用config/serverMap.js中的test配置的接口服务地址。

### 发布生产环境
```
npm run build
```
用于生产环境部署。使用config/serverMap.js中的prod配置的接口服务地址。

### 发布演示环境
```
npm run build-demo
```
配置同生产环境，仅接口服务地址不同，使用config/serverMap.js中的demo配置的接口服务地址。

### 发布开发环境
```
npm run build-dev
```
用于发布部署到开发环境服务器，适用于需要发布到服务器才能调试的情形。使用config/serverMap.js中的dev配置的接口服务地址。

### 启用mock数据发布
```
npm run build-preview
```
会启用静态mock数据，无需后端服务，使用mock数据来模拟ajax调用（前提是对应的api接口写了mock数据）。
等同于`npm run build --preview && npm run play-dist`。

### 查看dist目录运行结果
```
npm run play-dist
```
以dist目录为根目录，启动一个本地静态http服务，用于查看发布后dist目录的运行结果。

### 启动mock服务
```
npm run mock
```
当后端接口服务尚未完成时，可用于模拟后端接口数据调试前端功能。


### 代理到80端口或443端口
```
npm run proxy80
```
通过将现有端口（80xx端口）代理到80端口或443端口，可实现访问时隐藏端口，也可实现https访问。结合系统hosts配置127.0.0.1为指定的域名，可直接用域名访问本地调试页面，用于调试一些必须使用域名访问的场景（例如调试微信，详见：https://www.cnblogs.com/hz-blog/p/wechat-local-debug-domain.html）。



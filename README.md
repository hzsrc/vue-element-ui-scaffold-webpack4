# vue-element-ui-scaffold-webpack4
本项目为vue下使用了element-ui并基于webpack4.5构建的多页面、多环境方案脚手架项目


#安装
>
```
git clone https://github.com/hzsrc/vue-element-ui-scaffold-webpack4.git
cd vue-element-ui-scaffold-webpack4
npm install
```



#命令说明
>##本地开发
```
npm run dev
```
本地开发调试。自动使用config\dev.env.js配置的后端接口服务地址。


>
##发布生产环境
```
npm run build
```
用于生产环境部署。自动使用config\prod.env.js配置的接口服务地址。


>
##发布测试环境
```
npm run build-test
```
用于测试环境部署。js带源码映射，css无源码映射。自动使用config\test.env.js配置的接口服务地址。



>
##发布开发环境
```
npm run build-dev
```
用于发布带有源码映射的程序，部署到开发环境服务器上，供远程或移动端调试代码。适用于需要发布到服务器才能调试的情形。自动使用config\dev.env.js配置的接口服务地址。


>
##启动mock服务
```
npm run mock
```
当后端服务尚未完成时，可用于模拟后端接口数据调试前端功能。



#项目说明
>
##基于webpack4.5构建
更快的构建速度，更小的目标文件下载体积。


>
##多页面实现
在src/pages目录下添加的js文件，可自动发布为一个html页面。html模板是html.tpl.html。


>
##mock数据实现
项目可采用[dyn-mocker](https://github.com/hzsrc/dyn-mocker)作为后端接口的数据模拟。
模拟数据位于mock文件夹下，采用js文件实现，易于理解且方便灵活。
启用方法：运行
```
npm run mock
```
命令开启mock服务，同时配置config\prod.env.js中的接口服务地址为：API_SERVER_DEV: '"//localhost:8085"'

>
##element-ui主题自动编译
提取并监视了主题文件src\assets\css\element-theme\theme-element-variables.scss，修改即可立马查看效果，无需重新编译element-ui的css文件。


# vue-element-ui-scaffold-webpack4
本项目为vue下使用了element-ui并基于webpack4.5构建的多页面、多环境方案脚手架项目


# 1. 安装
```
git clone https://github.com/hzsrc/vue-element-ui-scaffold-webpack4.git
cd vue-element-ui-scaffold-webpack4
npm install
```



# 2. 命令说明
## 本地开发
```
npm run dev
```
本地开发调试。自动使用config\dev.env.js配置的后端接口服务地址。


## 发布生产环境
```
npm run build
```
用于生产环境部署。自动使用config\prod.env.js配置的接口服务地址。


## 发布测试环境
```
npm run build-test
```
用于测试环境部署。js带源码映射，css无源码映射。自动使用config\test.env.js配置的接口服务地址。



## 发布开发环境
```
npm run build-dev
```
用于发布带有源码映射的程序，部署到开发环境服务器上，供远程或移动端调试代码。适用于需要发布到服务器才能调试的情形。自动使用config\dev.env.js配置的接口服务地址。


## 启动mock服务
```
npm run mock
```
当后端服务尚未完成时，可用于模拟后端接口数据调试前端功能。



# 3. 项目说明
## 基于webpack4.5构建
更快的构建速度，更小的目标文件下载体积。


## 多页面实现
在src/pages目录下添加的js文件，可自动发布为一个html页面。html模板是html.tpl.html。


## mock数据实现
项目可采用[dynamic-mocker](https://github.com/hzsrc/dynamic-mocker)作为后端接口的数据模拟。
模拟数据位于mock文件夹下，采用js文件实现，易于理解且方便灵活。

启用方法：  
1、npm run dev默认会同时启动mock服务。  
2、单独运行：npm run mock

配置文件：  
1、config/prod.env.js中的接口服务地址为：API_SERVER_DEV: '"//localhost:8085"'  
2、mock/mock-config.js文件配置mock各种参数。

## element-ui主题自动按需加载编译
按需加载源直接指向element-ui的scss文件。提取了element-ui主题变量文件到src\assets\css\element-theme\theme-element-variables.scss，修改scss变量即可立马查看效果，无需预先编译element-ui的scss文件为css文件。

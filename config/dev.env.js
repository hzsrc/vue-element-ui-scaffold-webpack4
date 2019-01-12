var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',

    //配置开发环境的接口地址


    NeedSrcMap: true, //需要源码映射
})

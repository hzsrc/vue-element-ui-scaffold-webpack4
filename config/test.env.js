//For 单元测试和测试环境的打包发布
var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
    NODE_ENV: '"production"',
    NeedSrcMap: true, //需要源码映射
})

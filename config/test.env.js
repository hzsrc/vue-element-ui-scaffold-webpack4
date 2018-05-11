//For 单元测试和测试环境的打包发布
var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
    NODE_ENV: '"testing"',

    API_SERVER: '"//aaa-service.test.xxx.com"',
    API_NODE_SERVER: '"//bbb-node-service.test.xxx.com"',

    NeedSrcMap: true, //需要源码映射
})

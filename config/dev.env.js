var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',

    //配置开发环境的接口地址
    //API_SERVER_DEV: '"//localhost:8085"',
    API_SERVER_DEV: '"//eis-service.dev61.xxx.com"', //本地开发调试用的服务器地址，修改不会影响发布
    API_NODE_SERVER_DEV: '"//127.0.0.1:7001"', //本地开发调试用的服务器地址，修改不会影响发布

    API_SERVER: '"//eis-service.dev61.xxx.com"', //服务器上需要build开发环境，此为发布开发环境用的服务地址
    API_NODE_SERVER: '"//eis-node-service.dev61.xxx.com"',

    NeedSrcMap: true, //需要源码映射
})

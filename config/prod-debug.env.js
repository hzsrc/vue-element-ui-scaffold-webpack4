//生产环境debug
module.exports = {
    NODE_ENV: '"production"',

    //配置生产环境的接口地址
    base: '"//aaa-service.xxx.com"',
    node_api: '"//bbb-node-service.xxx.com"',

    NeedSrcMap: true, //需要源码映射
}

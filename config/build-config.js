var configs = {
    //本地开发环境的接口地址(npm run dev)
    dev_local: {
        NeedSrcMap: true, //需要源码映射
    },
    dev: {
        NeedSrcMap: true, //需要源码映射

    },
    //测试环境的接口地址
    test: {
        base: '"//aaa-service-test.xxx.com"',
        node_api: '"//bbb-node-service-test.xxx.com"',
    },
    //演示环境的接口地址
    demo: {
        base: '//aaa-demo.xxx.com',
        node_api: '//bbb-node-service-demo.xxx.com'
    },
    //生产环境的接口地址
    prod: {
        base: '"//aaa.xxx.com"',
        node_api: '"//bbb-node-service.xxx.com"',
    }
}

var config = configs[process.env.ENV_CONFIG]
export default config

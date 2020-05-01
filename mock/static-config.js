// 将一个目录作为http服务启动

const config = {
    mockEnabled: false, // 设置mock失效，使用proxy功能
    proxyTarget: false, // 设置proxy失效，使用static功能
    static: {
        index: 'index.html',
        path: '../dist'
    },
    isHttps: false, // 是否https
    port: 8060 // 端口
}
module.exports = config

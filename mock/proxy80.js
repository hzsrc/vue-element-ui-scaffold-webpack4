// 实现将本地80端口代理到9998端口，配合hosts配置，用于调试微信（因为微信必须使用域名）

const config = {
    mockEnabled: false,
    proxyTarget: function (urlPart) {
        return 'http://localhost:8090'
    },
    isHttps: false, // 是否https
    port: 80 // 端口
}
module.exports = config

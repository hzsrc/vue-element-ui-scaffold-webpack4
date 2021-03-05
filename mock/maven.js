// 实现maven仓库转发

const config = {
    mockEnabled: false,
    proxyTarget: function (urlPart) {
        return 'https://maven.aliyun.com/repository/public'
    },
    isHttps: false, // 是否https
    port: 8099 // 端口
}
module.exports = config

const config = {
    mockEnabled: true,
    mockPath: ['root', 'root-old'], //模拟文件根目录
    proxyTarget: 'http://aaa.bbb.com', //后台接口服务地址（代理目标），为空表示不代理
    isHttps: false, //是否https
    port: 8085, //端口
    checkPath: function (urlPath) { //urlPath校验函数，返回true表示需要进行mock处理，为false直接走代理
        return true
    },
    beforeResponse: function (respData, req) { //数据返回前的回调钩子，respData包含status、headers、body属性
        respData.headers['access-control-allow-origin'] = req.headers.origin || req.headers.Origin || '';
        respData.headers['access-control-allow-credentials'] = 'true';
        respData.headers['access-control-allow-headers'] = req.headers['access-control-request-headers'] || req.headers['Access-Control-Request-Headers'] || '';
        respData.headers['access-control-max-age'] = '6000';
        respData.headers['access-control-allow-methods'] = 'PUT,POST,GET,DELETE,PATCH,OPTIONS';

        respData.headers.P3P = 'CP="CAO PSA OUR"';
    },
    mapFile(pathname, req) {
        return pathname
    },
    // genClientJs: '../src/js/mockClient.js', // 生成mockClient.js
    samePreview: false, // true - mock预览时disabled开关也生效（默认false,预览时忽略所有开关）
    logData: true, // mock预览时打印模拟数据
}
module.exports = config;

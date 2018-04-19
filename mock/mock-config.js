const config = {
    mockEnabled: true,
    mockPath: ['mock/root', 'mock/root-old'], //模拟文件根目录
    proxyTarget: 'http://eis-service.dev61.ums86.com', //后台接口服务地址（代理目标），为空表示不代理
    isHttps: false, //是否https
    port: 8085, //端口
    checkPath: function (urlPath) { //urlPath校验函数，返回true表示需要进行mock处理，为false直接走代理
        return true
    },
    beforeResponse: function (respData, req) { //数据返回前的回调钩子，respData包含status、headers、body属性
        respData.headers['Access-Control-Allow-Origin'] = req.headers['origin'] || req.headers['Origin'];
        respData.headers['Access-Control-Allow-Credentials'] = 'true';
        respData.headers['Access-Control-Max-Age'] = '600';
        respData.headers['Access-Control-Allow-Headers'] = 'Content-Type,Content-Length,Authorization,Access,X-Requested-With,yxt-token';
        //respData.headers["Access-Control-Allow-Methods"] = "PUT,POST,GET,DELETE,PATCH,OPTIONS";

        respData.headers['P3P'] = 'CP="CAO PSA OUR"';
        //CP="ALL IND DSP COR ADM CONo CUR CUSo IVAo IVDo PSA PSD TAI TELo OUR SAMo CNT COM INT NAV ONL PHY PRE PUR UNI"
    }
}
module.exports = config;

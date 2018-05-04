/*
自定义的axios 第3个参数（config）字段意义：
{
showError:   true表示ajax出错时，弹出alert框提示。默认不弹出
noToken：    true表示请求时，不在header中带入token。默认带入
maskOptions:  表示请求时显示遮罩层的选项。默认{body: true}
}

*/

import axios from 'axios'
import appConfig from '../../../config/app-config'
import CONST from './CONST'
import tokenUtil from './utils/tokenUtil'
import msgDlg from './utils/msgDialog'
import loading from './loading'

//for el-upload
axios.getYxtHeaders = function () {
    var r = {}
    r[CONST.TOKEN_HEADER] = tokenUtil.get()
    return r
}

// 超时时间
// axios.defaults.timeout = 8000
axios.defaults.baseURL = appConfig.API_SERVER
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true
axios.defaults.timeout = 20000 //20秒，超时报错

axios.defaults.transformRequest = function (request) {
    return JSON.stringify(request)
}

const isDev = process.env.NODE_ENV === 'development';
const CoveredErrMsg = '服务器开小差啦，请稍后重试！'
// http请求拦截器
axios.interceptors.request.use(function (config) {
    if (!config.noToken) {
        config.headers[CONST.TOKEN_HEADER] = tokenUtil.get()
    }
    if (config.isToNode) {
        config.headers[CONST.CHANNEL_HEADER] = tokenUtil.getChannel()
    }
    //遮罩层
    loading.show(config.maskOptions)

    return config
}, fail)

// http响应拦截器
axios.interceptors.response.use(function (res) {
    loading.close(res.config.maskOptions)
    var data = res.data || {};
    var retCode = Number(data.returnCode);
    if (retCode == 110 || retCode == 111) { // token失败
        return doLogin()
    }
    else if (retCode != 0) { //错误
        //100以下是系统错误，10000以上是其他中心系统错误。其他的是业务错误
        if (!isDev && (retCode <= 100 || retCode >= 10000) || !data.msg) {
            console.error(data)
            data.msg = CoveredErrMsg
        }
        showErr(res.config, data.msg);
        return Promise.reject(data)
    }
    return data
}, fail);

function doLogin() {
    return new Promise((resolve, reject) => {
        msgDlg.alert('登录已过期，请重新登录', '提示', {
            callback: action => {
                //if (action == 'cancel')
                //    reject()
                //else {
                var url = appConfig.LOGIN_PATH
                var path = location.href.match(/https?:\/\/[^\/]+(\/.+)/i)[1]
                if (path && path !== '/main.html#/') {
                    url += url.indexOf('?') > -1 ? '&' : '?'
                    url += 'redirectUrl=' + encodeURIComponent(path)
                }
                location.href = url
                resolve()
                //}
            }
        })
    });
}

function fail(error) {
    if (error.config) loading.close(error.config.maskOptions);
    if (!error.msg) error.msg = CoveredErrMsg;
    showErr(error.config, CoveredErrMsg);
    return Promise.reject(error)
}

function showErr(config, msg) {
    if (config && config.showError === 'toast')
        msgDlg.toast.error(msg);
    else if (config && config.showError)
        msgDlg.alert(msg, {type: 'error'});
    else if (isDev)
        msgDlg.toast.error(msg + ' [debug only]')
}

export default axios

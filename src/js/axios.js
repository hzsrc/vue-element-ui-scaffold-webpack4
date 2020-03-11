/*
自定义的axios 第3个参数（config）字段意义：
{
showError:   默认弹出toast框提示。showError='alert'表示弹出alert框。showError===false默认不弹出
maskOptions:  表示请求时显示遮罩层的选项。默认{body: true}
}

*/

import axios from 'axios'
import appConfig from '../../config/app-config'
import tokenUtil from './utils/tokenUtil'
import msgDlg from './utils/msgDialog'
import loading from './utils/loading'

const serverMap = require('../../config/serverMap.js')
// 超时时间
// axios.defaults.timeout = 8000
axios.defaults.baseURL = serverMap.base
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true
axios.defaults.timeout = 20000 //20秒，超时报错

axios.defaults.transformRequest = function (request) {
    return JSON.stringify(request)
}

const ShowMsg = '系统异常，请稍后重试～'
// http请求拦截器
axios.interceptors.request.use(function (config) {
    config.headers.token = tokenUtil.token
    //将 {host}/xxx/yyy 的url替换为对应服务的前缀
    config.url = config.url.replace(/^\{(\w+)\}/, (m, $1) => serverMap[$1] || '');

    //遮罩层
    loading.show(config.maskOptions)

    return config
}, fail)

// 0-成功，1-session超时，2-系统错误（提示ShowMsg），其他：提示错误
const ResStatus = {
    OK: 0,
    SessionFail: 1,
    SysErr: 2,
}
// http响应拦截器
axios.interceptors.response.use(function (res) {
    loading.close(res.config.maskOptions)
    const data = res.data || {};
    const status = Number(data.status);
    if (status === ResStatus.SessionFail) {
        return doLogin()
    } else if (status !== ResStatus.OK) { //错误
        console.error(data)
        if (status === ResStatus.SysErr || !data.msg) {
            data.msg = ShowMsg
        }
        showErr(res.config, data.msg);
        return Promise.reject(data)
    }
    return data
}, fail);

function doLogin() {
    return new Promise((resolve, reject) => {
        msgDlg.alert('尚未登录或登录超时，请重新登录', '提示', {
            callback: action => {
                if (action === 'cancel')
                    reject(new Error())
                else {
                    let url = appConfig.LOGIN_PATH
                    const path = location.href.match(/https?:\/\/[^\/]+(\/.+)/i)[1]
                    if (path && path !== '/main.html#/') {
                        url += url.indexOf('?') > -1 ? '&' : '?'
                        url += 'redirectUrl=' + encodeURIComponent(path)
                    }
                    location.href = url
                    resolve()
                }
            }
        })
    });
}

function fail(error) {
    if (error.config) loading.close(error.config.maskOptions);
    if (!error.msg) error.msg = ShowMsg;
    showErr(error.config, ShowMsg);
    console.error(error)
    return Promise.reject(error)
}

function showErr(config, errmsg) {
    if (config && config.showError === 'alert')
        msgDlg.alert(errmsg, { type: 'error' });
    else
        msgDlg.toast.error(errmsg);
}

export default axios

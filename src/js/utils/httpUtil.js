import axios from '../axios';
import appConfig from '../../../config/app-config'

function parseUrl(url, config) {
    return !config || !config.isToNode ? url : (appConfig.API_NODE_SERVER + url)
}

export default {
    http: axios,
    post(url, pars, config) {
        return axios.post(parseUrl(url, config), pars, config)
    },
    get(url, pars, config) {
        if (pars) {
            pars.f_rnd = +new Date();  // 防止火狐缓存GET请求
            url += url.indexOf('?') > -1 ? '&' : '?';
            url += Object.keys(pars).map(key => key + '=' + encodeURIComponent(pars[key])).join('&');
        }
        return axios.get(parseUrl(url, config), config)
    },
}
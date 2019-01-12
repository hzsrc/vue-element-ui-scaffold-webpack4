import axios from '../axios';

export default {
    http: axios,
    post(url, pars, config) {
        return axios.post(url, pars, config)
    },
    get(url, pars, config) {
        if (pars) {
            pars.f_rnd = +new Date();  // 防止火狐缓存GET请求
            url += url.indexOf('?') > -1 ? '&' : '?';
            url += Object.keys(pars).map(key => key + '=' + encodeURIComponent(pars[key])).join('&');
        }
        return axios.get(url, config)
    },
}
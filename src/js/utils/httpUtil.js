import axios from '../axios';

var httpUtil = {
    axios,
    get(url, pars, config) {
        if (pars) {
            pars.f_rnd = +new Date(); //防止火狐缓存GET请求
            url += url.indexOf('?') > -1 ? '&' : '?';
            url += Object.keys(pars).map(key => key + '=' + encodeURIComponent(pars[key])).join('&');
        }
        return axios.get(url, config)
    },
};
['post', 'put', 'delete'].map(method => {
    httpUtil[method] = (url, pars, config) => {
        return axios[method](url, pars, config)
    }
})

export default httpUtil;

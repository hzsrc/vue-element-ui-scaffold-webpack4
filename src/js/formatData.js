const formatData = {
    //日期格式化
    formatDate(date0, fmt) {
        if (!date0) return ''
        if (typeof date0 === 'string') {
            date0 = date0.replace(/(:\d+)\.\d+$/, '$1'); //IE 不能转换2017-12-28 10:43:02.0
        }
        let date = new Date(date0);
        if (isNaN(date.getDay())) return date0 || ''
        if (!fmt) fmt = 'yyyy-MM-dd HH:mm:ss';
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        };
        o['H+'] = o['h+'];
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + '';
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : formatData.padLeftZero(str));
            }
        }
        return fmt;
    },
    padLeftZero(str) {
        return ('00' + str).substr(str.length);
    },
    // 小数点
    fixNumber(v) {
        return Number(v).toFixed(3);
    },
    //将手机号中间变成****
    mdnHidden(mdn) {
        return mdn.replace(/(\d{3})\d{4}(\d+)/, '$1****$2')
    }
};

export default formatData;
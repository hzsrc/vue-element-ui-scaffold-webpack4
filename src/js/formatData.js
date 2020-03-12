const formatData = {
    //日期格式化
    formatDate(date0, fmt) {
        if (!date0) return ''
        if (typeof date0 === 'string') {
            date0 = date0.replace(/(:\d+)\.\d+$/, '$1'); //IE 不能转换2017-12-28 10:43:02.0
        }
        const date = new Date(date0);
        if (isNaN(date.getDay())) return date0 || ''
        if (!fmt) fmt = 'yyyy-MM-dd HH:mm:ss';
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        const o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        };
        o['H+'] = o['h+'];
        for (const k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                const str = o[k] + '';
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : formatData.padLeftZero(str));
            }
        }
        return fmt;
    },
    padLeftZero(str) {
        return ('00' + str).substr(str.length);
    },
};

export default formatData;

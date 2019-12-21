/*
输入数据校验组件
*/
export default {
    //检测长度是否在min和max之间（包含min、max）
    checkLen(str, min, max) {
        var len = (str || '').length;
        var ret;
        if (parseInt(min) > 0) ret = len >= min;
        if (ret && parseInt(max) > 0) ret = len <= max;
        return ret;
    },
    checkMobile(rule, value, callback) {
        if (!value) {
            return callback(new Error('请输入手机号码'));
        } else if (!(/^1[345678]\d{9}$/.test(value))) {
            return callback(new Error('手机号格式不正确'));
        } else {
            return callback();
        }
    },
    checkCardNumber(rule, value, callback) {
        var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if (!value) {
            return callback();
        } else if (!(reg.test(value))) {
            return callback(new Error('请输入正确的公民身份证号'));
        } else {
            return callback();
        }
    },
    isValidEmail(value) {
        return /^[\w\.\-]*\w@[\w\.\-]+\.[\w\.\-]+$/.test(value)
    }
}

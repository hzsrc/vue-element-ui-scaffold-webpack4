/*
输入数据校验组件
*/
export default {
    checkMobile(rule, value, callback) {
        if (!value) {
            return callback(new Error('请输入手机号码'));
        } else if (!(/^1[345678]\d{9}$/.test(value))) {
            return callback(new Error('手机号格式不正确'));
        } else {
            return callback();
        }
    },
    checkIdCard(rule, value, callback) {
        const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if (!value) {
            return callback();
        } else if (!(reg.test(value))) {
            return callback(new Error('请输入正确的公民身份证号'));
        } else {
            return callback();
        }
    },
    checkEmail(value) {
        return /^[\w\.\-]*\w@[\w\.\-]+\.[\w\.\-]+$/.test(value)
    }
}

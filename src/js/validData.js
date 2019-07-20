import $x from './$x.js';

/*
输入数据校验组件
*/
export default {
    //检测是否为手机号码
    isMdn(str) {
        return (str || '').match(/^1\d{10}$/)
    },
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
    checkValiCode(str) {
        return this.checkLen(str, $x.CONST.SMS_VALI_CODE_LENGTH, $x.CONST.SMS_VALI_CODE_LENGTH)
    },
    //获取密码强度和提示信息
    getPasswordType(pwd) {
        var strength = 0;
        var matchLen = 0;
        var lower = pwd.match(/[a-z]/g)
        var upper = pwd.match(/[A-Z]/g)
        var number = pwd.match(/\d/g)
        var symbol = pwd.match(/[!-/:-@\[-`{-~]/g); //英文符号
        if (lower) {
            strength += 1;
            matchLen += lower.length;
        }
        if (upper) {
            strength += 1;
            matchLen += upper.length;
        }
        if (number) {
            strength += 1;
            matchLen += number.length;
        }
        if (symbol) {
            strength += 1;
            matchLen += symbol.length;
        }

        return {
            lengthOk: this.checkLen(pwd, 6, 16), // '密码需要为6 ~ 16位';
            charsOk: pwd && pwd.length === matchLen, //'只能包含大写字母、小写字母、数字或标点符号（除空格）'
            matchOk: strength >= 2,
            matchCount: strength, //'大写字母、小写字母、数字或标点符号至少包含2种';
            empty: !pwd,
            isOk() {
                return this.lengthOk && this.charsOk && this.matchOk
            }
        }
    },

    //opts: {allowGif: 是否允许gif图片, sizeM: 图片最大M数}。 默认不允许gif，大小2M
    isValidPic(file, opts = {}) {
        let isImg = /\.(jpg|jpeg|png)$/i.test(file.name);
        if (!isImg && opts.allowGif) {
            isImg = /\.gif$/i.test(file.name)
        }
        const sizeM = opts.sizeM || 2;
        const isLt2M = file.size / 1024 / 1024 < sizeM;

        if (!isImg) {
            let format = 'JPG/PNG';
            if (opts.allowGif) format += '/GIF';
            $x.toast.error($x.msg.UPLOADTYPE.replace('{format}', format));
        }
        if (!isLt2M) {
            $x.toast.error($x.msg.UPLOADSIZE.replace('{sizeM}', sizeM));
        }

        return isImg && isLt2M;
    },
    isValidEmail(value) {
        return /^[\w\.\-]*\w@[\w\.\-]+\.[\w\.\-]+$/.test(value)
    }
}

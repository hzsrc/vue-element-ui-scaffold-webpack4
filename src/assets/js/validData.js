import $x from './$x.js';

/*
输入数据校验组件
*/
export default {
    //检测是否为手机号码
    isMdn (str) {
        return (str || '').match(/^1\d{10}$/)
    },
    //检测长度是否在min和max之间（包含min、max）
    checkLen (str, min, max) {
        var len = (str || '').length;
        var ret;
        if (parseInt(min) > 0) ret = len >= min;
        if (ret && parseInt(max) > 0) ret = len <= max;
        return ret;
    },
    checkValiCode (str) {
        return this.checkLen(str, $x.CONST.SMS_VALI_CODE_LENGTH, $x.CONST.SMS_VALI_CODE_LENGTH)
    },
    //根据数组弹出提示信息
    // checkMsg (arrMsg) {
    //     if (arrMsg.length > 0) {
    //         var option = {
    //             message: arrMsg.join('； '),
    //             type: 'error',
    //             duration: 6000
    //         }
    //         $x.toast(option);
    //         return false;
    //     }
    //     return true
    // },
    //获取密码强度和提示信息
    getPasswordType (pwd) {
        var strength = 0;
        var matchLen = 0;
        var lower = pwd.match(/[a-z]/g)
        var upper = pwd.match(/[A-Z]/g)
        var number = pwd.match(/\d/g)
        var symbol = pwd.match(/[!-/:-@\[-`{-~]/g); //英文符号
        if (lower) { strength += 1, matchLen += lower.length; }
        if (upper) { strength += 1, matchLen += upper.length; }
        if (number) { strength += 1, matchLen += number.length; }
        if (symbol) { strength += 1, matchLen += symbol.length; }

        return {
            lengthOk: this.checkLen(pwd, 6, 16),    // '密码需要为6 ~ 16位';
            charsOk: pwd && pwd.length === matchLen,         //'只能包含大写字母、小写字母、数字或标点符号（除空格）'
            matchOk: strength >= 2,
            matchCount: strength,                    //'大写字母、小写字母、数字或标点符号至少包含2种';
            empty: !pwd,
            isOk () {
                return this.lengthOk && this.charsOk && this.matchOk
            }
        }
    },

    //opts: {allowGif: 是否允许gif图片, sizeM: 图片最大M数}。 默认不允许gif，大小2M
    isValidPic (file, opts = {}) {
        let isImg = /\.(jpg|jpeg|png)$/i.test(file.name);
        if (!isImg && opts.allowGif) {
            isImg = /\.gif$/i.test(file.name)
        }
        let sizeM = opts.sizeM || 2;
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
    isValidEmail (value) {
        var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/

        if (!reg.test(value)) {
            return false
        }
        else {
            return true
        }
    }
}

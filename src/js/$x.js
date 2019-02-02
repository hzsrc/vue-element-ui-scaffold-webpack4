import CONST from './CONST.js'
import storageUtil from './utils/storageUtil.js'
import platform from './utils/platform.js'
import tokenUtil from './utils/tokenUtil.js'
import domUtil from './utils/domUtil.js'
import msgDialog from './utils/msgDialog.js'
import httpUtil from './utils/httpUtil.js'
import frequence from './utils/frequence';

const util = {
    clone(obj, deep) {
        if (!obj) return obj;
        if (deep) return JSON.parse(JSON.stringify(obj));
        return Array.isArray(obj) ? obj.slice(0) : Object.assign({}, obj)
    },
    noop() {}
}

var mixed = {
    plat: platInfo.getPlat(),
    ...util,
    ...platform,
    ...frequence,
    ...msgDialog,
    ...httpUtil,
    storageUtil,
    CONST,
    tokenUtil,
}

var $x = domUtil

Object.assign($x, mixed)

export default $x

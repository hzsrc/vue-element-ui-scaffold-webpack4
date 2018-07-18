import CONST from './CONST.js'
import storageUtil from './utils/storageUtil.js'
import frequence from './frequence.js'
import platInfo from './utils/platform.js'
import domUtil from './utils/domUtil.js'
import urlClick from './utils/urlClick.js'
import msgDialog from './utils/msgDialog.js'
import httpUtil from './utils/httpUtil.js'

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
    ...frequence,
    ...msgDialog,
    ...urlClick,
    ...httpUtil,
    storageUtil,
    CONST,
    ...domUtil,
}

var $x = domUtil

Object.assign($x, mixed)

export default $x
import config from '../../../config/app-config.js'
import CONST from './CONST.js'
import msg from './msg.js'
import storageUtil from './utils/storageUtil.js'
import frequence from './utils/frequence.js'
import platInfo from './utils/platInfo.js'
import tokenUtil from './utils/tokenUtil.js'
import domUtil from './utils/domUtil.js'
import loading from './loading.js'
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
    config,
    ...httpUtil,
    storageUtil,
    CONST,
    msg,
    tokenUtil,
    ...domUtil,
    loading
}

var $x = domUtil

Object.assign($x, mixed)

export default $x
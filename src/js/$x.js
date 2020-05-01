import StorageUtil from './utils/storageUtil.js'
import tokenUtil from './utils/tokenUtil.js'
import domUtil from './utils/domUtil.js'
import msgDialog from './utils/msgDialog.js'
import httpUtil from './utils/httpUtil.js'

const util = {
    clone(obj, deep) {
        if (!obj) return obj;
        if (deep) return JSON.parse(JSON.stringify(obj));
        return Array.isArray(obj) ? obj.slice(0) : Object.assign({}, obj)
    },
    noop() {
    }
}

const mixed = {
    ...util,
    ...msgDialog,
    ...httpUtil,
    storageUtil: new StorageUtil(),
    tokenUtil,
}

Object.assign(domUtil, mixed)

export default domUtil

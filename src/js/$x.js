import StorageUtil from './utils/storageUtil.js'
import userInfo from './utils/userInfo.js'
import domUtil from './utils/domUtil.js'
import msgDialog from './utils/msgDialog.js'
import httpUtil from './utils/httpUtil.js'
//日期格式化
import formatDate from 'date-any/formatDate.js'

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
    storage: new StorageUtil(),
    userInfo,
    formatDate
}

Object.assign(domUtil, mixed)

export default domUtil

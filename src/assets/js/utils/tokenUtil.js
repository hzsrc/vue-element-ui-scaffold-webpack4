import storageUtil from './storageUtil.js';
import CONST from '../CONST';

export default {
    get() {
        return storageUtil.getSessionObj(CONST.TOKEN_HEADER) || ''
    },
    set(val) {
        storageUtil.setSessionObj(CONST.TOKEN_HEADER, val);
    },
    remove() {
        this.set(undefined);
        this.setAuth(undefined);
    },
    setAuth(val) {
        storageUtil.setSessionObj(CONST.AUTH_INFO, val);
    },
    getAuth() {
        return storageUtil.getSessionObj(CONST.AUTH_INFO);
    },
    getChannel() {
        return storageUtil.getObj(CONST.CHANNEL_HEADER)
    },
    setChannel(val) {
        storageUtil.setObj(CONST.CHANNEL_HEADER, val)
    },
    getCorp() {
        return storageUtil.getObj(CONST.REMEMBER_SP_KEY) || {};
    },
    setCorp(val) {
        // if (val) {
        //     val = {spCode: val.spCode, spId: val.spId, spName: val.spName};
        // }
        storageUtil.setObj(CONST.REMEMBER_SP_KEY, val);
    },
}
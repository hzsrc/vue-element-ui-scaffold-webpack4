'use strict'

class StorageUtil {
    constructor(storage) {
        this.storage = storage || localStorage
        // 缓存
        this.caches = {}
    }

    getObj(name) {
        var r = this.caches[name]
        if (r !== undefined) return r
        try {
            var str = this.storage.getItem(name);
            return str && JSON.parse(str);
        } catch (e) {
            console.warn(e)
        }
    }

    setObj(name, obj) {
        this.caches[name] = obj
        if (obj === undefined) {
            this.storage.removeItem(name);
        } else {
            this.storage.setItem(name, JSON.stringify(obj));
        }
    }
}

export default new StorageUtil()
export { StorageUtil }


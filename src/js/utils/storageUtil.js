'use strict'

//缓存
var caches = {}

function getFrom(storage, name) {
    var r = caches[name]
    if (r !== undefined) return r
    try {
        var str = storage.getItem(name);
        return str && JSON.parse(str);
    } catch (e) {
        console.warn(e)
    }
}

function setTo(storage, name, obj) {
    caches[name] = obj
    if (obj === undefined)
        storage.removeItem(name);
    else
        storage.setItem(name, JSON.stringify(obj));
}

export default {
    getObj(name) {
        return getFrom(localStorage, name)
    },
    setObj(name, obj) {
        setTo(localStorage, name, obj);
    },
    getSessionObj(name) {
        return getFrom(sessionStorage, name);
    },
    setSessionObj(name, obj) {
        setTo(sessionStorage, name, obj);
    },
}
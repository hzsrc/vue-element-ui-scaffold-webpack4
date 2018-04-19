'use strict'
if (![].findIndex) {
    Object.defineProperty(Array.prototype, 'findIndex', {
        enumerable: false,
        get () {
            return function (fn) {
                for (var i = 0; i < this.length; i++) {
                    if (fn(this[i], i)) return i;
                }
                return -1;
            }
        }
    })
}

export default {
    getPlat () {
        return {
            android: false,
            iphone: false,
            isMobile: this.android || this.iphone
        }
    }
};
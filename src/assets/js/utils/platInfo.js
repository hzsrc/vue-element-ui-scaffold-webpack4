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
    });
    Object.defineProperty(Array.prototype, 'find', {
        enumerable: false,
        get () {
            return function (fn) {
                return this[this.findIndex(fn)]
            }
        }
    });
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
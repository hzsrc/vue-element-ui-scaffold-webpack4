export default {
    //频率控制 函数连续调用时，fn 执行频率限定为 1次/waitMs。立即执行
    throttle: function throttle (waitMs, fn) {
        let lastRun = 0;
        return function () {
            const now = +new Date();
            if (now - lastRun > waitMs) {
                lastRun = now;
                fn.apply(null, arguments);
            }
        }
    },
    //空闲控制 返回函数连续调用时，空闲时间必须大于或等于 waitMs，fn 才会执行。延迟执行
    debounce: function debounce (waitMs, fn) {
        let lastCall, args, timeout;
        return function r () {
            lastCall = +new Date();
            args = arguments;
            if (!timeout) {
                timeout = setTimeout(later, waitMs);
            }
        };

        function later () {
            const past = +new Date() - lastCall;
            if (past > waitMs) {
                timeout = null;
                fn.apply(null, args)
            }
            else {
                timeout = setTimeout(later, waitMs - past + 1)
            }
        }
    }
};
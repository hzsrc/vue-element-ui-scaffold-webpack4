/*
dom操作类：主要用来绑定事件
*/
function QueryEls(selector, context) {
    if (!selector)
        this.els = [];
    else if (typeof selector === 'string') //选择器
        this.els = (context || document).querySelectorAll(selector);
    else if (selector.addEventListener)
        this.els = [selector]; //单个dom元素
    else
        this.els = selector; //dom元素集合
    callEach(this.els, (el, i) => {
        this[i] = el
    }); //支持this[index]取dom节点
}

QueryEls.prototype = {
    //绑定事件
    on(event, handlerFn) {
        return this.each(el => el.addEventListener(event, handlerFn))
    },
    //解绑事件
    off(event, handlerFn) {
        return this.each(el => el.removeEventListener(event, handlerFn))
    },
    //从第一个子节点查找
    find(selector) {
        const el = this.els[0]; //注意，只取第一个
        return el ? new QueryEls(selector, el) : new QueryEls();
    },
    //遍历, fn(el, index)
    each(fn) {
        callEach(this.els, fn);
        return this;
    },
    elDo(doByEl, index = 0) { //针对第一个元素进行操作，或者返回值
        const e = this.els[index];
        return e && doByEl(e);
    }
}

function callEach(arr, fn) {
    for (let i = 0; i < arr.length; i++) {
        try {
            fn(arr[i], i);
        }
        catch (e) {
        }
    }
}

const $x = function (selector, context) {
    return new QueryEls(selector, context)
};

// $x.postTo = function postTo(url, data, target) {
//     var form = document.createElement('form');
//     form.style.display = 'none';
//     form.method = 'post';
//     form.action = url;
//     form.target = target || '';
//     for (var n in data) {
//         if (typeof (data[n]) != 'object' && typeof (data[n]) != 'function') {
//             var input = form.appendChild(document.createElement('input'))
//             input.name = n;
//             input.value = data[n]
//         }
//     }
//     document.body.appendChild(form).submit();
//     document.body.removeChild(form);
// }

export default $x;

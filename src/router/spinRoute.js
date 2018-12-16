/*
使vue-router懒加载时可以显示一个加载提示，避免网速慢时无响应
用法:
const index = resolve => {
    spinRoute.show();
    require(['./setting.vue'], spinRoute.resolve(resolve))
};
*/

'user strict';
import loading from '../js/utils/loading';

export default {
    show() {
        loading.show();
    },
    resolve(resolve) {
        return function (component) {
            loading.close()
            resolve(component)
        }
    }
}

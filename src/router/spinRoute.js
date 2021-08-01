/*
使vue-router懒加载时可以显示一个加载提示，避免网速慢时无响应
用法:
const route = {
    path: '/page-layout',
    component: () => spinRoute.require(import('./pageLayout/pageLayout.vue'))
};
*/

'user strict';
import loading from '../js/utils/loading';

export default {
    require(componentPromise) {
        loading.show();
        return componentPromise.then(component => {
            loading.close();
            return component
        })
    },
};

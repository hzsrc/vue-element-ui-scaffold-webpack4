import Vue from 'vue'
import $x from '../js/$x'
import router from '../router/routerMain.js'
import main from '../views/main.vue'
import { Button } from 'element-ui'
import { initThemeColor } from '../js/themeColorClient'
import mockClient from 'dynamic-mocker/lib/client'
import mockConfig from '../../mock/mock-config'

mockClient.setUp(mockConfig, pathname => import('../../mock/root' + pathname + '.js'))

require('../css/index.scss');

// window.Vue = Vue

// 通用组件，便于处理
Vue.prototype.$x = Vue.$x = $x;

// 常用组件在这注册。即可实现按需加载，又不必每个页面调用Vue.use。
Vue.use(Button);

initThemeColor()
new Vue({
    el: '#app',
    router,
    render: h => h(main),
});


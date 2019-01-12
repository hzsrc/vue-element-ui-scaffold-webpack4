import Vue from 'vue'
import $x from '../js/$x'
import router from '../router/routerMain.js'
import main from '../modules/main.vue'
import { Button } from 'element-ui'
import { initThemeColor } from '../js/changeThemeColor'

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


import Vue from 'vue'
import $x from '../js/$x'
import router from '../router/routerMain.js'
import main from '../modules/main.vue'

require('../css/index.scss');

// window.Vue = Vue

// 通用组件，便于处理
Vue.prototype.$x = Vue.$x = $x;

new Vue({
    el: '#app',
    router,
    render: h => h(main),
});


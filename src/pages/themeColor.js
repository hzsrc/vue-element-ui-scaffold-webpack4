import Vue from 'vue'
import $x from '../assets/js/$x'
import themeColor from '../modules/themeColor/themeColor.vue'

require('../assets/css/index.scss');

// window.Vue = Vue

// 通用组件，便于处理
Vue.prototype.$x = Vue.$x = $x;

new Vue({
    el: '#app',
    render: h => h(themeColor),
});


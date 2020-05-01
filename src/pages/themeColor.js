import Vue from 'vue'
import $x from '../js/$x'
import themeColor from '../views/themeColor/themeColor.vue'
import { initThemeColor } from '../js/themeColorClient'

require('../css/index.scss');

// window.Vue = Vue

Vue.prototype.$ELEMENT = { size: 'small' }

// 通用组件，便于处理
Vue.prototype.$x = Vue.$x = $x;

initThemeColor()
new Vue({
    el: '#app',
    render: h => h(themeColor),
});


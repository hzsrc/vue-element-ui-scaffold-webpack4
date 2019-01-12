import Vue from 'vue'
import $x from '../js/$x'
import themeColor from '../modules/themeColor/themeColor.vue'
import changeThemeColor from '../js/changeThemeColor'

require('../css/index.scss');

// window.Vue = Vue

// 通用组件，便于处理
Vue.prototype.$x = Vue.$x = $x;

initThemeColor()
new Vue({
    el: '#app',
    render: h => h(themeColor),
});

function initThemeColor() {
    var lastThemeColor = localStorage.getItem('theme_color')
    if (lastThemeColor) {
        changeThemeColor(lastThemeColor)
    }
}
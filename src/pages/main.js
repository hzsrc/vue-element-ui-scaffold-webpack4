import Vue from 'vue'
import $x from '../assets/js/$x'
import router from '../router/routermain'
import main from '../modules/main.vue'

require('../assets/css/utils.scss')

// window.Vue = Vue
// 通用组件
Vue.prototype.$x = Vue.$x = $x
$x.setRouter(router);
// 事件总线
Vue.prototype.eventBus = new Vue()

new Vue({
    el: '#app',
    template: '<main></main>',
    router,
    components: {main}
});


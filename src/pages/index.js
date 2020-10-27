//Login page

import Vue from 'vue';
import login from '../views/login/login.vue'
import debugInfo from '../component/debugInfo';
require('../css/index.scss');

//调试信息组件
Vue.use(debugInfo)

new Vue({
    el: '#app',
    template: '<login></login>',
    components: { login }
})

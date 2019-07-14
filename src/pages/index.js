//Login page

import Vue from 'vue';
import login from '../views/login/login.vue'
require('../css/index.scss');

new Vue({
    el: '#app',
    template: '<login></login>',
    components: { login }
})

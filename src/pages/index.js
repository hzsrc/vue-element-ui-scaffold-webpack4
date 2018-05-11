import Vue from 'vue';
import login from '../modules/login/login.vue'

new Vue({
    el: '#app',
    template: '<login></login>',
    components: {login}
})

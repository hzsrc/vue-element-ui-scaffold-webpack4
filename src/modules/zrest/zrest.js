import Vue from 'vue'
import rest from './rest.vue';

require('../../assets/css/utils.scss');


new Vue({
    el: '#app',
    template: '<rest></rest>',
    components: {rest}
})

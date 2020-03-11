import Vue from 'vue'
import zrest from './zrest.vue';

require('../../css/utils.scss');


new Vue({
    el: '#app',
    template: '<zrest></zrest>',
    components: { zrest }
})

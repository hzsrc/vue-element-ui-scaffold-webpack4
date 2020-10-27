<script>
    export default {
        install(Vue) {
            Vue.component('debugInfo', this)
        },
        template: '/*IFDEBUG' +
            '<pre>{{JSON.stringify($attrs.info || \'\', null, 4).replace(/"(\\\\w+)":/g, \'$1:\')}}</pre>' +
            'FIDEBUG*/'
    }
</script>
<style scoped>
    pre {
        font-size: 13px;
        font-family: 'Courier', 'Courier New';
        line-height: 1.1;
        position: fixed;
        z-index: 99999;
        top: 0;
        color: #00c600;
        right: 0;
        pointer-events: none
    }
</style>

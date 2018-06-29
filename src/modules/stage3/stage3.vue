<template>
    <div>
        <h3>This is stage3 under myCart here</h3>
        <button @click="$router.back()">Back</button>
    </div>
</template>

<script>
    //import  from '';
    export default {
        created() {
            this.$x.post('/api/get_xxx', {}, {showError: 'toast', maskOptions: {target: '.mask-target'}})
                .then(res => {
                })
                .catch(e => {
                    this.$x.toast.error('接口 http://aaa.bbb.com/api/get_xxx 访问失败，且未设置mock数据')
                })
        },
        props: {},
        data() {
            return {};
        },
        methods: {},
        computed: {},
        components: {}
    }
</script>

<style scoped lang="scss">

</style>

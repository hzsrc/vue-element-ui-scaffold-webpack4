<template>
    <div>
        <h3>This is stage2 here</h3>
        <button @click="$router.back()">Back</button>

        <router-view></router-view>
    </div>
</template>

<script>
    //import  from '';
    export default {
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

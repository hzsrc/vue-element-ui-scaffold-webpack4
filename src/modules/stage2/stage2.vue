<template>
    <div>
        <h3>This is stage2 here</h3>
        <button @click="$router.back()">Back</button>

        <router-view></router-view>
    </div>
</template>

<script>
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
    @import "../../assets/css/defines.scss";

    .cart {
        border: $--table-border;
    }

    .cart-item {
        line-height: .3rem;
    }

    .main-color {
        color: $color-primary;
    }
</style>

<template>
    <div class="pd-10">
        <div>
            <span class="v-top" style="line-height: 30px">Change theme color to: </span>
            <change-color></change-color>
        </div>
        <hr/>
        <h2>element-ui css:</h2>
        <el-button type="primary">Color of element-ui css</el-button>
        <el-tag closable>Color of element-ui css</el-tag>
        <el-input style="width:200px">Color of element-ui css</el-input>


        <h2>self css:</h2>
        <div>
            <nav class="series-primary">primary color in self css</nav>
            <nav class="series-3">primary color series in self css</nav>
            <nav class="series-5">primary color series in self css</nav>
        </div>

        <h2>custom color:</h2>
        <div class="custom-color">
            my custom color
        </div>
        <div class="custom-color2">
            my custom color 2
        </div>

        <br/>
        <a href="./"><< Back</a>
    </div>
</template>

<script>
    import { Button, Tag, Input } from 'element-ui';
    import Vue from 'vue'
    import changeColor from './changeColor.vue'

    Vue.use(Button).use(Tag).use(Input)

    export default {
        props: {},
        data() {
            return {};
        },
        methods: {},
        computed: {},
        components: {changeColor}
    }
</script>

<style scoped lang="scss">
    @import "../../css/defines.scss";

    .series-primary {
        background: $--color-primary;
    }

    .series-3 {
        background: $--color-primary-light-3;
    }

    .series-5 {
        background: $--color-primary-light-5;
    }

    .custom-color {
        background: $my-custom-color;
    }

    .custom-color2 {
        background: $my-custom-color2;
    }

    nav {
        padding: 10px;
        width: 260px;
        display: inline-block;
    }

    h2 {
        margin-top: 30px;
    }
</style>

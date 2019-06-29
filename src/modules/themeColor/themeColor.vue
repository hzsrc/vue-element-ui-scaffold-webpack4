<template>
    <div class="pd-10">
        <div>
            <span class="v-top" style="line-height: 30px">Change theme color to: </span>
            <change-color></change-color>
            <el-button @click="reset" size="small" style="float: right;">Reset</el-button>
        </div>
        <hr/>
        <h2>element-ui css:</h2>
        <el-button>default</el-button>
        <el-button type="primary">primary</el-button>
        <!--<el-button type="success">success</el-button>-->
        <!--<el-button type="info">info</el-button>-->
        <!--<el-button type="warning">warning</el-button>-->
        <!--<el-button type="danger">danger</el-button>-->
        <el-button type="text">text</el-button>
        <p/>
        <el-button plain>default</el-button>
        <el-button plain type="primary">primary</el-button>
        <!--<el-button plain type="success">success</el-button>-->
        <!--<el-button plain type="info">info</el-button>-->
        <!--<el-button plain type="warning">warning</el-button>-->
        <!--<el-button plain type="danger">danger</el-button>-->
        <p/>
        <el-tag closable>Color of element-ui css</el-tag>
        <el-input style="width:200px">Color of element-ui css</el-input>
        <el-switch
                :value="true"
                active-text="switch">
        </el-switch>

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
        <a href="./" class="primay-color">&lt;&lt; Back</a>

        <foot-code></foot-code>

    </div>
</template>

<script>
    import { Button, Tag, Input, Switch } from 'element-ui';
    import Vue from 'vue'
    import changeColor from './changeColor.vue'
    import footCode from '../../component/footCode'

    Vue.use(Button).use(Tag).use(Input).use(Switch)

    export default {
        props: {},
        data() {
            return {};
        },
        methods: {
            reset() {
                localStorage.removeItem('theme_color')
                location.reload()
            }
        },
        computed: {},
        components: { changeColor, footCode }
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

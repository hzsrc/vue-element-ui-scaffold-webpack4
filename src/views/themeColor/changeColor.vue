<template>
    <el-color-picker v-model="mainColor" size="small" @change="changeColor"></el-color-picker>
</template>

<script>
    import Vue from 'vue';
    import { ColorPicker } from 'element-ui';
    import { changeThemeColor, curColor } from '../../js/themeColorClient'

    Vue.use(ColorPicker)

    export default {
        data() {
            return {
                mainColor: curColor,
            };
        },
        methods: {
            changeColor(newColor) {
                changeThemeColor(newColor)
                    .then(t => this.$x.toast.success('主题色切换成功~'))
            }
        },
    }
</script>

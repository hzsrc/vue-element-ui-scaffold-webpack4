<template>
    <el-color-picker popper-class="theme-cpk" v-model="mainColor" size="small" @change="changeColor"
                     :predefine="predefineColors"></el-color-picker>
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
                predefineColors: [
                    '#ff2c00',
                    '#f27b00',
                    '#e4bf00',
                    '#2ac24c',
                    '#00d7da',
                    '#1e90ff',
                    '#d203a3',
                ]
            }
        },
        methods: {
            changeColor(newColor) {
                changeThemeColor(newColor)
                //.then(t => this.$x.toast.success('主题色切换成功~'))
            }
        },
    }
</script>
<style lang="scss">
    .theme-cpk .el-button--text {
        display: none;
    }
</style>
<style lang="scss" scoped>
    ::v-deep .el-color-picker__trigger {
        border: 0;
    }
</style>

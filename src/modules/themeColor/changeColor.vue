<template>
    <el-color-picker v-model="mainColor" size="small" @change="changeColor"></el-color-picker>
</template>

<script>
    import Vue from 'vue';
    import { ColorPicker } from 'element-ui';
    import appConfig from '../../../config/app-config.js'
    import changeThemeColor from '../../../src/js/changeThemeColor'

    Vue.use(ColorPicker)

    export default {
        data() {
            return {
                mainColor: appConfig.themeColor,
                oldColor: appConfig.themeColor
            };
        },
        methods: {
            changeColor(newColor) {
                changeThemeColor(newColor, this.oldColor)
                this.oldColor = newColor
                localStorage.setItem('theme_color', newColor)
            }

        },
    }
</script>

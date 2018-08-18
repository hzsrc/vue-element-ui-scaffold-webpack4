<template>
    <el-color-picker v-model="mainColor" size="small" @change="changeColor"></el-color-picker>
</template>

<script>
    import Vue from 'vue';
    import { ColorPicker } from 'element-ui';
    import replacer from 'webpack-theme-color-replacer/client';
    import appConfig from '../../../config/app-config.js'

    Vue.use(ColorPicker)

    export default {
        data() {
            return {
                mainColor: appConfig.themeColor,
                oldColor: appConfig.themeColor,
            };
        },
        methods: {
            changeColor(newVal) {
                var options = {
                    primary: {
                        oldColor: this.oldColor,
                        newColor: newVal,
                    },
                    cssUrl: appConfig.themeFile,
                    others: {
                        oldColors: ['#0cdd3a', '#c655dd'],
                        newColors: ['#ff0000', '#ffff00'],
                    }
                };
                replacer.elementUI.changeColor(options);

                this.oldColor = newVal
            }
        },
    }
</script>

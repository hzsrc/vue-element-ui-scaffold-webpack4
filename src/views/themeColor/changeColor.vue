<template>
    <el-color-picker
        v-model="mainColor"
        size="small"
        @change="changeColor"
    ></el-color-picker>
</template>

<script>
    import { ElColorPicker } from 'element-plus';
    import { changeThemeColor, curColor } from '../../js/themeColorClient';

    export default {
        components: { ElColorPicker },
        data() {
            return {
                mainColor: curColor,
            };
        },
        methods: {
            changeColor(newColor) {
                changeThemeColor(newColor).then((t) =>
                    this.$x.toast.success('主题色切换成功~')
                );
            },
        },
    };
</script>

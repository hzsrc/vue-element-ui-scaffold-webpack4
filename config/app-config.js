module.exports = {
    LOGIN_PATH: './',
    title: 'vue + webpack4 + element-ui脚手架项目',
    description: 'vue + webpack4 + element-ui脚手架项目',

    themeColor: '#f67a17',
    getThemeColors: function (color, getElementUISeries, varyColor, others) {
        var colors = getElementUISeries(color);//element-ui主色系列
        colors.push(
            varyColor.mix('#000', color, 0.1),
            varyColor.mix('#000', color, 0.2),
            varyColor.mix('#000', color, 0.7)
        );
        colors.push.apply(colors, others)
        return colors
    }
}

var getElementUISeries = require('webpack-theme-color-replacer/forElementUI/getElementUISeries')
module.exports = {
    LOGIN_PATH: './',
    title: 'vue + webpack4 + element-plus脚手架项目',
    description: 'vue + webpack4 + element-plus脚手架项目',

    themeColor: '#f67a17',

    getThemeColors: function (primaryColor, otherColors) {
        return getElementUISeries(primaryColor, otherColors);//element-plus主色系列
    }
}

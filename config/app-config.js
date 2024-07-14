var getElementUISeries = require('webpack-theme-color-replacer/forElementUI/getElementUISeries')

module.exports = {
    LOGIN_PATH: './',
    title: 'vue + webpack4 + element-ui脚手架项目',
    description: 'vue + webpack4 + element-ui脚手架项目',

    themeColor: '#f67a17',
    otherColors: ['#10213a', '#fefeff'], //titleBg、titleFg
    getThemeColors: function (primaryColor, otherColors) {
        return getElementUISeries(primaryColor, otherColors);//element-ui主色系列
    }
}

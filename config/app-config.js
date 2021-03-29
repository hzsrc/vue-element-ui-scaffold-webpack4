var getElementUISeries = require('webpack-theme-color-replacer/forElementUI/getElementUISeries')
var varyColor = require('webpack-theme-color-replacer/client/varyColor')
module.exports = {
    LOGIN_PATH: './',
    title: 'vue + webpack4 + element-ui脚手架项目',
    description: 'vue + webpack4 + element-ui脚手架项目',

    themeColor: '#f67a17',
    getThemeColors(primaryColor, otherColors) {
        return [
            ...getElementUISeries(primaryColor), //element-ui主色系列
            ...otherColors
        ]
    }
}

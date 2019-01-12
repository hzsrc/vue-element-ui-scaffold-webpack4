import replacer from 'webpack-theme-color-replacer/client'
import appConfig from '../../config/app-config.js'

// 动态切换主题色
export default function changeThemeColor(newColor, oldColor) {
    var options = {
        primary: {
            oldColor: oldColor || appConfig.themeColor,
            newColor: newColor,
        },
        cssUrl: appConfig.themeFile
    }
    try {
        replacer.elementUI.changeColor(options);
        localStorage.setItem('theme_color', newColor)
    } catch (e) {
        console.error(e)
    }
}

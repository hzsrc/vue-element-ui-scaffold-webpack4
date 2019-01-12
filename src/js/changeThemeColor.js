import replacer from 'webpack-theme-color-replacer/client'
import appConfig from '../../config/app-config.js'

// 动态切换主题色
export default function changeThemeColor(newColor, oldColor) {
    var options = {
        primary: {
            oldColor: oldColor || appConfig.themeColor,
            newColor: newColor,
        },
        cssUrl: appConfig.themeFile,
        others: {
            oldColors: ['#0cdd3a', '#c655dd'],
            newColors: ['#ff0000', '#ffff00'],
        }
    }
    try {
        replacer.elementUI.changeColor(options);
        localStorage.setItem('theme_color', newColor)
    } catch (e) {
        console.error(e)
    }
}


export function initThemeColor() {
    var lastThemeColor = localStorage.getItem('theme_color')
    if (lastThemeColor) {
        changeThemeColor(lastThemeColor)
    }
}

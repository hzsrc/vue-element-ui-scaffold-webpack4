import client from 'webpack-theme-color-replacer/client'
import forElementUI from 'webpack-theme-color-replacer/forElementUI'
import appConfig from '../../config/app-config.js'

export let curColor = appConfig.themeColor

// 动态切换主题色
export function changeThemeColor(newColor) {
    var options = {
        oldColors: [...forElementUI.getElementUISeries(curColor), '#0cdd3a', '#c655dd'],
        newColors: [...forElementUI.getElementUISeries(newColor), '#ff0000', '#ffff00'],
    }
    var promise = client.changer.changeColor(options, Promise);
    curColor = newColor
    localStorage.setItem('theme_color', curColor)
    return promise
}

export function initThemeColor() {
    let savedColor = localStorage.getItem('theme_color') || appConfig.themeColor
    changeThemeColor(savedColor)
}

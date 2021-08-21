import client from 'webpack-theme-color-replacer/client'
import themeUtil from 'webpack-theme-color-replacer/themeUtil'

import appConfig from '../../config/app-config.js'

export let curColor = appConfig.themeColor

// 动态切换主题色
export function changeThemeColor(newColor) {
    var customB = parseInt(Math.random() * 256).toString(16); // 按你需要生成颜色
    if (customB.length == 1) customB = '0' + customB
    const options = {
        newColors: themeUtil.getMyColors(newColor, ['#88' + customB + customB, '#' + customB + '88' + customB]),
    }
    return client.changer.changeColor(options, Promise)
        .then(t => {
            curColor = newColor
            localStorage.setItem('theme_color', curColor)
        });
}

export function initThemeColor() {
    const savedColor = localStorage.getItem('theme_color')
    if (savedColor) {
        document.body.style.display = 'none'
        curColor = savedColor;
        changeThemeColor(savedColor).finally(() => {
            document.body.style.display = ''
        });
    }
}

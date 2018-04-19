var elementUI = {
    version: '2.0.11',
    colorPrimary: '#f67a17'
}

export default {
    chalk: '',
    page: '',
    themeColor: elementUI.colorPrimary,
    changeColor(newColor, oldColor) {
        var _this = this;
        oldColor = oldColor || this.themeColor
        if (typeof newColor === 'string') {
            var chalkUrl = 'https://unpkg.com/element-ui@' + elementUI.version + '/lib/theme-chalk/index.css';
            getCssText('chalk', chalkUrl, '#409EFF', setCssTo) //#409EFF - 网上下载的element-ui主色

            var links = [].filter.call(document.querySelectorAll('link'), function (e) {
                //根据pages下的所有页面列举css
                return /(main|index)\..+\.css/.test(e.href || '')
            });
            if (links[0]) {
                getCssText('page', links[0].href, _this.themeColor, setCssTo)
            }
            _this.themeColor = newColor
        }

        function getCssText(varName, url, initColor, setCssTo) {
            var id = varName + '-style';
            var elStyle = document.getElementById(id);
            if (elStyle) {
                setCssTo(elStyle, elStyle.innerText)
            }
            else {
                elStyle = document.head.appendChild(document.createElement('style'))
                elStyle.setAttribute('id', id)
                _this.getCSSString(url, cssText => {
                    setCssTo(elStyle, cssText, initColor) //#409EFF - 网上下载的element-ui主色
                })
            }
        }

        function setCssTo(elStyle, cssText, oldColorIn) {
            var newColors = _this.getThemeCluster(newColor.replace('#', ''))
            var oldColors = _this.getThemeCluster((oldColorIn || oldColor).replace('#', ''))
            cssText = _this.replaceCssText(cssText, oldColors, newColors)
            elStyle.innerText = cssText
        }
    },
    replaceCssText: function (cssText, oldColors, newColors) {
        oldColors.forEach(function (e, t) {
            cssText = cssText.replace(new RegExp(e, 'ig'), newColors[t])
        })
        return cssText
    },
    getCSSString: function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var cssTx = xhr.responseText.replace(/@font-face{[^}]+}/, '')
                callback(cssTx)
            }
        }
        xhr.open('GET', url)
        xhr.send()
    },
    getThemeCluster: function (colorStr) {
        var colors = [colorStr]
        for (var i = 0; i <= 9; i++)
            colors.push(lighten(colorStr, Number((i / 10).toFixed(2))));
        colors.push(rgba(colorStr, 0.1))
        colors.push(rgba(colorStr, 0.2))
        return colors

        function lighten(colorStr1, rate) {
            var r = parseInt(colorStr1.slice(0, 2), 16)
            var g = parseInt(colorStr1.slice(2, 4), 16)
            var b = parseInt(colorStr1.slice(4, 6), 16);
            return rate === 0 ? [r, g, b].join(',') : (r += Math.round(rate * (255 - r)),
                g += Math.round(rate * (255 - g)),
                b += Math.round(rate * (255 - b)),
                r = r.toString(16),
                g = g.toString(16),
                b = b.toString(16),
            '#' + r + g + b)
        }

        function rgba(colorStr1, rate) {
            var r = parseInt(colorStr1.slice(0, 2), 16)
            var g = parseInt(colorStr1.slice(2, 4), 16)
            var b = parseInt(colorStr1.slice(4, 6), 16);
            return r = Math.round((1 - rate) * r),
                g = Math.round((1 - rate) * g),
                b = Math.round((1 - rate) * b),
                r = r.toString(16),
                g = g.toString(16),
                b = b.toString(16),
            '#' + r + g + b
        }
    }
}
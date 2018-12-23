//遍历pages文件夹生成入口
const path = require('path')
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin')
var config = require('../config')
const appConfig = require('../config/app-config')

var pageList = null;

function readPages() {
    if (!pageList) {
        const pagesPath = path.resolve('./src/pages');
        pageList = []
        fs.readdirSync(pagesPath).forEach(pageFile => {
            var fullPath = pagesPath + '/' + pageFile
            var isDir = fs.statSync(fullPath).isDirectory()
            if (!isDir) {
                if (pageFile.slice(-3) == '.js') {
                    var baseName = pageFile.slice(0, pageFile.lastIndexOf('.'));
                    pageList.push({
                        entry: fullPath,
                        chunkName: baseName
                    })
                }
            }
            else { //文件夹
                try {
                    var pageConfig = require(fullPath + '/index.js');
                    pageConfig.chunkName = path.basename(pageFile)
                    pageList.push(pageConfig)
                }
                catch (e) {
                    console.error(fullPath + '/index.js not found.\n', e)
                }
            }
        })
    }
    return pageList;
}

exports.getEntryPages = function () {
    return readPages().reduce((r, page) => {
        r[page.chunkName] = page.entry;
        return r;
    }, {});
}

exports.htmlPlugins = function (webackConfig) {
    var exChunks = config.isBuild ? ['manifest', 'vendor'] : [];
    var list = readPages().map(page => {
        // see https://github.com/ampedandwired/html-webpack-plugin
        var defaultOptions = {
            filename: page.chunkName + '.html',
            chunks: [...exChunks, page.chunkName],
            template: 'html.tpl.html',
            inject: true,
            // minify: {
            //     removeComments: true,
            //     collapseWhitespace: true,
            //     removeAttributeQuotes: false
            //     // more options:
            //     // https://github.com/kangax/html-minifier#options-quick-reference
            // },
            title: '企业信息服务平台',
            appConfig: appConfig,
        }
        var options = Object.assign(defaultOptions, page.html);

        return new HtmlWebpackPlugin(options);
    });
    return list
}



//遍历pages文件夹生成入口
const path = require('path')
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin')
var config = require('../config')
const appConfig = require('../config/app-config')

var pageList = null;

function readPages() {
    if (!pageList) {
        const pagesPath = './src/pages';
        pageList = []
        fs.readdirSync(pagesPath).forEach(pageFile => {
            var fullPath = pagesPath + '/' + pageFile
            var isDir = fs.statSync(fullPath).isDirectory()
            if (!isDir) {
                if (pageFile.slice(-3) == '.js') {
                    var baseName = pageFile.slice(0, pageFile.lastIndexOf('.'));
                    pageList.push({
                        entry: fullPath,
                        chunkName: baseName,
                        template: 'html.tpl.html',
                    })
                }
            }
            else { //文件夹
                var files = fs.readdirSync(fullPath)
                var entry = files.find(file => file.slice(0, 5) === 'entry'); // entry.*
                if (!entry) {
                    console.error(fullPath + '/entry.* not found.')
                }
                else {
                    var template = files.find(file => file.slice(0, 8) === 'template') // template.*
                    pageList.push({
                        entry: fullPath + '/' + entry,
                        chunkName: path.basename(pageFile),
                        template: template ? path.join(fullPath, template) : 'html.tpl.html',
                    })
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
        var options = {
            filename: page.chunkName + '.html',
            template: page.template,
            title: appConfig.title,
            chunks: [...exChunks, page.chunkName],
            inject: true,
            // minify: {
            //     removeComments: true,
            //     collapseWhitespace: true,
            //     removeAttributeQuotes: false
            //     // more options:
            //     // https://github.com/kangax/html-minifier#options-quick-reference
            // },
            appConfig: appConfig,
        }
        return new HtmlWebpackPlugin(options);
    });
    return list
}



//遍历pages文件夹生成入口
const path = require('path')
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('../config')
const appConfig = require('../config/app-config')

let pageList = null;

function readPages() {
    if (!pageList) {
        const pagesPath = path.resolve('./src/pages');
        pageList = []
        fs.readdirSync(pagesPath).forEach(pageFile => {
            const fullPath = pagesPath + '/' + pageFile
            const isDir = fs.statSync(fullPath).isDirectory()
            if (!isDir) {
                if (pageFile.slice(-3) == '.js') {
                    const baseName = pageFile.slice(0, pageFile.lastIndexOf('.'));
                    pageList.push({
                        entry: fullPath,
                        chunkName: baseName,
                        template: 'public/index.html',
                    })
                }
            }
            else { //文件夹
                try {
                    pageList.push({
                        entry: fullPath + '/entry.js',
                        chunkName: path.basename(pageFile),
                        template: fullPath + '/template.html',
                    })
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
    const exChunks = config.isBuild ? ['manifest', 'vendor'] : [];
    const list = readPages().map(page => {
        // see https://github.com/ampedandwired/html-webpack-plugin
        const options = {
            filename: page.chunkName + '.html',
            template: page.template,
            title: appConfig.title,
            chunks: [...exChunks, page.chunkName],
            inject: true,
            favicon: 'public/favicon.ico',
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



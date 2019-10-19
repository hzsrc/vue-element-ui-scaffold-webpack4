//遍历pages文件夹生成入口
const path = require('path')
const fs = require('fs');
const appConfig = require('../config/app-config');

var pageList = null;

function getEntryPages() {
    if (!pageList) {
        const pagesPath = path.resolve('./src/pages');
        //const exChunks = isBuild ? ['chunk-vendors', 'chunk-common'] : [];
        pageList = {}
        fs.readdirSync(pagesPath).forEach(pageFile => {
            var fullPath = pagesPath + '/' + pageFile
            var isDir = fs.statSync(fullPath).isDirectory()
            if (!isDir) {
                if (pageFile.slice(-3) === '.js') {
                    let baseName = pageFile.slice(0, pageFile.lastIndexOf('.'));
                    pageList[baseName] = {
                        entry: fullPath,
                        filename: baseName + '.html',
                        template: 'public/index.html',
                        //chunks: [...exChunks, baseName],
                        ...appConfig,
                    }
                }
            } else { //文件夹
                try {
                    let baseName = path.basename(pageFile)
                    pageList[baseName] = {
                        entry: fullPath + '/entry.js',
                        filename: baseName + '.html',
                        template: 'public/index.html',
                        //chunks: [...exChunks, baseName],
                        ...appConfig,
                    }
                } catch (e) {
                    console.error(fullPath + '/index.js not found.\n', e)
                }
            }
        })
    }
    return pageList;
}

exports.getEntryPages = getEntryPages

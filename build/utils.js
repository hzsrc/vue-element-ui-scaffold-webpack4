var path = require('path')
var fs = require('fs');
var config = require('../config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var appConfig = require('../config/app-config')

exports.assetsPath = function (_path) {
    var assetsSubDirectory = config.isBuild
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
}

exports.styleLoaders = function (options) {
    options = options || {}
    var cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    function getCssRule(extension, loader, loaderOptions) {
        var use = ['vue-style-loader', cssLoader]
        use.push(getPostCssLoader(options.sourceMap));
        if (loader) {
            use.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {sourceMap: options.sourceMap})
            })
        }
        if (options.extract) {
            use.splice(1, 0, MiniCssExtractPlugin.loader)
        }
        return {
            test: new RegExp('\\.' + extension + '$'),
            use: use
        }
    }

    var result = [
        getCssRule('css', false),
        getCssRule('postcss', false),
        getCssRule('less', 'less'),
        getCssRule('sass', 'sass', {indentedSyntax: true}),
        getCssRule('scss', 'sass'),
        getCssRule('stylus', 'stylus'),
        getCssRule('styl', 'stylus')
    ];
    return result;
}

function getPostCssLoader(sourceMap) {
    return {
        loader: 'postcss-loader',
        options: {
            sourceMap: sourceMap,
            plugins: [
                require('autoprefixer')({
                    browsers: ['iOS >= 7', 'Android >= 5']
                }),
                require('postcss-pxtorem')({rootValue: 100, propList: ['*']})
            ]
        }
    }
}

//遍历pages文件夹生成入口
const pagesPath = './src/pages';
exports.getEntryPages = function () {
    var r = {};
    var entrieFiles = fs.readdirSync(pagesPath).filter(f => f.match(/\.js$/))
    entrieFiles.forEach(jsf => {
        var baseName = jsf.slice(0, jsf.lastIndexOf('.'));
        r[baseName] = pagesPath + '/' + jsf
    })
    return r;
}

exports.htmlPlugins = function (webackConfig) {
    var exChunks = config.isBuild ? ['manifest', 'vendor'] : [];
    var list = Object.keys(webackConfig.entry).map(baseName => {
        return htmlPlugin({
            filename: baseName + '.html',
            chunks: [...exChunks, baseName],
            title: baseName
        })
    })
    return list
}

function htmlPlugin(exConfig) {
    // see https://github.com/ampedandwired/html-webpack-plugin

    return new HtmlWebpackPlugin(Object.assign({
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
        // chunksSortMode: 'dependency',
        appConfig: appConfig
    }, exConfig))
}
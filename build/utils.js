var path = require('path'), fs = require('fs');
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

exports.cssLoaders = function (options) {
    options = options || {}

    var cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: process.env.NODE_ENV === 'production',
            sourceMap: options.sourceMap
        }
    }

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        var rules = ['vue-style-loader', cssLoader]
        if (loader) {
            rules.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)

        if (options.extract) {
            rules.splice(1, 0, MiniCssExtractPlugin.loader)
        }
        return rules
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', {indentedSyntax: true}),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

// Generate rules for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
    var output = []
    var rules = exports.cssLoaders(options)
    for (var extension in rules) {
        var loader = rules[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }
    return output
}

//遍历pages文件夹生成入口
const pagesPath = './src/pages';
exports.getEntryPages = function () {
    var r = {};
    var entrieFiles = fs.readdirSync(pagesPath).filter(f => f.slice(-3) === '.js')
    entrieFiles.forEach(jsf => {
        var baseName = jsf.slice(0, -3);
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
    //console.log(JSON.stringify([main, ...list], 0, 4))
    return list
}

function htmlPlugin(exConfig) {
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
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
var path = require('path')
var config = require('../config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


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

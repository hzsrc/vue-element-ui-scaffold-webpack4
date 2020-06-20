const path = require('path')
const config = require('../config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.conditionalCompiler = {
    loader: 'js-conditional-compile-loader',
    options: {
        isDebug: process.env.NODE_ENV === 'development', // optional, this expression is default
        envTest: process.env.ENV_CONFIG === 'test', // any prop name you want, used for /* IFTRUE_evnTest ...js code... FITRUE_evnTest */
        isPreview: process.env.npm_config_preview, // npm run build-demo --preview, for mock client data
    }
}
exports.assetsPath = function (_path) {
    const assetsSubDirectory = config.isBuild
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
}

exports.styleLoaders = function (options) {
    options = options || {}
    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    function getCssRule(extension, loader, loaderOptions) {
        const use = ['vue-style-loader', cssLoader]
        use.push(getPostCssLoader(options.sourceMap));
        if (loader) {
            use.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, { sourceMap: options.sourceMap })
            })
        }
        if (options.extract) {
            use.splice(1, 0, {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../', // dist 相对于 dist/css 目录
                }
            })
        }
        use.push(exports.conditionalCompiler)
        return {
            test: new RegExp('\\.' + extension + '$'),
            use: use
        }
    }

    const result = [
        getCssRule('css', false),
        getCssRule('postcss', false),
        getCssRule('less', 'less'),
        getCssRule('sass', 'sass', { implementation: require('sass'), indentedSyntax: true }),
        getCssRule('scss', 'sass', { implementation: require('sass') }),
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
                require('autoprefixer')({}),
                require('postcss-pxtorem')({ rootValue: 100, propList: ['*'] })
            ]
        }
    }
}

module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                corejs: '2',
                useBuiltIns: 'usage',
                modules: false,
                targets: require('./package.json').browserslist
            }
        ]
    ],
    plugins: [
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-runtime',
        '@vue/babel-plugin-transform-vue-jsx',
        [
            'babel-plugin-component',
            {
                libraryName: 'element-ui',
                styleLibraryName: '~node_modules/element-theme-chalk/src',
                ext: '.scss'
            }
        ]
    ],
    comments: false,
}

module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                targets: {
                    browsers: require('./package.json').browserslist
                }
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
    env: {
        test: {
            presets: [
                'env',
                // 'stage-2'
            ],
            plugins: [
                'istanbul'
            ]
        }
    }
}

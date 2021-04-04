module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                corejs: '3.9.1',
                useBuiltIns: 'usage',
                modules: false
            }
        ]
    ],
    plugins: [
        //'@babel/plugin-syntax-dynamic-import',
        //'@babel/plugin-transform-runtime', //用了useBuiltIns不需要它
        //['@babel/plugin-proposal-class-properties', { loose: true }],
        '@vue/babel-plugin-jsx',
        [
            'import',
            {
                libraryName: 'element-plus',
                // styleLibraryName: '~node_modules/element-plus/packages/theme-chalk/src',
                // ext: '.scss',
                customStyleName(name) {
                    // 由于 customStyleName 在配置中被声明的原因，`style: true` 会被直接忽略掉，
                    // 如果你需要使用 scss 源文件，把文件结尾的扩展名从 `.css` 替换成 `.scss` 就可以了
                    name = name.replace('el-', '');
                    return `element-plus/packages/theme-chalk/src/${name}.scss`;
                },
            }
        ]
    ],
    comments: false,
}

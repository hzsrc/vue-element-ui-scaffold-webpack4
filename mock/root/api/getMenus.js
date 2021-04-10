module.exports = {
    disabled: 0,
    status: 200,
    body: function (query, post) {
        return {
            status: 0,
            msg: '',
            data: [
                {
                    title: 'Home',
                    url: '/',
                    icon: 'el-icon-home'
                },
                {
                    title: 'Theme',
                    url: '/theme',
                    icon: 'el-icon-theme'
                },
                {
                    title: 'Page1',
                    url: '/stage1',
                    children: [{
                        title: 'stage1',
                        url: '/stage1',
                        icon: 'el-icon-document'
                    }, {
                        title: 'stage2',
                        url: '/stage2',
                        icon: 'el-icon-s-goods'
                    }, {
                        title: 'stage3',
                        url: '/stage2/stage3',
                        icon: 'el-icon-setting'
                    }, {
                        title: 'rest tool',
                        url: '/zrest',
                        icon: 'el-icon-menu'
                    }]
                },
                {
                    title: 'Page2',
                    url: '/page2',
                    children: [{
                        title: 'Icons',
                        url: '/icons',
                        icon: 'el-icon-setting'
                    }, {
                        title: 'stage1',
                        url: '/stage1',
                        icon: 'el-icon-document'
                    }, {
                        title: 'stage2',
                        url: '/stage2',
                        icon: 'el-icon-goods'
                    }, {
                        title: 'rest tool',
                        url: '/zrest',
                        icon: 'el-icon-menu'
                    }]
                }
            ]
        }
    }
}

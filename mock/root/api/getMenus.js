module.exports = {
    disabled: 0,
    status: 200,
    body: function (query, post) {
        return {
            status: 0,
            msg: '',
            data: [
                {
                    title: '我的绩效(OKR)',
                    url: '/perform',
                    children: [{
                        title: '目标制定',
                        url: '/perform/objective',
                        icon: 'el-icon-document'
                    }, {
                        title: '进度更新',
                        url: '/perform/process',
                        icon: 'el-icon-setting'
                    }, {
                        title: '绩效评估',
                        url: '/perform/evaluate',
                        icon: 'el-icon-menu'
                    }, {
                        title: '绩效反馈',
                        url: '/perform/feedback',
                        icon: 'el-icon-document'
                    }]
                },
                {
                    title: '绩效审批',
                    url: '/performApp',
                    children: [{
                        title: '下属目标审批',
                        url: '/performApp/approve',
                        icon: 'el-icon-document'
                    }, {
                        title: '下属绩效跟进',
                        url: '/performApp/process',
                        icon: 'el-icon-setting'
                    }, {
                        title: '下属绩效审批',
                        url: '/performApp/evaluate',
                        icon: 'el-icon-menu'
                    }, {
                        title: '绩效结果审核',
                        url: '/performApp/feedback',
                        icon: 'el-icon-document'
                    }]
                }
            ]
        }
    }
}

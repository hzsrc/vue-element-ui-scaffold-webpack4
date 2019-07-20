module.exports = {
    disabled: 0,
    delay: 200,
    status: 200,
    headers: {
        server: 'dynamic-mocker',
        'set-cookie': 'foo=bar; path=/',
        'cache-control': 'no-cache'
    },
    body: function (query, post) {
        var pageIndex = post.pageIndex
        var pageSize = post.pageSize
        return {
            returnCode: 0,
            data: new Array(pageSize).fill().map((n, i) => {
                var id = pageIndex * pageSize + i
                return {
                    id: id,
                    name: '张三' + id,
                    date: +new Date() - i * 100000
                }
            }),
            total: 111,
            msg: 'ok'
        }
    }
}

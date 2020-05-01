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
        const pageIndex = post.pageIndex
        const pageSize = post.pageSize
        return {
            status: 0,
            data: new Array(pageSize).fill().map((n, i) => {
                const id = pageIndex * pageSize + i
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

//本文件模拟根目录的响应数据（类似index.html的作用）
var fs = require('fs')
module.exports = {
    disabled: 0,
    headers: {
        'Content-Type': 'text/html'
    },
    body: function (query, post) {
        return `
<html>
<body>
Hi, dynamic-mocker is running.
</body>
</html>
`
    }
}

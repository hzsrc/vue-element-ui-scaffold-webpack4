import tokenUtil from './tokenUtil';

export default {
    //设置Vue的router, 供goUrl()跳转用
    setRouter(router) {
        this.router = router
    },
    goUrl(url, withToken, inSameWindow) {
        if (this.isAbsUrl(url)) {  // 绝对地址
            if (withToken) {
                url += url.indexOf('?') > -1 ? '&' : '?'
                var auth = tokenUtil.getAuth() || []
                url += `authCode=${encodeURIComponent(auth[0])}&spId=${auth[1]}`;
                //url += 'token=' + encodeURIComponent(tokenUtil.get())
            }
            if (inSameWindow)
                location.href = url
            else
                window.open(url)
        }
        else if (this.router) {
            this.router.push(url)
        }
        else {
            location.href = url;
        }
    },
    isAbsUrl(url) {
        return url.split('?')[0].indexOf('//') > -1  // 绝对地址
    },
    isSameRoute(router1, router2, toLevel) {
        var r1 = router1.split('?')[0].split('/');
        var r2 = router2.split('?')[0].split('/')
        for (var i = 0; i <= toLevel; i++) {
            if (r1[i] != r2[i]) return false
        }
        return true
    }
}
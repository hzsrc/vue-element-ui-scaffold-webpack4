import $x from './$x.js'

var AliOSS; // = require('ali-oss/dist/aliyun-oss-sdk.min.js')
var oss = {
    //初始化accessKey
    initAccessKey() {
        if (!AliOSS) {
            return new Promise((resolve, reject) => {
                return import(/* webpackChunkName: "oss" */ 'ali-oss/dist/aliyun-oss-sdk.min.js')
                    .then(r => {
                        AliOSS = r.default || r;
                        oss.initAccessKey().then(resolve).catch(reject)
                    }).catch(reject)
            })
        }
        if (this.access && this.expireTime > new Date()) {
            return Promise.resolve()
        }
        return $x.post('/common/file/sts', {}, {maskOptions: false}).then(res => {
            oss.setAccess(res.data.result)
            return Promise.resolve()
        }).catch(err => {
            $x.toast.error('oss fail:' + e.message)
            return Promise.reject()
        })
    },
    //生成文件key（类似id作用）
    getFileKey(file) {
        var ext = (file.name || '').match(/(\.\w+)$/)
        ext = (ext && ext[1]) || '.oss';
        return (+new Date()).toString(16) + Math.random().toString(16).slice(2) + ext
    },
    //缓存accessKey
    setAccess(access) {
        var info = access.readInfo
        this.access = {
            accessKeyId: info.accessKeyId,
            accessKeySecret: info.accessKeySecret,
            stsToken: info.stsToken,
            endpoint: access.endPoint,
            bucket: access.bucket
        }
        this.expireTime = new Date(info.expiration) - 30000// 留30秒

        /*{
            'endPoint': 'oss-cn-shanghai.aliyuncs.com',
            'region': 'cn-hangzhou',
            'bucket': 'flag-yxt',
            'basePath': 'oss_dev/corp/123456/',
            'readInfo': {
                'accessKeyId': 'STS.GYwXhMjjWctJ2SqyFbwCe8EuR',
                'accessKeySecret': 'AyFQVZ4VKzVdJNeVCtbEjnigeLLRn72s2hoy3AVt8ewQ',
                'stsToken': 'CAIS9AF1q6Ft5B2yfSjIpprCE9L5h7V21LahMHXAnUY3e8xJ14DesDz2IHBOf3dgCeAcs/g0m2lS7/0ZlqoqEcQdnJkKxCs0vPpt6gqET9frma7ctM4p6vCMHWyUFGSIvqv7aPn4S9XwY+qkb0u++AZ43br9c0fJPTXnS+rr76RqddMKRAK1QCNbDdNNXGtYpdQdKGHaOITGUHeooBKJUhYx61Uj1j0huP7nmZTM0HeE0g2mkN1yjp/qP52pY/NrOJpCSNqv1IR0DPGRinUOu0garvoq1/Mdo26c5cvnBEJKphuCOuWR481zaRBjZ7Q3CzisX3x/VmASGoABPbXiVrM2SVLx8vj+Zwvy58CFy5oBhnMasT8SHEgfpKZsDZhBgMshJyHw2bNA2g/Ok5BlZX/7uidh+5rF1S5uNvpZPPBzpiGTS4VJSsYIhw0Yg13GVUt48PlJGzWrxqAWLjQJrvDtPxexQmwkDKRA3wCeR9RzchRJoSVLNlvgZYg=',
                'expiration': '2017-12-24T10:55:17Z'
            },
            'writeInfo': null
        }*/
    },
    //上传动作。返回Promise。参数：onProgress(percent)
    upload(file, onProgress) {
        onProgress(0)
        return oss.initAccessKey().then(() => {
            var storeAs = oss.getFileKey(file)
            var client = new AliOSS.Wrapper(oss.access)
            return client.multipartUpload(storeAs, file, {
                progress: function (percent) {
                    onProgress(percent * 100)
                    return function (done) {
                        done()
                    }
                }
            })
        })
    },
    putUpload(buffer, fileName) { //put的方式上传图片
        if (!fileName) {
            fileName = this.getFileKey({})
        }
        return oss.initAccessKey().then(() => {
            ///var storeAs = oss.getFileKey();
            var client = new AliOSS.Wrapper(oss.access)
            return client.put(fileName, buffer)
        })
    },
    //动态获取签名过的下载地址，返回Promise
    getDownloadUrl(fileKey) {
        return this.initAccessKey().then(() => {
            var client = new AliOSS(this.access)
            var url = client.signatureUrl(fileKey, {expires: 1200})
            return Promise.resolve(url)
        })
    }
}

export default oss

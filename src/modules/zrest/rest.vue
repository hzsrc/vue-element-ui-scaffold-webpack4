<template>
    <div class="zrest">
        <el-row>
            <a @click="goLogin">登录</a>
            <div class="right">
                <a @click="showConfig= !showConfig">配置</a>
            </div>
        </el-row>
        <el-form v-if="showConfig" labelWidth="120px">
            <el-form-item label="服务器地址2">
                <el-input size="small" v-model="config.server" @change="changeServer"></el-input>
            </el-form-item>
            <el-form-item label="接口选择">
                <table class="w100">
                    <tr>
                        <td>
                            <el-select size="small" v-model="request.url" @change="setApiData" class="w100" filterable
                                       placeholder="输入搜索">
                                <el-option v-for="(item,index) in config.apiList" :key="index"
                                           :label="item.text" :value="item.url">
                                </el-option>
                            </el-select>
                        </td>
                        <td style="width:12%" class="t-right">
                            <el-button size="small" @click="loadRAP" class="right">加载RAP接口列表</el-button>
                        </td>
                    </tr>
                </table>
            </el-form-item>
            <hr>
            <el-form-item label="导出">
                <el-button size="small" @click="exportConfig">导出当前接口配置</el-button>
                <el-button size="small" @click="viewRap">查看RAP</el-button>
            </el-form-item>
            <el-form-item label="加载配置">
                <table class="w100">
                    <tr>
                        <td>
                            <el-input type="textarea" @change="changeImport"></el-input>
                        </td>
                        <td style="width:12%" class="t-right">
                            <el-button size="small" @click="loadConfig">加载接口配置</el-button>
                        </td>
                    </tr>
                </table>
            </el-form-item>
            <hr>
        </el-form>


        <el-form labelWidth="120px">

            <el-form-item label="接口地址">
                <table class="w100">
                    <tr>
                        <td style="width:12%">
                            <el-select size="small" v-model="request.method">
                                <el-option v-for="item in httpMethods" :key="item"
                                           :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </td>
                        <td>
                            <el-input size="small" v-model="request.url" @change="changeServer"></el-input>
                        </td>
                    </tr>
                </table>
            </el-form-item>
            <el-form-item label="请求数据">
                <el-input size="small" type="textarea" :rows="8" v-model="request.data"></el-input>
            </el-form-item>
            <el-form-item label="HttpHeaders">
                <div class='pre'>{{request.headers}}</div>
            </el-form-item>
            <el-form-item label="">
                <el-button @click="doRequest">发起请求</el-button>
            </el-form-item>
        </el-form>

        <h2>HTTP响应</h2>
        <el-form labelWidth="120px">
            <el-form-item label="结果">
                <div class='pre'>{{response.result}}<br/>{{response.status}}
                </div>
            </el-form-item>
            <el-form-item label="JSON">
                <div class='pre'>{{response.json}}</div>
            </el-form-item>
        </el-form>

        <div class="t-center" style="font-size: 10px;color:#ccc">
            接口调试工具
            <div class="hide">2018.3. By HuangZheng</div>
        </div>
    </div>
</template>

<script>
    import httpUtil from '../../assets/js/utils/httpUtil';
    import Vue from 'vue'
    import { Row, Col, Input, Button, Form, FormItem, Select, Option } from 'element-ui'
    import storageUtil from '../../assets/js/utils/storageUtil';
    import msgDlg from '../../assets/js/utils/msgDialog'

    Vue.use(Row).use(Col).use(Input).use(Button).use(Form).use(FormItem).use(Select).use(Option)

    export default {
        props: {},
        data() {
            return {
                config: {
                    server: '//eis-service.dev61.ums86.com',
                    apiList: [{url: '/home/login/us_pd', text: 'login', data: {}},
                        {url: '/home/login/sp_bound', text: 'bound', data: {}}]
                },
                showConfig: false,

                httpMethods: ['POST', 'GET'],
                request: {
                    method: 'POST',
                    url: '',
                    headers: {},
                    data: '{}',
                },
                response: {
                    status: 0,
                    json: '',
                    result: ''
                },
                axiosCfg: {},
            };
        },
        created() {
            this.config.apiList = this.apiAll = storageUtil.getObj('zrest_apis') || []
            this.request.url = storageUtil.getObj('zrest_lastUrl')
            this.setApiData();
            this.changeServer();

            httpUtil.http.interceptors.request.use(config => {
                this.axiosCfg = config
                return config
            })

            var resp = (res) => {
                var data = res.data || {};
                var retCode = Number(data.returnCode);
                if (retCode == 110 || retCode == 111) { // token失败
                    msgDlg.confirm('您需要重新登陆', '提示')
                        .then(this.goLogin)
                        .catch(r => {})
                }

                var config = this.axiosCfg
                var headers = Object.assign({}, config.headers[this.request.method.toLowerCase()])
                for (var n in config.headers) {
                    if (typeof config.headers[n] === 'string')
                        headers[n] = config.headers[n]
                }
                this.request.headers = headers;
                this.saveToLocal(config.url, config.data)

                this.response.result = this.request.method + ' ' + res.request.responseURL;
                this.response.status = res.status || (res.response.status + ' ' + res.message);
                this.response.json = JSON.stringify(res.data, null, 4)
            }
            httpUtil.http.interceptors.response.handlers.splice(0)
            httpUtil.http.interceptors.response.use(resp, resp)
        },
        methods: {
            changeServer() {
                httpUtil.http.defaults.baseURL = this.config.server
            },
            changeImport(val) {
                this.configJSON = val
            },
            setApiData() {
                var index = this.config.apiList.findIndex(api => api.url == this.request.url)
                if (index > -1) {
                    this.request.data = JSON.stringify(this.config.apiList[index].data, null, 4)
                }
            },
            doRequest() {
                try {
                    var method = this.request.method.toLowerCase()
                    if (!this.request.data) this.request.data = '{}';
                    var data = parseJSON(this.request.data)
                    httpUtil[method](this.request.url, data, {maskOptions: false})
                }
                catch (e) {
                    this.response.status = String(e)
                }
            },
            loadRAP() {
                // httpUtil.http.defaults.withCredentials = false
                // httpUtil.http.defaults.timeout = 180000
                var url = prompt('输入RAP导出地址：（替换projectId为对应的RAP项目id）\n然后复制弹出窗口的文本到“加载配置”中加载'
                    , 'http://10.0.0.170:9191/api/queryRAPModel.do?projectId=110')
                var reg = url.match(/(.+)api\/.+projectId=(\d+)/) || {}
                this.rapBase = `${reg[1]}workspace/myWorkspace.do?projectId=${reg[2]}`
                if (url) {
                    window.open(url)
                }
            },
            saveToLocal(url, data) {
                url = url.replace(this.config.server, '')
                if (typeof data != 'string') {
                    data = JSON.stringify(data)
                }
                var apis = this.config.apiList
                var index = apis.findIndex(api => api.url == url)
                if (index == -1) {
                    apis.push({url, data: JSON.parse(data)})
                }
                else {
                    apis[index].data = JSON.parse(data)
                }

                storageUtil.setObj('zrest_lastUrl', url);
                storageUtil.setObj('zrest_apis', apis);
            },
            exportConfig() {
                var r = {request: this.request, config: this.config}
                var json = JSON.stringify(r, null, 4)
                r = JSON.parse(json)
                //r.request.headers = undefined
                //r.request.url = r.request.url.replace(this.config.server, '')
                r.config.apiList = undefined
                json = JSON.stringify(r, null, 4)

                window.open('about:blank').document.write('<pre>' + json + '</pre>')
            },
            viewRap() {
                var index = this.config.apiList.findIndex(api => api.url == this.request.url)
                if (index > -1) {
                    var url = this.config.apiList[index].rapUrl;
                    window.open(url)
                }
                else {
                    alert('没找到这个接口的RAP')
                }
            },
            loadConfig() {
                if (!this.configJSON) {
                    return alert('请粘贴配置JSON到前面的文本框')
                }

                var data = parseJSON(this.configJSON)
                if (data.modelJSON) { //RAP的JSON
                    var list = []
                    data = eval('(' + data.modelJSON + ')')
                    data.moduleList.forEach(mod => {
                        mod.pageList.forEach(page => {
                            page.actionList.forEach(api => {
                                list.push({
                                    text: page.name.slice(0, 6) + '.' + api.name.slice(0, 8) + ': ' + api.requestUrl,
                                    url: api.requestUrl,
                                    data: parseToData(api.requestParameterList),
                                    rapUrl: this.rapBase + '#' + api.id
                                })

                                function parseToData(list) {
                                    var r = {}
                                    var types = {string: '', number: 0, object: {}}
                                    list.forEach(p => {
                                        if (p.dataType == 'object')
                                            r[p.identifier] = parseToData(p.parameterList)
                                        else
                                            r[p.identifier] = types[p.dataType]
                                    })
                                    return r
                                }
                            })
                        })
                    })
                    storageUtil.setObj('zrest_apis', list)
                    this.config.apiList = this.apiAll = list
                }
                else {
                    Object.assign(this.request, data.request)
                    Object.assign(this.config, data.config)
                }
            },
            goLogin() {
                location.href = '/?redirectUrl=zrest.html'
            }
        },
        computed: {},
        components: {}
    }

    function parseJSON(s) {
        //s = s.replace(/([{,]\s*)(\w+):/g, '$1"$2":')
        return eval('(' + s + ')')
    }
</script>

<style scoped lang="scss">
    .zrest {
        padding: .1rem;
    }

    .pre {
        border: 1px solid #ddd;
        min-height: .4rem;
        padding: .05rem;
    }
</style>

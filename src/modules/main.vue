<template>
    <div class="pd-10 main-page">
        <h3><i class="primay-color my-icon-success"></i> Home Page</h3>

        <div style="padding: 20px 0;">
            <el-button @click="callMockApi" size="small" type="primary">call mocked api</el-button>
            <el-button :loading="loading" @click="callLoading" size="small">call base api</el-button>
            <el-button @click="callUnmockedApi" size="small">call base api(not mocked)</el-button>
            <el-button @click="callOtherApi" size="small">call other api servers by {xxx} prefix</el-button>
        </div>

        <header>Ajax Result: {{data}}</header>
        <hr>
        <button @click="getAndGo">stage1</button>
        <button @click="getAndGo2">stage2</button>
        <button @click="getAndGo3">stage3</button>

        <a href="./" class="right">
            <button>Logout</button>
        </a>

        <hr>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data: null,
                loading: false,
            }
        },
        methods: {
            callMockApi() {
                var pars = {id: +new Date(), a: 1, b: 2}
                this.$x.post('/api/test_api', pars)
                    .then(res => {
                        this.data = res.data;
                    })
            },
            callLoading() {
                this.loading = true
                this.$x.post('/api/test_promise', null, {maskOptions: false})
                    .then(res => {
                        this.data = res.data;
                    })
                    .finally(t => {
                        this.loading = false
                    })
            },
            callUnmockedApi() {
                this.$x.post('/api/get_data', {}, {showError: false, maskOptions: {target: '.main-page'}})
                    .then(res => {
                    })
                    .catch(e => {
                        this.$x.toast.error('接口 http://aaa.bbb.com/api/get_data 访问失败，且未设置mock数据')
                    })
            },
            callOtherApi() {
                this.$x.post('{node_api}/api/get_xxx', {}, {showError: 'alert'})
                    .then(res => {
                    })
            },
            getAndGo() {
                this.$router.push('/stage1')
            },
            getAndGo2() {
                this.$router.push('/stage2')
            },
            getAndGo3() {
                this.$router.push('/stage2/stage3')
            },
            // loadExternalRoutes() {
            //     window.addExternalRoutes = function (routes) {
            //         this.$router.addRoutes(routes)
            //         this.$router.push('/zrest')
            //     }
            //     require('../js/utils/loadScripts')('http://localhost:63342/vue-element-ui-scaffold-webpack4/dist/js/../../dist/js/zrest-route.bee65ae7.js')
            // }
        },
        components: {}
    }
</script>

<style scoped lang="scss">
    .main-page {

    }
</style>

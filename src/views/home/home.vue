<template>
    <div class="pd-10 main-page">
        <h3><i class="primay-color my-icon-success"></i> Home Page</h3>

        <div style="padding: 20px 0;">
            <el-button @click="callMockApi" :loading="loading" size="small" type="primary">call mocked api</el-button>
            <el-button @click="callLoading" size="small" type="primary">call base api</el-button>
            <el-button @click="callUnmockedApi" size="small">call base api(not mocked)</el-button>
            <el-button @click="callOtherApi" size="small">call other api servers by {xxx} prefix</el-button>
        </div>

        <header>Ajax Result: {{data}}</header>
        <hr>
        <el-table :data="dataList">
            <el-table-column prop="id" label="id"></el-table-column>
            <el-table-column prop="name" label="name"></el-table-column>
            <el-table-column prop="date" label="date">
                <template slot-scope="{row}">{{formatDate(row.date)}}</template>
            </el-table-column>
            <el-table-column label="operation">
                <template>
                    <el-button type="text" size="small">Edit</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :total="total" :page-size="pageSize" :current-page.sync="pageIndex"
                       @current-change="callLoading"></el-pagination>
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
    import formatData from '../../js/formatData'

    export default {
        data() {
            return {
                data: null,
                dataList: [],
                total: 0,
                pageIndex: 1,
                pageSize: 6,
                loading: false,
            }
        },
        methods: {
            callMockApi() {
                this.loading = true
                this.$x.post('/api/test_api', {}, { maskOptions: false })
                    .then(res => {
                        this.data = res.data;
                    })
                    .finally(t => {
                        this.loading = false
                    })
            },
            callLoading() {
                const pars = { pageSize: this.pageSize, pageIndex: this.pageIndex }
                this.$x.post('/api/test_data', pars)
                    .then(res => {
                        this.dataList = res.data;
                        this.total = res.total
                        this.data = { total: res.total }
                    })
            },
            callUnmockedApi() {
                this.$x.post('/api/get_data', {}, { showError: false, maskOptions: { target: '.main-page' } })
                    .then(res => {
                    })
                    .catch(e => {
                        this.$x.toast.error('接口 http://aaa.bbb.com/api/get_data 访问失败，且未设置mock数据')
                    })
            },
            callOtherApi() {
                this.$x.post('{node_api}/api/get_xxx', {}, { showError: 'alert' })
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
                this.$router.push('/stage3')
            },
            formatDate: formatData.formatDate,
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

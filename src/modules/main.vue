<template>
    <div class="main-page">
        <h3>Home Page</h3>
        <header>Ajax Result: {{data}}</header>
        <hr>
        <button @click="getAndGo" class="mask-target">productList</button>
        <button @click="getAndGo2">myCart</button>
        <button @click="getAndGo3">stage3</button>

        <a href="/" class="right">
            <button>Logout</button>
        </a>

        <hr>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        created() {
            var pars = {a: 1, b: 2}
            this.$x.post('/api/test_api', pars)
                .then(res => {
                    this.data = res.data;
                })
        },
        data() {
            return {
                data: null
            }
        },
        methods: {
            getAndGo() {
                this.$router.push('/productList')
            },
            getAndGo2() {
                this.$x.post('/api/test_delay')
                    .then(res => {
                        this.data = res.data;
                        this.$router.push('/myCart')
                    })
            },
            getAndGo3() {
                this.$router.push('/myCart/stage3')
            }
        },
        components: {}
    }
</script>

<style scoped lang="scss">
    .main-page {
        padding: .2rem;
    }
</style>
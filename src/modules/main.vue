<template>
    <div class="pd-10 main-page">
        <h3>Home Page</h3>
        <header>Ajax Result: {{data}}</header>
        <hr>
        <button @click="getAndGo" class="mask-target">stage1</button>
        <button @click="getAndGo2">stage2</button>
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
                this.$router.push('/stage1')
            },
            getAndGo2() {
                this.$x.post('/api/test_delay')
                    .then(res => {
                        this.data = res.data;
                        this.$router.push('/stage2')
                    })
            },
            getAndGo3() {
                this.$router.push('/stage2/stage3')
            }
        },
        components: {}
    }
</script>

<style scoped lang="scss">
    .main-page {

    }
</style>
<script>
    export default {
        props: {},
        data() {
            return {};
        },
        render(h) {
            // jsx sample
            return (
                <div>
                    <h3>This is stage1 here. Go <a href="#/stage2">stage2</a></h3>
                    <button onClick={() => this.$router.back()}>Back</button>
                </div>
            )
        },
        methods: {},
        computed: {},
        components: {}
    }
</script>

<style scoped lang="scss">

</style>

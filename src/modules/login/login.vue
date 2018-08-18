<script>
    export default {
        data() {
            return {
                /*IFDEBUG
                    devMsg: '(by js-conditional-compile-loader)',
                FIDEBUG*/
                name: 'dude',
            };
        },
        render(h) {
            return (
                <div class="bg">
                    <h3>
                        Hi {this.name}, Login goes here
                    </h3>
                    <a href="main.html">main</a>
                    <br/>
                    <a href="pageB.html">pageB</a>
                    <br/>
                    <a href="themeColor.html">theme colors</a>
                    {
                        /*IFDEBUG
                            <div><hr/>This message is only shown while process.env.NODE_ENV == 'development'. {this.devMsg}</div>
                        FIDEBUG*/
                    }
                </div>
            )
        },
    }
</script>
<style scoped lang="scss">
    @import "../../assets/css/defines.scss";

    .bg {
        background: $--color-primary-light-6;
        padding: 20px;
    }
</style>
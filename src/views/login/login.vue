<script>
    import footCode from '../../component/footCode'

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
            // jsx sample
            return (
                <div class="pd-10 bg">
                    <h3><i className="my-icon-warning"></i>
                        Hi {this.name}, Login goes here
                    </h3>
                    <div><a href="main.html">main</a></div>
                    <div><a href="pageB.html">pageB</a></div>
                    <div><a href="themeColor.html">theme colors</a></div>
                    <div><a href="iconfontPreview.html">iconfont</a></div>
                    {
                        /*IFDEBUG
                        <div>
                            <hr/>
                            This message is only shown while process.env.NODE_ENV === 'development'. {this.devMsg}</div>
                        FIDEBUG*/
                    }

                    <foot-code></foot-code>
                </div>
            )
        },
        components: { footCode }
    }
</script>
<style scoped lang="scss">
    @import "../../css/defines.scss";

    .bg {
        background: $--color-primary-light-6;

        h3 {
            font-size: 20px
        }
    }
</style>

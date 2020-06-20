<template>
    <div class="pd-10 bg">
        <h3><i className="my-icon-warning"></i>
            Hi {this.name}, here is the entry
        </h3>
        <hr/>
        <div><a href="main.html">main</a></div>
        <div><a href="pageB.html">pageB</a></div>
        <div><a href="themeColor.html">theme colors</a></div>
        <div><a href="iconfontPreview.html">iconfont</a></div>
        <div><a href="main.html#/zrest">rest api tool</a></div>

        /*IFDEBUG
        <div class="cond-msg">
            <hr/>
            This message is only shown while process.env.NODE_ENV === 'development'.
        </div>
        <debug-info :info="someData"></debug-info>
        <debug-info :info="devMsg" style="color:red;left:30%;"></debug-info>
        FIDEBUG*/


        <foot-code></foot-code>
    </div>
</template>

<script>
    import footCode from '../../component/footCode'
    import './login.scss'

    export default {
        data() {
            return {
                /*IFDEBUG
                    devMsg: '(This is shown by js-conditional-compile-loader)',
                FIDEBUG*/
                name: 'dude',
                someData: {
                    info: 'This is a debug message, only shown while process.env.NODE_ENV === \'development\'',
                    testData: [
                        { id: 122, title: 'title1', url: 'abc.html' },
                        { id: 133, title: 'title2', url: '123.html' },
                        { id: 366, title: 'title33', url: 'test.html' },
                    ]
                }
            };
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

    .lg-form {
        width: 200px;
    }

    /*IFTRUE_isDebug*/
    .cond-msg {
        color: #c655dd;
    }

    /* FITRUE_isDebug */
</style>

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
                <div>
                    <h3>
                        Hi {this.name}, Login goes here
                    </h3>
                    <a href="main.html">main</a>
                    <br/>
                    <a href="pageB.html">pageB</a>
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
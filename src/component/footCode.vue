<template>
    <footer
        style="
            color: #606266;
            font-size: 12px;
            margin-top: 150px;
            text-align: center;
        "
    >
        <i>Github source code：</i>
        <a
            href="https://github.com/hzsrc/vue3-element-plus-webpack"
            target="_blank"
        >
            vue3-element-plus-webpack
        </a>
        <div>
            <i>{{ testMsg }}</i>
        </div>
    </footer>
</template>

<script>
    export default {
        data() {
            return {
                testMsg: '',
            };
        },
        /* IFTRUE_envTest */
        created() {
            this.testMsg =
                "This message is only shown while process.env.ENV_CONFIG === 'test'. (by js-conditional-compile-loader)";
        },
    /* FITRUE_envTest */
    };
</script>

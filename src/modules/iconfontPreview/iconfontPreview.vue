<style>
    .info {
        padding: 10px 20px;
    }

    .flex-tb {
        display: flex;
        flex-flow: wrap;
        padding: 0 10px 50px;
    }

    .flex-tb > section {
        display: flex;
        flex-flow: column;
        flex: 0 0 240px;
        align-items: center;
        margin-bottom: 50px;
    }

    .flex-tb > section > header {
        height: 30px;
        outline: none;
    }

    .flex-tb i {
        font-size: 40px;
        font-style: normal;
        line-height: 1;
        display: block;
    }

    .flex-tb div:hover {
        position: absolute;
        background: #fff;
        border: 1px solid #ddd;
    }

    .flex-tb div:hover > i {
        font-size: 200px;
    }
</style>
<template>
    <div>
        <div class="info">
            <h2>my-app-icon (5)</h2>
            <div>Class name prefix: my-icon-</div>
        </div>
        <hr/>
        <div class="flex-tb">
            <section v-for="font in fontList" :key="font.name">
                <header contenteditable>my-icon-{{font.name}}</header>
                <div><i :class="'my-icon-'+font.name"></i></div>
            </section>

        </div>

        <foot-code></foot-code>
    </div>
</template>
<script>
    import fontList from '../../iconfont/fonts/fonts.js';
    import footCode from '../../component/footCode'

    export default {
        data() {
            return {
                fontList
            }
        },
        components: { footCode }
    }
</script>

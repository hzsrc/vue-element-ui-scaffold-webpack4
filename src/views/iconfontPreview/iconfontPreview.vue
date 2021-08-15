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
        padding-bottom: 50px;
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
        top: 20px;
    }

    .flex-tb div:hover > i {
        font-size: 200px;
    }
    
    td { padding: 5px 10px; }
    input { border: 0; outline: 0; width: 150px; text-align: center; background: transparent; }
    section { position: relative; }
</style>
<template>
    <div>
    <h4>
    Modify or add a svg file in dir [src/iconfont/svgs], they will be parsed to iconfonts with css, and hot-loaded. <br/>
    修改或者添加svg文件到[src/iconfont/svgs]目录，将自动生成为iconfonts以及配套的css，支持热重载。</h4>
    <hr/>
    <div class="info">
        <h3>my-app-icon (5 icons, click to copy)</h3>
        Class name prefix: <b>my-icon-</b> &emsp; You can use it like: &lt;i class="my-icon-success"&gt;&lt;/i&gt;
    </div>
        <hr/>
        <div class="flex-tb">
            <section v-for="font in fontList" :key="font.name" @click="copyCls">
                <input :value="'my-icon-'+font.name" />
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
        methods:{
          copyCls(e){
            var el = e.currentTarget.querySelector('input')
            el.focus();
            el.select()
            document.execCommand('copy', false, null);            
          }
        },
        components: { footCode }
    }
</script>

require('../../css/index.scss');
import iconfontPreview from '../../modules/iconfontPreview/iconfontPreview';
import Vue from 'vue';


new Vue({
    el: '#app',
    template: `
<div>
    <h3 style="padding:10px">Iconfont demo. You can modify or add a svg file in [src/iconfont/svgs], and see it refreshing.</h3><hr/>
    <iconfont-preview></iconfont-preview>
</div>`,
    components: {iconfontPreview}
})

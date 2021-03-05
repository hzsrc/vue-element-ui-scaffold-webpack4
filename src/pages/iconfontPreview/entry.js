import iconfontPreview from '../../views/iconfontPreview/iconfontPreview';
import { createApp } from 'vue';

require('../../css/index.scss');

const app = createApp({
    render: h =>
        <div>
            <h3 style="padding:10px">Iconfont demo. You can modify or add a svg file in [src/iconfont/svgs], and see it
                refreshing.</h3>
            <hr/>
            <iconfont-preview></iconfont-preview>
        </div>,
    components: { iconfontPreview },
});
app.mount('#app')

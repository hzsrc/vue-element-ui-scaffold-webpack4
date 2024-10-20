import { createApp } from 'vue';
import $x from '../js/$x';

import debugInfo from '../component/debugInfo.vue';
import { initThemeColor } from '../js/themeColorClient';

require('../css/index.scss');
require('element-plus/theme-chalk/src/icon.scss');


// 仅对 npm run build-preview 时，使用客户端mock数据（拦截XMLHttpRequest）
/* IFTRUE_isPreview */
require('../../mock/mockClient');
/* FITRUE_isPreview */


/* IFDEBUG
window.$x = $x
IFDEBUG */


export default function (compo) {
    initThemeColor();

    const app = createApp(compo)

    app.config.globalProperties.$ELEMENT = { size: 'small' };

    // 通用组件，便于处理
    app.config.globalProperties.$x = $x;

    //调试信息组件
    app.use(debugInfo);

    return app
}

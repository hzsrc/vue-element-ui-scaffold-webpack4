import { createApp } from 'vue';
import $x from '../js/$x';
import router from '../router/routerMain.js';
import main from '../views/app.vue';
import { ElButton, ElTable, ElTableColumn, ElPagination, ElRow } from 'element-plus';
import { initThemeColor } from '../js/themeColorClient';
import debugInfo from '../component/debugInfo.vue';

const app = createApp(main);
require('../css/index.scss');

// 仅对 npm run build-preview 时，使用客户端mock数据（拦截XMLHttpRequest）
/* IFTRUE_isPreview */
require('../../mock/mockClient');
/* FITRUE_isPreview */

app.config.globalProperties.$ELEMENT = { size: 'small' };

// 通用组件，便于处理
app.config.globalProperties.$x = $x;

// 常用组件在这注册。即可实现按需加载，又不必每个页面调用Vue.use。
app.use(ElButton).use(ElTable).use(ElTableColumn).use(ElPagination).use(ElRow);

//调试信息组件
app.use(debugInfo);
app.use(router);

initThemeColor();

app.mount('#app');
/* IFDEBUG
window.$x = $x
IFDEBUG */

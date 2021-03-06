import router from '../router/routerMain.js';
import main from '../views/app.vue';
import { ElButton, ElTable, ElTableColumn, ElPagination, ElRow } from 'element-plus';
import pageInit from '../js/pageInit';

var app = pageInit(main)
// 常用组件在这注册。即可实现按需加载，又不必每个页面调用Vue.use。
app.use(ElButton).use(ElTable).use(ElTableColumn).use(ElPagination).use(ElRow);

app.use(router);

app.mount('#app');

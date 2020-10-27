import Vue from 'vue'
import $x from '../js/$x'
import router from '../router/routerMain.js'
import main from '../views/app.vue'
import { Button, Table, TableColumn, Pagination } from 'element-ui'
import { initThemeColor } from '../js/themeColorClient'
import debugInfo from '../component/debugInfo.vue'

require('../css/index.scss');

// 仅对 npm run build-preview 时，使用客户端mock数据（拦截XMLHttpRequest）
/* IFTRUE_isPreview */
require('../../mock/mockClient')
/* FITRUE_isPreview */

Vue.prototype.$ELEMENT = { size: 'small' }

// 通用组件，便于处理
Vue.prototype.$x = Vue.$x = $x;

// 常用组件在这注册。即可实现按需加载，又不必每个页面调用Vue.use。
Vue.use(Button).use(Table).use(TableColumn).use(Pagination);

//调试信息组件
Vue.use(debugInfo)

initThemeColor()
new Vue({
    el: '#app',
    router,
    render: h => h(main),
});

/* IFDEBUG
window.$x = $x
IFDEBUG */

import { createApp } from 'vue';
import $x from '../js/$x';
import themeColor from '../views/themeColor/themeColor.vue';
import { initThemeColor } from '../js/themeColorClient';

require('../css/index.scss');

const app = createApp(themeColor);
// window.Vue = Vue
app.config.globalProperties.$ELEMENT = { size: 'small' };

// 通用组件，便于处理
app.config.globalProperties.$x = $x;

initThemeColor();

app.mount('#app');

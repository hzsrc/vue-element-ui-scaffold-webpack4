//Login page

import { createApp } from 'vue';
import login from '../views/login/login.vue';
import debugInfo from '../component/debugInfo';

require('../css/index.scss');

const app = createApp(login);

//调试信息组件
app.use(debugInfo);

app.mount('#app');

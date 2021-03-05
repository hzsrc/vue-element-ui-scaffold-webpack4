import { createRouter, createWebHashHistory } from 'vue-router';
import spinRoute from './spinRoute';

//同步加载，合并打包
import home from '../views/home/home.vue';
import stage1 from '../views/stage1/stage1.vue';

// 组件懒加载：组件会被webpack打包多个js，当路由被访问的时候只加载相应组件js
const stage2 = () => import('../views/stage2/stage2.vue');

const zrest = () => import('../views/zrest/zrest.vue');

//组件懒加载，下载js时显示spin状态
const stage3 = () => spinRoute.require(import('../views/stage3/stage3.vue'));

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: home, //sync
            children: [
                { path: '/stage1', component: stage1 }, //sync
                {
                    path: '/stage2',
                    component: stage2, //async
                    children: [
                        { path: '/stage3', component: stage3 }, //async + spin
                    ],
                },
            ],
        },
        { path: '/zrest', component: zrest }, //sync
        //{ path: /:catchAll(.*), component: page404 },
    ],
});

export default router;

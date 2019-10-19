import Vue from 'vue'
import Router from 'vue-router'
import spinRoute from './spinRoute';

//同步加载，合并打包
import home from '../views/home/home.vue';
import stage1 from '../views/stage1/stage1.vue';

Vue.use(Router)

// 组件懒加载：组件会被webpack打包多个js，当路由被访问的时候只加载相应组件js
const stage2 = resolve => require(['../views/stage2/stage2.vue'], resolve);

const zrest = resolve => require(['../views/zrest/zrest.vue'], resolve);

//组件懒加载，下载js时显示spin状态
const stage3 = resolve => {
    spinRoute.show();
    require(['../views/stage3/stage3.vue'], spinRoute.resolve(resolve))
}

const router = new Router({
    mode: 'hash',
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
                    ]
                }
            ]
        },
        { path: '/zrest', component: zrest }, //sync
    ],
})

export default router;

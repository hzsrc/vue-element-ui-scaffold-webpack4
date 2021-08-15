import Vue from 'vue'
import Router from 'vue-router'
import spinRoute from './spinRoute';

//同步加载，合并打包
import home from '../views/home/home.vue';

Vue.use(Router)

//组件懒加载，下载也页面组件js时显示spin状态
const stage3 = () => spinRoute.require(import('../views/stage3/stage3.vue'));

const router = new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            component: home, //sync
            children: [
                { path: '', component: () => spinRoute.require(import('../views/home/homeInner.vue')) },
                { path: '/theme', component: () => spinRoute.require(import('../views/themeColor/themeColor.vue')) },
                { path: '/stage1', component: () => spinRoute.require(import('../views/stage1/stage1.vue')) },
                {
                    path: '/stage2',
                    component: () => spinRoute.require(import('../views/stage2/stage2.vue')),
                    children: [
                        {
                            path: '/stage2/stage3',
                            component: stage3
                        },
                    ]
                },
                {
                    path: '/icons',
                    component: () => spinRoute.require(import('../views/iconfontPreview/iconfontPreview.vue'))
                },
                { path: '/zrest', component: () => spinRoute.require(import('../views/zrest/zrest.vue')) },
                {
                    path: '/layout',
                    component: () => spinRoute.require(import('../views/slot-layout.vue'))
                },
                { path: '*', component: () => spinRoute.require(import('../views/home/404.vue')) }
            ],
        },
    ],
})
/*IFDEBUG
//禁用重复警告
'push,replace'.split(',').map(method => router[method] = function () {
    return Router.prototype[method].apply(this, arguments).catch(t => 0)
})
 FIDEBUG*/
export default router;

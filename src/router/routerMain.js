import Vue from 'vue'
import Router from 'vue-router'
import spinRoute from './spinRoute';

Vue.use(Router)

//同步加载，合并打包
import productList from '../modules/productList/productList.vue';

// 组件懒加载：组件会被webpack打包多个js，当路由被访问的时候只加载相应组件js
const myCart = resolve => require(['../modules/myCart/myCart.vue'], resolve);

//组件懒加载，下载js时显示spin状态
const stage3 = resolve => {
    spinRoute.show();
    require(['../modules/stage3/stage3.vue'], spinRoute.resolve(resolve))
}

const router = new Router({
    mode: 'hash',
    routes: [
        {path: '/productList', component: productList},               //sync
        {
            path: '/myCart',
            component: myCart,                              //async
            children: [
                {path: '/myCart/stage3', component: stage3},  //async + spin
            ]
        },
    ],
})

export default router;
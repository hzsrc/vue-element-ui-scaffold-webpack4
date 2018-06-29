import Vue from 'vue'
import Vuex from 'vuex'
import productList from './modules/productList'
import myCart from './modules/myCart'

//import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        productList,
        myCart,
    },
    strict: debug,
    //plugins: debug ? [createLogger()] : []
})

import Vue from 'vue'
import Vuex from 'vuex'
import stage1 from './modules/stage1'
import stage2 from './modules/stage2'

//import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        stage1,
        stage2,
    },
    strict: debug,
    //plugins: debug ? [createLogger()] : []
})

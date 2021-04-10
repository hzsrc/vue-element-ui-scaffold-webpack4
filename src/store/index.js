import Vue from 'vue'
import Vuex from 'vuex'

//import productList from './modules/productList'

Vue.use(Vuex)

// state
const state = {
    topMenus: [], //记录点击状态
    topMenuIndex: 0, //记录页面滚动距离
}

// getters
const getters = {
    leftMenus: (state, getters) => {
        const topMenu = state.topMenus[state.topMenuIndex]
        return (topMenu && topMenu.children) || []
    },
}

// actions
const actions = {
    setTopMenus({ commit }, topMenus) {
        commit('SET_TOPMENUS', topMenus)
    },
    setTopMenuIndex({ commit }, index) {
        commit('SET_TOPMENUINDEX', -1); //先清空
        setTimeout(() => commit('SET_TOPMENUINDEX', index), 0);
    },
};

// mutations
const mutations = {
    SET_TOPMENUS(state, topMenus) {
        state.topMenus = topMenus
    },
    SET_TOPMENUINDEX(state, index) {
        state.topMenuIndex = index
    },
}

export default new Vuex.Store({
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
    //modules: {
    //productList,
    //},
})

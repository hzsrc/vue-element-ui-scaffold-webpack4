import Vue from 'vue'
import Vuex from 'vuex'
//import productList from './modules/productList'

Vue.use(Vuex)

// state
const state = {
    topMenus: [],
    topMenuIndex: 0,
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
    setTopMenus({ commit }, { topMenus, vm }) {
        commit('SET_TOPMENUS', topMenus)
        var path = vm.$route.path
        var index = topMenus.findIndex(menu => {
            if (menu.url === path) return true
            if (menu.children) return menu.children.find(m => m.url === path)
        })
        if (index > -1) commit('SET_TOPMENUINDEX', index)
    },
    setTopMenuIndex({ commit }, index) {
        commit('SET_TOPMENUINDEX', index);
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

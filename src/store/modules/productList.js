// initial state
const state = {
    all: []
}

// getters
const getters = {}

// actions
const actions = {
    async getAllProducts({commit, state}) {
        if (!state.all.length) {
            var res = await this.$x.post('/getProducts')
                .catch(e => this.$x.toast.error(e));
            commit('setProducts', res.data)
        }
    },
}

// mutations
const mutations = {
    setProducts(state, products) {
        state.all = products
    },
    increseProductInventory(state, {id, number}) {
        const product = state.all.find(product => product.id === id)
        if (product)
            product.inventory += number
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

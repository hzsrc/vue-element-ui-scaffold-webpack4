// cart
const state = {
    items: [],
    checkoutStatus: null
}

// getters
const getters = {
    cartProducts: (state, getters, rootState) => {
        return state.items.map(({productId, quantity}) => {
            const product = rootState.stage1.all.find(product => product.id === productId)
            return {
                title: product.title,
                price: product.price,
                quantity,
                productId,
            }
        })
    },

    cartTotalPrice: (state, getters) => {
        return getters.cartProducts.reduce((total, product) => {
            return total + product.price * product.quantity
        }, 0)
    }
}

// actions
const actions = {
    purcharse({commit, state}, products) {
        const savedCartItems = [...state.items]
        commit('setPurcharseStatus', null)
        // empty cart
        commit('setCartItems', {items: []})

        this.$x.post('/buyProducts', products)
            .then(t => {
                commit('setPurcharseStatus', 'successful')
            })
            .catch(e => {
                commit('setPurcharseStatus', 'failed')
                // rollback to the cart saved before sending the request
                commit('setCartItems', {items: savedCartItems})
            })
    },

    addProductToCart({state, commit}, product) {
        commit('setPurcharseStatus', null)
        if (product.inventory > 0) {
            commit('pushProductToCart', product)
            // remove 1 item from stock
            commit('stage1/increseProductInventory', {id: product.id, number: -1}, {root: true})
        }
    },

    removeCartItem({state, commit}, item) {
        commit('setPurcharseStatus', null)
        commit('removeCartItem', item)
        commit('stage1/increseProductInventory', {id: item.productId, number: 1}, {root: true})
    },
};

// mutations
const mutations = {
    pushProductToCart(state, product) {
        const cartItem = state.items.find(item => item.productId === product.id)
        if (!cartItem) {
            state.items.push({
                productId: product.id,
                quantity: 1,
            })
        }
        else {
            cartItem.quantity++
        }
    },
    removeCartItem(state, {productId}) {
        var index = state.items.findIndex(item => item.productId == productId)
        var item = state.items[index]
        if (item) {
            if (item.quantity == 1)
                state.items.splice(index, 1)
            else
                item.quantity--;
        }
    },

    setCartItems(state, {items}) {
        state.items = items
    },

    setPurcharseStatus(state, status) {
        state.checkoutStatus = status
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

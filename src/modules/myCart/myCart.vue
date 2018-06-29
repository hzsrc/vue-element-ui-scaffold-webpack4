<template>
    <div>
        <h3>This is myCart here</h3>
        <button @click="$router.back()">Back</button>

        <router-view></router-view>


        <hr/>
        <div class="cart">
            <h2>Your Cart</h2>
            <p v-show="!cartItems.length"><i>Please add some products to cart.</i></p>
            <ul>
                <li v-for="product in cartItems" class="cart-item">
                    {{ product.title }} - {{ product.price }} x {{product.quantity }}
                    <span @click="removeCartItem(product)" class="right pointer main-color">Remove</span>
                </li>
            </ul>
            <p>Total: {{ total }}</p>
            <p>
                <button @click="$router.push('/productList')">Back</button>
                <button :disabled="!cartItems.length" @click="purcharse(cartItems)">purcharse</button>
            </p>
            <p v-show="checkoutStatus">purcharse {{ checkoutStatus }}.</p>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapState} from 'vuex'

    export default {
        props: {},
        data() {
            return {};
        },
        methods: {
            purcharse(cartItems) {
                this.$store.dispatch('myCart/purcharse', cartItems)
            },
            removeCartItem(cartItems) {
                this.$store.dispatch('myCart/removeCartItem', cartItems)
            }
        },
        computed: {
            ...mapState({
                checkoutStatus: state => state.myCart.checkoutStatus
            }),
            ...mapGetters('myCart', {
                cartItems: 'cartProducts',
                total: 'cartTotalPrice'
            })
        },
        components: {}
    }
</script>

<style scoped lang="scss">
    @import "../../assets/css/defines.scss";

    .cart {
        border: $--table-border;
    }

    .cart-item {
        line-height: .3rem;
    }

    .main-color {
        color: $color-primary;
    }
</style>

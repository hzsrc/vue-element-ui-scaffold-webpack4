<template>
    <div>
        <h3>This is stage1 here</h3>
        <button @click="$router.back()">Back</button>


        <hr>
        <h2>Products</h2>
        <ul>
            <li v-for="product in products">
                {{ product.title }} - ${{ product.price }}
                <span class="right">{{product.inventory}} left</span>
                <br>
                <button
                        :disabled="!product.inventory"
                        @click="addProductToCart(product)">
                    Add to cart
                </button>
                <br/><br/>
            </li>
        </ul>
        <button @click="$router.push('/stage2')">Go purcharse</button>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        props: {},
        data() {
            return {};
        },
        created() {
            this.$store.dispatch('stage1/getAllProducts')
        },
        methods: mapActions('stage2', [
            'addProductToCart'
        ]),
        computed: mapState({
            products: state => state.stage1.all
        }),
        components: {}
    }
</script>

<style scoped lang="scss">

</style>

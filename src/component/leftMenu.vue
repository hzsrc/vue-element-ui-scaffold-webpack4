<template>
    <ul class="f-column white-bg lft-menu">
        <li v-for="(menu, index) in leftMenus" :index="String(index)" :key="menu.url"
            @click="clickMenu(menu,index)" :class="{active: index===curIndex}" class="pointer ellipsis">
            <i :class="menu.icon"></i>
            <span slot="title">{{menu.title}}</span>
        </li>
    </ul>
</template>

<script>
    import Vue from 'vue'
    import { Menu, MenuItem } from 'element-ui'

    Vue.use(Menu).use(MenuItem)
    export default {
        props: {
            leftMenus: Array
        },
        data() {
            return {
                curIndex: 0
            }
        },
        watch: {
            leftMenus: {
                handler(menus) {
                    this.curIndex = 0
                    var curIndex = menus.findIndex(menu => menu.url === this.$route.path)
                    if (curIndex > -1) {
                        this.curIndex = curIndex
                    }
                    var curMenu = menus[curIndex] || menus[0]
                    if (curMenu) {
                        this.goMenu(curMenu)
                    }
                },
                immediate: true
            }
        },
        methods: {
            clickMenu(menu, index) {
                this.curIndex = index
                this.goMenu(menu)
            },
            goMenu(menu) {
                if (this.$route.path !== menu.url)
                    this.$router.push(menu.url)
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../css/defines.scss";

    .lft-menu li {
        height: 50px;
        line-height: 50px;
        padding-left: 10px;

        &:hover {
            color: $--color-primary-dark-2;
        }
    }

    .active {
        background: $--color-primary-light-95;
        color: $--color-primary-dark-1;
    }
</style>

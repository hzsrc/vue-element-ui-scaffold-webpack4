<template>
    <header class="t-header">
        <aside class="logo h100 left f-middle">
            <img src="../images/logo.jpg"/>
        </aside>
        <aside v-if="userInfo" class="flex-center pd-10 right">
            <el-avatar icon="el-icon-user-solid" size="small"></el-avatar>
            <el-dropdown>
                <span class="pointer el-dropdown-link"
                >&nbsp;{{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>菜单1</el-dropdown-item>
                    <el-dropdown-item>菜单1</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            &emsp;
            <change-color></change-color>
            &emsp;
            <a class="el-icon-switch-button" @click="logOut"></a>
        </aside>
        <div class="h100 flex-center t-menus">
            <nav class="h100 pointer flex-center"
                 v-for="(menu, index) in topMenus" :index="String(index)" :key="index"
                 :class="{active: curIndex==index}" @click="clickMenu(index)">
                <i v-if="menu.icon" class="menu.icon"></i>
                {{menu.title}}
            </nav>
        </div>
        <debug-info :info="topMenus"></debug-info>
    </header>
</template>

<script>
    import Vue from 'vue'
    import { Avatar, Dropdown, DropdownMenu, DropdownItem } from 'element-ui'
    import changeColor from '../views/themeColor/changeColor.vue'

    Vue.use(Avatar).use(Dropdown).use(DropdownMenu).use(DropdownItem)
    export default {
        props: {
            topMenus: Array,
            userInfo: Object,
        },
        data() {
            return {
                curIndex: 0
            }
        },
        methods: {
            clickMenu(index) {
                this.curIndex = index
                this.$store.dispatch('setTopMenuIndex', index)
                var topMenu = this.topMenus[index]
                if (!topMenu.children || topMenu.children.length === 0) {
                    this.$router.push(topMenu.url)
                }
            },
            logOut() {
                location.href = 'login.html'
            }
        },
        components: { changeColor }
    }
</script>
<style scoped lang="scss">
    @import "../css/defines";

    .t-header {
        padding: 0 10px;
        background: $--color-primary-dark-7;
        color: #eee;

        ::v-deep .el-dropdown {
            color: #eee;
        }
    }

    .logo {
        padding-left: 20px;
    }

    .t-menus {
        > nav {
            padding: 0 20px;

            &.active {
                background: $--color-primary-dark-2;
            }

            &:hover {
                color: #fff;
            }
        }
    }

    .el-icon-switch-button {
        font-size: 20px;
    }
</style>

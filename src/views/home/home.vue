<template>
    <div class="main-page full-ctn">
        <top-header class="banner" :top-menus="topMenus" :user-info="userInfo"></top-header>
        <div class="full-ctn body-bg">
            <left-menu v-if="leftMenus" class="l-menu" :left-menus="leftMenus"></left-menu>
            <router-view class="auto-bar">
                <home-inner></home-inner>
            </router-view>
        </div>
    </div>
</template>

<script>
    import topHeader from '../../component/topHeader.vue'
    import leftMenu from '../../component/leftMenu.vue'
    import { mapGetters, mapState } from 'vuex'
    import homeInner from './homeInner.vue'

    export default {
        data() {
            return {
                userInfo: {}
            }
        },
        async created() {
            const infos = await this.$x.post('/api/getInfo')
            this.userInfo = infos
            this.$x.userInfo.setUserInfo(infos)
            this.getMenus()
        },
        methods: {
            async getMenus() {
                const menus = await this.$x.post('/api/getMenus')
                this.$store.dispatch('setTopMenus', menus || []);
            }
        },
        components: { topHeader, leftMenu, homeInner },
        computed: {
            ...mapGetters(['leftMenus']),
            ...mapState(['topMenus'])
        }
    }
</script>

<style scoped lang="scss">
    @import "../../css/defines";

    .banner {
        height: 50px;

        + * {
            height: calc(100% - 50px);
            bottom: 0;
        }
    }

    .l-menu {
        width: 150px;

        + * {
            width: calc(100% - 150px);
            right: 0
        }
    }

</style>

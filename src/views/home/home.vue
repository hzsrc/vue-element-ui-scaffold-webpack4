<template>
    <div class="main-page full-ctn">
        <top-header class="banner" :top-menus="topMenus" :user-info="userInfo"></top-header>
        <div class="full-ctn body-bg">
            <left-menu v-if="leftMenus && leftMenus.length" class="l-menu" :left-menus="leftMenus"></left-menu>
            <router-view class="auto-bar">
            </router-view>
        </div>
    </div>
</template>

<script>
    import topHeader from '../../component/topHeader.vue'
    import leftMenu from '../../component/leftMenu.vue'
    import { mapGetters, mapState } from 'vuex'

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
            await this.getMenus()
        },
        methods: {
            async getMenus() {
                const menus = await this.$x.post('/api/getMenus')
                this.$store.dispatch('setTopMenus', menus || []);
            }
        },
        components: { topHeader, leftMenu },
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

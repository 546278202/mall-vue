<template>
    <div class="nav-box">
        <a v-for="(item,index) in items" :key="index" @click="routerLink(item)" :class="{ act : active == item.path} ">
            <div><i class="iconfont" :class="item.icon"></i> </div>
            <div>{{item.text}}</div>
        </a>
    </div>
</template>
<script>
    import router from '../router'

    export default {
        data() {
            return {
                active: '/home',
                items: [
                    { path: "/home", text: "首页", icon: "icon-shouye1", active: 0 },
                    { path: "/productList",text: "分类",icon: "icon-shouye1", active: 1},
                    { path: "/buyCar", text: "购物车", icon: "icon-shouye1", active: 2 },
                    { path: "/mine", text: "我的", icon: "icon-shouye1", active: 3 }
                ]
            };
        },
        mounted() {
            if (window.location.hash.split('?')[0].split('#')[1] == '/') {
                this.active = '/home';
            } else {
                this.active = window.location.hash.split('?')[0].split('#')[1];
            }
        },
        methods: {
            routerLink(item) {
                this.$router.push(item.path);
                if (item.active == 2) return false;
                this.active = item.path;
            }
        }
    };
</script>
<style lang="scss" scoped>
    .nav-box {
        height: 45px;
        display: flex;
        align-items: center;
        width: 100%;
        position: fixed;
        bottom: 0;
        background: #fff;
        border-top: 1px solid #eee;
        font-size: 10px;

        a {
            flex: 1;
            text-align: center;
        }
    }

    .act {
        color: #f5d53b !important;
    }
</style>
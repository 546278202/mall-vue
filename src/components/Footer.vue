<template>
    <div class="nav-box">
        <router-link :to="{ path: 'home' }">
            <div>
                <i class="iconfont icon-shouye1"></i>
            </div>
            <div>首页</div>
        </router-link>
        <router-link :to="{ path: 'productList' }">
            <div>
                <i class="iconfont icon-shouye1"></i>
            </div>
            <div>分类</div>
        </router-link>
        <router-link :to="{ path: 'buyCar' }">
            <div>
                <i class="iconfont icon-shouye1"></i>
            </div>
            <div>购物车</div>
        </router-link>
        <router-link :to="{ path: 'mine' }">
            <div>
                <i class="iconfont icon-shouye1"></i>
            </div>
            <div>我的</div>
        </router-link>
    </div>
</template>
<script>
    export default {
        data() {
            return {
              
            };
        },
        mounted() {

        },
        methods: {
           
        },
        watch: {
         
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
</style>
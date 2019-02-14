<template>
    <div class="top-naver">
        <a class="top-left" style="line-height: 2.5rem;width: 2.25rem;" @click="$router.back(-1)">
            <i class="iconfont icon-fanhui" style="font-size: 1rem"></i>
        </a>
        <div class="searchInput">
            <i class="iconfont icon-iconfontzhizuobiaozhun22"></i>
            <input placeholder="请输入商品名称" @click="clickSearch" style="width: 100%;font-size:0.7rem;">
        </div>
        <slot name='logo'>
            <a class="top-right" style="width: 2.25rem;">
                <i class="iconfont icon-xiaoxi" style="font-size: 1rem ;"></i>
                <p style="font-size: 0.6rem ;">消息</p>
            </a>
        </slot>
    </div>
</template>
<script>
    import bus from '../assets/eventBus'
    export default {
        data() {
            return {

            }
        },
        mounted() {

        },
       
        methods: {
            goBack() {
                this.$route.go(-1)
            },

            //统计组件之间调用
            clickSearch() {
                bus.$emit("abc","1334")
            },

        },

    }
</script>
<style scoped>
    .top-naver{
        display:flex;
        height: 2.5rem;
        align-items: center;
        border-bottom: 1px solid #ccc;
        background: #fff;
    }
    .searchInput {
        position: relative;
        border: 1px solid #ccc;
        height: 1.5rem;
        border-radius: 1.5rem;
        overflow: hidden;
        line-height: 1.5rem;
        flex: 1;
        padding: 0 0.5rem;
        display: flex;
        align-items: center;
    }
</style>
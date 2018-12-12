<template>
    <section>
        <header style="line-height:2.5rem;display:flex;background:#fff;">
            <a id="top-back" style="flex:1;padding-left:5px;text-align:left;" @click="goback">
                <i class="iconfont icon-fanhui" style="font-size:1rem;"></i>
            </a>
            <a class="shop_car" style="flex:1;">购物车</a>
            <a class="Administration" style="flex:1;"></a>
        </header>
    </section>
</template>
<script>
export default {
    data () {
        return {

        }
    },
    mounted(){
    
    },
    methods: {
        goback:function(){
            this.$router.go(-1)
        }
    }

}
</script>
<style scoped>
    .searchInput{
        position: relative;
        height: 30px;
        border-radius: 30px;
        overflow: hidden;
        line-height: 30px;
        flex:1;
        padding: 0 10px;
        display: flex;
        align-items: center;
    }
</style>

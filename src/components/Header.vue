<template>
    <section>
        <header>
            <a id="top-back" style="flex:1;padding-left:5px;text-align:left;" @click="goback">
                <i class="iconfont icon-fanhui" style="font-size:1rem;"></i>
            </a>
            <a class="shop_car" style="flex:1;">{{this.$store.state.title}}</a>
            <slot name='logo'> <a class="" style="flex:1;"></a></slot>
           
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
    header{
        height:50px;
        box-sizing: border-box;
        line-height:50px;
        display:flex;
        background:#fff;
        border-bottom: 1px solid #dcdcdc;
        font-size: 18px;
    }
    
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

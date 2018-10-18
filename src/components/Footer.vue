<template>
    <div der="" class="naver">
        <section @click = "gotoAddress('/home')" class="guide_item"><span>首页</span> </section>
        <section @click = "gotoAddress('/productList')" class="guide_item"><span>分类</span> </section>
        <section @click = "gotoAddress('/buyCart')" class="guide_item"><span>购物车</span> </section>
        <section @click = "gotoAddress('/mine')" class="guide_item"><span>我的</span> </section>
    </div>
</template>
<script>
export default {
    data () {
        return {
            timeIndex: 0,      
        }
    },
    mounted(){
    
    },
    methods: {
        selectTimer(index) {
            this.timeIndex = index;
        },
        gotoAddress(path){
        	this.$router.push(path)
        }
    },

}
</script>
<style lang="scss" scoped>
    .searchInput{
        position: relative;
        border: 1px solid #ccc;
        height: 30px;
        border-radius: 30px;
        overflow: hidden;
        line-height: 30px;
        flex:1;
        padding: 0 10px;
        
    }
    .naver{
        display: flex;
        height: 50px;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        border-top: 1px solid #ccc;
        background: #fff;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        .guide_item{
            flex:1;
            font-size: 14px;
        }
    }
    
    .default{
        color: #404040;
    }
    .default-active{
        color: #f5d53b;
    }
</style>

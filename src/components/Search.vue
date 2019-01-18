<template>
    <div class="top-naver" style="display:flex;height: 50px;align-items: center;border-bottom: 1px solid #ccc;background: #fff;">
        <a class="top-left" style="line-height: 2.5rem;width: 45px;" @click="$router.back(-1)">
            <i class="iconfont icon-fanhui" style="font-size: 1rem"></i>
        </a>
        <div class="searchInput" >
            <i class="iconfont icon-iconfontzhizuobiaozhun22"></i>
            <input placeholder="请输入商品名称"  @click="clickSearch" style="width: 100%;border:0;">
        </div>
        <slot name='logo'>  
            <a class="top-right" style="width:45px;">
                <i class="iconfont icon-xiaoxi" style="font-size: 1rem ;"></i>
                <p style="font-size: 0.6rem ;">消息</p>
            </a>
        </slot>
    </div>
</template>
<script>
export default {
    data () {
        return {
            message:''
        }
    },
    mounted(){
        
    },
    methods: {
        goBack() {
            this.$route.go(-1)
        },
        clickSearch(){
            this.$emit('ee', 'cc12345')
        },
      
    },    
    
}
</script>
<style scoped>
    .searchInput{
        position: relative;
        border: 1px solid #ccc;
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

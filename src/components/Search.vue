<template>
    <section>
        <div der="" class="top-naver" style="display:flex;height: 50px;align-items: center;border-bottom: 1px solid #ccc;background: #fff;">
            <a class="top-left" style="line-height: 2.5rem;width: 45px;">
                <i class="iconfont icon-fanhui" style="font-size: 1rem"></i>
            </a>
            <div class="searchInput" >
                <i class="iconfont icon-iconfontzhizuobiaozhun22"></i>
                <input type="text" placeholder="请输入商品名称" id="SearchInput" class="form-control" name="mobile" style="width: 100%;border:0;">
            </div>
           <a class="top-right" id="show-msg" style="width:45px;">
                <i class="iconfont icon-xiaoxi" style="font-size: 1rem ;"></i>
                <p style="font-size: 0.6rem ;">消息</p>
            </a>
        </div>
    </section>
</template>
<script>
import axios from 'axios'
export default {
    data () {
        return {
            msg: ''
        }
    },
  mounted(){
        // axios.post('http://47.93.4.157:8086/mall_api/shop/get_ware_list', {
        //     firstName: 'Fred',
        //     lastName: 'Flintstone'
        // })
        // .then(function (response) {
            
        // })
        // .catch(function (error) {
            
        // });
  }
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

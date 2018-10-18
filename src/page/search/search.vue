<template>    
    <div style="overflow:hidden;">
        <Search></Search>
        <div class="page-infinite-wrapper" style="height: 571px;font-size:14px;">
            <ul infinite-scroll-disabled="loading" infinite-scroll-distance="50" class="page-infinite-list" style="display:flex;height: 100%;"> 
                
            </ul>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import Search from '../../components/Search'
import Footer from '../../components/Footer'
import { InfiniteScroll } from 'mint-ui';
export default {
    data () {
        return {
            dataList:[],
            Lists:'',
            last:''
        }
    },
    mounted(){
        axios.post('http://47.93.4.157:8086/mall_api/classify/getClassifyList', {

        })
        .then( (response) => {
            this.dataList=response.data.data;    
        })
        .catch( (error) => {
            console.log(error);
        })    
    },
    
    components:{
        Search,
        Footer
    },
    methods: {
        loadMore() {
            this.loading = true;
            setTimeout(() => {
                let last = this.list[this.list.length - 1];
                for (let i = 1; i <= 10; i++) {
                this.list.push(last + i);
                }
                this.loading = false;
            }, 2500);
        }
    },

}
</script>

<style lang="scss" scoped>
    .title{
        padding-left: 30px;
        height: 450px;
        line-height: 45px;
        
    }
    .list_img{
            width: 32%;
            display: inline-block;
            text-align: center;
            padding: 10px;
        }
    
</style>

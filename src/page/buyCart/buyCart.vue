<template>    
    <div style="overflow:hidden;">
        <SearchBar></SearchBar>
        <div class="page-infinite-wrapper" style="height: 571px;font-size:14px;">
            <ul infinite-scroll-disabled="loading" infinite-scroll-distance="50" class="page-infinite-list" style="display:flex;height: 100%;"> 
                <div style="width:68px;">
                    <li v-for="(item,index) in dataList" :key="index" style="height:50px;line-height:50px;">{{item.categoryName}}</li>
                </div>
                <div style="flex:1;background: #fff;">  
                    <li v-for="(item,index) in dataList" :key="index">{{item.categoryName}}</li>
                </div>
            </ul>
        </div>
        <FootBar></FootBar>
    </div>
</template>
<script>
import axios from 'axios'
import SearchBar from '../../components/SearchBar'
import FootBar from '../../components/FootBar'
import { InfiniteScroll } from 'mint-ui';
export default {
    data () {
        return {
            dataList:[],
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
        SearchBar,
        FootBar
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

<style scoped>
    
</style>

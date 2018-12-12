<template>    
    <div style="overflow:hidden;">
        <Search></Search>
        <div class="page-infinite-wrapper" style="height: 571px;font-size:14px;">
            <ul infinite-scroll-disabled="loading" infinite-scroll-distance="50" class="page-infinite-list" style="display:flex;height: 100%;"> 
                <div style="width:68px;">
                    <li v-for="(item,index) in dataList" :key="index" style="height:50px;line-height:50px;">{{item.categoryName}}</li>
                </div>
                <div style="flex:1;background: #fff;text-align: left;overflow: scroll;">  
                    <li v-for="(item,index) in dataList" :key="index" >
                        <div class="title">{{item.categoryName}}</div>
                        <div>
                            <router-link v-for="(i,index) in item.children" :key="index" class="list_img" :to="{path:'/search' , query:{name:i.categoryName}}">
                                <img v-bind:src='i.categoryIcon' style="width:40px;height:40px;">
                                <div>{{i.categoryName}}</div>
                            </router-link>
                        </div>
                    </li>
                </div>
            </ul>
        </div>
        <Footer></Footer>
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
        let data={}
        this.$http.post(process.env.API_HOST + "/mall_api/classify/getClassifyList", data)
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

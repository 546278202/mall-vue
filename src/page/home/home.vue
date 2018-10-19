<template>    
    <div style="overflow:hidden;">
        <Search></Search>
        <div class="page-infinite-wrapper" style="height: 571px;">
            <mt-swipe :auto="4000" style="height:200px;">
                <mt-swipe-item v-for="item in items" :key="item">
                    <img v-bind:src="item" style="width: 100%;height: 100%;">
                </mt-swipe-item>
            </mt-swipe>
            <div class="block-img">
                <img src="../../images/main5.jpg" style="width:100%;">
            </div>
            <ul infinite-scroll-disabled="loading" infinite-scroll-distance="50" class="page-infinite-list">
                <div id="WareList">
                    <router-link  v-for="(item,index) in lists" :key="index" :to="{path:'/detail' , query:{id:item.wareid}}">
                        <li>
                            <div class="ListImg" style="height:130px;overflow:hidden;">
                                <img v-bind:src="item.warePic" style="display:block;margin:0 auto;height:100%;">
                            </div>
                            <div class="txt">{{item.warename}}</div>
                        
                            <div class="money">￥{{item.wareprice}}</div>
                        </li>                    
                    </router-link>
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
import { Swipe, SwipeItem } from 'mint-ui'
import { InfiniteScroll } from 'mint-ui';
export default {
    data () {
        return {
            items:[],
            lists:[],
        }
    },
    mounted(){
        axios.post('http://47.93.4.157:8086/mall_api/shop/get_ware_list', {
            time: this.getNowFormatDate(),
            pageNum:"1",
            pageSize:"10",
           
        })
        .then( (response) => {
            this.lists=response.data.data[0].wareList.list;
            this.items=response.data.data[0].recommendWare[0].coverList;
            
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
        getNowFormatDate() {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                    + " " + date.getHours() + seperator2 + date.getMinutes()
                    + seperator2 + date.getSeconds();
            return currentdate;
        }
    },

}
</script>

<style  lang="scss" scoped>
    #WareList li{
        width: 50%;padding: 5px;float: left;background: #fff;
        box-sizing: border-box;
        border-bottom: 5px solid #eee;
        border: 2px solid #eee;
        text-align: left;
        font-size:14px;
    } 
    .txt {
        height:40px;
        margin: 5px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .page-infinite-desc {
        text-align: center;
        color: #666;
        padding-bottom: 5px;
        border-bottom: solid 1px #eee;
    }
    .page-infinite-listitem {
        height: 50px;
        line-height: 50px;
        border-bottom: solid 1px #eee;
        text-align: center;
    }
    .page-infinite-listitem:first-child {
        border-top: solid 1px #eee;
    }
    .page-infinite-wrapper {
        margin-top: -1px;
        overflow: scroll;
    }
    .page-infinite-loading {
        text-align: center;
        height: 50px;
        line-height: 50px;
    }
    .page-infinite-loading div {
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
    }
</style>

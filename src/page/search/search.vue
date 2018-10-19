<template>    
    <div style="overflow:hidden;">
        <Search></Search>
        <div class="page-infinite-wrapper" style="height: 571px;font-size:14px;">
            <ul infinite-scroll-disabled="loading" infinite-scroll-distance="50" class="page-infinite-list" style="height: 100%;background: #fff;"> 
                <router-link class="list_one" href="../shopdetail/shopdetail.html?wareid=91" v-for="(item,index) in dataList" :key="index" :to="{path:'/detail' , query:{id:item.wareid}}">
                    <div class="left"><img v-bind:src='item.warePic' style="width:100%;height:100%;"></div>
                    <div class="right">
                        <div class="txt">{{item.warename}}</div>
                        <div class="money">￥{{item.wareprice}}</div>
                        <div class="number">月销量{{item.waresellnumber}}件</div>
                    </div>
                </router-link>
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
            dataList:'',
            Lists:'',
            last:''
        }
    },
    mounted(){
        axios.post('http://47.93.4.157:8086/mall_api/shop/get_serverlist', {
            shopname: this.$route.query.name,
            type: 0,
            categoryType: 0,
            pageNum: 1,
            pageSize: 10,
            time:this.getNowFormatDate(),
        })
        .then( (response) => {
            this.dataList=response.data.data[0].wareList.list;
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
        },
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
    .list_one {
        width: 100%;
        display: flex;
        padding: 10px;
        border-bottom: 1px solid #d3d3d3;
        .left {
            width: 5rem;
            height: 5rem;
            margin-right: 10px;
        }
        .right {
            flex: 1;
            text-align: left;
            .txt {
                height: 2.2rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-size: 0.7rem;
            }
            .money {
                color: #cc0000;
                font-size: 0.9rem;
                margin-bottom: 10px;
            }
            .number {
                flex: 1;
                height: 1.5rem;
                line-height: 2rem;
                font-size: 0.7rem;
            }
        }
        
    }
</style>

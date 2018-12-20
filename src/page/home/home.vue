<template>
    <div style="overflow:hidden;">
        <Search></Search>
        <div class="page-infinite-wrapper" style="height: 571px;">
            <mt-swipe :auto="4000" style="height:200px;">
                <mt-swipe-item v-for="item in items" :key="item">
                    <img v-bind:src="item.wareCover" style="width: 100%;height: 100%;">
                </mt-swipe-item>
            </mt-swipe>
            <div class="block-img">
                <img src="../../images/main5.jpg" style="width:100%;">
            </div>
            <ul infinite-scroll-disabled="loading" infinite-scroll-distance="50" class="page-infinite-list">
                <div id="WareList">
                    <router-link v-for="(item,index) in lists" :key="index" :to="{path:'/detail' , query:{id:item.wareid}}">
                        <li>
                            <div class="ListImg" style="height:130px;overflow:hidden;">
                                <img v-bind:src="item.wareCover" style="display:block;margin:0 auto;height:100%;">
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
    import Search from "../../components/Search";
    import Footer from "../../components/Footer";
    import { Swipe, SwipeItem,Indicator } from "mint-ui";
	import { getNowFormatDate } from "../../config/mUtils";
    export default {
        data() {
            return {
                items: [],
                lists: []
            };
        },
        mounted() {
            Indicator.open("加载中...");
            var data = {
				time: getNowFormatDate(),
				pageNum: "1",
				pageSize: "10"
			};
            this.$http
                .post(process.env.API_HOST + "/mall_api/shop/get_ware_list", data)
                .then(response => {
                    Indicator.close();
                    if(response.data.code==0 && response.data.success==true){
                        console.log(response.data.data.wareList)
                        this.lists = response.data.data.wareList;
                        this.items = response.data.data.recommendWare;
                    }
                })
                .catch(error => {
                    console.log(error);
                });       
        },

        components: {
            Search,
            Footer
        },
        methods: {

        }
    };
</script>

<style lang="scss" scoped>
    #WareList li {
        width: 50%;
        padding: 5px;
        float: left;
        background: #fff;
        box-sizing: border-box;
        border-bottom: 5px solid #eee;
        border: 2px solid #eee;
        text-align: left;
        font-size: 14px;
    }

    .txt {
        height: 40px;
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
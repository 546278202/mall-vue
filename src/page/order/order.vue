<template>
    <div class="wrap">
        <Header></Header>
        <ul class="list" v-infinite-scroll infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <div class="nav_type">
                <a v-for="(item,index) in items" :key="index" type="2" @click="tabNav(index)" :class='currentIndex==item.tab? "font-red":""'>{{item.text}}</a>
            </div>
            <!-- 如果没有数据 -->
            <div></div>
            <li v-for="(item,index) in goodsObj">
                <div class="order-one" style="margin-top: 5px;">
                    <div class="content1"></div>
                    <div class="content2">
                        <div style="display:flex;border-top:1px solid #eee;padding: 10px;"  v-for="(item,index) in item.orderDetailEntityList">
                            <a class="a1">
                                <img :src="item.warePic" style="height:5rem;width:5rem;">
                            </a>
                            <a class="b2">
                                <div class="txt">
                                    <sapn>ceshi</sapn>
                                </div>
                                <div class="ShopSize">{{item.specOne}}</div>
                                <div class="NumPrice">
                                    <span>共{{item.wareNum}}件</span>
                                    <span style="margin-left:20px;">单价：</span>
                                    <sapn class="font-red" style="font-size: 0.8rem;">￥{{item.warePrice}}</sapn>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div style="background:#fff;text-align:right;font-size: 0.8rem;padding: 10px;border-top: 1px solid #eee;">
                        <a style="margin-left:20px;">合计：{{item.wareTotalPrice}}</a>
                    </div>
                    <div class="content3">
                        <a class="payment"><span>立即付款</span></a>
                        <a class="delete_order"><span>删除订单</span></a>
                        <div style="flex:1;text-align:left;color:#cc0000;">待付款</div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import Header from "../../components/Header";
    import Footer from "../../components/Footer";
    import { Indicator,InfiniteScroll, Checklist } from "mint-ui";
    import { getNowFormatDate } from "../../config/mUtils";

    export default {
        data() {
            return {
                items:[
                    {tab:'',text:"全部订单"},
                    {tab:'0',text:"待付款"},
                    {tab:'1',text:"代发货"},
                    {tab:'2',text:"待收货"},
                    {tab:'3',text:"已完成"},
                ],
                currentIndex:this.$route.query.tabCode,
                goodsObj: "",
                loading: false
            };
        },

        mounted() {
            if (this.$store.state.baseUser.userId == "") {
                this.$router.push("/login");
                return false;
            }
            this.$store.commit("changeTitle", "我的订单");
            this.loadMore();
        },
        components: {
            Header,
            Footer
        },
        methods: {
            // 切换导航
            tabNav(index) {
                this.currentIndex=this.items[index].tab
                this.loadMore()
            },
            loadMore() {
                let parameter = {
                    userId: this.$store.state.baseUser.userId,
                    ordersStatus: this.currentIndex,
                    time: getNowFormatDate(),
                    pageNum: 1,
                    pageSize: 20
                };
                Indicator.open("加载中...");
                this.$http
                    .post(
                        process.env.API_HOST + "/mall_api/order/get_order_info",
                        parameter
                    )
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            this.goodsObj = response.data.data.list;
                            Indicator.close();
                        }
                    })
                    .catch(error => {
                        Indicator.close();
                        console.log(error);
                    });
            }
        }
    };
</script>
<style lang="scss" scoped>
    .wrap {
        display: flex;
        flex-direction: column;
    }
    .list {
        max-height: 100vh;
        overflow-y: auto;
        overflow-x: hidden;
        padding-bottom: 100px;
        li {
            margin-top: 5px;
            background: #fff;
        }
    }
    .nav_type {
        width: 100%;
        height: 2.5rem;
        display: flex;
        background: #fff;
        line-height: 2.5rem;
        font-size: 0.7rem;
        a {
            flex: 1;
            text-align: center;
        }
    }
    .font-red {
        color: #cc0000;
    }
    .content2 {
        width: 100%;
        background: #fff;
        font-size: 0.7rem;
        .img{
            display: block;
        }
        .a1{
            margin-right:10px;
        }    
        .b2 {
            flex: 1;
            text-align: left;
            .txt {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                height: 2rem;
            }
            .ShopSize {
                font-size: 12px;
                padding-top: 5px;
                margin-bottom: 15px;
                color: #999;
            }
            .NumPrice {
                text-align: right;
                color: #999;
            }
            .font-red {
                color: #cc0000;
            }
        }
    }
    .content3 {
        padding: 0 10px;
        width: 100%;
        height: 2.5rem;
        display: flex;
        background: #fff;
        line-height: 2.5rem;
        font-size: 0.7rem;
        border-top: 1px solid #d3d3d3;
        text-align: right;
        flex-direction: row-reverse;
        .payment{
            margin-left: 20px;
            span{
                border:1px solid #cc0000;
                color:#cc0000;
                padding: 3px 5px;
                border-radius: 6px;
            }
        }
        .delete_order{
            margin-left: 20px;
            span{
                border:1px solid #3d4145;
                color:#3d4145;
                padding: 3px 5px;
                border-radius: 6px; 
            }
        }
    }
</style>
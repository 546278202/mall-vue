<template>
    <div style="overflow:hidden;">
        <Header></Header>
        <div class="page-infinite-wrapper" style="height: 571px;font-size:14px;">
            <ul infinite-scroll-disabled="loading" infinite-scroll-distance="50" class="page-infinite-list">
                <div class="list" v-for="item in dataList">
                    <a class="ShopName">
                        <div class="left">{{item.mallAdminId}}</div>
                        <div class="right"><i class="iconfont icon-arrow_right" style="font-size: 1rem ;"></i></div>
                    </a>
                    <div style="display:flex; padding: 5px 10px;">
                        <div class="shopimg"><img :src="item.warePic" style="width:5rem;"></div>
                        <div style="flex:1;">
                            <div class="titletxt">{{item.warename}}</div>
                            <div class="shopsize">{{item.specname}}</div>
                            <div style="width:100%;display:flex;justify-content: space-between;">
                                <div class="shopprice">￥{{item.wareprice}}</div>
                                <div class="quantity">
                                    <div class="addition"><i class="iconfont icon-iconfontadd"></i></div>
                                    <input class="number" id="CurrentNumber" value="1">
                                    <div class="subtraction"><i class="iconfont icon-iconfontmove"></i></div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </ul>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
    import Header from "../../components/Header";
    import Footer from "../../components/Footer";
    import { InfiniteScroll } from "mint-ui";
    export default {
        data() {
            return {
                dataList: [],
                last: ""
            };
        },
        mounted() {
            let baseUser = JSON.parse(sessionStorage.baseUser);
            let userId = baseUser.userId;
            this.$http
                .post(process.env.API_HOST + "/mall_api/cart/list", {
                    userId: userId
                })

                .then(response => {
                    console.log(response);
                    if (response.data.code == 0 && response.data.success == true) {
                        this.dataList = response.data.data.cartWareVOList;
                        console.log(this.dataList);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        components: {
            Header,
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
        }
    };
</script>

<style lang="scss" scoped>
    .list {
        width: 100%;
        display: flex;
        background: #fff;
        flex-direction: column;
        margin-bottom: 5px;
        .ShopName {
            width: 100%;
            display: flex;
            height: 2rem;
            line-height: 2rem;
            font-size: 0.8rem;
            padding: 0 10px;
            overflow: hidden;
            .right {
                flex: 1;
                text-align: right;
            }
        }
    }
    .shopimg{
        margin-right: 10px;
    }
    .titletxt {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 0.7rem;
        text-align: left;
    }
    .shopsize {
        height: 1.7rem;
        color: #999;
        font-size: 0.6rem;
        text-align: left;
    }
    .shopprice{
        color: #cc0000;
        font-size: 0.9rem;
    }
    .quantity{
        display: flex;
        border: 1px solid #e5e5e5;
        text-align: center;
        border-radius: 5px;
        font-size: 15px;
        height:30px;
        line-height: 30px;
        box-sizing: border-box;
        .addition {
            width: 30px;
            border-right: 1px solid #e5e5e5;
        }
        .number {
            border: 0;
            width: 45px;
            text-align: center;
        }
        .subtraction {
            width: 30px;
            border-left: 1px solid #e5e5e5;
        }
    }    
</style>
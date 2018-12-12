<template>
    <div style="overflow:hidden;">
        <Header></Header>
        <div class="page-infinite-wrapper" style="height: 571px;font-size:14px;">
            <ul infinite-scroll-disabled="loading" infinite-scroll-distance="50" class="page-infinite-list">
                <div class="list" v-for="item in dataList">
                    <a class="ShopName"  href="../mall/mall.html?mallnumber=M201807021112146037">
                        <div style="display:flex;display: flex; align-items: center;justify-content: center;">
                            <label class="label-checkbox item-content" style="height:22px;">
                                <input type="checkbox" name="checkbox">
                                <div class="item-media" >
                                    <i class="icon icon-form-checkbox"></i>
                                </div>
                            </label>
                        </div>
                        <div class="left">{{item.mallAdminId}}</div>
                        <div class="right">
                            <i class="iconfont icon-arrow_right" style="font-size: 1rem ;"></i>
                        </div>
                    </a>
                    <!-- <div class="ShopList">
                        <li cartid="1707">
                            <div style="width:100%;float:left;display:flex;padding:5px 10px;">
                                <div style="display:flex;display: flex; align-items: center;justify-content: center;">
                                    <label class="label-checkbox item-content" style="height:22px;">
                                        <input type="checkbox" name="checkbox">
                                        <div class="item-media" id="ShopCheck" style="display:flex;">
                                            <i class="icon icon-form-checkbox"></i>
                                        </div>
                                    </label>
                                </div>
                                <div class="ShopImg">
                                    <img src="https://zhangwoyun.feijizhe.com/photos/9/20180716/20180716_764-1.png"
                                        style="width:5rem;">
                                </div>
                                <div style="width:100%;flex-direction: column;float:rigth;">
                                    <div class="TitleTxt">
                                        <span>ceshi</span>
                                    </div>
                                    <div class="ShopSize">
                                        <span>香辣</span>
                                    </div>
                                    <div class style="width:100%;display:flex;">
                                        <div class="ShopPrice">
                                            <span>￥</span>
                                            <span id="ActivePrice">0.01</span>
                                        </div>
                                        <div class="Quantity" warenowstock="undefined" wareid="94" cartid="1707">
                                            <span class="addition">
                                                <i class="iconfont icon-iconfontadd"></i>
                                            </span>
                                            <input class="number" id="CurrentNumber" value="1">
                                            <span class="subtraction">
                                                <i class="iconfont icon-iconfontmove"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="DelMe" id="DelMe">删除</div>
                        </li>
                    </div> -->
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
    .label-checkbox {
        margin-right: 10px;
        display: flex;
        float: left;
        align-items: center;
        justify-content: center;
    }
   
</style>
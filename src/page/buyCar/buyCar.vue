<template>
    <div class="wrap"> 
        <Header></Header>
        <ul class="list" v-infinite-scroll="" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <li v-for="item in dataList">
                <div class="ShopName">
                    <div style="display:flex;">
                       <label for="label" @click.stop="clickMe">
                            <input type="checkbox" id="label" v-model="ckeckVal" >点我
                        </label>
                    </div>
                    <div class="left">{{item.mallAdminId}}</div>
                    <div class="right">
                        <i class="iconfont icon-arrow_right" style="font-size: 1rem ;"></i>
                    </div>
                </div>
                <div style="display:flex; padding: 5px 10px;">
                    <div class="shopimg">
                        <img :src="item.warePic" style="width:5rem;height:5rem;">
                    </div>
                    <div style="flex:1;">
                        <div class="titletxt">{{item.warename}}</div>
                        <div class="shopsize">{{item.specname}}</div>
                        <div style="width:100%;display:flex;justify-content: space-between;">
                            <div class="shopprice">￥{{item.wareprice}}</div>
                            <div class="quantity">
                                <div class="addition">
                                    <i class="iconfont icon-iconfontadd"></i>
                                </div>
                                <div class="number">{{item.quantity}}
                                    <input type="text"/>
                                </div>
                                <div class="subtraction">
                                    <i class="iconfont icon-iconfontmove"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="CartTotalAmount">
            <mt-checklist style="display:flex;"
                v-model="value" 
                :options="options" @change="checkon">
            </mt-checklist>
			<div class="Settlement"><span></span>合计：<span class="FontColr">￥</span><span  class="FontColr">3835.01</span></div>
			<div class="SettlementBtn">去结算</div>
		</div>
        <!-- <Footer></Footer> -->
    </div>
</template>
<script>
    import Header from "../../components/Header";
    import Footer from "../../components/Footer";
    import { InfiniteScroll ,Checklist  } from "mint-ui";
    export default {
        data() {
            return {
                dataList: [],
                loading: false,
                value:[],
                options : [{
                    label: '全选',
                    value: 'A'
                }]
            };
        },
        mounted() {
            this.loadMore()
        },
        components: {
            Header,
            Footer
        },
        methods: {
            checkon: function(){
                console.log(this.value)
            },

            loadMore() {
                let parameter={
                   userId:JSON.parse(sessionStorage.getItem("baseUser")).userId
                }
                this.$http
                .post(process.env.API_HOST + "/mall_api/cart/list", parameter)
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
            }
        }
    };
</script>

<style lang="scss" scoped>
    .wrap{
        display: flex;
        flex-direction: column;
    }
   
    .list {
        max-height: 100vh; //与屏幕一样高度
        overflow-y: auto;
        background: #fff;
        padding-bottom:100px;
        li{border-top: 1px solid #e8e8e8;}
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

    .shopimg {
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

    .shopprice {
        color: #cc0000;
        font-size: 0.9rem;
    }

    .quantity {
        display: flex;
        border: 1px solid #e5e5e5;
        text-align: center;
        border-radius: 5px;
        font-size: 15px;
        height: 30px;
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

    .CartTotalAmount {
        left: 0;
        right: 0;
        margin: 0 auto;
        height: 2.5rem;
        background: #fff;
        color: #333;
        font-size: 14px;
        position: absolute;
        z-index: 99;
        bottom: 0;
        display: flex;
        border-top: 1px solid #dcdcdc;
        box-sizing: border-box;
        padding-left: 10px;
        .AllSelection {
            flex: 1;
        }
        .Settlement {
            flex: 1;
            font-weight: 700;
            text-align: center;
            line-height: 2.5rem;
        }
        .SettlementBtn {
            flex: 1;
            background: #e4393c;
            color: #fff;
            font-weight: 700;
            text-align: center;
            line-height: 2.5rem;
            cursor: pointer;
        }
    }
    .FontColr {
        color: #cc0000;
    }
   
    .mint-cell-wrapper{

    }
</style>
<style lang="scss">
    .mint-checklist-label{padding:0;}
    .mint-cell-wrapper{padding:0 0;}
    .mint-checklist-title{margin:0;}
</style>


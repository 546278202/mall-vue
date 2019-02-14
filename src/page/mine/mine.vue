<template>
    <div>
        <div class="My_top">
            <div class="My-top-naver">
                <router-link :to="{path:'/setpage'}">
                    <i class="iconfont icon-shezhi" style="font-size: 1.5rem ;"></i>
                </router-link>
                <router-link :to="{path:'/collection'}">
                    <i class="iconfont icon-xiaoxi" style="font-size: 1.5rem ;"></i>
                </router-link>
            </div>
            <div class="My-top-block">
                <div style="height:1.5rem;text-align:center;color:#333333; display:flex;">
                    <router-link :to="{path:'/information'}" class="person">
                        <div class="touXing"><i class="iconfont icon-wode-" style="font-size: 2rem ;"></i></div>
                    </router-link>
                </div>
                <div style="height:3.5rem;font-weight: bold;text-align: center;color: #333333;font-size: 15px;line-height:2.5rem;">{{dataList.nickName}}</div>
                <div style="height:2.5rem;text-align:center;color:#333333; display:flex;">
                    <router-link style="flex:1;" :to="{path:'/collection'}">
                        <p style="font-size:12px;color:#333;">我的收藏</p>
                        <p style="color:#f3cb0a;font-size: 18px;">{{dataList.collectionCount}}</p>
                    </router-link>
                    <a style="flex:1;"></a>
                    <router-link style="flex:1;" :to="{path:'/record'}">
                        <p style="font-size:12px;color:#333;">足迹</p>
                        <p style="color:#f3cb0a;font-size: 18px;">{{dataList.lookPathCount}}</p>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="my-Order">
            <router-link class="myList" :to="{path:'/order' , query:{tabCode:''}}">
                <div class="left">我的订单</div>
                <div class="right"><i class="iconfont icon-arrow_right" style="font-size: 1rem ;"></i></div>
            </router-link>
            <div class="stateList">
                <router-link class="myList" :to="{path:'/order' , query:{tabCode:'0'}}">
                    <img src="../../images/state1.png">
                    <div class="txt">待付款</div>
                    <div class="tableState" v-if="dataList.orderStatus0>0">{{dataList.orderStatus0}}</div>
                </router-link>
                <router-link class="myList" :to="{path:'/order' , query:{tabCode:'1'}}">
                    <img src="../../images/state2.png">
                    <div class="txt">待发货</div>
                    <div class="tableState" v-if="dataList.orderStatus1>0">{{dataList.orderStatus1}}</div>
                </router-link>
                <router-link class="myList" :to="{path:'/order' , query:{tabCode:'2'}}">
                    <img src="../../images/state3.png">
                    <div class="txt">待收货</div>
                    <div class="tableState" v-if="dataList.orderStatus2>0">{{dataList.orderStatus2}}</div>
                </router-link>
                <router-link class="myList" :to="{path:'/afterSaleList' , query:{tabCode:'2'}}">
                    <img src="../../images/state4.png">
                    <div class="txt">待评价</div>
                    <div class="tableState" v-if="dataList.orderStatus2>0">{{dataList.orderStatus2}}</div>
                </router-link>
                <router-link class="myList" :to="{path:'/afterSaleList' , query:{tabCode:'2'}}">
                    <img src="../../images/state5.png">
                    <div class="txt">售后</div>
                    <div class="tableState" v-if="dataList.orderStatus2>0">{{dataList.orderStatus2}}</div>
                </router-link>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
    import Search from '../../components/Search'
    import Footer from '../../components/Footer'
    import { Indicator, InfiniteScroll } from 'mint-ui';
    export default {
        data() {
            return {
                dataList: '',
                last: ''
            }
        },
        mounted() {
            if (this.$store.state.baseUser.userId == '') {
                this.$router.push("/login")
                return false
            }
            this.getData(this.$store.state.baseUser.userId);
        },
        components: {
            Search,
            Footer
        },
        methods: {
            getData(userId) {
                let data = { "userId": userId }
                this.$http.post(process.env.API_HOST + "/mall_api/common/get_home_info", data)
                    .then((response) => {
                        this.dataList = response.data.data;
                    })
                    .catch((error) => {
                    })
            }
        },

    }
</script>

<style lang="scss" scoped>
    .My_top {
        height: 10rem;
        background: #f3cb0a;
        color: #fff;
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
        position: relative;

        .My-top-naver {
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 10px;

            a {
                color: #fff;
            }
        }
    }

    .My-top-block {
        background: #fff;
        border-radius: 20px;
        width: 90%;
        position: absolute;
        margin: 0 5%;
        top: 5rem;
        height: 7.5rem;
        box-sizing: border-box;
    }

    .My-top-block .person {
        width: 100%;
        text-align: center;
        position: absolute;
        top: -20%;
    }

    .My-top-block .touXing {
        width: 60px;
        height: 60px;
        color: #333333;
        background: #fff;
        display: inline-block;
        border-radius: 10px;
        box-shadow: 0 1px 14px #dcdcdc;
        color: #f3cb0a;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }

    .my-Order {
        background: #fff;
        width: 100%;
        margin-top: 3rem;
        font-size: 0.7rem;

        .myList {
            display: flex;
            height: 40px;
            line-height: 40px;
            padding: 0 10px;
            font-size: 0.7rem;

            .txt {
                height: 25px;
            }

            .left {
                flex: 1;
                text-align: left;
            }

            .myList .right {
                flex: 1;
                text-align: right;
            }
        }

        .stateList {
            display: flex;
            border-top: 1px solid #f3cb0a;
            align-items: center;
            height: 80px;

            a {
                flex: 1;
                text-align: center;
                color: #666;
                position: relative;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                img {
                    width: 25px;
                }
            }
        }
    }

    .tableState {
        position: absolute;
        top: 0;
        right: 0.7rem;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        font-size: 10px;
        font-weight: 500 !important;
        text-align: center;
        color: #fff;
        background-color: #f23030;
        width: 16px;
        height: 16px;
        line-height: 16px;
        border-radius: 8px;
        overflow: hidden;
    }
</style>
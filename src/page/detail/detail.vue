<template>
    <div>
        <Header></Header>
        <div class="bscroll" ref="bscroll" :style="styleObj1">
            <div class="bscroll-container">
                <ul>
                    <mt-swipe :auto="4000" style="height:200px;">
                        <mt-swipe-item v-for="item in items" :key="item">
                            <img v-bind:src="item" style="width: 100%;height: 100%;">
                        </mt-swipe-item>
                    </mt-swipe>
                    <div class="shop-msg">
                        <div class="txt1" style="display:flex;">
                            <div class="ShopName" style="flex:1;">京觅 西州蜜哈密瓜 1个装 约1.5-2kg 新鲜水果</div>
                            <div class="Collection" @click="clickCollection" >
                                <div style="height:1.5rem;color:#f3cb0a;" v-if="isCollection==0">
                                    <i class="iconfont icon-pinglunxingxingtianchong" style="font-size: 1rem;"></i>
                                </div>
                                <div style="height:1.5rem;" v-else>
                                    <i class="iconfont icon-pinglunxingxingtianchong" style="font-size: 1rem;"></i>
                                </div>
                                <p style="font-size:12px;" v-if="isCollection==0">已收藏</p>
                                <p style="font-size:12px;" v-else>收藏</p>

                            </div>
                        </div>
                        <div class="txt2">
                            <a class="Postage">包邮</a>
                            <a class="Monthly-sales" style="text-align: right;">月销量0件</a>
                            <a class="Coupon" style="display: flex;justify-content: center;"></a>
                            <a class="Price">￥{{data.wareprice}}</a>
                        </div>
                    </div>

                    <div class="shop-msg">
                        <div class="Voucher" @click="alertpaymodel">
                            <a class="one">已选</a>
                            <a style="font-size: 0.6rem;color:#999;">{{mspecName+" , "+buyNum}}</a>
                            <a class="go-Voucher">
                                <i class="iconfont icon-xiangyou"></i>
                            </a>
                        </div>
                        <div class="Voucher sever">
                            <a class="one">服务</a>
                            <a style="font-size: 0.6rem;color:#999;">坏果包赔</a>
                            <a class="go-Voucher"></a>
                        </div>
                    </div>
                    <!-- 评论组件 -->
                    <discuss :wareid="this.$route.query.id">
                    </discuss>
                    <div class="shop-detail" style="background:#fff;padding:0 10px;" v-html="warecontent"></div>
                </ul>
            </div>
        </div>
        <div class="footer">
            <a @click="gocar" style="position: relative;">
                <i class="iconfont icon-gouwuche"></i>
                <p>购物车</p>
                <span class="tableState" v-if="CarNum>0">{{CarNum}}</span>
            </a>
            <router-link v-if="data.mallNumber" class="myList" :to="{path:'/mall' , query:{mallNumber:data.mallNumber}}">
                <i class="iconfont icon-shouye1"></i>
                <p>店铺</p>
            </router-link>
            <a @click="addcar" class="add-car">加购物车</a>
            <a class="to-buy open-popup" style="color:#fff;font-size: 15px;" @click="toGetSum">立刻购买</a>
        </div>
        <!-- 弹出层 -->
        <model ref="mychild" type="alertpaymodel" @cancelpaymodel="cancelpaymodel" :payshowstate="payM" @surBtn="surBtn" :specJson="specJson"></model>
    </div>
</template>
<script>
    import Header from '../../components/Header'
    import Footer from '../../components/Footer'
    import BScroll from 'better-scroll'
    import model from './children/model'
    import discuss from './children/discuss'
	import { getNowFormatDate, getMillisecond,listenScroll} from "../../config/mUtils"
    import { Swipe, SwipeItem, Indicator, Toast } from 'mint-ui'
    export default {
        data() {
            return {
                data: '',
                items: [],
                last: '',
                warecontent: '',
                isShow: false,
                specJson: '',
                current: 0,
                mPrice: 0,
                mspecName: '',
                buyNum: 1,
                payM: false,
                styleObj1: { "height": '', "width": "100%", "overflow": "hidden", 'font-size': '40px' },
                CarNum:'',//购物车数量
                isCollection:'' 
            }
        },
       
        mounted() {
            this.$store.commit('changeTitle', "购物车")
            this.getData(),
            this.scrollFn(),
            this.getCarNum()
            this.addLookHistory()
        },
        watch: {
           
        },
      
        //获取屏幕高度
        beforeMount(height) {
            var height = 50 + 45
            var h = document.documentElement.clientHeight || document.body.clientHeight;
            this.styleObj1["height"] = h - height + "px"
        },
        components: {
            Header,
            Footer,
            model,
            discuss
        },
        methods: {
            getData() {
                let data = {
                    userId: this.$store.state.baseUser? this.$store.state.baseUser.userId : '' ,
                    wareid: this.$route.query.id,
                }
                this.$http
                    .post(process.env.API_HOST + "/mall_api/shop/get_ware_info", data)
                    .then(response => {
                        let data = response.data.data
                        this.data = data;
                        this.items = data.coverList;
                        this.warecontent = data.warecontent;
                        this.specJson = data.specJson;
                        this.mPrice = data.specJson.specValue[0].specPrice
                        this.mspecName = data.specJson.specValue[0].specName
                        this.isCollection=data.isCollection
            console.log(this.data)

                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            scrollFn() {
                this.$nextTick(() => {
                    listenScroll(this.$refs.bscroll)
                });
            },
            alertpaymodel() {
                this.payM = true
                this.$refs.mychild.scrollFn();
               
            },
            cancelpaymodel() {
                this.payM = false;
            },
            surBtn(a,b,c) {
                this.mspecName = a
                this.buyNum = b
                this.mPrice = c
                this.payM = false;
            },
            removeDemo() {
                this.isShow = !this.isShow
            },

            addClass: function (index) {
                this.current = index;
                this.mPrice = this.specJson.specValue[index].specPrice
                this.mspecName = this.specJson.specValue[index].specName
            },

            goback() {
                this.$router.go(-1)
            },
            gocar() {
                if (JSON.parse(sessionStorage.getItem("baseUser")) == null) {
                    this.$router.push("/login")
                    return false
                } else {
                    this.$router.push("/buyCar")
                }
            },
            // 加入购物车
            addcar() {
                if (JSON.parse(sessionStorage.getItem("baseUser")) == null) {
                    this.$router.push("/login")
                    return false
                }
                let data = {
                    userId: JSON.parse(sessionStorage.getItem("baseUser")).userId,
                    wareid: this.$route.query.id,
                    count: this.buyNum,
                    specname: this.mspecName,
                    price: this.mPrice,
                }
                this.$http
                    .post(process.env.API_HOST + "/mall_api/cart/add", data)
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            Toast("添加成功");
                            this.getCarNum()
                        }else{
                            Toast(response.data.msg);
                            return false
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            // 立刻购买
            toGetSum() {
                if(this.$store.state.baseUser==null){
                    this.$router.push({path:'/login'});
                    return false
                }
                var data=[{
                        "priceSum": this.mPrice*this.buyNum,
                        "userId": this.$store.state.baseUser.userId,
                        "cartId":'',
                        "quantity":this.buyNum,
                        "wareid":this.$route.query.id,
                        "wareprice":this.mPrice,
                        "specname":this.mspecName,
                        "warePic":this.data.warePic,
                        "mallname":this.data.mallname,
                        "warename":this.data.warename,
                        "mallAdminId":this.data.mallAdminId,
                        "distributionValue":this.data.distributionValue,
                        "freightTempletType":this.data.freightTempletType,
                        "freightTempletValue":this.data.freightTempletValue,
                        "mallnum":this.data.mallNumber,
                        "couponPrice":this.data.couponPrice,
                        "warenumber":this.data.warenumber,
                        "sameWareSumPostCharge":''
                    }]
                    sessionStorage.setItem("getlist", JSON.stringify(data))
                    this.$router.push({path:'/getSum'});
            },
            //获取购物车数量
            getCarNum(){
                if(this.$store.state.baseUser==null){
                    return false
                }
                let parameter={
                    userId:this.$store.state.baseUser.userId,
                }
                this.$http
                    .post(process.env.API_HOST + "/mall_api/cart/select_cart_count", parameter)
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            this.CarNum=response.data.data

                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            // 点击收藏
            clickCollection(){
                if (this.$store.state.baseUser == null) {
                    this.$router.push({path:'/login'});
                    return false
                }
                this.$nextTick(function(){
                    if(this.isCollection==1){
                        this.getCollection()                        
                    }else{
                        this.cancelCollection()
                    }
                })
            },
            // 商品收藏
            getCollection(){
                let parameter={
                    userId:this.$store.state.baseUser.userId,
                    wareId:this.$route.query.id
                }
                this.$http
                    .post(process.env.API_HOST + "/mall_api/collection/add", parameter)
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            Toast("收藏成功");
                            this.isCollection=0
                        }else{
                            Toast(response.data.msg);
                            return false
                        }
                        
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            //取消收藏
            cancelCollection(){
                let parameter={
                    userId:this.$store.state.baseUser.userId,
                    wareId:this.$route.query.id
                }
                this.$http
                    .post(process.env.API_HOST + "/mall_api/collection/del_collection", parameter)
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            Toast("已取消收藏");
                            this.isCollection=1
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            // 加入浏览记录
            addLookHistory() {
                if (this.$store.state.baseUser == null) {
                    return false
                }
                let data = {
                    userId: this.$store.state.baseUser.userId,
                    wareId: this.$route.query.id,
                    lookTime: getNowFormatDate()
                }
                this.$http
                    .post(process.env.API_HOST + "/mall_api/look/add", data)
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
        }
    }
</script>
<style lang="scss" scoped>
    .shop-msg {
        background: #fff;
        margin-bottom: 5px;
        text-align: left;

        .txt1 {
            padding: 5px 10px;
            font-size: 16px;
            color: #333;

            .Collection {
                color: #999;
                width: 45px;
                text-align: center;
                cursor: pointer;
            }
        }

        .txt2 {
            display: flex;
            font-size: 12px;
            color: #666;
            line-height: 1.5rem;
            padding: 0 10px 5px 10px;

            .Price {
                text-align: right;
                color: #cc0000;
                font-size: 1.4rem;
            }

            a {
                flex: 1;
            }
        }
    }

    .Voucher {
        height: 2.5rem;
        line-height: 2.5rem;
        display: flex;
        padding: 0 10px;
        border-bottom: 1px solid #dcdcdc;

        .one {
            flex: 0.5;
            font-size: 15px;
        }

        a {
            flex: 1;
        }

        .go-Voucher {
            display: flex;
            text-align: right;
            flex-direction: column-reverse;
        }
    }
    .sever{
        border-bottom:none;
    }
    .page-infinite-wrapper {
        margin-top: -1px;
        overflow: scroll;
        height: 30.85rem;
    }

    .footer {
        height: 2.5rem;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        display: flex;
        background: #fff;
        font-size: 10px;
        color: #666;
        border-top: 1px solid #dcdcdc;
        align-items: center;

        a {
            flex: 1;
            text-align: center;
            color: #666;
        }

        .add-car {
            background: #f3cb0a;
            line-height: 2.5rem;
            color: #fff;
            font-size: 15px;
        }

        .to-buy {
            background: #cc0000;
            line-height: 2.5rem;
            color: #fff;
        }
    }

    // 弹出层
    .go-buy-wrap {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        z-index: 998;
        position: absolute;
        bottom: 0;
        left: 0;
        opacity: 0.5;
    }

    .go-buy {
        background: #fff;
        z-index: 999;
        position: absolute;
        bottom: 0;
        left: 0;
        bottom: 0;
        height: 50%;
        width: 100%;
        overflow: hidden;
    }

    .alert-price {
        overflow: hidden;
        text-align: center;
        color: #cc0000;
        font-size: 30px;
    }

    #CancelBtn {
        position: absolute;
        left: 0px;
        top: 0px;
        padding: 10px;
        display: block;
        width: 45px;
        height: 45px;
        overflow: hidden;
    }

    .bottom {
        line-height: 1.5rem;
        padding-left: 10px;
        margin-bottom: 20px;
        overflow: hidden;
        font-size: 14px;

        .btn {
            color: #333;
            width: 2.5rem;
            text-align: center;
            border-radius: 5px;
            margin-right: 10px;
            margin-bottom: 10px;
            font-size: 0.7rem;
            float: left;
        }
    }

    .KG4 {
        background: #dcdcdc;
        padding: 0 5px;
        text-align: center;
        border-radius: 5px;
        margin-right: 10px;
        margin-bottom: 10px;
        font-size: 0.7rem;
        color: #999;
        float: left;
    }

    .act {
        background: #fdcd00;
        color: #fff;
    }

    .sum {
        border: 1px solid #e5e5e5;
        text-align: center;
        border-radius: 5px;
        float: left;

        .addition {
            width: 2.3rem;
            height: 1.5rem;
        }

        .number {
            border-right: 1px solid #e5e5e5;
            border-left: 1px solid #e5e5e5;
            width: 2.3rem;
        }

        .subtraction {
            width: 2.3rem;
            height: 1.5rem;
        }
    }
    .tableState{
        position: absolute;
        top: -5px;
        right:25px;
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
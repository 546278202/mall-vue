<template>
    <div>
        <div class="bscroll" ref="bscroll" :style="styleObj1">
            <div class="bscroll-container">
                <ul>
                    <div class="state_model">
                        <div class="CurrentTime">{{stateText}}</div>
                        <div style="align-items: center;display: flex;flex:0.5;">
                            <div style="width:50px;height:50px;border-radius:25px;overflow: hidden;">
                                <img src="../../../images/orderdetail.png" style="height:50px;">
                            </div>
                        </div>
                    </div>
                    <div class="AddressLi">
                        <div class="Edit" id="Edit" style="padding-right: 20px;">
                            <span style="display:flex;align-items: center;"><img src="../../../images/Location.png"
                                    style="height:30px;"></span>
                        </div>
                        <div class="MsgTitle">
                            <div class="list">
                                <span>{{data.consignee}}</span><span style="float:right;padding-right: 20px;">{{data.mobile}}</span>
                            </div>
                            <div class="list">{{data.province}}-{{data.city}}-{{data.country}}</div>
                            <div class="list">详细地址 {{data.address}}</div>
                        </div>
                    </div>
                    <!-- 列表 -->
                    <div class="data_list" style="margin-bottom:5px;">
                        <div class="item" v-for="(item,index) in data.orderDetailEntityList">
                            <div class="ShopImg">
                                <img :src="item.warePic" style="height:5rem;width:5rem;display:block;">
                            </div>
                            <div style="width:100%;flex-direction: column;float:rigth;">
                                <div class="TitleTxt">{{item.wareName}}</div>
                                <div class="ShopSize">
                                    <span>{{item.specOne}}</span>
                                    <span>X{{item.wareNum}}</span>
                                </div>
                                <div class="" style="width:100%;display:flex;">
                                    <a class="afterSale" style="display:none;">申请售后</a>
                                    <div class="ShopPrice">￥{{item.warePrice}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="jie_sun_list">
                        <div class="item">
                            <span>商品价格</span><span>￥{{data.wareTotalPrice}}</span>
                        </div>
                        <div class="item">
                            <span>商品运费</span><span>￥{{data.freightPayable}}</span>
                        </div>
                        <div class="item">
                            <span>优惠价格</span><span>￥{{data.couponWorth}}</span>
                        </div>
                        <div class="item">
                            <span>总计</span><span>￥{{data.wareTotalPrice-data.freightPayable-data.couponWorth}}</span>
                        </div>
                        <div class="" style="margin: 5px 0;color: #999;font-size: 0.6rem;">
                            <p>订单编号:{{data.oid}}</p>
                            <p>创建时间:{{data.createTime}}</p>
                        </div>
                    </div>
                    <!-- 立即支付 -->
                    <div style="padding:0 10px;background:#fff;color: #999;font-size: 0.6rem;text-align: right;height:45px;line-height: 45px;border-top: 1px solid #dcdcdc;">
                        <a style="border: 1px solid #999;border-radius:3px;padding: 3px 10px;" @click="stateClick()">去支付</a>
                    </div>

                </ul>
            </div>
        </div>
        <!-- 支付框 -->
        <payModel 
            type='alertpaymodel' 
            ref="mychild"
            @cancelpaymodel='cancelpaymodel' 
            :payshowstate='payM' 
            @transferUser='transferUser' 
            :paynum='paynum'>
        </payModel>
    </div>
</template>
<script>
    import Header from '../../../components/Header'
    import Footer from '../../../components/Footer'
    import BScroll from 'better-scroll'
    import { getNowFormatDate, getMillisecond, formatDuring } from "../../../config/mUtils"
    import { Swipe, SwipeItem, Indicator, Toast } from 'mint-ui'
    import payModel from "../../../components/payModel";

    export default {
        data() {
            return {
                data: '',
                pageNum: 1,
                pageSize: 20,
                styleObj1: { "height": '', "width": "100%", "overflow": "hidden", 'font-size': '40px' },
                stateText: "加载中...",
                payM:false,	//支付框状态
				paynum:'',	//实际金额
                couponSum:''//支付前获取优惠值
            }
        },
        mounted() {
            this.getData(),
            this.scrollFn()
        },
        watch: {

        },

        //获取屏幕高度
        beforeMount() {
            let height = 0
            let h = document.documentElement.clientHeight || document.body.clientHeight;
            this.styleObj1["height"] = h - height + "px"
        },
        components: {
            payModel
        },
        methods: {
            // 付款弹框
			alertpaymodel() {
				this.payM = true;
				
            },
            cancelpaymodel(){
                this.payM = false;
            },
            getData() {
                let parameter = {
                    orderNo: this.$route.query.id,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                };
                this.$http
                    .post(process.env.API_HOST + "/mall_api/order/get_order_info_byOid", parameter)
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            this.data = response.data.data[0]
                            this.getTime()
                        }

                    })
                    .catch(error => {
                        console.log(error);
                    });
            },

            getTime() {
                setInterval(()=> {
                    let endtimeHaoMiao = getMillisecond(this.data.invalidTime)
                    let nowtimeHaoMiao = getMillisecond(getNowFormatDate())
                    if (this.data.ordersStatus == 0) {
                        if (endtimeHaoMiao - nowtimeHaoMiao > 0) {
                            this.stateText = "待买家付款剩余" + formatDuring(endtimeHaoMiao - nowtimeHaoMiao)
                        } else {
                            this.stateText = "交易已完成"
                        }
                    }
                    if (this.data.ordersStatus == 1) {
                        this.stateText = "待卖家发货"
                    }
                    if (this.data.ordersStatus == 2) {
                        this.stateText = "待买家收货"
                    }
                    if (this.data.ordersStatus == 3) {
                        this.stateText = "交易已完成"
                    }
                }, 1000)
            },
            scrollFn() {
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.bscroll, {
                            scrollY: true,
                            click: true,
                            probeType: 2,
                            pullUpLoad: {
                                threshold: 10
                            },
                            mouseWheel: {    // pc端同样能滑动
                                speed: 20,
                                invert: false
                            },
                            useTransition: false  // 防止iphone微信滑动卡顿
                        });
                    }
                });
            },
            // 支付前获取优惠金额
			stateClick(){
                let parameter={"orderNo":this.$route.query.id};
                this.$http
                    .post(process.env.API_HOST + "/mall_api/common/couponPrice", parameter)
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            this.couponSum=response.data.data.couponSum
                            this.paynum=this.data.wareTotalPrice-this.data.freightPayable-this.couponSum
                            this.alertpaymodel()
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            // 跳转 0支付宝,1微信
            transferUser(msg){
                // 支付宝参数
                let shifukuan=this.paynum
                let waresName=this.data.orderDetailEntityList[0].wareName
                let oid=this.data.oid
                // 微信参数
                let list=this.data.orderDetailEntityList
               
                let ordersInfoIdArr=[]
                for (var i = 0; i < list.length; i++) {
                    ordersInfoIdArr.push(list[i].ordersDetailId)
                }
                let ordersInfoIds = ordersInfoIdArr.toString()
                let ip=returnCitySN["cip"];
        
                if (msg == "0") {
                    this.$refs.mychild.ZhiFuBao(oid, waresName, shifukuan)
                }
                if (msg == 1) {
                    this.$refs.mychild.WeiXin(ordersInfoIds, waresName, shifukuan, ip)
                }
            },
        }
    }
</script>
<style lang="scss" scoped>
    .state_model {
        height: 75px;
        background: #f3cb0a;
        display: flex;
        font-size: .85rem;

        .CurrentTime {
            text-align: left;
            display: flex;
            flex: 1;
            justify-content: center;
            color: #fff;
            flex-direction: column;
            padding-left: 55px;
        }
    }

    .AddressLi {
        font-size: 0.7rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        color: #666;
        padding: 5px 10px;
        height: 4rem;
        background: #fff;
        border-bottom: 1px solid #dcdcdc;
        align-items: center;
        justify-content: center;

        .Edit {
            display: flex;
            align-items: center;
            width: 50px;
        }

        .MsgTitle {
            width: 80%;
            flex: 1;

            .list {
                text-align: left;
            }
        }
    }

    .data_list {
        .item {
            display: flex;
            border-bottom: 1px solid #dcdcdc;
            padding: 5px 10px;
            background: #fff;

            .ShopImg {
                margin-right: 10px;
            }

            .TitleTxt {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-size: 0.7rem;
            }

            .ShopSize {
                display: flex;
                line-height: 40px;
                justify-content: space-between;
                color: #999;
                font-size: 0.6rem;
            }

            .afterSale {
                width: 75px;
                display: flex;
                border: 1px solid #e5e5e5;
                text-align: center;
                border-radius: 5px;
                font-size: 12px;
                color: #666;
                height: 20px;
                justify-content: center;
            }

            .ShopPrice {
                color: #cc0000;
                font-size: 15px;
                text-align: right;
                flex: 1;
            }
        }
    }

    .jie_sun_list {
        padding: 5px 10px;
        font-size: 0.75rem;
        background: #fff;
        text-align: left;

        .item {
            display: flex;
            margin: 5px 0;
            justify-content: space-between;
        }
    }
</style>
<template>
    <div class="wrap">
        <Header></Header>
        <ul class="list" v-infinite-scroll infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <div class="DefaultAddress">
                <div class="Edit" style="padding-right: 20px;">
                    <span style="display:flex;align-items: center;">
                        <img src="../../images/Location.png" style="height:30px;">
                    </span>
                </div>
                <div class="MsgTitle">
                    <div style="width:100%;">
                        <span>{{address.receiverName}}</span>
                        <span style="float:right;padding-right: 20px;">{{address.receiverPhone}}</span>
                    </div>
                    <div style="width:100%;">
                        <span>{{address.receiverProvince}}</span>
                        <span>-</span>
                        <span>{{address.receiverCity}}</span>
                        <span>-</span>
                        <span>{{address.receiverDistrict}}</span>
                    </div>
                    <div style="width:100%;">
                        <span>{{address.receiverAddress}}</span>
                    </div>
                </div>
                <div class="Edit">
                    <i class="iconfont icon-arrow_right" style="font-size: 1rem ;"></i>
                </div>
            </div>
            <div>
                <li v-for="(item,index1) in goodsObj" :key="index1">
                    <div class="ShopName">
                        <div class="left" style="display:flex;">{{item.mallAdminId}}</div>
                        <div class="right">
                            <i class="iconfont icon-arrow_right" style="font-size: 1rem ;"></i>
                        </div>
                    </div>
                    <div style="margin-bottom: 5px;">
                        <div v-for="(list,index) in item.list" :key="index">
                            <div style="display:flex; padding: 5px 10px;">
                                <div class="shopimg">
                                    <img :src="list.warePic" style="width:5rem;height:5rem;">
                                </div>
                                <div style="flex:1;">
                                    <div class="titletxt">{{list.warename}}</div>
                                    <div class="shopsize">{{list.specname}}</div>
                                    <div style="width:100%;display:flex;justify-content: space-between;">
                                        <div class="shopprice">￥{{list.wareprice}}</div>
                                        <div class="quantity">
                                            <div class="addition" @click="addUp(index1, index)">
                                                <i class="iconfont icon-iconfontadd"></i>
                                            </div>
                                            <div class="number">
                                                {{list.quantity}}
                                                <input type="text">
                                            </div>
                                            <div class="subtraction">
                                                <i class="iconfont icon-iconfontmove"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="YuHuiMa" style="height:45px;line-height:45px;display:flex;font-size:0.8rem;border-top: 1px solid #dcdcdc;padding: 0px 10px;justify-content: space-between;">
                                <div @click="alerts" style="flex:1;text-align: left;">输入优惠码：</div>
                                <div>已优惠￥0.00</div>
                            </div>

                        </div>
                    </div>
                    <div class="FaPiaoLi" style="height:45px;display:flex;padding: 0 10px;font-size:0.8rem;border-top: 1px solid #dcdcdc;">
                        <div style="line-height: 45px;">发票：</div>
                        <div style="flex:1;line-height:45px;text-align:right;">不使用</div>
                    </div>
                    <div class="RemarksList" style="height:45px;display:flex;padding: 0 10px;font-size:0.8rem;border-top: 1px solid #dcdcdc;">
                        <div style="line-height: 45px;">买家留言：</div>
                        <div style="flex:1;line-height:45px;">
                            <input placeholder="填写内容已和卖家协商确认">
                        </div>
                    </div>
                </li>
            </div>
            <div class="Postage">
                <span>商品总额</span>
                <div class="FontColr" style="flex:1;text-align: right;">￥{{totalMoney}}</div>
            </div>
            <div class="Postage">
                <span>邮费总额</span>
                <div class="FontColr" style="flex:1;text-align: right;">￥{{totalFare}}</div>
            </div>
            <div class="Postage">
                <span>优惠总额</span>
                <div class="FontColr" style="flex:1;text-align: right;">￥{{totalpreferential}}</div>
            </div>
            <div class="CartTotalAmount">
                <div class="AllSelection" style="display: flex;margin-right: 10px;align-items: center;"></div>
                <div class="Settlement">
                    <span style="font-size:0.6rem;">合计:￥{{totalMoney+totalFare-totalpreferential}}</span>
                </div>
                <div class="SettlementBtn" @click="onLinePay">在线支付</div>
            </div>
        </ul>
        <!-- 优惠卷 -->
        <showModel type='alert' @tocancel='cancelfall' :showstate='showa'>

        </showModel>
        <!-- 支付框 -->
        <payModel type='alertpaymodel' 
            @cancelpaymodel='cancelpaymodel' 
            :payshowstate='payM' 
            @transferUser='gotopay' 
            :paynum='totalMoney+totalFare-totalpreferential'>
        </payModel>
        
    </div>
</template>
<script>
    import Header from "../../components/Header";
    import Footer from "../../components/Footer";
    import showModel from "../../components/showModel";
    import payModel from "../../components/payModel";
    import { Indicator, Toast, InfiniteScroll } from "mint-ui";
    export default {
        name: 'demo',
        data() {
            return {
                address: "",
                goodsObj: "",
                loading: false,
                allChecked: false,
                totalMoney: 0,
                totalFare: 0,
                totalpreferential: 0,
                mdparr: [],
                showa: false,
                payM:false,
                advancePaymentOrder:''//预支付订单
            };
        },

        mounted() {
            if (this.$store.state.baseUser.userId == "") {
                this.$router.push("/login");
                return false;
            }
            this.$store.commit("changeTitle", "确认订单");
            this.loadAddress();
            this.loadMore();
        },
        components: {
            Header,
            Footer,
            showModel,
            payModel
        },
        methods: {
            alerts() {
                this.showa = true;
            },
            cancelfall(){
                this.showa = false;
            },
            alertpaymodel() {
                this.payM = true;
            },
            cancelpaymodel(){
                this.payM = false;
            },
            
            loadAddress() {
                let parameter = {
                    userId: this.$store.state.baseUser.userId
                };
                this.$http
                    .post(
                        process.env.API_HOST + "/mall_api/shipping/get_default_shipping",
                        parameter
                    )
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            this.address = response.data.data;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            loadMore() {
                let parameter = {
                    userId: this.$store.state.baseUser.userId
                };
                this.$http
                    .post(process.env.API_HOST + "/mall_api/cart/list", parameter)
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            this.goodsObj = response.data.data.cartWareVOList;
                            this.groupData();
                            this.calTotalMoney();
                            this.calTotalFare()
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            // 将数据分组
            groupData() {
                let arr = this.goodsObj;
                var map = {},
                    dest = [];
                for (var i = 0; i < arr.length; i++) {
                    arr[i]["checked"] = false;
                    var ai = arr[i];
                    if (!map[ai.mallAdminId]) {
                        dest.push({
                            mallAdminId: ai.mallAdminId,
                            checked: false,
                            list: [ai]
                        });
                        map[ai.mallAdminId] = ai;
                    } else {
                        for (var j = 0; j < dest.length; j++) {
                            var dj = dest[j];
                            if (dj.mallAdminId == ai.mallAdminId) {
                                dj.list.push(ai);
                                break;
                            }
                        }
                    }
                }
                this.goodsObj = dest;
                console.log(this.goodsObj);
            },

            // 计算商品总金额
            calTotalMoney: function () {
                var oThis = this;
                this.totalMoney = 0;
                for (var i = 0, len = this.goodsObj.length; i < len; i++) {
                    var list = this.goodsObj[i]["list"];
                    list.forEach(function (item, index, arr) {
                        oThis.totalMoney +=
                            parseFloat(item.wareprice) * parseFloat(item.quantity);
                    });
                }
            },
            // 计算每个店铺的运费总额
            calEveryFare: function (index) {
                var everyStoreFare = 0,
                    list = this.goodsObj[index]['list'];
                list.forEach(function (item, index, arr) {
                    if (list[index]['checked']) {
                        everyStoreFare += parseFloat(item.fare) * parseFloat(item.num);
                    }
                });
                return everyStoreFare.toFixed(2);
            },
            // 计算商品总邮费
            // freightTempletType：0包邮，1统一收费，2满多少钱包邮，3案件数收费
            calTotalFare: function () {
                var oThis = this;
                this.totalFare = 0;
                for (var i = 0, len = this.goodsObj.length; i < len; i++) {
                    var list = this.goodsObj[i]["list"];
                    var mdp = 0;
                    list.forEach(function (item, index, arr) {
                        var a = 0
                        if (item.freightTempletType == 0) {
                            a = parseFloat(item.freightTempletValue)
                        }
                        if (item.freightTempletType == 1) {
                            a = parseFloat(item.freightTempletValue)
                        }
                        if (item.freightTempletType == 2) {
                            var _aa = item.quantity * item.wareprice
                            var aa = item.freightTempletValue.split(",")[0] // 超过当前值包邮
                            var bb = item.freightTempletValue.split(",")[1]
                            if (_aa > aa) {
                                a = 0
                            } else {
                                a = 10
                            }
                        }
                        mdp += a
                    });
                    this.mdparr.push(mdp)
                    this.totalFare += mdp
                }
            },

            addUp(index1, index) {
                var list = this.goodsObj[index1]["list"];
                ++this.goodsObj[index1]["list"][index].quantity;
            },
            addDown() {
                if (this.buyNum > 1) {
                    this.buyNum--;
                    console.log(this.buyNum);
                }
            },
            // 在线结算
            onLinePay() {
                var goodsObj = this.goodsObj;
                var wareListParent = [];
                for (var i = 0; i < goodsObj.length; i++) {
                    var wareList = [];
                    for (var j = 0; j < goodsObj[i].list.length; j++) {
                        var a = goodsObj[i].list[j];
                        var List = {
                            priceSum: a.quantity * a.wareprice,
                            cartId: a.cartId,
                            quantity: a.quantity,
                            wareid: a.wareid,
                            wareprice: a.wareprice,
                            specName: a.specname,
                            cCode: "",
                            orderRemark: "",
                            invoiceInfo: "",
                            distributionValue: "",
                            mallAdminId: a.mallAdminId,
                            sameWareSumPostCharge: this.mdparr[i]
                        };
                        wareList.push(List);
                    }
                    wareListParent.push(wareList);
                }
                var data = {
                    shippId: this.address.shipId,
                    userId: this.$store.state.baseUser.userId,
                    wareList: wareListParent
                };
                data = JSON.stringify(data);
                var parameter = { orders: data };
                console.log(parameter);
                Indicator.open("加载中...");
                this.$http
                    .post(process.env.API_HOST + "/mall_api/order/create_order", parameter)
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            console.log(response.data)
                            // 预支付订单
                            this.advancePaymentOrder=response.data.data;
                            Indicator.close();
                            this.alertpaymodel();
                        }
                    })
                    .catch(error => {
                        Indicator.close();
                        Toast("下单失败");
                        console.log(error);
                    });
            },
            
            // 跳转 0支付宝,1微信
            gotopay(msg){
                // 支付宝参数
                let shifukuan=this.totalMoney+this.totalFare-this.totalpreferential
                let waresName=this.advancePaymentOrder.orderInfoVoList[0].orderDetailEntityList[0].wareName
                let oid=this.advancePaymentOrder.orderInfoVoList[0].oid

                // 微信参数
                let ordersInfoIds=''
                let waresName=''
                let price=''
                let ip=''
                
                if(msg=="0"){
                    this.ZhiFuBao(oid,waresName,shifukuan)
                }
                if(msg==1){
                    this.ZhiFuBao(oid,waresName,shifukuan)
                }
            },

            // 调用支付宝
            ZhiFuBao(a,b,c) {
                let parameter = {
                    "oid": a,
                    "wareName": b,
                    "price": c
                }
                this.$http
                    .get(process.env.API_HOST + "/mall_api/pay/payH5",{
                        params: parameter
                    })
                    .then(response => {
                        console.log(response)
                        if(response.status == 200 & response.statusText == "OK") {
                            window.location.href=response.request.responseURL
                        }
                    })
                    .catch(error => {
                        Indicator.close();
                        console.log(error);
                    });      
            },

            WeiXin(ordersInfoIds,waresName,price,ip) {
                let parameter= {
                    "ordersInfoIds": ordersInfoId,
                    "waresName": waresName,
                    "price": allprice * 100,
                    "ip": ip,
                    "tradeType": "MWEB",
                }
                this.$http
                    .get(process.env.API_HOST + "/mall_api/pay/wxprepay",{
                        params: parameter
                    })
                    .then(response => {
                        console.log(response)
                        if(response.status == 200 & response.statusText == "OK") {

                            // window.location.href=response.request.responseURL
                            // if (res.code == 0) {
                            //     var urlStr = res.data.mwebUrl;
                            //     var s1 = urlStr.split("amp;")[0];
                            //     var s2 = urlStr.split("amp;")[1];
                            //     var mwebUrl = s1 + s2;
                            //     window.location.href = mwebUrl;
                            // }
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
        max-height: 100vh; //与屏幕一样高度
        overflow-y: auto;
        overflow-x: hidden;
        padding-bottom: 100px;
        li {
            margin-top: 5px;
            background: #fff;
        }

        .ShopName {
            width: 100%;
            display: flex;
            height: 2rem;
            line-height: 2rem;
            font-size: 0.8rem;
            padding: 0 10px;
            overflow: hidden;
            border-bottom: 1px solid #e8e8e8;

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

    .DefaultAddress {
        display: flex;
        width: 100%;
        font-size: 0.8rem;
        padding: 0px 10px;
        padding-right: 5px;
        background: #fff;

        .Edit {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .MsgTitle {
            text-align: left;
            width: 80%;
            padding: 5px 0;
            flex: 1;
        }
    }

    .RemarksList input {
        background-color: #fff;
        width: 100%;
        color: #666;
        text-indent: 1em;
        appearance: none;
        border: none;
        -webkit-border-radius: 2px;
        -ms-border-radius: 2px;
        border-radius: 2px;
        -webkit-appearance: none;
        outline: 0;
    }

    .Postage {
        width: 100%;
        display: flex;
        height: 2rem;
        line-height: 2rem;
        font-size: 0.8rem;
        padding: 0 10px;
        overflow: hidden;
        background: #fff;

        .FontColr {
            color: #cc0000;
        }
    }

    .CartTotalAmount {
        margin: 0 auto;
        height: 2.5rem;
        background: hsla(0, 0%, 100%, 0.95);
        color: #333;
        font-size: 14px;
        bottom: 0;
        padding-left: 10px;
        display: flex;

        .AllSelection {
            flex: 1;
        }

        .Settlement {
            flex: 1;
            font-weight: 700;
            text-align: center;
            line-height: 2.5rem;
            font-size: 0.75rem;
        }

        .SettlementBtn {
            flex: 1;
            background: #e4393c;
            color: #fff;
            font-weight: 700;
            text-align: center;
            line-height: 2.5rem;
        }
    }

    .zk-box {
        display: flex;
        line-height: 0.65rem;
        font-size: 0.26rem;
        color: #333;
        padding: 4.5rem 0;
    }

    .zk-flex {
        flex: 1;
    }

    .zk-pd {
        padding: 0.5rem 0.1rem;
    }

    .zk-btn {
        display: block;
        line-height: 0.88rem;
        text-align: Center;
        color: #fff;
        border-radius: 0.12rem;
        background: #488BF1;
    }

    .zk-blue {
        background: #488BF1;
    }
</style>
<template>
    <div class="wrap">
        <Header></Header>
        <ul class="list" v-infinite-scroll="" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <div class="DefaultAddress">
                <div class="Edit" style="padding-right: 20px;">
                    <span style="display:flex;align-items: center;">
                        <img src="../../images/Location.png" style="height:30px;">
                    </span>
                </div>
                <div class="MsgTitle">
                    <div style="width:100%;"><span>{{address.receiverName}}</span><span style="float:right;padding-right: 20px;">{{address.receiverPhone}}</span></div>
                    <div style="width:100%;"><span>{{address.receiverProvince}}</span><span>-</span><span>{{address.receiverCity}}</span><span>-</span><span>{{address.receiverDistrict}}</span></div>
                    <div style="width:100%;"><span>{{address.receiverAddress}}</span></div>
                </div>
                <div class="Edit"><i class="iconfont icon-arrow_right" style="font-size: 1rem ;"></i></div>
            </div>
            <div>   
                <li v-for="(item,index1) in goodsObj">
                    <div class="ShopName">
                        <div class="left" style="display:flex;">
                            <label class="mint-checklist-label">
                                <span class="mint-checkbox">
                                    <input type="checkbox" class="mint-checkbox-input" name="all" v-on:click="chooseShopGoods(index1)"
                                        v-model="item.checked" />

                                    <span class="mint-checkbox-core"></span>
                                </span>
                                <span class="mint-checkbox-label">{{item.mallAdminId}}</span>
                            </label>
                        </div>
                        <div class="right">
                            <i class="iconfont icon-arrow_right" style="font-size: 1rem ;"></i>
                        </div>
                    </div>
                    <div style="margin-bottom: 5px;">
                        <div  v-for="(list,index) in item.list">
                            <div style="display:flex; padding: 5px 10px;">
                                <label class="mint-checklist-label" style="align-items: center;display: flex;margin-right: 10px;">
                                    <span class="mint-checkbox">
                                        <input type="checkbox" class="mint-checkbox-input" name="checkbox" v-model="list.checked"
                                            v-on:click="choose(index1, index)" />
                                        <span class="mint-checkbox-core"></span>
                                    </span>
                                </label>
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
                                            <div class="number">{{list.quantity}}
                                                <input type="text" />
                                            </div>
                                            <div class="subtraction">
                                                <i class="iconfont icon-iconfontmove"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="YuHuiMa" style="height:45px;line-height:45px;display:flex;font-size:0.8rem;border-top: 1px solid #dcdcdc;padding: 0px 10px;justify-content: space-between;">
                                <div>输入优惠码：</div><div>已优惠￥0.00</div>
                            </div>
                        </div>
                    </div>
                    <div class="FaPiaoLi" style="height:45px;display:flex;padding: 0 10px;font-size:0.8rem;border-top: 1px solid #dcdcdc;"><div style="line-height: 45px;">发票：</div><div style="flex:1;line-height:45px;text-align:right;">不使用</div></div>
                    <div class="RemarksList" style="height:45px;display:flex;padding: 0 10px;font-size:0.8rem;border-top: 1px solid #dcdcdc;"><div style="line-height: 45px;">买家留言：</div><div style="flex:1;line-height:45px;"><input placeholder="填写内容已和卖家协商确认"></div></div>
                </li>
            </div>
            <div class="Postage">
                <span>商品总额</span>
                <div class="FontColr" style="flex:1;text-align: right;"><span>￥{{totalMoney}}</span></div>
            </div>
            <div class="Postage">
                <span>邮费总额</span>
                <div class="FontColr" style="flex:1;text-align: right;"><span>00</span></div>
            </div>
            <div class="Postage">
                <span>优惠总额</span>
                <div class="FontColr" style="flex:1;text-align: right;"><span>0</span></div>
            </div>
            <div class="CartTotalAmount">
                <div class="AllSelection" style="display: flex;margin-right: 10px;align-items: center;"></div>
                <div class="Settlement"><span style="font-size:0.6rem;">合计：</span><span class="FontColr">￥000</span></div>
                <div class="SettlementBtn" @click="onLinePay">在线支付</div>
            </div>
        </ul>
    </div>
</template>
<script>
    import Header from "../../components/Header";
    import Footer from "../../components/Footer";
    import { InfiniteScroll, Checklist } from "mint-ui";
    export default {
        data() {
            return {
                address:'',
                goodsObj: '',
                totalMoney: 0,
                loading: false,
                allChecked: false
            };
        },

        mounted() {
            if (this.$store.state.baseUser.userId == '') {
                this.$router.push("/login")
                return false
            }
            this.$store.commit('changeTitle', "确认订单")
            this.loadAddress()
            this.loadMore()
        },
        components: {
            Header,
            Footer
        },
        methods: {
            loadAddress() {
                let parameter = {
                    userId: this.$store.state.baseUser.userId
                }
                this.$http
                    .post(process.env.API_HOST + "/mall_api/shipping/get_default_shipping", parameter)
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            this.address=response.data.data;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            loadMore() {
                let parameter = {
                    userId: this.$store.state.baseUser.userId
                }
                this.$http
                    .post(process.env.API_HOST + "/mall_api/cart/list", parameter)
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {

                            this.goodsObj = response.data.data.cartWareVOList;
                            this.groupData()
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            // 将数据分组
            groupData() {
                let arr = this.goodsObj
                var map = {},
                    dest = [];
                for (var i = 0; i < arr.length; i++) {
                    arr[i]["checked"] = false
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
                this.goodsObj = dest
            },
            // 全部商品全选
            chooseAllGoods: function () {
                var flag = true;
                if (this.allChecked) {
                    flag = false;
                }
                for (var i = 0, len = this.goodsObj.length; i < len; i++) {
                    this.goodsObj[i]['checked'] = flag;
                    var list = this.goodsObj[i]['list'];
                    for (var k = 0, len1 = list.length; k < len1; k++) {
                        list[k]['checked'] = flag;
                    }
                }
                this.allChecked = !this.allChecked;
                this.calTotalMoney()
            },
            // 每个店铺全选
            chooseShopGoods: function (index) {
                var list = this.goodsObj[index]['list']
                if (this.goodsObj[index]['checked']) {
                    for (var i = 0; i < list.length; i++) {
                        list[i]['checked'] = false;
                    }
                } else {
                    for (var i = 0; i < list.length; i++) {
                        list[i]['checked'] = true;
                    }
                }
                this.goodsObj[index]['checked'] = !this.goodsObj[index]['checked'];
                this.isChooseAll();
                this.calTotalMoney()
            },
            // 单个选择
            choose: function (index1, index) {
                var list = this.goodsObj[index1]['list'],
                    len = list.length;
                if (list[index]['checked']) {
                    this.goodsObj[index1]['checked'] = false;
                    this.allChecked = false;
                    list[index]['checked'] = !list[index]['checked'];
                } else {
                    list[index]['checked'] = !list[index]['checked'];

                    // 判断是否选择当前店铺的全选
                    var flag = true;
                    for (var i = 0; i < len; i++) {
                        if (list[i]['checked'] == false) {
                            flag = false;
                            break;
                        }
                    }
                    flag == true ? this.goodsObj[index1]['checked'] = true : this.goodsObj[index1]['checked'] = false;
                }
                this.isChooseAll();
                this.calTotalMoney()
            },

            // 判断是否选择所有商品的全选
            isChooseAll: function () {
                var flag1 = true;
                for (var i = 0; i < this.goodsObj.length; i++) {
                    if (this.goodsObj[i]['checked'] == false) {
                        flag1 = false;
                        break;
                    }
                }
                flag1 == true ? this.allChecked = true : this.allChecked = false;
                this.calTotalMoney()
            },
            // 计算商品总金额
            calTotalMoney: function () {
                var oThis = this;
                this.totalMoney = 0;
                for (var i = 0, len = this.goodsObj.length; i < len; i++) {
                    var list = this.goodsObj[i]['list'];
                    list.forEach(function (item, index, arr) {
                        if (list[index]['checked']) {
                            oThis.totalMoney += parseFloat(item.wareprice) * parseFloat(item.quantity);
                        }
                    });
                }
            },
            getSum() {
                this.$router.push("/getSum")
            },

            addUp(index1, index) {
                var list = this.goodsObj[index1]['list']
                ++this.goodsObj[index1]['list'][index].quantity

            },
            addDown() {
                if (this.buyNum > 1) {
                    this.buyNum--
                    console.log(this.buyNum)
                }
            },
            onLinePay(){
                console.log(this.goodsObj)
                var goodsObj=this.goodsObj
                var wareListParent = [];
                for(var i=0;i<goodsObj.length;i++){
                    var wareList = [];
                   
                    for(var j=0;j<goodsObj[i].list.length;j++){
                        console.log(goodsObj[i].list[j])
                        var a=goodsObj[i].list[j]
                        
                        var List = { "priceSum": '', "cartId":a.cartId, "quantity":a.quantity , "wareid":a.wareid , "wareprice":a.wareprice , "specName":a.specname, "cCode": '', "orderRemark":'' , "invoiceInfo":'' , "distributionValue":'' , "mallAdminId":a.mallAdminId , "sameWareSumPostCharge": "" }
                        wareList.push(List);
                    }
                    wareListParent.push(wareList);
                }
                var data = { 
                    "shippId": this.address.shipId, 
                    "userId": this.$store.state.baseUser.userId, 
                    "wareList": wareListParent, 
                }
                data = JSON.stringify(data);
                var parameter = { "orders": data }
                console.log(parameter)
                // this.$http
                //     .post(process.env.API_HOST + "mall_api/order/create_order", parameter)
                //     .then(response => {
                //         if (response.data.code == 0 && response.data.success == true) {
                //             console.log(response)
                //         }
                //     })
                //     .catch(error => {
                //         console.log(error);
                //     });
               
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
        background: hsla(0,0%,100%,.95);
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
</style>
<style lang="scss">
    .mint-checklist-label {
        padding: 0;
    }

    .mint-cell-wrapper {
        padding: 0 0;
    }

    .mint-checklist-title {
        margin: 0;
    }
</style>
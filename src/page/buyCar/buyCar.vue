<template>
    <div>
        <Header></Header>
        <div class="bscroll" ref="bscroll" :style="styleObj1">
            <div class="bscroll-container">
                <ul>
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
                        <div>
                            <div style="display:flex; padding: 5px 10px;" v-for="(list,index) in item.list">
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
                                            <div class="subtraction" @click="addDown(index1, index)">
                                                <i class="iconfont icon-iconfontmove"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                     <!-- 购物车为空 -->
                    <div class="nolist" v-if="goodsObj.length==0">
                        <div class="item"><img src="//gw.alicdn.com/tfscom/TB1xdQSJFXXXXcuXXXXy7S8WFXX-176-176.png" style="width:60px;height:60px;" /></div>
                        <div class="txt">购物车空空如也，去逛逛吧~</div>
                    </div>
                </ul>
            </div>
        </div>
        <Footer>
            <div slot='logo' class="CartTotalAmount" v-if="goodsObj.length>0">
                <label class="mint-checklist-label" style="align-items: center;display: flex;">
                    <span class="mint-checkbox">
                        <input type="checkbox" class="mint-checkbox-input" style="cursor:pointer;" name="checkbox"
                            @click="chooseAllGoods($event)" v-model="allChecked">
                        <span class="mint-checkbox-core"></span>
                    </span>
                    <span class="mint-checkbox-label">全选</span>
                </label>
                <div class="Settlement"><span>合计：</span><span class="FontColr">￥{{totalMoney}}</span></div>
                <div class="SettlementBtn" @click="getSum">去结算</div>
            </div>
        </Footer>
    </div>
</template>
<script>
    import Header from "../../components/Header";
    import Footer from "../../components/Footer";
    import { Indicator, Toast, InfiniteScroll } from "mint-ui";
    import BScroll from 'better-scroll'
    import { listenScroll } from "../../config/mUtils"
    export default {
        data() {
            return {
                goodsObj: '',
                totalMoney: 0,
                loading: false,
                allChecked: true,
                styleObj1: { "height": '', "width": "100%", "overflow": "hidden", 'font-size': '40px' },
            };
        },

        mounted() {
            this.$store.commit('changeTitle', "购物车")
            this.loadMore()
            setTimeout(() => {
                this.scrollFn()
            }, 500)
        },
        //获取屏幕高度
        beforeMount(height) {
            var height = 60+50
            var h = document.documentElement.clientHeight || document.body.clientHeight;
            this.styleObj1["height"] = h - height + "px"
        },
        components: {
            Header,
            Footer
        },
        methods: {
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
            groupData() {
                let arr = this.goodsObj
                var map = {},
                    dest = [];
                for (var i = 0; i < arr.length; i++) {
                    arr[i]["checked"] = true
                    var ai = arr[i];
                    if (!map[ai.mallAdminId]) {
                        dest.push({
                            mallAdminId: ai.mallAdminId,
                            checked: true,
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
                this.calTotalMoney()
            },
            // 滚动事件
            scrollFn() {
                this.$nextTick(() => {
                    if (!this.scroll) {
                        listenScroll(this.$refs.bscroll)
                    } else {
                        this.scroll.refresh();
                    };
                });
            },
            // 全部商品全选
            chooseAllGoods: function () {
                var flag = true;
                setTimeout(() => {
                    if (this.allChecked == false) {
                        flag = false;
                    }
                    for (var i = 0, len = this.goodsObj.length; i < len; i++) {
                        this.goodsObj[i]['checked'] = flag;
                        var list = this.goodsObj[i]['list'];
                        for (var k = 0, len1 = list.length; k < len1; k++) {
                            list[k]['checked'] = flag;
                        }
                    }
                    this.calTotalMoney()
                }, 10)
            },
            // 每个店铺全选
            chooseShopGoods: function (index) {
                var list = this.goodsObj[index]['list']
                setTimeout(() => {
                    if (this.goodsObj[index].checked == false) {
                        for (var i = 0; i < list.length; i++) {
                            list[i]['checked'] = false;
                        }
                    } else {
                        for (var i = 0; i < list.length; i++) {
                            list[i]['checked'] = true;
                        }
                    }
                    this.isChooseAll();
                    this.calTotalMoney()
                }, 10)
            },
            // 单个选择
            choose(index1, index) {
                console.log(index1, index)
                var list = this.goodsObj[index1]['list']
                let flag = true;
                setTimeout(() => {
                    for (var i = 0; i < list.length; i++) {
                        if (list[i]['checked'] == false) {
                            flag = false;
                            break;
                        }
                    }
                    flag == true ? this.goodsObj[index1]['checked'] = true : this.goodsObj[index1]['checked'] = false;
                    flag == true ? this.allChecked = true : this.allChecked = false;
                    this.isChooseAll();
                    this.calTotalMoney()
                }, 10)

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
            calTotalMoney() {
                this.totalMoney = 0;
                for (var i = 0, len = this.goodsObj.length; i < len; i++) {
                    var list = this.goodsObj[i]['list'];
                    list.forEach((item, index, arr) => {
                        if (list[index]['checked']) {
                            this.totalMoney += parseFloat(item.wareprice) * parseFloat(item.quantity);
                        }
                    });
                }
                this.totalMoney = this.totalMoney.toFixed(2)
            },
            // 结算
            getSum() {
                let abc = []
                for (var i = 0; i < this.goodsObj.length; i++) {
                    var list = this.goodsObj[i]['list'];
                    list.forEach(function (item, index, arr) {
                        if (list[index]['checked']) {
                            abc.push(item)
                        }
                    });
                }
                sessionStorage.setItem("getlist", JSON.stringify(abc));
                console.log(JSON.parse(sessionStorage.getItem('getlist')))

                this.$router.push("/getSum")
            },
            // 增加数量
            addUp(index1, index) {
                var list = this.goodsObj[index1]['list']
                ++this.goodsObj[index1]['list'][index].quantity
                this.calTotalMoney()
            },
            // 减少数量
            addDown(index1, index) {
                if (this.goodsObj[index1]['list'][index].quantity > 1) {
                    var list = this.goodsObj[index1]['list']
                    --this.goodsObj[index1]['list'][index].quantity
                    this.calTotalMoney()
                }
            },
        }
    };
</script>

<style lang="scss" scoped>
    ul {
        padding-top:5px;
        font-size: 0.7rem;
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
        /* border-top: 1px solid #dcdcdc; */
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

    .nolist {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .item {
            width: 110px;
            height: 110px;
            background: #ccc;
            border-radius: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .txt {
            margin-top: 10px;
            font-size: 14px;
        }
    }

    .mint-checklist-label {
        cursor: pointer;
        padding: 0;
    }

    .mint-cell-wrapper {
        padding: 0 0;
    }

    .mint-checklist-title {
        margin: 0;
    }
</style>
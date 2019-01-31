<template>
    <div>
        <Header>
            <a slot="logo" class="administration" @click="administration">删除</a>
        </Header>
        <div class="bscroll" ref="bscroll" :style="styleObj1">
            <div class="bscroll-container">
                <ul>
                    <li class="title">
                        <label class="mint-radiolist-label">
                            <span style="margin-right: 5px;">企业</span>
                            <span class="mint-radio is-right">
                                <input type="radio" name="radio" class="mint-radio-input" v-model="checkedValue" value="1">
                                <span class="mint-radio-core"></span>
                            </span>
                        </label>
                        <label class="mint-radiolist-label">
                            <span style="margin-right: 5px;">个人</span>
                            <span class="mint-radio is-right">
                                <input type="radio" name="radio" class="mint-radio-input" v-model="checkedValue" value="0">
                                <span class="mint-radio-core"></span>
                            </span>
                        </label>
                        <label class="mint-checklist-label" style="align-items: center;display: flex;">
                            <span style="margin-right: 5px;">默认</span>
                            <span class="mint-checkbox">
                                <input type="checkbox" class="mint-checkbox-input" name="checkbox" v-model="allChecked">
                                <span class="mint-checkbox-core"></span>
                            </span>
                        </label>
                    </li>
                    <div v-for="(item,index) in data" class="input-item">
                        <div class style="font-size:15px;">{{item.name}}</div>
                        <div style="flex:1;text-align: center;font-size: 14px;color: #999;">
                            <input class="person_name" type="text" name="title" style="border:0;" :placeholder="'请输入'+item.name"
                                v-model="item.val">
                        </div>
                    </div>
                    <div class="yesbtn">
                        <a class="button" @click="getSave">保存</a>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from "../../components/Header";
    import BScroll from "better-scroll";
    import { Indicator, InfiniteScroll, Spinner, Checklist, Toast, Radio ,MessageBox} from "mint-ui";
    import { getNowFormatDate } from "../../config/mUtils";
    export default {
        data() {
            return {
                goodsObj: [],
                data: "",
                styleObj1: { height: "", width: "100%", overflow: "hidden", "font-size": "40px" },
                allChecked: true,
                allChecked_val: 0,
                checkedValue: 0
            };
        },
        //获取屏幕高度
        beforeMount(height) {
            var height = 50;
            var h = document.documentElement.clientHeight || document.body.clientHeight;
            this.styleObj1["height"] = h - height + "px";
        },
        components: {
            Header
        },
        mounted() {
            this.$store.commit("changeTitle", "发票抬头");
            this.scrollFn();
            this.loadMore();


        },
        watch: {
            allChecked(val) {
                if (val == true) {
                    this.allChecked_val = "0"
                } else {
                    this.allChecked_val = "1"
                }
            },
            checkedValue(val) {
                this.tabData();
            }
        },
        methods: {
            loadMore() {
                let parameter = {
                    invoiceId: this.$route.query.id
                };
                this.$http
                    .post(process.env.API_HOST + "/mall_api/invoice/invoiceInfo", parameter)
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            this.goodsObj = response.data.data;
                            this.checkedValue = this.goodsObj.invoiceType;
                            this.tabData();
                        }
                    })
                    .catch(error => {
                        Indicator.close();
                    });
            },
            tabData() {
                if (this.checkedValue == 1) {
                    this.data = [
                        {
                            name: "名称",
                            val: this.goodsObj.invoiceName
                        },
                        {
                            name: "税号",
                            val: this.goodsObj.invoiceNumber
                        },
                        {
                            name: "企业地址",
                            val: this.goodsObj.address
                        },
                        {
                            name: "电话",
                            val: this.goodsObj.phone
                        },
                        {
                            name: "开户银行",
                            val: this.goodsObj.bank
                        },
                        {
                            name: "银行账号",
                            val: this.goodsObj.bankAccount
                        }
                    ];
                } else {
                    this.data = [
                        {
                            name: "名称",
                            val: this.goodsObj.invoiceName
                        }
                    ];
                }
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
                            mouseWheel: {
                                speed: 20,
                                invert: false
                            },
                            useTransition: false
                        });
                    }
                });
            },
            // 更新新数据
            getSave() {
                let parameter = ''
                if (this.checkedValue == "0") {
                    parameter = {
                        invoiceId: this.$route.query.id,
                        invoicetype: this.checkedValue,
                        invoiceName: this.data[0].val,
                        status: this.allChecked_val
                    };
                }
                // // 企业
                if (this.checkedValue == "1") {
                    parameter = {
                        invoiceId: this.$route.query.id,
                        invoicetype: this.checkedValue,
                        status: this.allChecked_val,
                        invoiceName: this.data[0].val,
                        invoiceNumber: this.data[1].val,
                        address: this.data[2].val,
                        phone: this.data[3].val,
                        bank: this.data[4].val,
                        bankAccount: this.data[5].val
                    };
                }
                this.$http
                    .post(process.env.API_HOST + "/mall_api/invoice/updateInvoice", parameter)
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            Toast("更新数据成功");
                        } else {
                            Toast(response.data.msg);
                        }
                    })
                    .catch(error => {
                        Indicator.close();
                    });

            },
            // 删除状态
            administration() {
                var parameter = {
                    "invoiceId": this.$route.query.id
                }
                MessageBox.confirm('确定执行此操作?').then(action => {
                    this.$http
                        .post(process.env.API_HOST + "/mall_api/invoice/delInvoice", parameter)
                        .then(response => {
                            if (response.data.code == 0 && response.data.success == true) {
                                Toast("删除成功");
                                this.$router.push("/faPiao");
                            } else {
                                Toast(response.data.msg);
                            }
                        })
                        .catch(error => {
                            Indicator.close();
                        });
                })
            }
        }
    };
</script>
<style lang="scss" scoped>
    .drop-down {
        position: absolute;
        top: 50px;
        left: 0px;
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 14px;
        color: #666;
    }

    ul {
        padding-top: 5px;
        overflow: hidden;

        .title {
            font-size: 0.7rem;
            overflow: hidden;
            width: 100%;
            height: 50px;
            line-height: 50px;
            background: #fff;
            display: flex;
            padding: 0 10px;
            border-bottom: 1px solid #dcdcdc;
            justify-content: space-between;
        }

        .input-item {
            overflow: hidden;
            width: 100%;
            line-height: 50px;
            background: #fff;
            display: flex;
            padding: 0 10px;
            border-bottom: 1px solid #dcdcdc;
        }

        .yesbtn {
            align-items: center;
            justify-content: center;
            height: 2.5rem;
            left: 0;
            bottom: 0;
            width: 100%;
            display: flex;
            color: #666;
            margin-top: 2.5rem;

            .button {
                background: #f3cb0a;
                color: #fff;
                border: 1px solid #f3cb0a;
                width: 80%;
                display: block;
                height: 1.85rem;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                -webkit-appearance: none;
                padding: 0 0.5rem;
                margin: 0;
                font-family: inherit;
                font-size: 0.8rem;
                line-height: 1.75rem;
                text-align: center;
                text-decoration: none;
                text-overflow: ellipsis;
                white-space: nowrap;
                cursor: pointer;
                border-radius: 2rem;
            }
        }
    }

    .administration {
        flex: 1;
        text-align: right;
        padding-right: 10px;
    }

    .mint-checkbox-core {
        border-radius: 0;
    }
</style>
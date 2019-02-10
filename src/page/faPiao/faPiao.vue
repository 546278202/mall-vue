<template>
    <div>
        <Header>
            <a slot='logo' class="administration" @click="administration">管理</a>
        </Header>
        <div class="bscroll" ref="bscroll" :style="styleObj1">
            <div class="bscroll-container">
                <ul>
                    <li v-for="(item,index) in goodsObj" :key="index" @click="toPath(index)">
                        <div style="margin-right:5px;font-size:14px;">
                            <span v-if="item.status==0" class="state0">默认</span>
                            <span v-if="item.status==1" class="state1">默认</span>
                        </div>
                        <div>{{item.invoiceName}}</div>
                        <div v-if="item.invoiceType==0" style="flex:1;text-align: right;">个人</div>
                        <div v-if="item.invoiceType==1" style="flex:1;text-align: right;">企业</div>
                        <div v-if="falg" class="EditBtn"><i class="iconfont icon-arrow_right" style="font-size: '' ;"></i></div>
                    </li>
                    <div class="title">
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
                    </div>
                    <div v-for="(item,index) in data" class="input-item">
                        <div class style="font-size:15px;">{{item.name}}</div>
                        <div style="flex:1;text-align: center;font-size: 14px;color: #999;">
                            <input class="person_name" type="text" name="title" style="border:0;" :placeholder="'请输入'+item.name"
                                v-model="item.val">
                        </div>
                    </div>
                    <div class="yesbtn">
                        <a class="button" @click="getSave">添加并使用新抬头</a>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from "../../components/Header";
    import BScroll from 'better-scroll'
    import { Indicator, InfiniteScroll, Spinner, Checklist, Toast } from "mint-ui";
    import { getNowFormatDate } from "../../config/mUtils"
    export default {
        data() {
            return {
                goodsObj: [],
                data: "",
                styleObj1: { "height": '', "width": "100%", "overflow": "hidden", 'font-size': '40px' },
                falg: false,
                checkedValue: 0,
                allChecked: true,//默认选中
                allChecked_val: 0,//默认选中值
            }
        },
        //获取屏幕高度
        beforeMount(height) {
            var height = 50
            var h = document.documentElement.clientHeight || document.body.clientHeight;
            this.styleObj1["height"] = h - height + "px"
        },
        components: {
            Header
        },
       
        mounted() {
            this.$store.commit('changeTitle', "发票抬头")
            this.scrollFn()
            this.loadMore()
            this.tabData();
        },
        watch: {
            goodsObj(val) {
                this.scroll.refresh()
            },
            allChecked(val) {
                if(val == true) {
                    this.allChecked_val = "0"
                }else{
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
                    userId: this.$store.state.baseUser.userId,
                };
                this.$http
                    .post(
                        process.env.API_HOST + "/mall_api/invoice/invoiceList", parameter)
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            this.goodsObj = response.data.data
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
                            val: ''
                        },
                        {
                            name: "税号",
                            val: ''
                        },
                        {
                            name: "企业地址",
                            val: ''
                        },
                        {
                            name: "电话",
                            val: ''
                        },
                        {
                            name: "开户银行",
                            val: ''
                        },
                        {
                            name: "银行账号",
                            val: ''
                        }
                    ];
                } else {
                    this.data = [
                        {
                            name: "名称",
                            val: ''
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
            // 管理状态
            administration() {
                if (this.falg == true) {
                    this.falg = false
                } else {
                    this.falg = true
                }
            },
            //跳转路径
            toPath(index) {
                if (this.falg == true) {
                    let id = this.goodsObj[index].invoiceId
                    this.$router.push("/editFaPiao?id=" + id);
                }else{                   
                    let paramer={
                        invoicetype:'',
                        invoiceName:'',
                        invoiceNumber:'',
                        address:'',
                        phone:'',
                        bank:'',
                        bankAccount:''
                    }    
                    let a=this.goodsObj[index]
                     // 个人发票
                    if(a.invoiceType==0){
                        paramer.invoicetype=a.invoiceType
                        paramer.invoiceName=a.invoiceName
                        paramer.invoiceNumber=a.invoiceNumber
                        paramer.address=a.address
                        paramer.phone=a.phone
                        paramer.bank=a.bank
                        paramer.bankAccount=a.bankAccount
                    }else{
                        paramer.invoicetype=a.invoiceType
                        paramer.invoiceName=a.invoiceName
                        paramer.invoiceNumber=a.invoiceNumber
                        paramer.address=a.address
                        paramer.phone=a.phone
                        paramer.bank=a.bank
                        paramer.bankAccount=a.bankAccount
                    }
                    sessionStorage.setItem('fapiaoData', JSON.stringify(paramer))
                    
                    console.log(JSON.parse(sessionStorage.getItem('getlist')))
                    
                    this.$router.push({ path: '/getSum',query:{index:this.$route.query.index}});
                }
            },
            // 添加抬头
            getSave() {
                let parameter = ''
                if (this.checkedValue == "0") {
                    parameter = {
                        userId: this.$store.state.baseUser.userId,
                        invoiceType: this.checkedValue,
                        invoiceName: this.data[0].val,
                        status: this.allChecked_val
                    };
                }
                // // 企业
                if (this.checkedValue == "1") {
                    parameter = {
                        userId: this.$store.state.baseUser.userId,
                        invoiceType: this.checkedValue,
                        status: this.allChecked_val,
                        invoiceName: this.data[0].val,
                        invoiceNumber: this.data[1].val,
                        address: this.data[2].val,
                        phone: this.data[3].val,
                        bank: this.data[4].val,
                        bankAccount: this.data[5].val
                    };
                }
                if(parameter.invoiceName==''){
                    return false
                }
               
                this.$http
                    .post(process.env.API_HOST + "/mall_api/invoice/addInvoice", parameter)
                    .then(response => {
                        console.log(response)
                        if (response.data.code == 0 && response.data.success == true) {
                            Toast("添加数据成功");
                            this.loadMore()
                        } else {
                            Toast("添加数据失败");
                        }
                    })
                    .catch(error => {
                        Indicator.close();
                    });
            },
            

        }
    }
</script>
<style lang="scss" scoped>
    .drop-down {
        position: absolute;
        top: 50px;
        lefT: 0px;
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

    }


    li {
        overflow: hidden;
        width: 100%;
        line-height: 50px;
        background: #fff;
        display: flex;
        padding: 0 10px;
        font-size: 15px;
        color: #333;
        border-bottom: 1px solid #dcdcdc;
        position: relative;
        box-sizing: border-box;

        .state0 {
            height: 20px;
            width: 30px;
            border: 1px solid #F3930a;
            border-radius: 3px;
            padding: 0 3px;
            color: #F3930a;
        }

        .state1 {
            height: 20px;
            width: 30px;
            border: 1px solid #999;
            border-radius: 3px;
            padding: 0 3px;
            color: #999;
        }
    }

    .title {
        font-size: 0.7rem;
        overflow: hidden;
        width: 100%;
        height: 50px;
        line-height: 50px;
        background: #fff;
        display: flex;
        border-bottom: 1px solid #dcdcdc;
        justify-content: space-between;
        margin-top: 75px;

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

    .administration {
        flex: 1;
        text-align: right;
        padding-right: 10px;
    }

    .mint-checkbox-core {
        border-radius: 0;
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
</style>
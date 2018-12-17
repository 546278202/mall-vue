<template>
    <div class="wrap"> 
        <Header></Header>
        <ul class="list" v-infinite-scroll="" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <li v-for="(item,k,index) in dataList">
                <div class="ShopName">
                    <div class="left" style="display:flex;">
                        <mt-checklist style="display:flex;"
                            v-model="value"
                            :options="options[index]" 
                            >
                        </mt-checklist>
                    </div>
                    <div class="right">
                        <i class="iconfont icon-arrow_right" style="font-size: 1rem ;"></i>
                    </div>
                </div>
                <div>
                    <div style="display:flex; padding: 5px 10px;" v-for="(list,index) in item">
                        <!-- <mt-checklist style="display:flex;"
                            v-model="value"
                            >
                        </mt-checklist> -->
                        <div class="shopimg">
                            <img :src="list.warePic" style="width:5rem;height:5rem;">
                        </div>
                        <div style="flex:1;">
                            <div class="titletxt">{{list.warename}}</div>
                            <div class="shopsize">{{list.specname}}</div>
                            <div style="width:100%;display:flex;justify-content: space-between;">
                                <div class="shopprice">￥{{list.wareprice}}</div>
                                <div class="quantity">
                                    <div class="addition">
                                        <i class="iconfont icon-iconfontadd"></i>
                                    </div>
                                    <div class="number">{{list.quantity}}
                                        <input type="text"/>
                                    </div>
                                    <div class="subtraction">
                                        <i class="iconfont icon-iconfontmove"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </li>
        </ul>
        <div class="CartTotalAmount">
                <mt-checklist style="display:flex;"
                    v-model="value1"
                    :options="options1"
                    @change="allCheck($event)"
                    >
                </mt-checklist> 
			<div class="Settlement"><span></span>合计：<span class="FontColr">￥</span><span  class="FontColr">3835.01</span></div>
			<div class="SettlementBtn">去结算</div>
		</div>
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
                value1:true,
                options1 : [{
                    label: '全选',
                    checked:true
                }],
                value:true,
                options :[]
            };
        },
        watch:{
            value:{
                //注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
                handler(curVal,oldVal){
                console.log(curVal,oldVal);
                }
             
            }
        },
        mounted() {
            this.loadMore()
           
        },
        components: {
            Header,
            Footer
        },
        methods: {
           
            loadMore() {
                let parameter={
                   userId:JSON.parse(sessionStorage.getItem("baseUser")).userId
                }
                this.$http
                .post(process.env.API_HOST + "/mall_api/cart/list", parameter)
                .then(response => {
                    console.log(response);
                    if (response.data.code == 0 && response.data.success == true) {
                        var list=response.data.data.cartWareVOList
                        this.dataList = list;
                        this.groupData()
                        console.log(this.options1)
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            },
            groupData(){
                let dataList=this.dataList
                var dataArr = {}
                for (var i = 0; i < dataList.length; i++) {
                    if (dataArr[dataList[i].mallAdminId]) {
                        dataArr[dataList[i].mallAdminId].push(dataList[i])
                    }else{
                        dataArr[dataList[i].mallAdminId] = [];
                        dataArr[dataList[i].mallAdminId].push(dataList[i])
                    }
                }
                this.dataList=dataArr
                for (var i in dataArr) {
                    var aa=[{
                        label:i,
                        value:i
                    }]
                    this.options.push(aa)
                }
                console.log(this.options)
            },
            allCheck(e){
                console.log(e)
                if(e==false){
                    this.value=false
                }else{
                    this.value=true
                }
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
        overflow-x: hidden;
       
        padding-bottom:100px;
        li{
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
</style>
<style lang="scss">
    .mint-checklist-label{padding:0;}
    .mint-cell-wrapper{padding:0 0;}
    .mint-checklist-title{margin:0;}
</style>


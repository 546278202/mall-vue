<template>
    <div>
        <Header></Header>
        <div class="bscroll" ref="bscroll" :style="styleObj1">
            <div class="bscroll-container">
                <ul>
                    <li 
                        v-for="(item,index) in goodsObj" 
                        @click="goeditpage(index)"
                        :key="index" 
                        :class="item.defaultAddress==0 ? 'active':''">
                        <div class="MsgTitle">
                            <div style="width:100%;">
                                <span >{{item.receiverName}}</span><span style="float:right;">{{item.receiverPhone}}</span>
                            </div>
                            <div style="width:100%;">{{item.receiverProvince+"-"+item.receiverCity+"-"+item.receiverDistrict}}</div>
                            <div style="width:100%;">{{item.receiverAddress}}</div>
                        </div>
                        <div class="Edit"><i class="iconfont icon-bianji-copy" style="font-size: 1rem ;"></i></div>
                    </li>
                </ul>
            </div>
            <div class="yesbtn">
                <router-link :to="{path:'/addpage'}" class="button">添加新地址</router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '../../components/Header'
    import BScroll from 'better-scroll'
    import { Indicator, InfiniteScroll, Spinner, Popup, MessageBox } from "mint-ui";
    import { getNowFormatDate } from "../../config/mUtils"
    export default {
        data() {
            return {
                goodsObj: [],
                styleObj1: { "height": '', "width": "100%", "overflow": "hidden", 'font-size': '40px' },                
            }
        },

        //获取屏幕高度
        beforeMount(height) {
            var height = 50
            var h = document.documentElement.clientHeight || document.body.clientHeight;
            var w = document.documentElement.clientWidth || document.body.clientWidth;
            this.styleObj1["height"] = h - height + "px"
        },
        mounted() {
            this.$store.commit('changeTitle', "地址列表")
            this.loadMore()
            this.scrollFn()
        },

        components: {
            Header,
        },
        methods: {
            loadMore() {
                let parameter = { userId: this.$store.state.baseUser.userId };
                this.$http
                    .post(process.env.API_HOST + "/mall_api/shipping/get_list", parameter)
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            console.log(response.data.data)
                            this.goodsObj = response.data.data
                        }
                    })
                    .catch(error => { });
            },

            // 跳转编辑
            goeditpage(index){
                let aa=this.goodsObj[index]
                let arr={
                    shipId:aa.shipId,
                    receiverName:aa.receiverName,
                    receiverPhone:aa.receiverPhone,
                    receiverAddress:aa.receiverAddress,
                    defaultAddress:aa.defaultAddress,
                    receiverProvince:aa.receiverProvince,
                    receiverCity:aa.receiverCity,
                    receiverDistrict:aa.receiverDistrict,
                }    
                this.$router.push({path:'editpage' ,query:arr})
            },
            scrollFn() {
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.bscroll, {
                            swipeTime: 2000,
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    ul {
        overflow: hidden;
        li{
            display: flex;
            width: 100%;
            padding-left: 10px;
            border-bottom: 1px solid #dcdcdc;
            font-size:16px;
            background: #fff;
            text-align: left;
            .MsgTitle {
                width: 80%;
                float: left;
                padding: 5px 0;
            }
            .Edit {
                display: flex;
                width: 20%;
                align-items: center;
                justify-content: center;
                float: right;
            }
        }
    }

    .yesbtn {
        align-items: center;
        justify-content: center;
        height: 2.5rem;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        display: flex;
        color: #666;

        .button {
            background: #F3CB0A;
            color: #fff;
            border: 1px solid #F3CB0A;
            width: 80%;
            display: block;
            height: 1.85rem;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            -webkit-appearance: none;
            padding: 0 .5rem;
            margin: 0;
            font-family: inherit;
            font-size: .8rem;
            line-height: 1.75rem;
            text-align: center;
            text-decoration: none;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            border-radius: 2rem;
        }
    }
    .active{color:#F3CB0A}
</style>
<template>
    <div class="rules">
        <p class="drop-down" v-if="dropDown">松手刷新数据...</p>
        <div class="bscroll" ref="bscroll" :style="styleObj1">
            <div class="bscroll-container">
                <ul>
                    <li>
                        <div class="currentMsg">
                            <!-- 退货状态returnStatus :0初始化,1申请退款中,2退款中,3已完成 -->
                            <div class="return_state" v-if="goodsObj.returnStatus==0">初始化</div>
                            <div class="return_state" v-if="goodsObj.returnStatus==1">申请退款中</div>
                            <div class="return_state" v-if="goodsObj.returnStatus==2">退款中</div>
                            <div class="return_state" v-if="goodsObj.returnStatus==3">已完成</div>
                            <div style="font-size:12px;">{{goodsObj.complateTime}}</div>
                        </div>
                        <div class="MessageModule" style="padding:0 10px;background: #fff;flex:1;text-align: left;">
                            <div style="height:40px;line-height:40px;font-size: 15px;">退款详情</div>
                            <div style="display:flex;">
                                <div style="background:#dcdcdc;width:3.75rem;height:4.5rem;display:flex;overflow: hidden">
                                    <img src="http://yun.5tree.cn/shijiwxy/weixin/images/error.gif"  style="width:3.75rem;height:4.5rem;"></div>
                                <div style="flex:1;padding-left:10px;display:flex;flex-direction: column;">
                                    <div style="font-size:15px;color:#333;">ceshi</div>
                                    <div style="display:flex;font-size:12px;color:#999;line-height:1.8rem;">马卡龙蓝</div>
                                    <div style="display:flex;font-size:12px;"><span>￥0.01</span></div>
                                </div>
                            </div>
                            <div style="font-size:12px;color:#999;padding:10px 0;">
                                <div style="height:25px;"><span>退货编号：</span><span class="msgColor">3242342342324</span></div>
                                <div style="height:25px;"><span>退货原因：</span><span class="msgColor">不买了</span></div>
                                <div style="height:25px;"><span>退货金额：</span><span class="msgColor">￥0.01</span></div>
                                <div style="height:25px;"><span>退货件数：</span><span class="msgColor">1</span></div>
                                <div style="height:25px;"><span>申请时间：</span><span class="msgColor">2018/9/25/16:20:12</span></div>
                            </div>
                        </div>
                    </li>
                    <div style="display: flex;justify-content: center;font-size: 14px;color:#666;height: 45px;align-items: center;">
                        <!-- <mt-spinner :size="18" type="fading-circle" v-show="loadingState" ></mt-spinner> -->
                        <div style="margin-left:10px;">{{txtsmg}}</div>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "../../components/Header";
    import BScroll from 'better-scroll'
    import { Indicator, InfiniteScroll, Spinner } from "mint-ui";
    import { getNowFormatDate } from "../../config/mUtils"
    export default {
        data() {
            return {
                goodsObj: [],
                dropDown: false,
                pageNum: 1,
                pageSize: 20,
                styleObj1: { "height": '', "width": "100%", "overflow": "hidden", 'font-size': '40px' },
                txtsmg: "",
                flag: '',
                stop: true
            }
        },
        //获取屏幕高度
        beforeMount(height) {
            var height = 0
            var h = document.documentElement.clientHeight || document.body.clientHeight;
            this.styleObj1["height"] = h - height + "px"
        },

        mounted() {
            console.log(this.$store.state.baseUser.userId)
            this.scrollFn()
            this.loadMore()
        },
        watch: {
            goodsObj(val) {
                this.scroll.refresh()
            }
        },
        components: {
           
        },
        methods: {
            loadMore() {
                let parameter = {
                    orderNo: "201809131700582130001",
                    wareNumber: "97",
                    spec: "马卡龙蓝",
                };
                this.$http
                    .post(
                        process.env.API_HOST + "/mall_api/sale/returnInfo",
                        parameter
                    )
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            this.goodsObj=response.data.data
                            this.txtsmg = "上拉加载更多"
                        }
                    })
                    .catch(error => {
                        Indicator.close();
                    });
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
                    this.scroll.on('scroll', (pos) => {
                        //如果下拉超过50px 就显示下拉刷新的文字
                        if (pos.y > 50) {
                            this.dropDown = true
                        } else {
                            this.dropDown = false
                        }
                    })
                    //touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
                    this.scroll.on('touchEnd', (pos) => {
                        // 下拉动作
                        if (pos.y > 50) {
                            this.goodsObj.length = 0
                            this.pageNum = 1
                            this.loadMore()
                            this.dropDown = false
                            this.txtsmg = ""
                        }
                        //上拉加载 总高度>下拉的高度+10 触发加载更多
                        if (this.scroll.maxScrollY > pos.y + 10) {
                            if (this.stop == false) {
                                return false
                            }
                            this.txtsmg = "上拉加载更多"
                            this.pageNum++
                            this.loadMore()
                        }
                    })
                });
            }
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
       
    }
    .currentMsg {
        height: 100px;
        background: #f3cb0a;
        color: #fff;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .msgColor {
        color: #666;
    }
    .return_state{
        font-size:16px;
    }
</style>
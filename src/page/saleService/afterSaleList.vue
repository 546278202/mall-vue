<template>
    <div class="rules">
        <Header></Header>
        <p class="drop-down" v-if="dropDown">松手刷新数据...</p>
        <div class="bscroll" ref="bscroll" :style="styleObj1">
            <div class="bscroll-container">
                <ul>
                    <li v-for="(item,index) in goodsObj">
                        <div class="content1">
                            <div style="float: left;align-items: center;justify-content: center;display: flex;margin-right:10px;">
                                <img src="../../images/my_order1.jpg" style="height:25px;">
                            </div>
                            <div>京觅生鲜旗舰店苹果</div>
                            <div style="flex:1;text-align:right;">
                                <i class="iconfont icon-arrow_right" style="font-size:1rem;"></i>
                            </div>
                        </div>
                        <div class="content2" >
                            <div style="display:flex;">
                                <a class="a1" href="" style="margin-right:10px;">
                                    <img src="http://47.93.4.157:8082/covers/9/20180716/20180716_260.png" style="height:5rem;width:5rem;"></a>
                                <a class="b2" href="">
                                    <div class="txt">
                                        <sapn >{{item.wareName}}</sapn>
                                    </div>
                                    <div class="ShopSize">
                                        <span>{{item.specOne}}</span>
                                    </div>
                                    <div class="NumPrice">
                                        <span>共1件</span>
                                        <span style="margin-left:20px;">单价:</span>
                                        <sapn style="font-size: 0.8rem;color:#cc0000;">￥{{item.warePrice}}</sapn>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="content3">
                            <a @click="getDetailContent(index)"><span class="detail_btn">查看详情</span></a>
                            <a class="" style="display:flex;">
                                <div style="margin-right:5px;display: flex;justify-content: center;align-items: center;">
                                    <img src="../../images/returnStatus1.png" style="height:25px;">
                                </div>
                                <!-- 退货状态returnStatus :0初始化,1申请退款中,2退款中,3已完成 -->
                                <div class="return_state" v-if="item.returnStatus==0">初始化</div>
                                <div class="return_state" v-if="item.returnStatus==1">申请退款中</div>
                                <div class="return_state" v-if="item.returnStatus==2">退款中</div>
                                <div class="return_state" v-if="item.returnStatus==3">已完成</div>
                            </a>
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
            var height = 50
            var h = document.documentElement.clientHeight || document.body.clientHeight;
            this.styleObj1["height"] = h - height + "px"
        },

        mounted() {
            console.log(this.$store.state.baseUser.userId)
            this.$store.commit('changeTitle', "售后")
            this.scrollFn()
            this.loadMore()
        },
        watch: {
            goodsObj(val) {
                console.log(val)
                this.scroll.refresh()
            }
        },
        components: {
            Header,

        },
        methods: {
            loadMore() {
                let parameter = {
                    userId: this.$store.state.baseUser.userId,
                    ordersStatus: this.currentIndex,
                    time: getNowFormatDate(),
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                };
                this.$http
                    .post(
                        process.env.API_HOST + "/mall_api/sale/returnList",
                        parameter
                    )
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            var aa = response.data.data.list
                            this.txtsmg = "上拉加载更多"
                            if (aa.length < this.pageSize && aa.length > 0) {
                                this.txtsmg = "已经加载完毕"
                                this.stop = false
                            }
                            for (var i = 0; i < aa.length; i++) {
                                this.goodsObj.push(aa[i])
                            }
                            console.log(this.goodsObj)

                        }
                    })
                    .catch(error => {
                        Indicator.close();
                    });
            },
            //查看详情
            getDetailContent(index){
                console.log(this.goodsObj[index])
                this.$router.push("/afterSaleDetail")
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
                    } else {
                        // this.scroll.refresh();
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
        padding-top: 5px;
    }

    li {
        margin-bottom: 5px;
        background: #fff;
        .content1 {
            padding: 0 10px;
            width: 100%;
            display: flex;
            background: #fff;
            line-height: 2.5rem;
            font-size: 0.7rem;
        }
        .content2 {
            width: 100%;
            background: #fff;
            font-size: 0.7rem;
            padding: 10px;
            .b2 {
                flex: 1;
                .txt {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    height: 2rem;
                }
                .ShopSize {
                    font-size: 12px;
                    padding-top: 5px;
                    margin-bottom: 15px;
                    color: #999;
                    text-align: left;
                }
                .NumPrice {
                    text-align: right;
                    color: #999;
                }
            }
        }
        .content3 {
            padding: 0 10px;
            width: 100%;
            height: 2.5rem;
            display: flex;
            background: #fff;
            line-height: 2.5rem;
            font-size: 0.7rem;
            border-bottom: 1px solid #d3d3d3;
            border-top: 1px solid #d3d3d3;
            text-align: right;
            flex-direction: row-reverse;
            justify-content: space-between;
            a {
                color: #3d4145;
                .return_state{
                    flex:1;
                    text-align:right;
                }
                .detail_btn{
                    border: 1px solid #cc0000;
                    padding: 3px 5px;
                    border-radius: 6px;
                    color: #cc0000; 
                }
            }
        }
    }
</style>
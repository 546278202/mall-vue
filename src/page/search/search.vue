<template>
    <div class="rules">
        <router-view></router-view>
        <Search @SearchModel="SearchModel"></Search>
        <p class="drop-down" v-if="dropDown">松手刷新数据...</p>
        <div class="bscroll" ref="bscroll" :style="styleObj1">
            <div class="bscroll-container">
                <ul>
                    <router-link class="list_one" v-for="(item,index) in goodsObj"
                        :key="index" :to="{path:'/detail' , query:{id:item.wareid}}">
                        <div class="left"><img :src='item.warePic' style="width:100%;height:100%;"></div>
                        <div class="right">
                            <div class="txt">{{item.warename}}</div>
                            <div class="money">￥{{item.wareprice}}</div>
                            <div class="number">月销量{{item.waresellnumber}}件</div>
                        </div>
                    </router-link>
                    <div style="display: flex;justify-content: center;font-size: 14px;color:#666;height: 45px;align-items: center;">
                        <div style="margin-left:10px;">{{txtsmg}}</div>
                    </div>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
    import Header from "../../components/Header";
    import Search from "../../components/Search";
    import BScroll from 'better-scroll'
    import { Indicator, InfiniteScroll, Spinner, Toast } from "mint-ui";
    import { getNowFormatDate, getMillisecond } from "../../config/mUtils"
    import payModel from "../../components/payModel";
    export default {
        data() {
            return {
                goodsObj: [],
                dropDown: false,
                pageNum: 1,
                pageSize: 20,
                styleObj1: { "height": '', "width": "100%", "overflow": "hidden", 'font-size': '40px' },
                txtsmg: "",
                stop: true,
            }
        },
        //获取屏幕高度
        beforeMount(height) {
            var height = 50
            var h = document.documentElement.clientHeight || document.body.clientHeight;
            this.styleObj1["height"] = h - height + "px"
        },
        mounted() {
            this.scrollFn()
            this.loadMore()
        },
        watch: {
            goodsObj(val) {
                this.scroll.refresh()
            }
        },
        components: {
            Search,
        },
        methods: {
          
          
            loadMore() {
                let parameter = {
                    shopname: this.$route.query.name,
                    type: 0,
                    categoryType: 0,
                    pageNum: 1,
                    pageSize: 10,
                    time:getNowFormatDate()
                };
                this.$http
                    .post(process.env.API_HOST + "/mall_api/shop/get_serverlist",parameter)
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            var aa = response.data.data.wareList
                            console.log(aa)
                            this.txtsmg = "上拉加载更多"
                            if (aa.length < this.pageSize && aa.length > 0) {
                                this.txtsmg = "已经加载完毕"
                                this.stop = false
                            }
                            for (var i = 0; i < aa.length; i++) {
                                // aa[i].invalidTime = getMillisecond(aa[i].invalidTime)
                                this.goodsObj.push(aa[i])
                            }
                            console.log(this.goodsObj)
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
            },
            itemClick(index) {
                let oid = this.goodsObj[index].oid
                this.$router.push("/order/orderDetail?id=" + oid);
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

    .list_one {
        width: 100%;
        display: flex;
        padding: 10px;
        border-bottom: 1px solid #d3d3d3;
        background: #fff;
        .left {
            width: 5rem;
            height: 5rem;
            margin-right: 10px;
        }

        .right {
            flex: 1;
            text-align: left;

            .txt {
                height: 2.2rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-size: 0.7rem;
            }

            .money {
                color: #cc0000;
                font-size: 0.9rem;
                margin-bottom: 10px;
            }

            .number {
                flex: 1;
                height: 1.5rem;
                line-height: 2rem;
                font-size: 0.7rem;
            }
        }

    }
</style>
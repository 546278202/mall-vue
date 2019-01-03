<template>
    <div>
        <Search></Search>
        <div class="wrap" :style="styleObj1">
            <div class="content">
                <mt-swipe :auto="4000" style="height:200px;">
                    <mt-swipe-item v-for="item in items" :key="item">
                        <img v-bind:src="item.wareCover" style="width: 100%;height: 100%;">
                    </mt-swipe-item>
                </mt-swipe>
                <div class="block-img">
                    <img src="../../images/main5.jpg" style="width:100%;">
                </div>
                <ul infinite-scroll-disabled="loading" infinite-scroll-distance="50" class="page-infinite-list">
                    <div id="WareList">
                        <router-link v-for="(item,index) in lists" :key="index" :to="{path:'/detail' , query:{id:item.wareid}}">
                            <li>
                                <div class="ListImg" style="height:130px;overflow:hidden;">
                                    <img v-bind:src="item.wareCover" style="display:block;margin:0 auto;height:100%;">
                                </div>
                                <div class="txt">{{item.warename}}</div>

                                <div class="money">￥{{item.wareprice}}</div>
                            </li>
                        </router-link>
                        <div v-show="flag" style="display: flex;justify-content: center;font-size: 14px;color:#999;height: 45px;align-items: center;">
                            <div style="margin-right:10px;">{{txtsmg}}</div>
                            <mt-spinner :size="18" type="fading-circle" v-show="loadingState"></mt-spinner>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
    import Search from "../../components/Search";
    import Footer from "../../components/Footer";
    import BScroll from 'better-scroll'
    import { Swipe, SwipeItem, Indicator, Spinner } from "mint-ui";
    import { getNowFormatDate } from "../../config/mUtils";
    export default {
        data() {
            return {
                items: [],
                lists: [],
                pageNum: 1,
                pageSize: 20,
                flag: false,
                loadingState: false,
                txtsmg: "",
                styleObj1: { "height": '', "width": "100%", "overflow": "hidden", 'font-size': '40px' },
                stop: true
            };
        },
        //获取屏幕高度
        beforeMount(height) {
            var height = 50
            var h = document.documentElement.clientHeight || document.body.clientHeight;
            this.styleObj1["height"] = h - height + "px"
        },
        mounted() {
            this.loadMore()
            var oScroll = new BScroll(".wrap", {
                scrollY: true,
                click: true,
                probeType: 2,
                //下拉刷新：可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
                //这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载
                pullUpLoad: {
                    threshold: 10
                },
                mouseWheel: {    // pc端同样能滑动
                    speed: 20,
                    invert: false
                },
                useTransition: false  // 防止iphone微信滑动卡顿
            });
            oScroll.on("pullingUp", () => {
                if (this.stop == false) {
                    return false;
                }
                this.pageNum++
                this.loadMore();
                oScroll.finishPullUp();
                oScroll.refresh()
            });
            oScroll.refresh();

        },

        components: {
            Search,
            Footer
        },
        methods: {
            loadMore() {
                var data = {
                    time: getNowFormatDate(),
                    pageNum: "1",
                    pageSize: "10"
                };
                this.$http
                    .post(process.env.API_HOST + "/mall_api/shop/get_ware_list", data)
                    .then(response => {
                        Indicator.close();
                        if (response.data.code == 0 && response.data.success == true) {
                            console.log(response.data.data.wareList)
                            this.lists = response.data.data.wareList;
                            this.items = response.data.data.recommendWare;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }

        }
    };
</script>

<style lang="scss" scoped>
    #WareList li {
        width: 50%;
        padding: 5px;
        float: left;
        background: #fff;
        box-sizing: border-box;
        border-bottom: 5px solid #eee;
        border: 2px solid #eee;
        text-align: left;
        font-size: 14px;
    }

    .txt {
        height: 40px;
        margin: 5px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .page-infinite-desc {
        text-align: center;
        color: #666;
        padding-bottom: 5px;
        border-bottom: solid 1px #eee;
    }

    .page-infinite-listitem {
        height: 50px;
        line-height: 50px;
        border-bottom: solid 1px #eee;
        text-align: center;
    }

    .page-infinite-listitem:first-child {
        border-top: solid 1px #eee;
    }

    .page-infinite-wrapper {
        margin-top: -1px;
        overflow: scroll;
    }

    .page-infinite-loading {
        text-align: center;
        height: 50px;
        line-height: 50px;
    }

    .page-infinite-loading div {
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
    }
</style>
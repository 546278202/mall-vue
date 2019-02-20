<template>
    <div>
        <Header></Header>
        <div class="bscroll" ref="bscroll" :style="styleObj1">
            <div class="bscroll-container">
                <ul>
                    <li v-for="(item,index) in goodsObj" :key="index">
                        <router-link :to="{path:'/detail' , query:{id:item.wareid}}">
                            <div class="ListImg" style="height:130px;overflow:hidden;">
                                <img v-bind:src="item.warePic" style="display:block;margin:0 auto;height:100%;">
                            </div>
                            <div class="txt">{{item.warename}}</div>
                            <div style="color: #cc0000;">￥{{item.wareprice}}</div>
                        </router-link>
                    </li>
                    <div style="display: flex;width:100%;justify-content: center;font-size: 14px;color:#666;height: 45px;align-items: center;">
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
    import { Indicator, InfiniteScroll, Spinner, Checklist, Toast } from "mint-ui";
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
                stop: true
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
            this.$store.commit('changeTitle', "我的店铺")
            this.scrollFn()
            this.loadMore()
        },
        watch: {
            goodsObj(val) {
                console.log(val)
                this.scroll.refresh()
            }
        },
        methods: {
            loadMore() {
                let parameter = {
                    warenumber: this.$route.query.mallNumber,
                };
                this.$http
                    .post(process.env.API_HOST + "/mall_api/shop/get_ware_mall", parameter)
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            var aa = response.data.data
                            this.txtsmg = "上拉加载更多"
                            if (aa.length < this.pageSize && aa.length > 0) {
                                this.txtsmg = "已经加载完毕"
                                this.stop = false
                            }
                            for (var i = 0; i < aa.length; i++) {
                                aa[i]['checked'] = this.flag;
                                this.goodsObj.push(aa[i])
                            }
                        }
                    })
                    .catch(error => {

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
            },
        }
    }
</script>
<style lang="scss" scoped>
    ul {
        padding-top: 5px;
        overflow: hidden;
    }
    li {
        position: relative;
        width: 50%;
        box-sizing: border-box;
        padding: 5px;
        float: left;
        overflow: hidden;
        font-size: 0.7rem;
        background: #fff;
        text-align: left;
        margin-bottom: 5px;

        .txt {
            margin: 5px 0;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }

    li:nth-child(odd) {
        border-right: 5px #f5f5f5 solid;
    }
</style>
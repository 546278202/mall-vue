<template>
    <div>
        <Search></Search>
        <div class="bscroll" ref="bscroll" :style="styleObj1">
            <div class="bscroll-container">
                <ul>
                    <mt-swipe :auto="4000" style="height:200px;">
                        <mt-swipe-item v-for="item in items" :key="item">
                            <img v-bind:src="item.wareCover" style="width: 100%;height: 100%;">
                        </mt-swipe-item>
                    </mt-swipe>
                    <div class="block-img">
                        <img src="../../images/main5.jpg" style="width:100%;">
                    </div>
                    <li v-for="(item,index) in goodsObj" :key="index">
                        <router-link :to="{path:'/detail' , query:{id:item.wareid}}">
                            <div class="ListImg" style="height:130px;overflow:hidden;">
                                <img v-bind:src="item.wareCover" style="display:block;margin:0 auto;height:100%;">
                            </div>
                            <div class="txt">{{item.warename}}</div>
                            <div style="color: #cc0000;">￥{{item.wareprice}}</div>
                        </router-link>   
                    </li>
                </ul>
                <div style="display: flex;justify-content: center;font-size: 14px;color:#666;height: 45px;align-items: center;">
                    <div style="margin-left:10px;">{{txtsmg}}</div>
                </div>
            </div>
        </div>
        <Footer></Footer>
        <!-- 搜索model -->
        <searchModel></searchModel>
    </div>
</template>
<script>
    import Search from "../../components/Search";
    import Footer from "../../components/Footer";
    import searchModel from "../../components/searchModel";
    import BScroll from 'better-scroll'
    import { Indicator, InfiniteScroll, Spinner ,Popup } from "mint-ui";
    import { getNowFormatDate } from "../../config/mUtils"
    export default {
        data() {
            return {
                items: [],
                goodsObj: [],
                pageNum: 1,
                pageSize: 20,
                styleObj1: { "height": '', "width": "100%", "overflow": "hidden", 'font-size': '40px' },
                txtsmg: "",
                stop: true,              
            }
        },
        
        //获取屏幕高度
        beforeMount(height) {
            var height = 50+45
            var h = document.documentElement.clientHeight || document.body.clientHeight;
            var w = document.documentElement.clientWidth || document.body.clientWidth;
            this.styleObj1["height"] = h - height + "px"

        },
        mounted() {
            this.scrollFn()
            this.loadMore()
        },
       
        components: {
            Search,
            Footer,
            searchModel
        },
        methods: {

            loadMore() {
                let parameter = {
                    time: getNowFormatDate(),
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                };
                this.$http
                    .post(process.env.API_HOST + "/mall_api/shop/get_ware_list",parameter)
                    .then(response => {
                        Indicator.close();
                        if (response.data.code == 0 && response.data.success == true) {
                            this.items = response.data.data.recommendWare;
                            var aa = response.data.data.wareList
							this.txtsmg="上拉加载更多"
							if(aa.length<this.pageSize && aa.length>0){
								this.txtsmg="已经加载完毕"
								this.stop=false
							}
							for (var i = 0; i < aa.length; i++) {
								this.goodsObj.push(aa[i])
							}
                            Indicator.close();
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
                            probeType: '',
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
                    //touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
                    this.scroll.on('touchEnd', (pos) => {
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
    ul{
        overflow: hidden;
        li{
            position: relative;
            width: 50%;
            box-sizing: border-box;
            padding: 5px;
            float: left;
            overflow: hidden;
            font-size: 0.7rem;
            background: #fff;
            text-align: left;
            margin-bottom:5px;
            .txt {
                height: 2rem;
                margin: 5px 0;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
        li:nth-child(odd){
            border-right: 5px #f5f5f5 solid;
        }
    }
   
</style>
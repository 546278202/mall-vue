<template>
    <div>
        <Search></Search>
        <div style="flex-direction:row;display:flex;">
            <div class="bscroll1" ref="bscroll"  :style='styleObj1'>
                <div class="bscroll-container">
                    <ul>
                        <div style="flex:1;text-align: left;overflow: scroll;">
                            <li v-for="(item,index) in menuList" 
                                :key="index" 
                                @click="chooseMenu(index)" 
                                :class="menuIndex==index? 'act':''">
                                {{item.categoryName}}
                            </li>
                        </div>
                    </ul>
                </div>
            </div> 
            <div class="bscroll2" ref="menuFoodList" :style="styleObj2">
                <div class="bscroll-container">
                    <ul style="flex:1;background: #fff;text-align: left;overflow: scroll;">
                        <li v-for="(item,index) in menuList" :key="index">
                            <div class="title">{{item.categoryName}}</div>
                            <div>
                                <router-link v-for="(i,index) in item.children" :key="index" class="list_img" :to="{path:'/search' , query:{name:i.categoryName}}">
                                    <img v-bind:src='i.categoryIcon' style="width:40px;height:40px;">
                                    <div>{{i.categoryName}}</div>
                                </router-link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>       
        </div>
        <Footer></Footer>
        <!-- 搜索model -->
        <searchModel></searchModel>
    </div>
</template>
<script>
    import Search from '../../components/Search'
    import Footer from '../../components/Footer'
    import searchModel from "../../components/searchModel";
    import BScroll from 'better-scroll'
    import { Indicator, InfiniteScroll, Spinner } from "mint-ui";
    import { getNowFormatDate } from "../../config/mUtils"
    export default {
        data() {
            return {
                menuList: [],
                styleObj1: { "height": '', "width": "70px", "overflow": "hidden", 'font-size': '14px'},
                styleObj2: { "height": '', "width": "100%", "overflow": "hidden", 'font-size': '14px'},
                menuIndex:0,
                menuIndexChange: true,//解决选中index时，scroll监听事件重复判断设置index的bug
                foodScroll: null,  //食品列表scroll
                shopListTop: [], //商品列表的高度集合

            }
        },
        //获取屏幕高度
        beforeMount(height) {
            var height = 50+45
            var h = document.documentElement.clientHeight || document.body.clientHeight;
            this.styleObj1["height"] = h - height + "px"
            this.styleObj2["height"] = h - height + "px"

        },
        mounted() {
            this.loadMore()
        },
        watch: {
            menuList(val,old) {
                console.log(val)
                this.$nextTick(function(){
                    this.getFoodListHeight()
                });                
            },
        },
        components: {
            Search,
            Footer,
            searchModel
        },
        methods: {
            //获取食品列表的高度，存入shopListTop
            getFoodListHeight(){
                const listContainer = this.$refs.menuFoodList;
                if (listContainer) {
                    const listArr = Array.from(listContainer.children[0].children[0].children);
                    listArr.forEach((item, index) => {
                        this.shopListTop[index] = item.offsetTop-50;
                    });
                    this.listenScroll(listContainer)
                }
            },
            loadMore() {
                let data = {}
                this.$http.post(process.env.API_HOST + "/mall_api/classify/getClassifyList", data)
                    .then((response) => {
                        this.menuList = response.data.data;
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            },
         
            //当滑动食品列表时，监听其scrollTop值来设置对应的食品列表标题的样式
            listenScroll(element){
                this.foodScroll = new BScroll(element, {
                    swipeTime: 2000,
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
            },

            //点击左侧食品列表标题，相应列表移动到最顶层
            chooseMenu(index){
                this.menuIndex = index;
                //menuIndexChange解决运动时listenScroll依然监听的bug
                this.menuIndexChange = false;
                this.foodScroll.scrollTo(0, -this.shopListTop[index], 400);
                this.foodScroll.on('scrollEnd', () => {
                    this.menuIndexChange = true;
                })
            },
        
        },
    }
</script>

<style lang="scss" scoped>
    .title {
        padding-left: 30px;
        line-height: 45px;
    }
    .list_img {
        width: 32%;
        display: inline-block;
        text-align: center;
        padding: 10px;
    }
    .bscroll1{
        li{
            height: 60px;
            line-height: 60px;
            text-align:center;
        }
    }
    .act{
        background:#fff;
    }
</style>
<template>
    <div>
        <Header></Header>
        <div class="bscroll" ref="bscroll" :style="styleObj1">
            <div class="bscroll-container">
                <ul>
                    <router-link :to="{path:'/addresslist'}" class="detail_top">
                        <div>收货地址</div>		  	   
                        <div class="top-right"><i class="iconfont icon-arrow_right" style="font-size: 0.8rem ;"></i></div>	
                    </router-link>
                  
                    <a class="detail_top" href="../address/list.html">			 
                        <div>修改密码</div>		  	   
                        <div class="top-right"><i class="iconfont icon-arrow_right" style="font-size: 0.8rem ;"></i></div>	
                    </a>
                   
                </ul>
            </div>
            <div class="yesbtn">
                <a class="button" @click="signOut">退出登录</a>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '../../components/Header'
    import BScroll from 'better-scroll'
    import { Indicator, InfiniteScroll, Spinner ,Popup,MessageBox} from "mint-ui";
    import { getNowFormatDate } from "../../config/mUtils"
    export default {
        data() {
            return {
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
            this.$store.commit('changeTitle', "设置")
            this.scrollFn()
        },
       
        components: {
            Header,
        },
        methods: {
            // 退出登录
            signOut(){
                MessageBox.confirm('确定执行此操作?').then(action => {
                    sessionStorage.removeItem('baseUser')
                    this.$router.push("/login")
                });
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
                            mouseWheel: {    // pc端同样能滑动
                                speed: 20,
                                invert: false
                            },
                            useTransition: false  // 防止iphone微信滑动卡顿
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
       a{
            background: #fff;
            height: 50px;
            line-height: 50px;
            display: flex;
            text-align: center;
            border-bottom: 1px solid #dcdcdc;
            justify-content: space-between;
            padding: 0 10px;
            font-size:15px;
       }
       .content-block {
            margin: 1.75rem 0;
            padding: 0 .75rem;
            color: #6d6d72;
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
   
   
</style>
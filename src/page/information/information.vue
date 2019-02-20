<template>
    <div>
        <Header></Header>
        <div class="bscroll" ref="bscroll" :style="styleObj1">
            <div class="bscroll-container">
                <ul>
                    <router-link :to="{path:'/'}">
                        <div class="EditLeft">头像</div>
                        <div class="EditRight">
                            <div class="touxiang"><i class="iconfont icon-wode-" style="font-size: 1.5rem;"></i></div>
                        </div>			  	   
                        <div class="top-right"><i class="iconfont icon-arrow_right" style="font-size: 0.7rem ;"></i></div>	
                    </router-link>
                    <router-link :to="{path:'/information/setname'}">
                        <div class="EditLeft">用户名</div>
                        <div class="EditRight">{{goodsObj.userNike}}</div>			  	   
                        <div class="top-right"><i class="iconfont icon-arrow_right" style="font-size: 0.7rem ;"></i></div>	
                    </router-link>
                    <router-link :to="{path:'/information/setphone'}">
                        <div class="EditLeft">手机号</div>
                        <div class="EditRight">{{goodsObj.userName}}</div>			  	   
                        <div class="top-right"><i class="iconfont icon-arrow_right" style="font-size: 0.7rem ;"></i></div>	
                    </router-link>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '../../components/Header'
    import BScroll from 'better-scroll'
    import { Indicator, InfiniteScroll, Spinner, Popup, MessageBox ,Toast} from "mint-ui";
    import { getNowFormatDate } from "../../config/mUtils"
    export default {
        data() {
            return {
                goodsObj:'',
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
            this.$store.commit('changeTitle', "我的资料")
            this.getData()
        },

        components: {
            Header,
        },
        methods: {
            // 获取数据
            getData() {
                let parameter = {
                    userId:this.$store.state.baseUser.userId,
                }
                this.$http.post(process.env.API_HOST + "/mall_api/user/get_user_info", parameter)
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            this.goodsObj=response.data.data
                        }else{
                            Toast(response.data.msg);
                            return false
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
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
        overflow: hidden;

        a {
            height: 2.5rem;
            line-height: 2.5rem;
            display: flex;
            text-align: center;
            background: #fff;
            border-bottom: 1px solid #f5f5f5;
            cursor: pointer;
            font-size: 15px;
            padding-right: 5px;
            .EditLeft {
                text-align: left;
                color: #333;
                flex: 1;
                padding-left: 10px;
            }
            .EditRight {
                color: #999;
                margin-right: 10px;
                align-items: center;
                display: flex;
                .touxiang{
                    width: 2rem;
                    height: 2rem;
                    line-height:2rem;
                    overflow: hidden;
                    border-radius: 10px;
                    color: #f3cb0a;
                    background: #eee;
                }
            }
        }
    }
</style>
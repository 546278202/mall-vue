<template>
    <div>
        <Header></Header>
        <div class="bscroll" ref="bscroll" :style="styleObj1">
            <div class="bscroll-container">
                <ul>
                    <a class="EditLeft"><input placeholder="请输入昵称" v-model="input1" style="border:0;"></a>
                </ul>
            </div>
            <div class="yesbtn">
                <a class="button" @click="loadMore">确定</a>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '../../components/Header'
    import BScroll from 'better-scroll'
    import { Indicator, InfiniteScroll, Spinner ,Popup,MessageBox,Toast} from "mint-ui";
    import { getNowFormatDate } from "../../config/mUtils"
    import md5 from 'js-md5';

    export default {
        data() {
            return {
                input1:'',
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
            this.scrollFn()
        },
        components: {
            Header,
        },
        methods: {
            loadMore() {
                if(this.input1==''){
                    return false
                }
                let parameter = {
                    userName:this.$store.state.baseUser.userName,
                    userNike:this.input1,
                }
                this.$http
                    .post(process.env.API_HOST + "/mall_api/user/reset_nickname",parameter)
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            Toast('昵称修改成功')
                        }
                    })
                    .catch(error => {

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
        margin-top: 5px;
        a{
            background: #fff;
            height: 50px;
            line-height: 50px;
            display: flex;
            text-align: center;
            border-bottom: 1px solid #dcdcdc;
            justify-content: space-between;
            padding: 0 10px;
           
            input {
                width: 100%;
                padding: 0 10px;
                font-size:0.7rem;
            }
        }
        a:last-child{
            border-bottom:none;
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
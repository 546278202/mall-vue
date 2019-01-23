<template>
    <div>
        <Header></Header>
        <div class="bscroll" ref="bscroll" :style="styleObj1">
            <div class="bscroll-container">
                <ul>
                    <li>
                        <input placeholder="请输入收货人姓名" v-model="name" style="border:0;">
                        <div class="right_icon"><i class="iconfont icon-arrow_right" style="font-size: 1rem ;"></i></div>
                    </li>
                    <li>
                        <input placeholder="请输入收货人电话" v-model="phone" style="border:0;">
                        <div class="right_icon"><i class="iconfont icon-arrow_right" style="font-size: 1rem ;"></i></div>
                    </li>
                    <li @click.stop="startModel">
                        <input placeholder="请输入所在区域"  disabled="disabled" style="border:0;background: #Fff;">
                        <div class="right_icon"><i class="iconfont icon-arrow_right" style="font-size: 1rem ;"></i></div>
                    </li>
                    <li >
                        <input placeholder="请输入详细地址" v-model="detail_address" style="border:0;">
                        <div class="right_icon"><i class="iconfont icon-arrow_right" style="font-size: 1rem ;"></i></div>
                    </li>
                    <li>
                        <input placeholder="设置默认地址" v-model="detail_address"  disabled="disabled" style="border:0;background: #Fff;">
                        <span style="margin-right:10px" @change="tapVal"><mt-switch v-model="flag"></mt-switch></span>
                    </li>
                </ul>
            </div>
            <div class="yesbtn">
                <a class="button" @click="saveAddress">保存</a>
            </div>
        </div>
    
        <addressModel ref="mychild"
            :startModel='startModel'
            :closeModel='closeModel'     
            >
        </addressModel>
    </div>
</template>
<script>
    import Header from '../../components/Header'
    import BScroll from 'better-scroll'
    import { Indicator, InfiniteScroll, Spinner, Popup, MessageBox,Toast ,Switch } from "mint-ui";
    import { getNowFormatDate } from "../../config/mUtils"
    import addressModel from "../../components/addressModel";

    export default {
        data() {
            return {
                name:'',
                phone:'',
                detail_address:'',//详细地址
                flag:true,//默认地址
                defaultAddress:0,//0默认
                styleObj1: { "height": '', "width": "100%", "overflow": "hidden", 'font-size': '40px' },
                state:false,
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
            this.$store.commit('changeTitle', "新增地址")
            this.scrollFn()
        },

        components: {
            Header,
            addressModel
        },
        methods: {
            startModel(e) {
                // this.$refs.mychild.startModel()
            },
            closeModel(e) {
                this.state =false                
            },
            //获取默认地址
            tapVal(){
                if(this.flag==true){
                    this.defaultAddress=0
                }else{
                    this.defaultAddress=1
                }
            },
            //保存地址
            saveAddress() {
                let parameter = { 
                    userId:this.$store.state.baseUser.userId,
                    receiverName:this.name,
                    receiverPhone:this.phone,
                    receiverProvince:"",
                    receiverCity:"",
                    receiverDistrict:"",
                    receiverAddress:this.detail_address,
                    defaultAddress:this.defaultAddress,
                };
                if(this.name=='' || this.phone==''){
                    Toast({message: '信息填写不完整！'});
                    return false;
                }
                
                this.$http
                    .post(process.env.API_HOST + "/mall_api/shipping/get_list", parameter)
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            console.log(response.data.data)
                            this.goodsObj = response.data.data
                        }
                    })
                    .catch(error => { });
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
    ul {
        overflow: hidden;

        li {
            align-items: center;
            display: flex;
            justify-content: center;
            height: 50px;
            box-sizing: border-box;
            background: #fff;
            padding-left: 10px;

            input {
                height: 100%;
                line-height: 50px;
                width: 100%;
            }

            .right_icon {
                align-items: center;
                display: flex;
            }
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
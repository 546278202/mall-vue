<template>
    <div>
        <Header></Header>
        <div class="bscroll" ref="bscroll" :style="styleObj1">
            <div class="bscroll-container">
                <ul>
                    <li class="EditLeft">{{userName}}</li>
                    <li class="EditList" style="display:flex;align-items: center;">
                        <input placeholder="输入验证码" v-model="input1" style="border:0;">
                        <button class="VerificationCodeBtn" @click="loadMore">获取验证码</button>
                    </li>
                </ul>
            </div>
            <div class="yesbtn"><a class="button" @click="commitData">确定</a></div>
        </div>
    </div>
</template>
<script>
    import Header from '../../components/Header'
    import BScroll from 'better-scroll'
    import { Indicator, InfiniteScroll, Spinner, Popup, MessageBox, Toast } from "mint-ui";
    import { getNowFormatDate, getMillisecond,listenScroll} from "../../config/mUtils"
    import md5 from 'js-md5';

    export default {
        data() {
            return {
                userName: this.$store.state.baseUser.userName,
                input1: '',
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
                let parameter = {
                    userName: this.$store.state.baseUser.userName,
                }
                this.$http.post(process.env.API_HOST + "/mall_api/user/getVerificationCode", parameter)
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            Toast(response.data.msg)
                        } else {
                            Toast(response.data.msg)
                            return false
                        }
                    })
                    .catch(error => {

                    });
            },
            
            commitData() {
                if(this.input1==''){
                    Toast("请先获取验证码")
                    return false;
                }
                var parameter = {
                    userId: this.$store.state.baseUser.userId,
                    userName: this.$store.state.baseUser.userName,
                    userPwd: this.$store.state.baseUser.userPwd,
                }
                this.$http.post(process.env.API_HOST + "/mall_api/user/rest_username", parameter)
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            Toast(response.data.msg)
                        } else {
                            Toast(response.data.msg)
                            return false
                        }
                    })
                    .catch(error => {

                    });
            },
            scrollFn() {
                this.$nextTick(() => {
                    listenScroll(this.$refs.bscroll)
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
        overflow: hidden;
        margin-top: 5px;
        font-size: 0.7rem;

        li {
            background: #fff;
            height: 50px;
            line-height: 50px;
            text-align: center;
            border-bottom: 1px solid #dcdcdc;
            padding: 0 10px;

            input {
                width: 100%;
                padding: 0 10px;
                font-size: 0.7rem;
            }

            .VerificationCodeBtn {
                display: inline-block;
                height: 30px;
                line-height: 30px;
                width: 100px;
                margin-bottom: 0;
                font-size: 0.6rem;
                padding: 0;
                color: #999;
                text-align: center;
                text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
                vertical-align: middle;
                cursor: pointer;
                background-color: #fff;
                background-repeat: repeat-x;
                border: 1px solid #ccc;
                border-bottom-color: #b3b3b3;
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;
                border-radius: 5px;
            }
        }

        li:last-child {
            border-bottom: none;
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
<template>
    <div class="wrap">
        <div class="login-content">
            <!-- <router-link style="display:flex;justify-content: center;margin-top:1rem;font-size: 18px;" :to="{path:'/login'}">登陆</router-link> -->
            <div class="login_title">忘记密码</div>
            <div style="margin-top:2rem;">
                <div class="item">
                    <i class="iconfont icon-zhanghao"></i>
                    <input type="text" v-model="input1" placeholder="请输入号码/手机号">
                </div>
            </div>
            <div style="margin-top:0.75rem;display:flex;justify-content: center;">
                <div style="width:13.75rem;display:flex;">
                    <div class="" style="display:flex;flex:1;border:1px solid #ccc;border-radius:1rem;height:2rem;line-height: 2rem;">
                        <div style="margin-left:10px;"><i class="iconfont icon-mima"></i></div>
                        <div style="height:2rem;">
                            <input type="text" v-model="input2" style="font-size: 0.7rem;" placeholder="请输入验证码">
                        </div>
                    </div>
                    <input type="button" class="checkCodeBtn" value="输入验证码" @click="isRegist">
                </div>
            </div>
            <div style="display:flex;justify-content: center;margin-top:2rem;">
                <button class="button" @click="toNext">下一步</button>
            </div>
        </div>
    </div>
</template>
<script>
    import md5 from "js-md5";
	import { Indicator, InfiniteScroll, Spinner,Toast} from "mint-ui";
    export default {
        data() {
            return {
                input1: "",
                input2: "",
                checkCode:''
            };
        },
        mounted() { 

        },

        components: {

        },
        created() { 

        },
        methods: {
            // 是否注册过
            isRegist(){
                if (!(/^1[34578]\d{9}$/.test(this.input1))) {
                    Toast({ message: '手机号码输入错误，请重填！' });
                    return false;
                }
                let parameter = {
                    userName: this.input1,
                };
                
                this.$http
                    .post(process.env.API_HOST + "/mall_api/user/checkIsRegister", parameter)
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            this.getSendMessage()
                        } else {
                            Toast({ message: response.data.msg });
                        }
                    })
                    .catch(error => { });
            },
            // 发送短信接口
            getSendMessage: function () {
                let parameter = {
                    userName: this.input1,
                };
                this.$http
                    .post(process.env.API_HOST + "/mall_api/im/sendMessage", parameter)
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            console.log(response.data.data)
                            this.checkCode=response.data.data
                            Toast("已发送到您的手机");
                        } else {
                            Toast(response.data.msg);
                        }
                    })
                    .catch(error => { });
            },
            // 下一步
            toNext(){
                if (!(/^1[34578]\d{9}$/.test(this.input1))) {
                    Toast({ message: '手机号码输入错误，请重填！' });
                    return false;
                }
                if(this.checkCode==this.input2){
                    let parameter={
                        userName: this.input1,
                        verificationCode:this.checkCode,
                    }    
                    this.$router.push({ path: '/forget2',query:parameter});
                }else{
                    Toast({ message: '验证码输入错误' });
                    return false;
                }

            }
        }
    };
</script>

<style lang="scss" scoped>
    .wrap {
        display: flex;
        background: #f3cb0a;
        height: 100%;
        justify-content: center;
        align-items: center;
    }

    .item {
        position: relative;
        width: 13.75rem;
        margin: 0 auto;
        overflow: hidden;
        height: 2rem;
        padding-left: 10px;
        background: #fff;
        border: 1px solid #ccc;
        font-size: 0.7rem;
        line-height: 2rem;
        border-radius: 1rem;
        text-align: left;
        box-sizing: border-box;
        display: flex;

        input {
            width: 100%;
            font-size: 0.7rem;
            border-radius: 1rem;
        }
    }

    .login-content {
        background: #fff;
        border-radius: 20px;
        height: 20rem;
        width: 100%;
    }

    .icon-zhanghao {
        left: 5px;
        font-size: 1.2rem;
        color: #000;
    }

    .iconfont {
        left: 5px;
        font-size: 1.2rem;
        color: #000;
    }

    .button {
        background: #f3cb0a;
        color: #fff;
        border: 1px solid #f3cb0a;
        width: 13.75rem;
        display: block;
        height: 2rem;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-appearance: none;
        padding: 0 0.5rem;
        margin: 0;
        font-family: inherit;
        font-size: 0.75rem;
        line-height: 2rem;
        text-align: center;
        text-decoration: none;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        border-radius: 2rem;
    }

    .login_title {
        text-align: center;
        padding: 10% 5%;
        padding-right: 10%;
        color: #f3cb0a;
        font-size: 1rem;
    }

    .checkCodeBtn {
        display: inline-block;
        height: 2rem;
        line-height: 2rem;
        width: 4rem;
        font-size: 0.6rem;
        margin-bottom: 0;
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
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        font-size: 0.6rem;
        margin-left: 10px;
    }
</style>
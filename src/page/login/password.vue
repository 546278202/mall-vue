<template>
    <div class="wrap">
        <div class="login-content">
            <div class="login_title">欢迎注册新用户</div>
            <div style="margin-top:2rem;">
                <div class="item">
                    <i class="iconfont icon-zhanghao"></i>
                    <input type="text" v-model="input1" placeholder="请输入密码">
                </div>
            </div>
            <div style="margin-top:0.75rem;">
                <div class="item">
                    <i class="iconfont icon-mima"></i>
                    <input type="text" v-model="input2" placeholder="请确认密码">
                </div>
            </div>
            <div style="display:flex;justify-content: center;margin-top:2rem;">
                <button class="button" @click="toRegister">注册</button>
            </div>
        </div>
    </div>
</template>
<script>
    import md5 from 'js-md5';
    import { Indicator, Toast } from 'mint-ui'
    export default {
        data() {
            return {
                message: '',
                input1: '',
                input2: ''
            }
        },
        mounted() {
            
        },

        components: {

        },
        created() {

        },
        methods: {
            toRegister: function () {
                if(this.input1==''){
                    Toast({ message: '请输入密码' });
                    return false;
                }
                if(this.input1!==this.input2){
                    Toast({ message: '两次密码不相同' });
                    return false;
                }
               
                let parameter = {
                    userName:this.$route.query.userName,
                    verificationCode:this.$route.query .verificationCode,
                    userPwd: md5(this.input2),
                }
                this.$http.post(process.env.API_HOST + "/mall_api/user/register", parameter)
                    .then((response) => {
                        if (response.data.code == 0 && response.data.success == true) {
                            this.$router.push({ path: '/login'});
                        }else{
                            Toast(response.data.msg);
                        }
                    })
                    .catch((error) => {
                        Toast(error);
                    })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .wrap {
        display: flex;
        background: #F3CB0A;
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

        .login_title {
            text-align: center;
            padding: 10% 5%;
            padding-right: 10%;
            color: #f3cb0a;
            font-size: 1rem;
        }
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
        background: #F3CB0A;
        color: #fff;
        border: 1px solid #F3CB0A;
        width: 13.75rem;
        display: block;
        height: 2rem;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-appearance: none;
        padding: 0 .5rem;
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
</style>
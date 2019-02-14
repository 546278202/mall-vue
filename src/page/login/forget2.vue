<template>
    <div class="wrap">
        <div class="login-content">
            <!-- <router-link style="display:flex;justify-content: center;margin-top:1rem;font-size: 18px;" :to="{path:'/login'}">登陆</router-link> -->
            <div class="login_title">忘记密码</div>
            <div style="margin-top:2rem;">
                <div class="item">
                    <i class="iconfont icon-mima"></i>
                    <input type="text" v-model="input1" placeholder="请输入密码">
                </div>
            </div>
            <div style="margin-top:2rem;">
                <div class="item">
                    <i class="iconfont icon-mima"></i>
                    <input type="text" v-model="input2" placeholder="请确认密码">
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
            };
        },
        mounted() { 
           
        },
        components: {

        },
        created() { 

        },
        methods: {
            toNext(){
                if (this.input1=='' ) {
                    return false;
                }
                let parameter = {
                    userName: this.$route.query.userName,
                    verificationCode:this.$route.query.verificationCode,
                    pwd:md5(this.input2)
                };
                this.$http.post(process.env.API_HOST + "/mall_api/user/forget_reset_password", parameter)
                .then((response) => {
                    if (response.data.code == 0 && response.data.success == true) {
                        Toast({ message: response.data.msg });
                        this.$router.push({ path: '/login' });
                    } else {
                        Toast(response.data.msg);
                    }
                })
                .catch((error) => {

                })
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
</style>
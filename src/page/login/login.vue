<template>
    <div class="wrap">
        <div class="login-content">
            <div style="display:flex;justify-content: center;margin-top:1rem;font-size: 18px;">
                <div style="text-align:right;width: 13.75rem;">注册</div>
            </div>
            <div class="content-block" style="text-align: center;margin: 0;height:3.7rem ;">
                <img src="../../images/login1.png" style="height:3.7rem ;">
            </div>
            <div style="margin-top:2rem;">
                <div class="item">
                    <i class="iconfont icon-zhanghao"></i>
                    <input type="text" v-model="input1" placeholder="请输入号码/手机号">
                </div>
            </div>
            <div style="margin-top:0.75rem;">
                <div class="item">
                    <i class="iconfont icon-mima"></i>
                    <input type="text" v-model="input2" placeholder="请输入密码">
                </div>
            </div>
            <div style="display:flex;justify-content: center;margin-top:2rem;">
                <button class="button" @click="getMessage">确定</button>
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
                dataList: [],
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
            getMessage: function () {
                let data = {
                    userName: this.input1,
                    pwd: md5(this.input2)
                }
                if (data.userName == '' || data.pwd == '') {
                    return false
                }
                this.$http.post(process.env.API_HOST + "/mall_api/user/login", data)
                    .then((response) => {
                        let res = response.data;
                        if (res.code == 0 && res.success == true) {
                            sessionStorage.baseUser = JSON.stringify(res.data);
                            this.$store.commit('changeLogin', JSON.stringify(res.data));
                            setTimeout(() => {
                                this.$router.push({ path: '/home' });
                            }, 600)
                        } else {
                            Toast(res.msg);
                        }

                    })
                    .catch((error) => {})
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
        padding-left:10px;
        background: #fff;
        border: 1px solid #ccc;
        font-size: 0.7rem;
        line-height: 2rem;
        border-radius: 1rem;
        text-align: left;
        box-sizing: border-box;
        display: flex;
        input {
            width:100%;
            font-size:0.7rem;
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
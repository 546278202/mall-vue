<template> 
    <div style="display: flex;background:#F3CB0A;height: 100%;justify-content: center;align-items: center;">
        <div class="login-content">
            <div class="login-top"><a href="../regist/step1.html">注册</a></div>
            <div class="content-block" style="text-align: center;margin: 0;height:74px;">
                <img src="../../images/login1.png" style="height:74px;">
            </div>
            <div style="margin-top:40px;">
                <div style="position:relative;width: 275px;margin:0 auto;overflow: hidden;height: 40px;padding-left: 30px;background:#fff;border: 1px solid #ccc;font-size:14px;line-height:40px;border-radius: 20px;">
                    <i class="iconfont icon-zhanghao"></i>
                    <input type="text" placeholder="请输入号码/手机号" style="border:0;width:100%;" ref="input1">
                </div>
            </div>	
            <div style="margin-top:15px;">
                <div style="position:relative;width: 275px;margin:0 auto;overflow: hidden;height: 40px;padding-left: 30px;background:#fff;border: 1px solid #ccc;font-size:14px;line-height:40px;border-radius: 20px;">
                    <i class="iconfont icon-mima"></i>
                    <input type="text" placeholder="请输入密码"  style="border:0;width:100%;" ref="input2">
                </div>
            </div>	
            <div style="position:relative;margin-top:37px;">
                <button class="button" style="width: 275px;margin:0 auto;" @click="getMessage">确定</button>
            </div>
            <div style="position:relative;">
                <div style="width: 275px;margin:0 auto;text-align: right;line-height:25px; ">
                    <a href="../forget/step1.html" style="font-size:10px;color:#666;">忘记密码</a>
                    <a href="msglogin.html" style="font-size:10px;color:#666;float:left;">快捷登陆</a>
                </div>
            </div>
        </div>
    </div> 
</template>
<script>
import axios from 'axios'
import md5 from 'js-md5';
import { Toast } from 'mint-ui'
import { MessageBox } from 'mint-ui';
export default {
    data () {
        return {
            dataList:[],
            message:'',
        }
    },
    mounted(){
        
       
        axios.post('http://47.93.4.157:8086/mall_api/classify/getClassifyList', {

        })
        .then( (response) => {
            this.dataList=response.data.data;
           
        })
        .catch( (error) => {
            console.log(error);
        })    
    },
    
    components:{
      
    },
    created() {
        
    },
    methods: {
        getMessage:function(){
            let v1=this.$refs.input1.value
            let v2=this.$refs.input2.value
            // 登陆
            axios.post('http://47.93.4.157:8086/mall_api/user/login', {
                userName: v1,
                pwd:md5(v2)
            })
            .then( (response) => {
                let res=response.data;
                if(res.code==0 && res.success==true){
                    Toast({
                        message: '登陆成功',
                        position: 'bottom',
                        duration: 1000
                    });
                    sessionStorage.baseUser=JSON.stringify(res.data);         	
                    console.log(JSON.parse(sessionStorage.baseUser))
                    this.$router.push({path:'/home'});
                }else{
                    MessageBox({
                        title: '提示',
                        message:res.msg,
                        showCancelButton: true
                    });
                }
            
            })
            .catch( (error) => {
                console.log(error);
            })    
        } 
    },
}
</script>

<style lang="scss" scoped>
    #app {
        background: #F3CB0A;
    }
    .login-content {
        background: #fff;
        border-radius: 20px;
        height: 20rem;
        width: 100%;
    }
    .login-top {
        text-align: right;
        padding: 5%;
        padding-right: 10%;
        padding-bottom: 0;
        height: 60px;
    }
    .login-top>a {
        color: #333;
        font-size: 15px;
    }
    .icon-zhanghao {
        position: absolute;
        left: 5px;
        font-size: 1.2rem;
        color: #000;
    }
    .button{
        background: #F3CB0A;
        color: #fff;
        border: 1px solid #F3CB0A;
        width: 100%;
        display: block;
        height: 40px;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-appearance: none;
        padding: 0 .5rem;
        margin: 0;
        font-family: inherit;
        font-size: 15px;
        line-height: 40px;
        text-align: center;
        text-decoration: none;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        border-radius: 2rem;
    }
    
</style>

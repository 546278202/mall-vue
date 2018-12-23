<template>
    <div v-show="payshowstate">
        <div class="bj-wrap" style="display: block;"></div>
        <div class="alert-wrap" style="height: 65%; display: block;">
			<div style="height:2.5rem;line-height: 2.5rem;text-align: center;display:flex;position:relative;">
                <span  style="width:40px;padding:0 10px;position:absolute;left:0;top:0;" @click="tocancel">
                    <img src="../images/delete.png" style="width:14px;">
                </span><span style="flex:1;text-align: center;">确认支付</span>
            </div>
			<div style="height:3.75rem ;line-height:3.75rem ;text-align: center;color:#333;font-size: 30px;"><span>￥{{paynum}}</span></div>
			<div class="AllPayList">
				<div class="PayList">
					<span style="width:50px;"><img src="../images/zhifubao.png" style="width:20px;"></span>
					<div class="mint-cell-title">
                        <label class="mint-radiolist-label">
                            <span>支付宝</span>
                            <span class="mint-radio is-right">
                                <input type="radio" name="radio" class="mint-radio-input"  v-model="checkedValue" value="0"> 
                                <span class="mint-radio-core"></span>
                            </span> 
                        </label>
                    </div>
				</div>
				<div class="PayList">
					<span style="width:50px;"><img src="../images/weixin.png" style="width:20px;"></span>
                    <div class="mint-cell-title">
                        <label class="mint-radiolist-label">
                            <span>微信</span>
                            <span class="mint-radio is-right">
                                <input type="radio" name="radio" class="mint-radio-input"  v-model="checkedValue" value="1" > 
                                <span class="mint-radio-core"></span>
                            </span> 
                        </label>
				    </div>
				</div>
				<div style="width: 80%;margin: 0 auto;margin-top:10px;margin-bottom:1.5rem;">
					<button class="button" @click='getpaycode'>确定</button>
				</div>
			</div>
		</div>
    </div>
</template>
<script>
    export default {
        props: ["type", "payshowstate", "paynum"],
        data () {
            return {
                checkedValue:0,  
            }
        },
        mounted() {
           
        },
        methods: {
            //向父组件传值
            tocancel() {
                this.$emit("cancelpaymodel");
            },
            getpaycode(){
                this.$emit('transferUser',this.checkedValue);
            }
        }

    };
</script>
<style lang="scss" scoped>
    .bj-wrap {
        width: 100%;
        height: 100%;
        z-index: 998;
        position: fixed;
        bottom: 0;
        left: 0;
        display: block;
        background-color: rgba(0,0,0,.7);
    }
    .alert-wrap {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background: #fff;
        z-index: 999;
        height: 65%;
    }
    .PayList {
        height: 2.5rem;
        line-height: 2.5rem;
        display: flex;
        padding: 0 40px;
    }
    .button {
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
        font-size: .8rem;
        text-align: center;
        text-decoration: none;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        border-radius: 2rem;
    }
    @keyframes myfirst{
        from {height: 0%;}
        to {height:50%;}
    }
    /* Firefox */
    @-moz-keyframes myfirst {
        from {height: 0%;}
        to {height:50%;}
    }
    /* Safari 和 Chrome */
    @-webkit-keyframes myfirst{
        from {height: 0%;}
        to {height:50%;}
    }
    /* Opera */
    @-o-keyframes myfirst {
        from {height: 0%;}
        to {height:50%;}
    }
    .mint-radiolist-label{
        display: flex;
        justify-content: space-between;
    }
    
</style>
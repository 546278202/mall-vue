<template>
    <div v-show="showstate">
        <div class="code-bj-wrap"></div>
        <div class="code-alert-wrap">
            <div style="height:40px;line-height:40px;text-align: center;position: relative;border-bottom: 1px solid #eee;background: #f3f2f8;"><span @click='tocancel' style="width:40px;padding:0 10px;position: absolute;left:0;top:0;"><img src="../images/delete.png" style="width:14px;"></span>输入兑换码</div>
            <div style="display: flex;height: 40px;line-height: 40px;border-bottom:1px solid #eee;">
                <div><span>已优惠0.00</span></div>
                <div style="flex:1;padding:0 10px;"><input placeholder="输入兑换码"  value="" style="border:0;"></div>
                <a class="checkCode" >
                    <span style="border:1px solid #cc0000;color:#cc0000;padding: 3px 5px;border-radius: 6px;">确定</span>
                </a>
            </div>
            <div style="text-align: center;width:100%;padding:0 10%; bottom: 30px;"><button class="button">确定</button></div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "eject",
        props: ["type", "showstate"],
        methods: {
            tocancel: function () {
                this.$emit("tocancel");
            },
            took: function () {
                this.$emit("took");
            }
           
        }
    };
</script>
<style lang="scss" scoped>
    .code-bj-wrap {
        width: 100%;
        height: 100%;
        z-index: 998;
        position: fixed;
        bottom: 0;
        left: 0;
        display: block;
        background-color: rgba(0,0,0,.7);
    }
   .code-alert-wrap {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background: #fff;
        font-size:14px; 
        z-index: 999;
        height: 50%;
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
    .alert-wrap{
        animation: myfirst 0.3s;
        -moz-animation: myfirst 0.3s;	/* Firefox */
        -webkit-animation: myfirst 0.3s;	/* Safari 和 Chrome */
        -o-animation: myfirst 0.3s;	/* Opera */
    }
    .code-alert-wrap{
        animation: myfirst 0.3s;
        -moz-animation: myfirst 0.3s;	/* Firefox */
        -webkit-animation: myfirst 0.3s;	/* Safari 和 Chrome */
        -o-animation: myfirst 0.3s;	/* Opera */
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
</style>
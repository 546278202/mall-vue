<template>
    <div v-show="showstate">
        <div class="code-bj-wrap"></div>
        <div class="code-alert-wrap" ref="dd" :style="styleObj2">
            <div class="title">输入优惠卷
                <span @click='tocancel' class="tocancel"><img src="../images/delete.png" style="width:14px;"></span>
            </div>
            <div class="bscroll" ref="bscroll" :style="styleObj1">
                <div class="bscroll-container">
                    <ul>
                        <li v-for="(item,index) in goodsObj" :key="index" >
                            <div></div>
                            <div style="flex:1;padding:0 10px;"><input placeholder="输入兑换码" v-model="code" style="border:0;font-size:0.7rem;"></div>
                            <div class="checkCode"><span @click="checkYuiHuiCode($event)" :data-index=index >确定</span></div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="yesbtn"><a class="button">确定</a></div>
        </div>
    </div>
</template>
<script>
    import { Indicator, Toast, InfiniteScroll } from "mint-ui";

    import BScroll from 'better-scroll'
    export default {
        name: "eject",
        props: ["showstate"],
        data() {
            return {
                code:'',
                warenumber:'',
                goodsObj:[1],
                styleObj1: { "height": '100%', "width": "100%", "overflow": "hidden", 'font-size': '40px' },
            };
        },
        watch: {

        },
        //获取屏幕高度
        beforeMount(height) {
            var height = 50
            var h = document.documentElement.clientHeight || document.body.clientHeight;
            this.styleObj1["height"] = h / 2 - height + "px"
        },
        mounted() {

        },
        methods: {
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
                            mouseWheel: {
                                speed: 20,
                                invert: false
                            },
                            useTransition: false
                        });
                    }
                });
            },
            // 校验优惠码
            checkYuiHuiCode(e) {
                console.log(e.target.dataset.index)
                let parameter = {
                    cCode:this.code,
                    cGoodsNum:this.warenumber
                };
                if(this.code==''){
                    return false
                }
                
                this.$http
                    .post(process.env.API_HOST + "/mall_api/common/checkCoupon", parameter)
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            console.log(response.data.data)
                            Toast({ message: '校验成功' });
                        }else{
                            this.
                            Toast({ message: '校验失败' });
                            return false
                        }
                    })
                    .catch(error => { 

                    });
            },
            tocancel: function () {
                console.log(this.$refs.dd.clientWidth)
                this.$emit("tocancel");
            },
            getDomHeight: function (e) {
                this.warenumber=e
                this.$nextTick(function () {
                    console.log(this.$refs.dd.clientWidth)
                });
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
        background-color: rgba(0, 0, 0, .7);
    }

    .code-alert-wrap {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background: #fff;
        font-size: 14px;
        z-index: 999;
        height: 60%;
        animation: myfirst 0.3s;
        -moz-animation: myfirst 0.3s;
        -webkit-animation: myfirst 0.3s;
        -o-animation: myfirst 0.3s;

        .title {
            height: 45px;
            line-height: 45px;
            text-align: center;
            position: relative;
            border-bottom: 1px solid #eee;
            background: #f3f2f8;
            font-size: 16px;

            .tocancel {
                width: 40px;
                padding: 0 10px;
                position: absolute;
                left: 0;
                top: 0;
            }
        }
    }

    li {
        display: flex;
        font-size: 0.7rem;
        height: 50px;
        align-items: center;
        border-bottom: 1px solid #dcdcdc;
        padding: 0 10px;
        .checkCode{
            span{
                border:1px solid #cc0000;
                color:#cc0000;
                padding: 3px 5px;
                border-radius: 6px;
            }
        }
    }

    .yesbtn {
        align-items: center;
        justify-content: center;
        height: 2.5rem;
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

    @keyframes myfirst {
        from {
            height: 0%;
        }

        to {
            height: 60%;
        }
    }

    /* Firefox */
    @-moz-keyframes myfirst {
        from {
            height: 0%;
        }

        to {
            height: 60%;
        }
    }

    /* Safari 和 Chrome */
    @-webkit-keyframes myfirst {
        from {
            height: 0%;
        }

        to {
            height: 60%;
        }
    }

    /* Opera */
    @-o-keyframes myfirst {
        from {
            height: 0%;
        }

        to {
            height: 60%;
        }
    }
</style>
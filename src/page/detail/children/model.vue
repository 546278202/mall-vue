<template>
    <div v-show="payshowstate">
        <div class="bj-wrap" style="display: block;"></div>
        <div class="alert-wrap" style="height: 50%; display: block;">
            <span style="width:45px;height:45px;line-height:45px;position:absolute;left:0;top:0px;" @click="tocancel">
                <img src="../../../images/delete.png" style="width:14px;">
            </span>
            <div class="alert-price">￥{{currentprice}}</div>
            <div class="bscroll" ref="bscroll" :style="styleObj1">
                <div class="bscroll-container">
                    <ul>
                        <div class="bottom">
                            <div class="btn">{{specJson.specName}}</div>
                            <div class="ColorWrap" style="overflow: hidden;">
                                <li v-for="(item,index) in specJson.specValue" 
                                    @click="addClass(index,item)" 
                                    :class="{active:index==currentIndex}"
                                    class="KG4">{{item.specName}}
                                </li>
                            </div>
                        </div>
                        <div class="bottom">
                            <div class="btn">数量：</div>
                            <div class="sum">
                                <div style="display:flex;">
                                    <a class="addition" @click="addUp"><i class="iconfont icon-iconfontadd"></i></a>
                                    <a class="number">{{buyNum}}</a>
                                    <a class="subtraction" @click="addDown"><i class="iconfont icon-iconfontmove"></i></a>
                                </div>
                            </div>
                        </div>
                        <div style="width: 80%;margin: 0 auto;margin-top:10px;padding-bottom:30px;">
                            <button class="button" @click='getpaycode'>确定</button>
                        </div>
                        <div></div>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'

    export default {
        props: ["type", "payshowstate", "specJson",],
        data() {
            return {
                checkedValue: 0,
                currentIndex: 0,
                currentprice: '',
                buyNum: 1,
                styleObj1: { "height": '', "width": "100%", "overflow": "hidden", 'font-size': '40px' },
            }
        },
        watch: {
            specJson: function (newVal, oldVal) {
                this.currentprice = newVal.specValue[0].specPrice
            }
        },
        //获取屏幕高度
        beforeMount(height) {
            var height = 75
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
                            mouseWheel: {    // pc端同样能滑动
                                speed: 20,
                                invert: false
                            },
                            useTransition: false  // 防止iphone微信滑动卡顿
                        });
                    }
                });
            },
            addClass(index, item) {
                this.checkedValue = item.specName
                this.currentIndex = index
                this.currentprice = item.specPrice
            },

            //向父组件传值
            tocancel() {
                this.$emit("cancelpaymodel");
            },

            //点击确定
            getpaycode() {
                this.$emit('surBtn', this.checkedValue, this.buyNum, this.currentprice);
            },

            addUp() {
                this.buyNum++
                console.log(this.buyNum)
            },

            addDown() {
                if (this.buyNum > 1) {
                    this.buyNum--
                    console.log(this.buyNum)
                }
            },
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
        background-color: rgba(0, 0, 0, .5);
    }

    .alert-wrap {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background: #fff;
        z-index: 999;
        height: 50%;
        animation: myfirst 0.3s;
        -moz-animation: myfirst 0.3s;
        /* Firefox */
        -webkit-animation: myfirst 0.3s;
        /* Safari 和 Chrome */
        -o-animation: myfirst 0.3s;
        /* Opera */
    }

    .alert-price {
        height: 75px;
        line-height: 75px;
        text-align: center;
        color: #cc0000;
        font-size: 30px;
    }

    .bottom {
        line-height: 1.5rem;
        padding-left: 10px;
        margin-bottom: 20px;
        overflow: hidden;
        font-size: 14px;

        .btn {
            color: #333;
            width: 2.5rem;
            text-align: center;
            border-radius: 5px;
            margin-right: 10px;
            margin-bottom: 10px;
            font-size: 0.7rem;
            float: left;
        }

    }

    .KG4 {
        background: #dcdcdc;
        padding: 0 5px;
        text-align: center;
        border-radius: 5px;
        margin-right: 10px;
        margin-bottom: 10px;
        font-size: 0.7rem;
        color: #999;
        float: left;
    }

    .active {
        background: #fdcd00;
        color: #fff;
    }

    .sum {
        border: 1px solid #e5e5e5;
        text-align: center;
        border-radius: 5px;
        float: left;

        .addition {
            width: 2.3rem;
            height: 1.5rem;
        }

        .number {
            border-right: 1px solid #e5e5e5;
            border-left: 1px solid #e5e5e5;
            width: 2.3rem;
        }

        .subtraction {
            width: 2.3rem;
            height: 1.5rem;
        }
    }

    .button {
        background: #F3CB0A;
        color: #fff;
        border: 1px solid #F3CB0A;
        width: 100%;
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

    @keyframes myfirst {
        from {
            height: 0%;
        }

        to {
            height: 50%;
        }
    }

    /* Firefox */
    @-moz-keyframes myfirst {
        from {
            height: 0%;
        }

        to {
            height: 50%;
        }
    }

    /* Safari 和 Chrome */
    @-webkit-keyframes myfirst {
        from {
            height: 0%;
        }

        to {
            height: 50%;
        }
    }

    /* Opera */
    @-o-keyframes myfirst {
        from {
            height: 0%;
        }

        to {
            height: 50%;
        }
    }
</style>
<template>
    <div>
        <Header>
            <a slot='logo' class="administration" @click="administration">管理</a>
        </Header>
        <div class="bscroll" ref="bscroll" :style="styleObj1">
            <div class="bscroll-container">
                <ul>
                    <li v-for="(item,index) in goodsObj" :key="index" @click="toPath(index)">
                        <div style="margin-right:5px;font-size:14px;">
                            <span v-if="item.status==0"  class="state0">默认</span>
                            <span v-if="item.status==1"  class="state1">默认</span>
                        </div>
                        <div>{{item.invoiceName}}</div>
                        <div v-if="item.invoiceType==0" style="flex:1;text-align: right;">个人</div>
                        <div v-if="item.invoiceType==1" style="flex:1;text-align: right;">企业</div>
                        <div v-if="falg" class="EditBtn"><i class="iconfont icon-arrow_right" style="font-size: '' ;"></i></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from "../../components/Header";
    import BScroll from 'better-scroll'
    import { Indicator, InfiniteScroll, Spinner, Checklist, Toast } from "mint-ui";
    import { getNowFormatDate } from "../../config/mUtils"
    export default {
        data() {
            return {
                goodsObj: [],
                styleObj1: { "height": '', "width": "100%", "overflow": "hidden", 'font-size': '40px' },
                falg:false,
               
            }
        },
        //获取屏幕高度
        beforeMount(height) {
            var height = 50
            var h = document.documentElement.clientHeight || document.body.clientHeight;
            this.styleObj1["height"] = h - height + "px"
        },
        components: {
            Header
        },
        mounted() {
            this.$store.commit('changeTitle', "发票抬头")
            this.scrollFn()
            this.loadMore()
        },
        watch: {
            goodsObj(val) {
                console.log(val)
                this.scroll.refresh()
            }
        },
        methods: {
            loadMore() {
                let parameter = {
                    userId: this.$store.state.baseUser.userId,
                };
                this.$http
                    .post(
                        process.env.API_HOST + "/mall_api/invoice/invoiceList",
                        parameter
                    )
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            this.goodsObj = response.data.data
                        }
                    })
                    .catch(error => {
                        Indicator.close();
                    });
            },
            scrollFn() {
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.bscroll, {
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
            // 管理状态
            administration(){
                if( this.falg==true){
                    this.falg=false

                }else{
                    this.falg=true
                }
            },
            
            toPath(index){
                if( this.falg==true){
                    let id=this.goodsObj[index].invoiceId
                    this.$router.push("/editFaPiao?id="+id);
                }
            }
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
        padding-top: 5px;
        overflow: hidden;
    }


    li {
        overflow: hidden;
        width: 100%;
        line-height: 50px;
        background: #fff;
        display: flex;
        padding: 0 10px;
        font-size: 15px;
        color: #333;
        border-bottom: 1px solid #dcdcdc;
        position: relative;
        box-sizing: border-box;
            .state0{
                height:20px;
                width:30px;
                border:1px solid #F3930a;
                border-radius:3px;
                padding:0 3px;
                color:#F3930a;
            }
            .state1{
                height:20px;
                width:30px;
                border:1px solid #999;
                border-radius:3px;
                padding:0 3px;
                color:#999;
            }
    }

    .administration {
        flex: 1;
        text-align: right;
        padding-right: 10px;
    }
    
</style>
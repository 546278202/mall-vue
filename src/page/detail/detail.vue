<template>    
    <div class="rules">
        <div class="bscroll" ref="bscroll" :style="styleObj1">
            <div class="bscroll-container">
        <!-- <Header></Header>
        <div class="bscroll" ref="bscroll" :style="styleObj1"> -->
            <!-- <div class="bscroll-container"> -->
                <ul>
                    <mt-swipe :auto="4000" style="height:200px;">
                        <mt-swipe-item v-for="item in items" :key="item">
                            <img v-bind:src="item" style="width: 100%;height: 100%;">
                        </mt-swipe-item>
                    </mt-swipe>
                    <div class="shop-msg">
                        <div class="txt1" style="display:flex;">
                            <div class="ShopName" style="flex:1;">京觅 西州蜜哈密瓜 1个装 约1.5-2kg 新鲜水果</div> 
                            <div class="Collection">
                                <div style="height:1.5rem;"><i class="iconfont icon-pinglunxingxingtianchong" style="font-size: 1rem;"></i></div>
                                <p  style="font-size:12px;">收藏</p>
                            </div>	
                        </div>
                        <div class="txt2">
                            <a class="Postage">包邮</a>
                                <a class="Monthly-sales" style="text-align: right;">月销量0件</a>
                                <a class="Coupon" style="display: flex;justify-content: center;"></a>
                            <a class="Price"><span>￥0.2</span></a>
                        </div>
                    </div>

                    <div class="shop-msg">
                        <div class="Voucher"  @click="alertDemo">
                            <a class="one">已选</a>
                            <a style="font-size: 0.6rem;color:#999;">{{mspecName+" , "+buyNum}}</a>
                            <a class="go-Voucher"><i class="iconfont icon-xiangyou"></i></a>
                        </div>
                        <div class="Voucher">
                            <a class="one">服务</a>
                            <a style="font-size: 0.6rem;color:#999;">坏果包赔</a>
                            <a class="go-Voucher"></a>
                        </div>
                    </div>
                    <div class="CommentModule" style="background: #fff;margin-bottom: 5px;text-align: left;">
                        <div style="height: 2.5rem;line-height: 2.5rem;padding: 0 10px;border-bottom: 1px solid #dcdcdc;font-size: 15px;text-align: center;">评论（1）</div>
                        <div class="DiscussList"><li style="padding: 10px;background:#fff;margin-bottom: 5px;"><div style="display:flex;height: 2.5rem;line-height: 2.5rem;"><div style="display: flex;margin-right:20px;align-items: center; width:40px;border-radius: 20px;overflow: hidden;color: #f3cb0a;"><i class="iconfont icon-wode-" style="font-size: 2rem ;"></i></div><div style="flex:1;font-size:15px;color:#333;">xxxx</div><div style="flex:1;text-align: right;font-size:12px;color: #999;">2018-09-06 14:33:53</div></div><div style="font-size:15px;color:#333;margin-bottom:5px;">事实上</div><div style="font-size:12px;color:#999;">1.5kg</div></li></div>	
                        <div style="text-align: center;padding:10px;" id="GetEvaluateList"><a style="color: #cc0000;border: 1px solid #e5e5e5;border-radius: 15px;padding: 3px 10px;font-size: 15px;">更多评价</a></div>
                    </div>
                    <div class="shop-detail" style="background:#fff;padding:0 10px;" v-html="warecontent"></div>
                </ul>
            </div>
        </div>
        <div class="footer">
            <a @click="gocar"><i class="iconfont icon-gouwuche"></i><p>购物车</p></a>
			<a><i class="iconfont icon-shouye1"></i><p>店铺</p></a>
			<a @click="addcar" class="add-car">加购物车</a>
			<a class="to-buy open-popup" style="color:#fff;font-size: 15px;">立刻购买</a>
        </div>
        <!-- 弹出层 -->
        <model type='alertpaymodel' 
            @cancelpaymodel='cancelpaymodel' 
            :payshowstate='payM' 
            @transferUser='getpaycode' 
            :specJson='specJson'
            >
        </model>
    </div>
</template>
<script>
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BScroll from 'better-scroll'
import model from './children/model'
import { Swipe, SwipeItem,Indicator,Toast} from 'mint-ui'
export default {
    data () {
        return {
            data:'',
            items:[],
            last:'',
            warecontent:'',
            isShow:false,
            specJson:'',
            current:0,
            mPrice:0,
            mspecName:'',
            buyNum:1,
            payM:false,
            styleObj1: { "height": '', "width": "100%", "overflow": "hidden", 'font-size': '40px' },
        }
    },
    mounted(){
        Indicator.open('加载中...'),
        this.$store.commit('changeTitle',"购物车")
        this.getData(),
        Indicator.close()
    },
    beforeMount(height) {
        var height = 50+45
        var h = document.documentElement.clientHeight || document.body.clientHeight;
        this.styleObj1["height"] = h - height + "px"
    },
    components:{
        Header,
        Footer,
        model
    },
    methods: {
        getData() {
            let data={
                "wareid":this.$route.query.id,
            }
            this.$http
            .post(process.env.API_HOST + "/mall_api/shop/get_ware_info", data)
            .then(response => {
                Indicator.close();
                let data=response.data.data
                this.data=data;
                this.items=data.coverList;
                this.warecontent=data.warecontent;  
                this.specJson=data.specJson;    
                this.mPrice=data.specJson.specValue[0].specPrice   
                this.mspecName=data.specJson.specValue[0].specName     
            })
            .catch(error => {
                console.log(error);
            }); 
        },
        alertDemo() {
            this.alertpaymodel();          
        },
        alertpaymodel(){
            this.payM=true
        },
        cancelpaymodel(){
            this.payM = false;
        },
        removeDemo(){
            this.isShow = !this.isShow
        },

        addClass:function(index){	
            this.current=index;
            this.mPrice=this.specJson.specValue[index].specPrice
            this.mspecName=this.specJson.specValue[index].specName
        },

        goback(){
            this.$router.go(-1)
        },
        gocar(){
            if(JSON.parse(sessionStorage.getItem("baseUser"))==null){
                this.$router.push("/login")
                return false
            }else{
                this.$router.push("/buyCar")
            }
        },
        addcar(){
            if(JSON.parse(sessionStorage.getItem("baseUser"))==null){
                this.$router.push("/login")
                return false
            }
            let data={
                userId:JSON.parse(sessionStorage.getItem("baseUser")).userId,		
                wareid:this.$route.query.id, 		 
                count:this.buyNum,     	
                specname:this.mspecName,  
                price:this.mPrice,		 
            }	
            this.$http
                .post(process.env.API_HOST + "/mall_api/cart/add", data)
                .then(response => {
                    console.log(response.data);
                    if(response.data.code==0 && response.data.success==true){
                        Toast("添加成功");
                    }
                })
                .catch(error => {
                    console.log(error);
                }); 
        }, 
    },
}
</script>

<style lang="scss" scoped>
    .shop-msg{
        background: #fff;
        margin-bottom: 5px;
        text-align: left;
        .txt1 {
            padding: 5px 10px;
            font-size: 16px;
            color: #333;
            .Collection {
                color: #999;
                width: 45px;
                text-align: center;
                cursor: pointer;
            }
        }
        .txt2 {
            display: flex;
            font-size: 12px;
            color: #666;
            line-height: 1.5rem;
            padding: 0 10px 5px 10px;
            .Price {
                text-align: right;
                color: #cc0000;
                font-size: 1.4rem;
            }
            a {
                flex: 1;
            }
        }
    }
    .Voucher {
        height: 2.5rem;
        line-height: 2.5rem;
        display: flex;
        padding: 0 10px;
        border-bottom: 1px solid #dcdcdc;
        .one {
            flex: 0.5;
            font-size: 15px;
        }
        a{
            flex: 1;
        }
        .go-Voucher {
            text-align: right;
        }
    }
    .page-infinite-wrapper {
        margin-top: -1px;
        overflow: scroll;
        height:30.85rem;
    }
    .footer {
        height: 2.5rem;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        display: flex;
        background: #fff;
        font-size: 10px;
        color: #666;
        border-top: 1px solid #dcdcdc;
        align-items: center;
        a{
            flex: 1;
            text-align: center;
            color: #666;
        }
      
        .add-car {
            background: #f3cb0a;
            line-height: 2.5rem;
            color: #fff;
            font-size: 15px;
        }
        .to-buy {
            background: #cc0000;
            line-height: 2.5rem;
            color: #fff;
        }
    }

    // 弹出层
    .go-buy-wrap{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.3);
        z-index: 998;
        position: absolute;
        bottom: 0;
        left: 0;
        opacity: 0.5;
    }
    .go-buy{
        background: #fff;
        z-index: 999;
        position: absolute;
        bottom: 0;
        left: 0;
        bottom: 0;
        height:50%;
        width: 100%;
        overflow: hidden;
    }
    .alert-price {
        overflow: hidden;
        text-align: center;
        color: #cc0000;
        font-size: 30px;
    }
    #CancelBtn{
        position: absolute;
        left: 0px;
        top: 0px;
        padding: 10px;
        display: block;
        width: 45px;
        height: 45px;
        overflow: hidden;
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
    .act {
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
   
</style>

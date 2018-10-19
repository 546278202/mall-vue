<template>    
    <div>
        <div class="page-infinite-wrapper">
            <ul
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10">
            <!-- <ul v-infinite-scroll infinite-scroll-disabled="loading" infinite-scroll-distance="50" class="page-infinite-list" style="height: 100%;">  -->
                <header style="height:2.5rem;line-height:2.5rem;display:flex;background:#fff;box-sizing: border-box;">
                    <a id="top-back" style="flex:1;padding-left:5px;text-align: left;"><i class="iconfont icon-fanhui" style="font-size:1rem;"></i></a> 
                    <a class="shop_car" style="flex:1;text-align: center;">商品详情</a>	    
                    <a class="" style="flex:1;"></a>	    		  	   
                </header>
                <mt-swipe :auto="4000" style="height:200px;">
                    <mt-swipe-item v-for="item in items" :key="item">
                        <img v-bind:src="item" style="width: 100%;height: 100%;">
                    </mt-swipe-item>
                </mt-swipe>
                <div class="shop-msg">
                    <div class="txt1" style="display:flex;">
                        <div class="ShopName" style="flex:1;">京觅 西州蜜哈密瓜 1个装 约1.5-2kg 新鲜水果</div> 
                        <div id="Collection" class="Collection">
                            <div id="isFont" style="height:1.5rem;"><i class="iconfont icon-pinglunxingxingtianchong" style="font-size: 1rem;"></i></div>
                            <p id="isFontText" style="font-size:12px;">收藏</p>
                        </div>	
                    </div>
                    <div class="txt2">
                        <a class="Postage" id="PostageParent">包邮</a>
                            <a class="Monthly-sales" style="text-align: right;">月销量0件</a>
                            <a class="Coupon" style="display: flex;justify-content: center;"></a>
                        <a class="Price"><span>￥</span><span id="Price">0.2</span></a>
                    </div>
                </div>

                <div class="shop-msg">
                    <div class="Voucher" id="MumSelection">
                        <a class="one">已选</a>
                        <a id="HasTrue" style="font-size: 0.6rem;color:#999;" specstock="1">1.5kg</a>
                        <a class="go-Voucher"><i class="iconfont icon-xiangyou"></i></a>
                    </div>
                    <div class="Voucher">
                        <a class="one">服务</a>
                        <a style="font-size: 0.6rem;color:#999;">坏果包赔</a>
                        <a class="go-Voucher"></a>
                    </div>
                </div>
                <div class="CommentModule" style="background: #fff;margin-bottom: 5px;text-align: left;">
                    <div id="AllList" style="height: 2.5rem;line-height: 2.5rem;padding: 0 10px;border-bottom: 1px solid #dcdcdc;font-size: 15px;text-align: center;">评论（1）</div>
                    <div class="DiscussList"><li style="padding: 10px;background:#fff;margin-bottom: 5px;"><div style="display:flex;height: 2.5rem;line-height: 2.5rem;"><div style="display: flex;margin-right:20px;align-items: center; width:40px;border-radius: 20px;overflow: hidden;color: #f3cb0a;"><i class="iconfont icon-wode-" style="font-size: 2rem ;"></i></div><div style="flex:1;font-size:15px;color:#333;">xxxx</div><div style="flex:1;text-align: right;font-size:12px;color: #999;">2018-09-06 14:33:53</div></div><div style="font-size:15px;color:#333;margin-bottom:5px;">事实上</div><div style="font-size:12px;color:#999;">1.5kg</div></li></div>	
                    <div style="text-align: center;padding:10px;" id="GetEvaluateList"><a style="color: #cc0000;border: 1px solid #e5e5e5;border-radius: 15px;padding: 3px 10px;font-size: 15px;">更多评价</a></div>
                </div>
                <div class="shop-detail" style="background:#fff;padding:0 10px;" v-html="warecontent"></div>
                
            </ul>
        </div>
        <div class="footer">
			<a id="common-cart-num"><i class="iconfont icon-gouwuche"></i><p>购物车</p><span class="cart-num" style="display: none;"></span></a>
			<a id="CurrentMall" mallnumber="M201809041013011157"><i class="iconfont icon-shouye1"></i><p>店铺</p></a>
			<a class="add-car" @click="aa" style="color:#fff;font-size: 15px;">加购物车</a>
			<a class="to-buy open-popup" id="to-buy" style="color:#fff;font-size: 15px;">立刻购买</a>
		</div>
    </div>
</template>
<script>
import axios from 'axios'
import Footer from '../../components/Footer'
import { Swipe, SwipeItem } from 'mint-ui'
import { InfiniteScroll } from 'mint-ui'

export default {
    data () {
        return {
            items:[],
            last:'',
            warecontent:'',
        }
    },
    mounted(){
        axios.post('http://47.93.4.157:8086/mall_api/shop/get_ware_info', {
            "wareid":this.$route.query.id,
        })
        .then( (response) => {
            this.items=response.data.data.coverList;
            this.warecontent=response.data.data.warecontent;           
        })
        .catch( (error) => {
            console.log(error);
        })    
    },
    
    components:{
        Footer
    },
    methods: {
        loadMore() {
            this.loading = true;
            setTimeout(() => {
                let last = this.list[this.list.length - 1];
                for (let i = 1; i <= 10; i++) {
                this.list.push(last + i);
                }
                this.loading = false;
            }, 2500);
        },
        aa(){
            alert("ss")
        }
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
        }
        .to-buy {
            background: #cc0000;
            line-height: 2.5rem;
            color: #fff;
        }
    }
</style>

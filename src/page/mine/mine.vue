<template>    
    <div>
        <div class="My_top">
  			<div class="My-top-naver">
			    <a class="My-top-left" id="goSet"><i class="iconfont icon-shezhi" style="font-size: 2rem ;"></i></a>
		  	   	<a class="My-top-right">
                    <div>消息</div>
                    <i class="iconfont icon-xiaoxi" style="font-size: 1.3rem ;"></i>
                </a>
	  	   	</div>
            <div class="My-top-block">
				<div style="height:1.5rem;text-align:center;color:#333333; display:flex;">
					<div class="person" id="PersonMsg">
						<a id="touXing" class="touXing"><i class="iconfont icon-wode-" style="font-size: 2rem ;"></i></a>
					</div>
				</div>	 
			   	<div id="UserName" style="height:3.5rem;font-weight: bold;text-align: center;color: #333333;font-size: 15px;line-height:2.5rem;">{{dataList.nickName}}</div>
			   	<div style="height:2.5rem;text-align:center;color:#333333; display:flex;">
			   		<a href="../collection/collection.html" style="flex:1;">
			   			<p style="font-size:12px;color:#333;">我的收藏</p>
			   			<p id="collectionCount" style="color:#f3cb0a;font-size: 18px;">{{dataList.collectionCount}}</p>
			   		</a>
					<a style="flex:1;"></a>
			   		
			   		<a href="../collection/record.html" style="flex:1;">
						<p style="font-size:12px;color:#333;">足迹</p>
			   			<p id="lookPathCount" style="color:#f3cb0a;font-size: 18px;">{{dataList.lookPathCount}}</p>
			   		</a>
			   	</div>
	  	   	</div>     
		</div>
        <div class="my-Order">
			<a class="myList" href="../order/order.html?tabCode=">
				<div class="left">我的订单</div>
				<div class="right"><i class="iconfont icon-arrow_right" style="font-size: 1rem ;"></i></div>
			</a>
			<div class="stateList">
				<a href="../order/order.html?tabCode=0">
					<img src="../../images/state1.png">
					<p>待付款</p>
					<div class="tableState" v-if="dataList.orderStatus0>0">{{dataList.orderStatus0}}</div>
				</a>
				<a href="../order/order.html?tabCode=1">
					<img src="../../images/state2.png">
					<p>待发货</p>
					<div class="tableState" v-if="dataList.orderStatus1>0">{{dataList.orderStatus1}}</div>
				</a>
				<a href="../order/order.html?tabCode=2">
					<img src="../../images/state3.png">
					<p>待收货</p>
					<div class="tableState" v-if="dataList.orderStatus2>0">{{dataList.orderStatus2}}</div>
				</a>
				<a href="../discuss/commentlist.html">
					<img src="../../images/state4.png">
					<p>待评价</p>
					<div class="tableState" v-if="dataList.orderStatus3>0">{{dataList.orderStatus3}}</div>
				</a>
				<a href="../aftersale/salelist.html">
					<img src="../../images/state5.png">
					<p>售后</p>
				</a>
			</div>
	  	</div>
        <Footer></Footer>
    </div>        
</template>
<script>
import Search from '../../components/Search'
import Footer from '../../components/Footer'
import { InfiniteScroll } from 'mint-ui';
import { Indicator } from 'mint-ui';
export default {
    data () {
        return {
            dataList:'',
            last:''
        }
    },
    mounted(){
        if(sessionStorage.baseUser==undefined){
            this.$router.push("/login")
        }else{
            let baseUser=JSON.parse(sessionStorage.baseUser);
            let userId=baseUser.userId;
            this.getData(userId);
        }
    },
    components:{
        Search,
        Footer
    },
    methods: {
        getData(userId) {
            Indicator.open('加载中...')
            let data={ "userId":userId}
            this.$http.post(process.env.API_HOST + "/mall_api/common/get_home_info", data)
            .then( (response) => {
                Indicator.close()
                this.dataList=response.data.data;
                console.log(response.data)
            })
            .catch( (error) => {
                console.log(error);
            })    
        }
    },

}
</script>

<style lang="scss" scoped>
    .My_top {
        height: 10rem;
        background: #f3cb0a;
        color: #fff;
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
        position: relative;
        .My-top-naver {
            height: 50px;
            display: flex;
            align-items: center;
            .My-top-left {
                flex: 1;
                text-align: left;
                padding-left: 10px;
                color: #fff;
            }
            .My-top-right {
                font-size: 14px;
                flex: 1;
                text-align: right;
                padding-right: 10px;
                color: #fff;
            }
        }
    }
    .My-top-block {
        background: #fff;
        border-radius: 20px;
        width: 90%;
        position: absolute;
        margin: 0 5%;
        top: 5rem;
        height: 7.5rem;
        box-sizing: border-box;
    }
    .My-top-block .person {
        width: 100%;
        text-align: center;
        position: absolute;
        top: -20%;
    }
    .My-top-block .touXing {
        width: 60px;
        height: 60px;
        color: #333333;
        background: #fff;
        display: inline-block;
        border-radius: 10px;
        box-shadow: 0 1px 14px #dcdcdc;
        color: #f3cb0a;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }
    .my-Order {
        background: #fff;
        width: 100%;
        margin-top: 3rem;
        font-size: 0.7rem;
        .myList {
            display: flex;
            height: 40px;
            line-height: 40px;
            padding: 0 10px;
            font-size: 15px;
            .left {
                flex: 1;
                text-align: left;
            }
            .myList .right {
                flex: 1;
                text-align: right;
            }
        }
        .stateList {
            display: flex;
            border-top: 1px solid #f3cb0a;
            align-items: center;
            height: 80px;
            a {
                flex: 1;
                text-align: center;
                color: #666;
                position: relative;
                img {
                    height: 30px;
                }
            }
        }
    }

    .tableState {
        position: absolute;
        top: 0;
        right: 0.7rem;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        font-size: 10px;
        font-weight: 500!important;
        text-align: center;
        color: #fff;
        background-color: #f23030;
        width: 16px;
        height: 16px;
        line-height: 16px;
        border-radius: 8px;
        overflow: hidden;
    }
</style>

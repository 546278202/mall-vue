<template>
	<div class="rules">
		<router-view></router-view>
		
		<div class="nav_type">
			<a v-for="(item,index) in items" :key="index" type="2" @click="tabNav(index)" :class='currentIndex==item.tab? "font-red":""'>{{item.text}}</a>
		</div>
		<p class="drop-down" v-if="dropDown">松手刷新数据...</p>
		<div class="bscroll" ref="bscroll" :style="styleObj1">
			<div class="bscroll-container">
				<ul>
					<li v-for="(item,index) in goodsObj" @click="itemClick(index)">
							<div class="content1"></div>
							<div class="content2">
								<div style="display:flex;border-top:1px solid #eee;padding: 10px;" v-for="(item,index) in item.orderDetailEntityList">
									<a class="a1">
										<img :src="item.warePic" style="height:5rem;width:5rem;">
									</a>
									<a class="b2">
										<div class="txt">
											<sapn>ceshi</sapn>
										</div>
										<div class="ShopSize">{{item.specOne}}</div>
										<div class="NumPrice">
											<span>共{{item.wareNum}}件</span>
											<span style="margin-left:20px;">单价：</span>
											<sapn class="font-red" style="font-size: 0.8rem;">￥{{item.warePrice}}</sapn>
										</div>
									</a>
								</div>
							</div>
							<div style="background:#fff;text-align:right;font-size: 0.8rem;padding: 10px;border-top: 1px solid #eee;">
								<a style="margin-left:20px;">合计：{{item.wareTotalPrice}}</a>
							</div>
							<!-- 订单状态:0待付款,1待发货,2待收货,3已完成/待评价,4售后',5取消订单  -->
							<div class="content3" @click.stop="stateClick(index,$event)" ref="menuStateList">
								<!-- 状态0 -->
								<a v-if="item.ordersStatus==0 && item.invalidTime>timestamp" class="payment" ><span data-index="0">立即付款</span></a>
								<a v-if="item.ordersStatus==0 && item.invalidTime<timestamp" class="delete_order" ><span data-index="1">删除订单</span></a>								
								<!-- 状态1 -->
								<a v-if="item.ordersStatus==1" class="payment" ><span data-index="1">催促发货</span></a>
								<!-- 状态2 -->
								<a v-if="item.ordersStatus==2" class="cancel" ><span data-index="2">查看物流</span></a>
								<a v-if="item.ordersStatus==2" class="cancel" ><span data-index="3">确认收货</span></a>
								<!-- 状态3 -->
								<a v-if="item.ordersStatus==3" class="delete_order" ><span >删除订单</span></a>

								<div class="paystate" v-if="item.ordersStatus==0">待付款</div>
								<div class="paystate" v-if="item.ordersStatus==1">待发货</div>
								<div class="paystate" v-if="item.ordersStatus==2">待收货</div>
								<div class="paystate" v-if="item.ordersStatus==3">已完成</div>
							</div>
					</li>
					<div style="display: flex;justify-content: center;font-size: 14px;color:#666;height: 45px;align-items: center;">
						<!-- <mt-spinner :size="18" type="fading-circle" v-show="loadingState" ></mt-spinner> -->
						<div style="margin-left:10px;">{{txtsmg}}</div>
					</div>
					
					
				</ul>
			</div>
		</div>
		<!-- 支付框 -->
		<payModel type='alertpaymodel' 
			@cancelpaymodel='cancelpaymodel' 
			:payshowstate='payM' 
			@transferUser='gotopay' 
			:paynum='paynum'>
		</payModel>
	</div>
</template>

<script>
	import Header from "../../components/Header";
	import BScroll from 'better-scroll'
	import { Indicator, InfiniteScroll, Spinner,Toast} from "mint-ui";
	import { getNowFormatDate, getMillisecond} from "../../config/mUtils"
    import payModel from "../../components/payModel";
	export default {
		data() {
			return {
				items: [
					{ tab: '', text: "全部订单" },
					{ tab: '0', text: "待付款" },
					{ tab: '1', text: "代发货" },
					{ tab: '2', text: "待收货" },
					{ tab: '3', text: "已完成" },
				],
				currentIndex: this.$route.query.tabCode,
				goodsObj: [],
				dropDown: false,
				pageNum: 1,
				pageSize: 20,
				styleObj1: { "height": '', "width": "100%", "overflow": "hidden", 'font-size': '40px' },
				txtsmg:"",
				flag:'',
				stop:true,
				payM:false,	//支付框状态
				paynum:'',	//支付金额
				timestamp :'', //当前毫秒值 
			}
		},
		//获取屏幕高度
		beforeMount(height) {
			var height = 50
			var h = document.documentElement.clientHeight || document.body.clientHeight;
			this.styleObj1["height"] = h - height + "px"
		},
		mounted() {
			this.timestamp=Date.parse(new Date())
			this.scrollFn()
			this.loadMore()	
		},
		watch:{
			goodsObj(val){
				this.scroll.refresh()
			}
		},
		components: {
            payModel
        },
		methods: {
			// 付款弹框
			alertpaymodel() {
				this.payM = true;
				
            },
            cancelpaymodel(){
                this.payM = false;
            },
			// 切换导航
			tabNav(index) {
				this.goodsObj=[]
				this.currentIndex = this.items[index].tab
				this.pageNum=1,
				this.loadMore()
			},
			loadMore() {
				let parameter = {
					userId: this.$store.state.baseUser.userId,
					ordersStatus: this.currentIndex,
					time: getNowFormatDate(),
					pageNum: this.pageNum,
					pageSize: this.pageSize
				};
			
				this.$http
					.post(
						process.env.API_HOST + "/mall_api/order/get_order_info",
						parameter
					)
					.then(response => {
						if (response.data.code == 0 && response.data.success == true) {
							var aa = response.data.data.list
							this.txtsmg="上拉加载更多"
							if(aa.length<this.pageSize && aa.length>0){
								this.txtsmg="已经加载完毕"
								this.stop=false
							}
							for (var i = 0; i < aa.length; i++) {
								// aa[i].invalidTime=getMillisecond(aa[i].invalidTime)
								this.goodsObj.push(aa[i])
							}
							
							if(this.goodsObj.length==0){
								this.txtsmg="暂无数据"
							}
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
								mouseWheel: {    // pc端同样能滑动
									speed: 20,
									invert: false
								},
								useTransition: false  // 防止iphone微信滑动卡顿
						});
					} else {
						// this.scroll.refresh();
					}
					this.scroll.on('scroll', (pos) => {
						//如果下拉超过50px 就显示下拉刷新的文字
						if (pos.y > 50) {
							this.dropDown = true
						} else {
							this.dropDown = false
						}
					})
					//touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
					this.scroll.on('touchEnd', (pos) => {
						// 下拉动作
						if (pos.y > 50) {
							this.goodsObj.length=0
							this.pageNum=1
							this.loadMore()
							this.dropDown = false
							this.txtsmg=""
						}
						//上拉加载 总高度>下拉的高度+10 触发加载更多
						if (this.scroll.maxScrollY > pos.y + 10) {
							if(this.stop==false){
								return false
							}
							this.txtsmg="上拉加载更多"
							this.pageNum++
							this.loadMore()
						}
					})
				});
			},
			// 删除订单
			DeleteOrder(index,orderNo){
				let parameter = {orderNo:orderNo};
				this.$http
					.post(process.env.API_HOST + "/mall_api/order/del_order",parameter)
					.then(response => {
						if (response.data.code == 0 && response.data.success == true) {
							this.goodsObj.splice(index,1)
							Toast(response.data.msg);
						}else{
							Toast(response.data.msg);
						}
					})
					.catch(error => {
						Indicator.close();
					});
			},
			// 点击状态按钮
			stateClick(index,e){
				var orderNo=this.goodsObj[index].oid
				let _index=e.target.dataset.index
				console.log(_index)
				var x=''
				switch (_index){
					case "0":
						this.goodsObj[index].wareTotalPrice
						this.paynum=this.goodsObj[index].wareTotalPrice-this.goodsObj[index].wareTotalPrice
						this.alertpaymodel()
						break;
					case "1":
						this.goodsObj[index].wareTotalPrice
						this.DeleteOrder(index,orderNo)
						break;
					default:
						x="Looking forward to the Weekend";
				}
			},
			
			itemClick(index){
				let oid=this.goodsObj[index].oid
                this.$router.push("/order/orderDetail?id="+oid);
			}
			// 支付前获取优惠金额
			// youHuiPrice(orderNo){
			// 	var parameter={"orderNo":orderNo};
			// 		this.$http
			// 		.post(process.env.API_HOST + "/mall_aYouHuiPricepi/common/couponPrice",parameter)
			// 		.then(response => {
			// 			if (response.data.code == 0 && response.data.success == true) {
			// 				console.log(response)	
			// 				// var couponSum=dataList.couponSum;
			// 			}	
			// 		})			
        	// }
			
		}
	}
</script>


<style lang="scss" scoped>
	.nav_type {
		width: 100%;
		height:50px;
		display: flex;
		background: #fff;
		line-height:50px;
		font-size: 14px;
		a{
			flex:1;
		}
	}
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
	ul{padding-top:5px;}
	li {
		margin-bottom: 5px;
		background: #fff;
	}
	.font-red {
		color: #cc0000;
	}
	.content2 {
		width: 100%;
		background: #fff;
		font-size: 0.7rem;
		.img {
			display: block;
		}
		.a1 {
			margin-right: 10px;
		}
		.b2 {
			flex: 1;
			text-align: left;
			.txt {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				height: 2rem;
			}
			.ShopSize {
				font-size: 12px;
				padding-top: 5px;
				margin-bottom: 15px;
				color: #999;
			}
			.NumPrice {
				text-align: right;
				color: #999;
			}
			.font-red {
				color: #cc0000;
			}
		}
	}
	.content3 {
		padding: 0 10px;
		width: 100%;
		height: 2.5rem;
		display: flex;
		background: #fff;
		line-height: 2.5rem;
		font-size: 0.7rem;
		border-top: 1px solid #d3d3d3;
		text-align: right;
		flex-direction: row-reverse;
		.payment {
			margin-left: 20px;
			span {
				border: 1px solid #cc0000;
				color: #cc0000;
				padding: 3px 5px;
				border-radius: 6px;
			}
		}
		.delete_order {
			margin-left: 20px;
			span {
				border: 1px solid #3d4145;
				color: #3d4145;
				padding: 3px 5px;
				border-radius: 6px;
			}
		}
		.paystate{
			flex:1;
			text-align:left;
			color:#cc0000;
		}
		
	}
</style>
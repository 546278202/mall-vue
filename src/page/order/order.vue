<template>
	<div>
		<div class="nav_type">
			<a v-for="(item,index) in items" :key="index" type="2" @click="tabNav(index)" :class='currentIndex==item.tab? "font-red":""'>{{item.text}}</a>
		</div>
		<p class="drop-down" v-if="dropDown">{{RefreshText}}</p>
		<div class="bscroll" ref="bscroll" :style="styleObj1">
			<div class="bscroll-container">
				<ul>
					<li v-for="(item,index) in goodsObj" @click="itemClick(index,$event)">
						<div class="content1"></div>
						<div class="content2">
							<div style="display:flex;border-top:1px solid #eee;padding: 10px;" v-for="(item,index) in item.orderDetailEntityList">
								<a class="a1"><img :src="item.warePic" style="height:5rem;width:5rem;"></a>
								<a class="b2">
									<div class="txt">{{item.wareName}}</div>
									<div class="ShopSize">{{item.specOne}}</div>
									<div class="NumPrice">
										<span>共{{item.wareNum}}件</span>
										<span style="margin-left:20px;">单价:</span>
										<sapn class="font-red" style="font-size: 0.8rem;">￥{{Number(item.warePrice).toFixed(2)}}</sapn>
									</div>
								</a>
							</div>
						</div>
						<div style="background:#fff;text-align:right;padding: 10px;border-top: 1px solid #eee;">
							<a style="margin-left:20px;">合计:{{Number(item.wareTotalPrice).toFixed(2)}}</a>
						</div>
						<!-- 订单状态:0待付款,1待发货,2待收货,3已完成/待评价,4售后',5取消订单  -->
						<div class="content3" ref="menuStateList">
							<!-- 状态0 -->
							<div v-if="item.ordersStatus==0 && item.DifferenceMiao>0" class="payment"><span v-on:click.stop="alertpaymodel(index)">立即支付</span></div>
							<!-- 状态1 -->
							<div v-if="item.ordersStatus==1" class="payment"><span data-index="1">催促发货</span></div>
							<!-- 状态2 -->
							<div v-if="item.ordersStatus==2" class="cancel"><span data-index="2">查看物流</span></div>
							<div v-if="item.ordersStatus==2" class="cancel"><span data-index="3">确认收货</span></div>
							<!-- 状态3 -->
							<div v-if="item.ordersStatus==0 && 0>item.DifferenceMiao || item.ordersStatus==3" class="delete_order"><span
								 v-on:click.stop="DeleteOrder(index,item.oid)">删除订单</span></div>
							<div class="paystate" v-if="item.ordersStatus==0 && item.DifferenceMiao>0">待付款</div>
							<div class="paystate" v-if="item.ordersStatus==0 && 0>item.DifferenceMiao">已取消</div>

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
		<payModel 
			type='alertpaymodel'
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
	import { Indicator, InfiniteScroll, Spinner, Toast,MessageBox  } from "mint-ui";
	import { getNowFormatDate, getMillisecond } from "../../config/mUtils"
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
				txtsmg: "",
				flag: '',
				stop: true,
				payM: false,	//支付框状态
				paynum: '',	//支付金额
				RefreshText: ''
			}
		},
		//获取屏幕高度
		beforeMount(height) {
			var height = 50
			var h = document.documentElement.clientHeight || document.body.clientHeight;
			this.styleObj1["height"] = h - height + "px"
		},
		mounted() {
			this.scrollFn()
			this.loadMore()
		},
		watch: {
			goodsObj(val) {
				this.scroll.refresh()
			}
		},
		components: {
			payModel
		},
		methods: {
			// 付款弹框
			alertpaymodel(index) {
				let parameter = { orderNo: this.goodsObj[index].oid };
				this.$http
					.post(process.env.API_HOST + "/mall_api/common/couponPrice", parameter)
					.then(response => {
						if (response.data.code == 0 && response.data.success == true) {
							let couponSum = response.data.data.couponSum;
							this.paynum = (this.goodsObj[index].wareTotalPrice - this.goodsObj[index].freightPayable - couponSum).toFixed(2)
							this.payM = true;
						}
					})
					.catch(error => {
						console.log(error);
					});
			},
			cancelpaymodel() {
				this.payM = false;
			},
			// 切换导航
			tabNav(index) {
				this.goodsObj = []
				this.currentIndex = this.items[index].tab
				this.pageNum = 1,
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
					.post(process.env.API_HOST + "/mall_api/order/get_order_info", parameter)
					.then(response => {
						if (response.data.code == 0 && response.data.success == true) {
							var aa = response.data.data.list
							this.txtsmg = "上拉加载更多"
							if (aa.length < this.pageSize && aa.length > 0) {
								this.txtsmg = "已经加载完毕"
								this.stop = false
							}
							for (var i = 0; i < aa.length; i++) {
								let nowtimeHaoMiao = Date.parse(new Date());
								let stringTime = aa[i].invalidTime.replace(new RegExp("-", "gm"), "/")
								let endtimeHaoMiao = (new Date(stringTime)).getTime();
								aa[i]["DifferenceMiao"] = endtimeHaoMiao - nowtimeHaoMiao
								this.goodsObj.push(aa[i])
							}
							console.log(this.goodsObj)

							if (this.goodsObj.length == 0) {
								this.dropDown = false
								this.txtsmg = "暂无数据"

							}
						}
					})
					.catch(error => {
						console.log(error)
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
					this.scroll.on('scroll', (pos) => {
						//如果下拉超过50px 就显示下拉刷新的文字
						if (this.goodsObj.length > 0) {
							this.RefreshText = "下拉刷新"
							this.dropDown = true
							if (pos.y > 50) {
								this.RefreshText = "释放立即刷新"
							}
						}

					})
					//touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
					this.scroll.on('touchEnd', (pos) => {
						// 下拉动作
						if (pos.y > 50) {
							this.goodsObj.length = 0
							this.pageNum = 1
							this.loadMore()
							// this.dropDown = false
							this.txtsmg = ""
						}
						//上拉加载 总高度>下拉的高度+10 触发加载更多
						if (this.scroll.maxScrollY > pos.y + 10) {
							if (this.stop == false) {
								return false
							}
							this.txtsmg = "上拉加载更多"
							this.pageNum++
							this.loadMore()
						}
					})
				});
			},
			// 删除订单
			DeleteOrder(index, orderNo) {
				MessageBox.confirm('确定执行此操作?').then(action => {
					let parameter = { orderNo: orderNo };
					this.$http.post(process.env.API_HOST + "/mall_api/order/del_order", parameter)
					.then(response => {
						if (response.data.code == 0 && response.data.success == true) {
							this.goodsObj.splice(index, 1)
							Toast(response.data.msg);
						} else {
							Toast(response.data.msg);
						}
					})
					.catch(error => {

					});
				})
			},
			itemClick(index, $event) {
				console.log($event)
				let oid = this.goodsObj[index].oid
				this.$router.push("/order/orderDetail?id=" + oid);
			}
		}
	}
</script>


<style lang="scss" scoped>
	.nav_type {
		width: 100%;
		height: 50px;
		display: flex;
		background: #fff;
		line-height: 50px;
		font-size: 0.7rem;
		a {
			flex: 1;
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
		font-size: 0.7rem;
		color: #666;
	}

	ul {
		padding-top: 5px;
	}

	li {
		margin-bottom: 5px;
		background: #fff;
		font-size: 0.7rem;
	}

	.font-red {
		color: #cc0000;
	}

	.content2 {
		width: 100%;
		background: #fff;
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
				font-size:0.6rem;
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
		border-top: 1px solid #f5f5f5;
		text-align: right;
		flex-direction: row-reverse;
		font-size: 0.6rem;
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

		.paystate {
			flex: 1;
			text-align: left;
			color: #cc0000;
		}

	}
</style>
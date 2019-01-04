<template>
	<div class="rules">
		<div class="nav_type">
			<a v-for="(item,index) in items" :key="index" type="2" @click="tabNav(index)" :class='currentIndex==item.tab? "font-red":""'>{{item.text}}</a>
		</div>
		<p class="drop-down" v-if="dropDown">松手刷新数据...</p>
		<div class="bscroll" ref="bscroll" :style="styleObj1">
			<div class="bscroll-container">
				<ul>
					<li v-for="(item,index) in goodsObj">
						<div class="order-one">
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
							<div class="content3">
								<a class="payment"><span>立即付款</span></a>
								<a class="delete_order"><span>删除订单</span></a>
								<div style="flex:1;text-align:left;color:#cc0000;">待付款</div>
							</div>
						</div>
					</li>
					<div style="display: flex;justify-content: center;font-size: 14px;color:#666;height: 45px;align-items: center;">
						<!-- <mt-spinner :size="18" type="fading-circle" v-show="loadingState" ></mt-spinner> -->
						<div style="margin-left:10px;">{{txtsmg}}</div>
					</div>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from "../../components/Header";
	import BScroll from 'better-scroll'
	import { Indicator, InfiniteScroll, Spinner } from "mint-ui";
	import { getNowFormatDate } from "../../config/mUtils"
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
				stop:true
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
		watch:{
			goodsObj(val){
				console.log(val)
				this.scroll.refresh()
			}
		},
		methods: {
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
				Indicator.open("加载中...");
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
								this.goodsObj.push(aa[i])
							}
							Indicator.close();
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
			}
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
	}
</style>
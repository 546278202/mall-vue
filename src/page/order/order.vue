<template>
	<div>
		<Header></Header>
		<div class="wrap" :style="styleObj1">
			<div class="content">
				<div class="nav_type">
					<a v-for="(item,index) in items" :key="index" type="2" @click="tabNav(index)" :class='currentIndex==item.tab? "font-red":""'>{{item.text}}</a>
				</div>
				<ul>
					<li v-for="(item,index) in goodsObj">
						<div class="order-one" style="margin-top: 5px;">
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
					<div v-show="flag"  style="display: flex;justify-content: center;font-size: 14px;color:#999;height: 45px;align-items: center;">
						<div style="margin-right:10px;">{{txtsmg}}</div>
						<mt-spinner :size="18" type="fading-circle" v-show="loadingState" ></mt-spinner>
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
				pageNum:1,
				pageSize:20,
				goodsObj:[],
				loading: false,
				flag:false,
				loadingState:false,
				txtsmg:"",
				styleObj1:{"height":'',"width": "100%","overflow": "hidden",'font-size':'40px'},
				stop:true
			}
		},
		//获取屏幕高度
		beforeMount(height) {
			var height=50
			var h = document.documentElement.clientHeight || document.body.clientHeight;
			this.styleObj1["height"]=h-height+"px"
		},
		mounted() {
			this.$store.commit("changeTitle", "我的订单");
			this.loadMore();
			var oScroll = new BScroll(".wrap", {
				scrollY: true,
    			click: true,
				probeType: 2,
				//下拉刷新：可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
				//这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载
				pullUpLoad: {
					threshold: 10
				},
				mouseWheel: {    // pc端同样能滑动
					speed: 20,
					invert: false
				},
				useTransition: false  // 防止iphone微信滑动卡顿
			});
			oScroll.on("pullingUp",  ()=> {
				if(this.stop==false){
					return false;
				}
				this.pageNum++
				this.loadMore();
				oScroll.finishPullUp();	
				oScroll.refresh()
			});
			oScroll.refresh();			
		},
		components: {
			Header,
		},
		created() {

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
							var aa=response.data.data.list
							this.txtsmg="努力加载中"
							this.flag=true
							this.loadingState=true
							if(aa.length==0){
								this.txtsmg="暂无数据"
								this.flag=true
								this.stop=false
								this.loadingState=false
							}
							if(aa.length<this.pageSize && aa.length>0){
								this.txtsmg="已经加载完毕"
								this.flag=true
								this.stop=false
								this.loadingState=false
							}
							for(var i=0;i<aa.length;i++){
								this.goodsObj.push(aa[i])
							}
							console.log(this.goodsObj)
							Indicator.close();
						}
					})
					.catch(error => {
						Indicator.close();
					});
			},

			

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: auto;
	}
	.nav_type {
		width: 100%;
		height: 2.5rem;
		display: flex;
		background: #fff;
		line-height: 2.5rem;
		font-size: 0.7rem;
		a {	
			cursor: pointer;
			flex: 1;
			text-align: center;
		}
	}

	li {
		margin-top: 5px;
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
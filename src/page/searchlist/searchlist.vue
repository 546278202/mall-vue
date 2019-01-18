<template>
	<div>
		<div class="top-naver" style="display:flex;height: 50px;align-items: center;border-bottom: 1px solid #ccc;background: #fff;">
			<a class="top-left" style="line-height: 2.5rem;width: 45px;" @click="$router.back(-1)">
				<i class="iconfont icon-fanhui" style="font-size: 1rem"></i>
			</a>
			<div class="searchInput" >
				<i class="iconfont icon-iconfontzhizuobiaozhun22"></i>
				<input v-model="message"  placeholder="请输入商品名称"  @focus="getList" @blur="searchList" style="width: 100%;border:0;">
			</div>
			
			<a class="top-right" style="width:45px;font-size:16px;">
				搜索
			</a>
		</div>
		<div>
			<p class="drop-down" v-if="dropDown">松手刷新数据...</p>
			<div class="bscroll" ref="bscroll" :style="styleObj1">
				<div class="bscroll-container">
					<ul>
						<li v-for="(item,index) in goodsObj" @click="itemClick(index)">
							121212	
						</li>
						<div style="display: flex;justify-content: center;font-size: 14px;color:#666;height: 45px;align-items: center;">
							<!-- <mt-spinner :size="18" type="fading-circle" v-show="loadingState" ></mt-spinner> -->
							<div style="margin-left:10px;">{{txtsmg}}</div>
						</div>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Search from "../../components/Search";
	import BScroll from 'better-scroll'
	import { Indicator, InfiniteScroll, Spinner,Toast} from "mint-ui";
	import { getNowFormatDate, getMillisecond} from "../../config/mUtils"
    import payModel from "../../components/payModel";
	export default {
		data() {
			return {
				pageNum: 1,
				pageSize: 20,
				styleObj1: { "height": '', "width": "100%", "overflow": "hidden", 'font-size': '40px' },
				txtsmg:"",//加载文字
				stop:true,
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
				this.scroll.refresh()
			}
		},
		components: {
			Search
        },
		methods: {
			loadMore() {
				let parameter = {
					shopname: "苹果",
					type: 0,
					categoryType: 0,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					time: getNowFormatDate(),
				};
				this.$http
					.post(
						process.env.API_HOST + "/mall_api/shop/get_serverlist",
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
								aa[i].invalidTime=getMillisecond(aa[i].invalidTime)
								this.goodsObj.push(aa[i])
							}
							console.log(this.goodsObj)
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
			
			// 跳转
			itemClick(index){
				let oid=this.goodsObj[index].oid
                this.$router.push("/order/orderDetail?id="+oid);
			}	
		}
	}
</script>


<style lang="scss" scoped>
	.searchInput{
        position: relative;
        border: 1px solid #ccc;
        height: 30px;
        border-radius: 30px;
        overflow: hidden;
        line-height: 30px;
        flex:1;
        padding: 0 10px;
        display: flex;
        align-items: center;
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
	ul{
		padding-top:5px;
		li {
			margin-bottom: 5px;
			background: #fff;
		}
	}
		

</style>
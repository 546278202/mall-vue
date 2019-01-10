<template>
	<div class="rules">
        <Header></Header>
        <div class="nav_type">
            <a v-for="(item,index) in items" :key="index" @click="tabNav(index)" :class='currentIndex==index? "font-red":""'>{{item.text+item.num}}</a>
        </div>
		
		<p class="drop-down" v-if="dropDown">松手刷新数据...</p>
		<div class="bscroll" ref="bscroll" :style="styleObj1">
			<div class="bscroll-container">
				<ul>
                    <li v-for="(item,index) in goodsObj" :key="index">
                        <div style="display:flex;height: 2.5rem;line-height: 2.5rem;">
                            <div style="display: flex;margin-right:20px;align-items: center; width:40px;border-radius: 20px;overflow: hidden;color:#f3cb0a;">
                                <i class="iconfont icon-wode-" style="font-size: 2rem ;"></i>
                            </div>

                            <div style="flex:1;font-size:15px;color:#333;" v-if="item.userEntity!==null">{{item.userEntity.userName}}</div>
                            <div style="flex:1;text-align: right;font-size:12px;color: #999;">{{item.evaluateCreateTime}}</div>
                        </div>
                        <div style="font-size:15px;color:#333;margin-bottom:5px;">{{item.evaluateContent}}</div>
                        <div style="font-size:12px;color:#999;">{{item.wareCategory}}</div>
                        <div class="my-gallery"  style="overflow: hidden;"></div>
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
					{ tab: '' , text: "全部" ,num:'' },
					{ tab: '0', text: "好评" ,num:''},
					{ tab: '1', text: "中评" ,num:'' },
					{ tab: '2', text: "差评" ,num:'' },
				],
				currentIndex:0,
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
        components: {
            Header,
        },
		mounted() {
            this.$store.commit('changeTitle', "评论")
            this.scrollFn()
            this.loadNav()
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
                this.currentIndex =index
				this.pageNum=1,
				this.loadMore()
            },
            // 加载导航数据
            loadNav() {
				let parameter = {
                    wareId: this.$route.query.wareid,
				};
				this.$http
					.post(process.env.API_HOST + "/mall_api/evaluate/getEvaluateLevel",parameter)
					.then(response => {        
						if (response.status =="200" && response.statusText=="OK") {
                            this.items[0].num=''
                            this.items[1].num=response.data[0].goodReviewCount
                            this.items[2].num=response.data[0].commonReviewCount
                            this.items[3].num=response.data[0].badReviewCount
                        }
                        console.log(this.items)
					})
					.catch(error => {

					});
			},
			loadMore() {
				let parameter = {
                    wareId: this.$route.query.wareid,
                    level:'',
                    page: this.pageNum,
                    searchTime: getNowFormatDate(),
                    limit: this.pageSize,
                };
                //全部 '' 好评4,5 中评2,3  差评1
                if(this.currentIndex==0){
                    parameter.level=""
                }
                // 好评
                if(this.currentIndex==1){
                    parameter.level="4,5"
                }
                // 中评
                if(this.currentIndex==2){
                    parameter.level="2,3"
                }
                // 差评
                if(this.currentIndex==3){
                    parameter.level="1"
                }
				Indicator.open("加载中...");
				this.$http
					.post(process.env.API_HOST + "/mall_api/evaluate/getEvaluateList",parameter)
					.then(response => {
						if (response.data.code ==0) {
                            var aa = response.data.data.evaluateEntity
                            this.txtsmg="上拉加载更多"
                           
							if(aa.length<this.pageSize && aa.length>0){
								this.txtsmg="已经加载完毕"
								this.stop=false
							}
							for (var i = 0; i < aa.length; i++) {
								this.goodsObj.push(aa[i])
                            }
                            if(this.goodsObj==0){
								this.txtsmg="暂无数据"
								this.stop=false
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
		top: 100px;
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
        padding: 10px;
        background: rgb(255, 255, 255);
        margin-bottom: 5px;
        border-bottom: 1px solid rgb(220, 220, 220);
        text-align: left;
	}
	.font-red{
        color:#f3cb0a;
    }
</style>
<template>
    <router-link :to="{path:'/discuss' , query:{wareid:$route.query.id}}" class="commentModule">
        <div class="title">评论{{items.length}}</div>
        <ul>
            <li style="padding: 10px;background:#fff;margin-bottom: 5px;display:block;" v-if="index==0" v-for="(item,index) in items">
                <div style="display:flex;height: 2.5rem;line-height: 2.5rem;">
                    <div style="display: flex;margin-right:20px;align-items: center; width:40px;border-radius: 20px;overflow: hidden;color: #f3cb0a;">
                        <i class="iconfont icon-wode-" style="font-size: 2rem ;"></i>
                    </div>
                    <div style="flex:1;font-size:15px;color:#333;" v-if="item.userEntity!==null">{{item.userEntity.userName}}</div>
                    <div style="flex:1;text-align: right;font-size:12px;color: #999;">{{item.evaluateCreateTime}}</div>
                </div>
              
                <div style="font-size:15px;color:#333;margin-bottom:5px;">{{str}}</div>
                <div style="font-size:12px;color:#999;">{{item.wareCategory}}</div>
            </li>
        </ul>
        <div style="text-align: center;padding:10px;">
            <a style="color: #cc0000;border: 1px solid #e5e5e5;border-radius: 15px;padding: 3px 10px;font-size: 15px;">更多评价</a>
        </div>
    </router-link>
</template>
<script>
	import { getNowFormatDate } from "../../../config/mUtils"
    import { Swipe, SwipeItem, Indicator, Toast } from 'mint-ui'
    export default {
        props: ["wareid"],
        data() {
            return {
                items:'',
                str:''
            }
        },
        watch: {
            wareid: function (newVal, oldVal) {

            }
        },
        mounted() {
            this.loadMore()
           
        },

        methods: {
           loadMore() {
				let parameter = {
                    wareId: this.wareid,
                    level:'',
                    page: 1,
                    searchTime: getNowFormatDate(),
                    limit: 20,
                };
				this.$http
					.post(process.env.API_HOST + "/mall_api/evaluate/getEvaluateList",parameter)
					.then(response => {
						if (response.data.code ==0) {
                            this.items=response.data.data.evaluateEntity;
                            var cc=this.items[0].evaluateContent.replace(/\[|]/g,'')
                            this.str=decodeURI(cc);
                            console.log(this.str)
                            console.log(ccecodeURI(cc))
						}
					})
					.catch(error => {

					});
			},
        }

    };
</script>
<style lang="scss" scoped>
    .commentModule{
        background: #fff;
        margin-bottom: 5px;
        text-align: left;
        display:block;
        .title{
            height: 2.5rem;
            line-height: 2.5rem;
            padding: 0 10px;
            border-bottom: 1px solid #dcdcdc;
            font-size: 15px;
            text-align: center;
        }  
    }
</style>
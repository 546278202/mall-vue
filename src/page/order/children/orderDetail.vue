<template>
    <div>
        <router-link :to="{path:'/discuss' , query:{wareid:$route.query.id}}" class="commentModule">
            <div class="title">订单详情{{items.length}}</div>
            <ul>
                <li style="padding: 10px;background:#fff;margin-bottom: 5px;display:block;" v-if="index==0" v-for="(item,index) in items">
                        订单详情订单详情订单详情订单详情订单详情订单详情
                </li>
            </ul>
            
        </router-link>
    </div>
</template>
<script>
    import { getNowFormatDate } from "../../../config/mUtils"
    import { Swipe, SwipeItem, Indicator, Toast } from 'mint-ui'
    export default {
        props: ["wareid"],
        data() {
            return {
                items: '',
                str: ''
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
                    level: '',
                    page: 1,
                    searchTime: getNowFormatDate(),
                    limit: 20,
                };
                this.$http
                    .post(process.env.API_HOST + "/mall_api/evaluate/getEvaluateList", parameter)
                    .then(response => {
                        if (response.data.code == 0) {
                            this.items = response.data.data.evaluateEntity;
                            var cc = this.items[0].evaluateContent.replace(/\[|]/g, '')
                            this.str = decodeURI(cc);
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
    .commentModule {
        background: #fff;
        margin-bottom: 5px;
        text-align: left;
        display: block;

        .title {
            height: 2.5rem;
            line-height: 2.5rem;
            padding: 0 10px;
            border-bottom: 1px solid #dcdcdc;
            font-size: 15px;
            text-align: center;
        }
    }
</style>
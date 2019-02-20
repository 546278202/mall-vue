<template>
    <div>
        <div class="search_model" v-show="flag">
            <ul :style="styleObj1">
                <div class="top-naver">
                    <a class="top-left" style="width: 2.25rem;align-items: center;display: flex;justify-content: center;"
                        @click="closeSeachModel">
                        <i class="iconfont icon-fanhui" style="font-size: 1rem"></i>
                    </a>
                    <div class="searchInput">
                        <i class="iconfont icon-iconfontzhizuobiaozhun22"></i>
                        <input placeholder="请输入商品名称" v-model="something">
                    </div>
                    <a class="top-right" style="width: 2.25rem;font-size: 0.8rem;"  @click="loadMore">搜索</a>
                </div>
                <div style="height: 100%;display: block;font-size: 14px;text-align: left;">
                    <div style="padding:10px" v-if="goodsObj">
                        <span>最近搜索</span>
                        <span class="DelHist" @click="DeleteLocalData">
                            <i class="iconfont icon-unie639" style="font-size: 0.7rem ;"></i>
                        </span>
                    </div>
                    <div style="padding:0 10px; font-size:0.6rem;height:100%;">
                        <span v-for="(item,index) in goodsObj" :key="index"  class="HistoryList"><a>{{item}}</a></span>
                    </div>
                </div>
            </ul>
        </div>
    </div>
</template>
<script>
    import { Indicator, InfiniteScroll, Spinner, Popup ,MessageBox } from "mint-ui";
    import { getNowFormatDate } from "../config/mUtils"
    import bus from '../assets/eventBus'
    export default {
        data() {
            return {
                something: '',
                goodsObj: [],
                flag: false,
                styleObj1: { "height": '', "width": "100%", "overflow": "hidden", 'font-size': '40px' },
                pageNum: 1,
                pageSize: 20,
                txtsmg: ''
            }
        },
        //获取屏幕高度
        beforeMount(height) {
            var h = document.documentElement.clientHeight || document.body.clientHeight;
            var w = document.documentElement.clientWidth || document.body.clientWidth;
            this.styleObj1["height"] = h + "px"
            this.styleObj1["width"] = w + "px"
        },
        mounted() {
            bus.$on("abc",(msg)=>{
                this.flag=true
            })
            this.goodsObj=JSON.parse(localStorage.getItem('SearchHistory'))
        },
        methods: {
            closeSeachModel() {
                this.flag=false
            },
            //搜索
            loadMore() {
                let keyword=this.something
                this.closeSeachModel()
                this.$router.push("/search?name="+this.something);
                if(keyword==''){
                    return false
                }
                var aa=JSON.parse(localStorage.getItem('SearchHistory'))
                if(aa==null){
                    aa=[];
                    aa.push(keyword);
                    localStorage.setItem('SearchHistory',JSON.stringify(aa));
                }else{
                    if(aa.indexOf(keyword)==-1){
                        aa.push(keyword);
                        localStorage.setItem('SearchHistory',JSON.stringify(aa));
                    }	
                }
            
                this.goodsObj=JSON.parse(localStorage.getItem('SearchHistory'))
            },
            // 删除
			DeleteLocalData(){
                MessageBox.confirm('确定执行此操作?').then(action => {
                    localStorage.removeItem('SearchHistory')
                    this.goodsObj=JSON.parse(localStorage.getItem('SearchHistory'))
                });
			},
                
        }

    };
</script>
<style lang="scss" scoped>
    .search_model{
        position: fixed;
        top:0;
        left:0;
        width: 100%;
        height:100%;
        background: #fff;
    }
    .top-naver{
        display:flex;
        height: 2.5rem;
        align-items: center;
        border-bottom: 1px solid #ccc;
        background: #fff;
    }
    .searchInput {
        position: relative;
        border: 1px solid #ccc;
        height: 1.5rem;
        border-radius: 1.5rem;
        overflow: hidden;
        line-height: 1.5rem;
        flex: 1;
        padding: 0 0.5rem;
        display: flex;
        align-items: center;
        input{
            width: 100%;
            border:0;
            font-size:0.7rem;
        }
    }
    .shareUl {
        width: 100%;
        height: 580px;
        background-color: #fff;
    }

    

    .DelHist {
        float: right;
        width: 50px;
        text-align: center;
    }

    .HistoryList {
        display: block;
        max-width: 100%;
        overflow: hidden;
        padding-right: 10px;
        padding-bottom: 10px;
        float: left;
    }

    .HistoryList>a {
        border-radius: 3px;
        display: block;
        width: 100%;
        color: #686868;
        white-space: nowrap;
        text-overflow: ellipsis;
        background-color: #f0f2f5;
        padding-left: 13px;
        padding-right: 13px;
        overflow: hidden;
        box-sizing: border-box;
        padding:4px 5px;
    }
</style>
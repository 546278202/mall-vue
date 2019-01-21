<template>
    <div>
        <mt-popup v-model="popupVisible" position="" modal="false" pop-transition="popup-fade">
            <ul :style="styleObj1">
                <div class="top-naver" style="display:flex;height: 50px;align-items: center;border-bottom: 1px solid #ccc;background: #fff;box-sizing: border-box;">
                    <a class="top-left" style="width: 45px;align-items: center;display: flex;justify-content: center;"
                        @click="closeSeachModel">
                        <i class="iconfont icon-fanhui" style="font-size: 1rem"></i>
                    </a>
                    <div class="searchInput">
                        <i class="iconfont icon-iconfontzhizuobiaozhun22"></i>
                        <input placeholder="请输入商品名称" v-model="something" style="width: 100%;border:0;">
                    </div>
                    <a class="top-right" style="width:45px;font-size: 16px;" @click="loadMore">
                        搜索
                    </a>
                </div>
                <div style="height: 100%;display: block;font-size: 14px;text-align: left;">
                    <div style="padding:10px" v-if="goodsObj">
                        <span>最近搜索</span>
                        <span class="DelHist" @click="DeleteLocalData">
                            <i class="iconfont icon-unie639" style="font-size: 0.8rem ;"></i>
                        </span>
                    </div>
                    <div style="padding:0 10px; font-size:0.7rem;height:100%;">
                        <span v-for="(item,index) in goodsObj" :key="index"  class="HistoryList"><a>{{item}}</a></span>
                    </div>
                </div>
            </ul>
        </mt-popup>
    </div>
</template>
<script>
    import { Indicator, InfiniteScroll, Spinner, Popup ,MessageBox } from "mint-ui";
    import { getNowFormatDate } from "../config/mUtils"

    export default {
        data() {
            return {
                something: '',
                goodsObj: [],
                popupVisible: false,
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
            this.goodsObj=JSON.parse(localStorage.getItem('SearchHistory'))
        },
        methods: {
            // 被父调用
            parentHandleclick(e) {
                this.popupVisible = e
            },
            closeSeachModel() {
                this.$emit('childByValue')
            },
            //搜索
            loadMore() {
                let keyword=this.something
                if(keyword==''){
                    this.$router.push("/search?name="+this.something);
                }else{
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
    .shareUl {
        width: 100%;
        height: 580px;
        background-color: #fff;
    }

    .searchInput {
        position: relative;
        border: 1px solid #ccc;
        height: 30px;
        border-radius: 30px;
        overflow: hidden;
        line-height: 30px;
        flex: 1;
        padding: 0 10px;
        display: flex;
        align-items: center;
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
        height: 1.2rem;
        line-height: 1.2rem;
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
    }
</style>
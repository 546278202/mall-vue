<template>
    <div class="rules">
        <Header>
            <a slot='logo' class="administration"  @click="administration">管理</a>
        </Header>
        <p class="drop-down" v-if="dropDown">松手刷新数据...</p>
        <div class="bscroll" ref="bscroll" :style="styleObj1">
            <div class="bscroll-container">
                <ul>
                    <div v-if="goodsObj.length>0 && flag==true" style="height:45px;line-height:45px;color: #333;font-size: 14px;background: #fff;padding:0 5px;margin-bottom:5px;">
                        <label class="mint-checklist-label" style="align-items: center;display: flex;width:100%;">
                            <span class="mint-checkbox">
                                <input type="checkbox" class="mint-checkbox-input" style="cursor:pointer;" name="checkbox" @click="chooseAllGoods($event)"
                                    v-model="allChecked">
                                <span class="mint-checkbox-core"></span>
                            </span>
                            <span class="mint-checkbox-label">全选</span>
                        </label>
                    </div>
                    <li v-for="(item,index) in goodsObj" :key="index">
                        <label class="mint-checklist-label" v-show="flag">
                            <span class="mint-checkbox">
                                <input type="checkbox" class="mint-checkbox-input" name="checkbox" v-model="item.checked"
                                    v-on:click="choose(index)" />
                                <span class="mint-checkbox-core"></span>
                            </span>
                        </label>
                        <router-link :to="{path:'/detail' , query:{id:item.cWareid}}">
                            <div class="ListImg" style="height:130px;overflow:hidden;">
                                <img v-bind:src="item.warePic" style="display:block;margin:0 auto;height:100%;">
                            </div>
                            <div class="txt">{{item.cWarename}}</div>
                            <div style="color: #cc0000;">￥{{item.cWareprice}}</div>
                        </router-link>   
                    </li>
                    <div style="display: flex;width:100%;justify-content: center;font-size: 14px;color:#666;height: 45px;align-items: center;">
                        <!-- <mt-spinner :size="18" type="fading-circle" v-show="loadingState" ></mt-spinner> -->
                        <div style="margin-left:10px;">{{txtsmg}}</div>
                    </div>
                </ul>
            </div>
        </div>
        <div v-show="flag" class="yesBtn" @click="deleteData">删除</div>
    </div>
</template>
<script>
    import Header from "../../components/Header";
    import BScroll from 'better-scroll'
    import { Indicator, InfiniteScroll, Spinner,Checklist,Toast } from "mint-ui";
    import { getNowFormatDate } from "../../config/mUtils"
    export default {
        data() {
            return {
                goodsObj: [],
                dropDown: false,
                pageNum: 1,
                pageSize: 20,
                styleObj1: { "height": '', "width": "100%", "overflow": "hidden", 'font-size': '40px' },
                txtsmg: "",
                flag: false,
                allChecked:false,//全选
                stop: true
            }
        },
        //获取屏幕高度
        beforeMount(height) {
            var height = 50
            var h = document.documentElement.clientHeight || document.body.clientHeight;
            this.styleObj1["height"] = h - height + "px"
        },
        components: {
            Header
        },
        mounted() {
            this.$store.commit('changeTitle', "我的收藏")
            this.scrollFn()
            this.loadMore()
        },
        watch: {
            goodsObj(val) {
                console.log(val)
                this.scroll.refresh()
            }
        },
        methods: {
            loadMore() {
                let parameter = {
                    userId: this.$store.state.baseUser.userId,
                    time: getNowFormatDate(),
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                };
                this.$http
                    .post(process.env.API_HOST + "/mall_api/collection/get_collection",parameter)
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            var aa = response.data.data.list
                            this.txtsmg = "上拉加载更多"
                            if (aa.length < this.pageSize && aa.length > 0) {
                                this.txtsmg = "已经加载完毕"
                                this.stop = false
                            }
                            for (var i = 0; i < aa.length; i++) {
                                aa[i]['checked'] = this.flag;
                                this.goodsObj.push(aa[i])
                            }
                        }
                    })
                    .catch(error => {

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
                            this.goodsObj.length = 0
                            this.pageNum = 1
                            this.loadMore()
                            this.dropDown = false
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
            // 管理状态
            administration(){
                if(this.flag==true){
                    this.flag=false
                }else{
                    this.flag=true
                }
            },
            //全选
            chooseAllGoods: function () {
                setTimeout(()=>{
                    var list=this.goodsObj
                    if (this.allChecked==false) {
                        console.log(list)
                        for (var i = 0; i < list.length; i++) {
                            console.log(i)
                            list[i].checked =false;
                        }
                    }else{
                        for (var i = 0; i < list.length; i++) {
                            list[i].checked =true;
                        }
                    }
                },10)
            },
            // 单个选择
            choose: function (index) {
                if (this.goodsObj[index].checked ==false) {
                    this.goodsObj[index].checked = false;
                    this.allChecked = false;
                } else {
                    this.goodsObj[index].checked= true
                }
                this.isChooseAll()
            },
            // 判断是否选择所有商品的全选
            isChooseAll: function () {
                var flag1 = true;
                setTimeout(()=>{
                    for (var i = 0; i < this.goodsObj.length; i++) {
                        console.log(this.goodsObj[i]['checked'])
                        if (this.goodsObj[i]['checked'] == false) {
                            flag1 = false;
                            break;
                        }
                    }
                    flag1 == true ? this.allChecked = true : this.allChecked = false;
                },10)
              
            },
            //删除商品
            deleteData(){
                let list=this.goodsObj
                let idsarr=[];
                for(let i=0;i<list.length;i++){
                    if(list[i].checked==true){
                        idsarr.push(list[i].collectionId)
                    }
                }
              
                let ids=idsarr.toString();
                let parameter={"ids":ids}
                this.$http
                    .post(process.env.API_HOST + "/mall_api/collection/del_by_ids",parameter)
                    .then(response => {
                        console.log(response)
                        if (response.data.code == 0 && response.data.success == true) {
                            this.loadMore()
                            Toast(response.data.msg);                           
                        }
                    })
                    .catch(error => {
                    });
            }
        }
    }
</script>


<style lang="scss" scoped>
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

    ul {
        padding-top: 5px;
        overflow: hidden;
    }

   
    li {
        position: relative;
        width: 50%;
        box-sizing: border-box;
        padding: 5px;
        float: left;
        overflow: hidden;
        font-size: 0.7rem;
        background: #fff;
        text-align: left;
        margin-bottom:5px;
        .txt {
            height: 2rem;
            margin: 5px 0;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
    li:nth-child(odd){
       border-right: 5px #f5f5f5 solid;
    }
    .b2 {
        .TitleTxt {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            font-size: 0.7rem;
        }

        .ShopSize {
            height: 2rem;
            line-height: 2rem;
            color: #cc0000;
            font-size: 0.9rem;
            text-align: left
        }
    }
    .administration{
        flex:1;
        text-align: right;
        padding-right: 10px;
    }
    .mint-checklist-label{
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        padding: 5px;
    }
    .yesBtn{
        background: rgb(243, 203, 10); 
        font-size: 15px; 
        color: rgb(255, 255, 255); 
        position: absolute; 
        bottom: 0px; 
        left: 0px; 
        width: 100%; 
        height: 45px; 
        line-height: 45px; 
        text-align: center; 
        cursor: pointer; 
        display: block;
    }
</style>
<template>
    <div class="rules">
        <Header>
            <a slot="logo" class="administration" @click="administration">管理</a>
        </Header>
        <p class="drop-down" v-if="dropDown">松手刷新数据...</p>
        <div class="bscroll" ref="bscroll" :style="styleObj1">
            <div class="bscroll-container">
                <ul>
                    <li v-for="(item,index) in goodsObj">
                        <div style="height: 40px;line-height: 40px;padding: 0 10px;">
                            <label class="mint-checklist-label" style="align-items: center;display: flex;width:100%;">
                                <span class="mint-checkbox" v-show="flag">
                                    <input type="checkbox" class="mint-checkbox-input" style="cursor:pointer;" name="checkbox"
                                        @click="choose(index)" v-model="item.checked">
                                    <span class="mint-checkbox-core"></span>
                                </span>
                                <span class="mint-checkbox-label">{{item.lookTime.split(" ")[0]}}</span>
                            </label>
                        </div>

                        <div style="display:flex;background:#fff;padding:10px;">
                            <div class="a1" style="margin-right:10px;">
                                <img :src="item.warePic" style="height:5rem;width:5rem;display: block;">
                            </div>
                            <div class="b2" style="flex:1;">
                                <div class="TitleTxt">{{item.wareName}}</div>
                                <div class="ShopSize">￥299</div>
                            </div>
                        </div>
                    </li>
                    <div style="display: flex;justify-content: center;font-size: 14px;color:#666;height: 45px;align-items: center;">
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
    import BScroll from "better-scroll";
    import { Indicator, InfiniteScroll, Spinner, Checklist, Toast, MessageBox } from "mint-ui";
    import { getNowFormatDate } from "../../config/mUtils";
    export default {
        data() {
            return {
                goodsObj: [],
                dropDown: false,
                pageNum: 1,
                pageSize: 20,
                styleObj1: { height: "", width: "100%", overflow: "hidden", "font-size": "40px" },
                txtsmg: "",
                flag: false,
                stop: true
            };
        },
        //获取屏幕高度
        beforeMount(height) {
            var height = 50;
            var h = document.documentElement.clientHeight || document.body.clientHeight;
            this.styleObj1["height"] = h - height + "px";
        },
        components: {
            Header
        },
        mounted() {
            this.$store.commit("changeTitle", "浏览足迹");
            this.scrollFn();
            this.loadMore();
        },
        watch: {
            goodsObj(val) {
                this.scroll.refresh();
            }
        },
        methods: {
            //删除商品
            deleteData() {
                let list = this.goodsObj
                let idsarr = [];
                for (let i = 0; i < list.length; i++) {
                    if (list[i].checked == true) {
                        idsarr.push(list[i].lookId)
                    }
                }
                if(idsarr.length<=0){
                    return false
                }
                let ids = idsarr.toString();
                let parameter = { ids: ids }
                MessageBox.confirm('确定执行此操作?').then(action => {
                    this.$http.post(process.env.API_HOST + "/mall_api/look/dellook_by_ids", parameter)
                        .then(response => {
                            if (response.data.code == 0 && response.data.success == true) {
                                Toast(response.data.msg);
                                this.goodsObj.length = 0
                                this.loadMore()
                            }
                        })
                        .catch(error => {
                        });
                });
            },

            // 单个选择
            choose: function (index) {

            },

            // 管理状态
            administration() {
                if (this.flag == true) {
                    this.flag = false;
                } else {
                    this.flag = true;
                }
            },

            loadMore() {
                let parameter = {
                    userId: this.$store.state.baseUser.userId,
                    time: getNowFormatDate(),
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                };

                this.$http
                    .post(process.env.API_HOST + "/mall_api/look/sel_lookPath", parameter)
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            var aa = response.data.data.list;
                            this.txtsmg = "上拉加载更多";
                            if (aa.length < this.pageSize && aa.length > 0) {
                                this.txtsmg = "已经加载完毕";
                                this.stop = false;
                            }
                            for (var i = 0; i < aa.length; i++) {
                                this.goodsObj.push(aa[i]);
                                aa[i]['checked'] = this.flag;

                            }
                            console.log(this.goodsObj)
                        }
                    })
                    .catch(error => { });
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
                                // pc端同样能滑动
                                speed: 20,
                                invert: false
                            },
                            useTransition: false // 防止iphone微信滑动卡顿
                        });
                    }
                    this.scroll.on("scroll", pos => {
                        //如果下拉超过50px 就显示下拉刷新的文字
                        if (pos.y > 50) {
                            this.dropDown = true;
                        } else {
                            this.dropDown = false;
                        }
                    });
                    //touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
                    this.scroll.on("touchEnd", pos => {
                        if (pos.y > 50) {
                            this.goodsObj.length = 0;
                            this.pageNum = 1;
                            this.loadMore();
                            this.dropDown = false;
                            this.txtsmg = "";
                        }
                        //上拉加载 总高度>下拉的高度+10 触发加载更多
                        if (this.scroll.maxScrollY > pos.y + 10) {
                            if (this.stop == false) {
                                return false;
                            }
                            this.txtsmg = "上拉加载更多";
                            this.pageNum++;
                            this.loadMore();
                        }
                    });
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
    .drop-down {
        position: absolute;
        top: 50px;
        left: 0px;
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 14px;
        color: #666;
    }

    ul {
        padding-top: 5px;
    }

    li {
        margin-bottom: 5px;
        font-size: 14px;
        text-align: left;
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
            text-align: left;
        }
    }

    .administration {
        flex: 1;
        text-align: right;
        padding-right: 10px;
    }

    .yesBtn {
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

    .mint-checklist-label {
        padding: 0;
    }
</style>
<template>
    <div v-show="state">
        <div class="bj-wrap"></div>
        <div class="BgInner">
            <div class="SelectedContent">
                <span style="flex:1;">请选择区域:{{currentPro+"-"+currentCity+"-"+currentArea}}</span>
                <span style="width:45px;text-align: center;" @click="closeModel"><i class="iconfont icon-guanbi" style="font-size: 1rem ;"></i></span>
            </div>
            <div ref="scroll_wrap" style="display:flex;height:100%;flex-direction: row;">
                <div ref="menuFoodList1" :style='styleObj1'>
                    <div class="bscroll-container">
                        <ul style="text-align: left;overflow: scroll;padding-bottom:45px;flex-direction: column" @click="getProvince($event)">
                            <li class="Single" v-for="(item,index) in items" :data-index="index"  :class="{active:index==currentIndex1}">{{item.name}}</li>
                        </ul>
                    </div>
                </div>
                <div ref="menuFoodList2" :style='styleObj1'>
                    <div class="bscroll-container">
                        <ul style="text-align: left;overflow: scroll;padding-bottom:45px;flex-direction: column" @click="getCity($event)">
                            <li class="Single" v-for="(item,index) in citydata" :data-index="index" :class="{active:index==currentIndex2}">{{item.name}}</li>
                        </ul>
                    </div>
                </div>
                <div ref="menuFoodList3" :style='styleObj1'>
                    <div class="bscroll-container">
                        <ul style="text-align: left;overflow: scroll;padding-bottom:45px;flex-direction: column" @click="getArea($event)">
                            <li class="Single" v-for="(item,index) in AreaData" :data-index="index" :class="{active:index==currentIndex3}">{{item.name}}</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    import data from '../config/city.json'
    export default {
        data() {
            return {
                state:false,
                items: data,  //省
                citydata: [], //市
                AreaData:[],  //区
                foodScroll: null,
                styleObj1: { "height": "100%", "width": "33.33%", "overflow": "hidden", 'font-size': '14px', },
                currentIndex1:0,
                currentIndex2:0,
                currentIndex3:0,
                currentPro:'', 
                currentCity:'',
                currentArea:'',

            }
        },
        mounted() {
            console.log(data)

        },
        watch: {
            starModel(val, old) {
                this.$nextTick(function () {
                    const listContainer1 = this.$refs.menuFoodList1;
                    const listContainer2 = this.$refs.menuFoodList2;
                    const listContainer3 = this.$refs.menuFoodList3;
                    this.listenScroll(listContainer1)
                    this.listenScroll(listContainer2)
                    this.listenScroll(listContainer3)
                })
            },
            // 城市数据
            citydata(val, old) {
                this.$nextTick(function () {
                    const listContainer1 = this.$refs.menuFoodList1;
                    const listContainer2 = this.$refs.menuFoodList2;
                    const listContainer3 = this.$refs.menuFoodList3;
                    this.listenScroll(listContainer1)
                    this.listenScroll(listContainer2)
                    this.listenScroll(listContainer3)
                })
            },
        },
        methods: {
            startModel(){
                this.state=true
            },
            closeModel(){
                this.state=false      
            },
            listenScroll(element) {
                this.foodScroll = new BScroll(element, {
                    swipeTime: 2000,
                    scrollY: true,
                    click: true,
                    probeType: 2,
                    pullUpLoad: {
                        threshold: 10
                    },
                    mouseWheel: {
                        speed: 20,
                        invert: false
                    },
                    useTransition: false
                });
            },
            
            getProvince(e) {
                let index = e.target.dataset.index
                this.citydata = this.items[index].sub
                this.currentIndex1=index
                this.AreaData=[]
                this.currentIndex2=0
                this.currentPro=e.target.innerText
                
            },
            getCity(e){
                let index = e.target.dataset.index
                this.currentIndex2=index;
                this.AreaData=this.citydata[index].sub
                this.currentIndex3=0
                this.currentCity=e.target.innerText
            },
            getArea(e){
                let index = e.target.dataset.index
                this.currentIndex3=index;
                this.currentArea=e.target.innerText
                this.closeModel()
                this.$emit("listenToChildEvent",this.currentPro+"-"+this.currentCity+"-"+this.currentArea)
            },
           
        }
    };
</script>
<style lang="scss" scoped>
    .bj-wrap {
        width: 100%;
        height: 100%;
        z-index: 998;
        position: fixed;
        bottom: 0;
        left: 0;
        display: block;
        background-color: rgba(0, 0, 0, .7);
        overflow: hidden;
    }

    .BgInner {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 60%;
        background: #fff;
        z-index: 10601;
        font-size: 14px;
        display: block;
        text-align: left;
        overflow: hidden;
        animation: myfirst 0.3s;
        -moz-animation: myfirst 0.3s;
        /* Firefox */
        -webkit-animation: myfirst 0.3s;
        /* Safari 和 Chrome */
        -o-animation: myfirst 0.3s;
        /* Opera */
    }

    .SelectedContent {
        background: #F3CB0A;
        display: flex;
        height: 45px;
        line-height: 45px;
        padding-left:10px;
        color: #fff;
        font-size: 0.7rem;
        cursor: pointer;
    }

    ul {
        display: flex;
        cursor: pointer;
        width: 100%;
        height: 100%;

        .Single {
            height: 45px;
            line-height: 45px;
            font-size: 0.7rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            padding: 0 10px;
        }
    }
    .active{
        color: #F3CB0A;
    }
    @keyframes myfirst {
        from {
            height: 0%;
        }

        to {
            height: 60%;
        }
    }

    /* Firefox */
    @-moz-keyframes myfirst {
        from {
            height: 0%;
        }

        to {
            height: 60%;
        }
    }

    /* Safari 和 Chrome */
    @-webkit-keyframes myfirst {
        from {
            height: 0%;
        }

        to {
            height: 60%;
        }
    }

    /* Opera */
    @-o-keyframes myfirst {
        from {
            height: 0%;
        }

        to {
            height: 60%;
        }
    }
</style>
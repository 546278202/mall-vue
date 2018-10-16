<template>
    <section>
        <div der="" class="naver">
            <li v-for="(item, index) in items" :key="index"  @click="selectTimer(index)"
                :class="timeIndex === index ? 'default default-active' : 'default' ">
                {{item.name}}
            </li>
        </div>
    </section>
</template>
<script>
export default {
    data () {
        return {
            timeIndex: 0,
            items: [
                {name: '首页'},
                {name: '列表'},
                {name: '购物车'},
                {name: '我的'},
            ],
           
        }
    },
    mounted(){
    
    },
    methods: {
        selectTimer(index) {
            this.timeIndex = index;
        },

    },

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
        
    }
    .naver{
        display: flex;
        height: 50px;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        border-top: 1px solid #ccc;
        background: #fff;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        li{
            flex:1;
            font-size: 14px;
        };
    }
    .default{
        color: #404040;
    }
    .default-active{
        color: #f5d53b;
    }
</style>

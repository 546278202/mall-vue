<template>
    <div class="nav-box">
        <li class="nav-item"
            v-for="(item, index) in nav"
            @click="routerLink(index, item.path)"
            :key="index">
        <!-- 判断高亮表 -->
        <p :class=" navIndex === index ? 'item-cn item-cn-active' : 'item-cn'">
            {{ item.title }}
        </p>
        <!-- 判断高亮表 -->
        <p :class="navIndex === index ? 'item-en item-en-active' : 'item-en'">
            {{ item.en }}
        </p>
        </li>
    </div>
</template>
<script>
export default {
    data () {
        return {
            nav: [
                {title: '首页', en: 'Code', path: '/home'},
                {title: '分类', en: 'Source', path: '/productList'},
                {title: '购物车', en: 'About', path: '/buyCar'},
                {title: '我的', en: 'About', path: '/mine'},
            ],
            navIndex: 0,   
        }
    },
    mounted(){
    
    },
    methods: {
        routerLink(index, path) {
        // 点击哪个路由就赋值给自定义的下下标
        this.navIndex = index;
        // 路由跳转
        this.$router.push(path)
        },

        checkRouterLocal(path) {
        // 查找当前路由下标高亮
        this.navIndex = this.nav.findIndex(item => item.path === path);
        }

    },
    watch: {
        "$route"() {
            let path = this.$route.path;
            // 检索当前路径
            this.checkRouterLocal(path);
        }
    },

}
</script>
<style lang="scss" scoped>
.nav-box {
    display: flex;
    width:100%;
    position: fixed;
    bottom: 0;
    background: #fff;
    border-top:1px solid #eee; 
}

.nav-item {
  text-align: center;
  position: relative;
  display: inline-block;
  font-size: 14px;
  line-height: 25px;
  flex:1;
}

/*导航普通状态*/
.item-cn {
  color: #1c2438;
  font-weight: 800;
}

/*导航普通状态*/
.item-en {
  color: #666;
  font-size: 12px;
}

/*导航高亮*/
.item-cn-active {
  color: #2d8cf0;
}

/*导航高亮*/
.item-en-active {
  color: #5cadff;
}

.nav-item:hover .item-cn {
  color: #2d8cf0;
}

.nav-item:hover .item-en {
  color: #5cadff;
}
</style>

<template>
    <div class="nav-box">
        <a v-for="(item,index) in items" :key="index" @click="routerLink(item)" :class="{ act : active == item.path} ">
            <div><i class="iconfont" :class="item.icon"></i> </div>
            <div>{{item.text}}</div>
            <span class="cart-num" v-if="item.active==2 && CarNum>0">{{CarNum}}</span>
        </a>
    </div>
</template>
<script>
    import router from '../router'
    export default {
        data() {
            return {
                active: '/home',
                items: [
                    { path: "/home", text: "首页", icon: "icon-shouye1", active: 0 },
                    { path: "/productList", text: "分类", icon: "icon-classify_icon", active: 1 },
                    { path: "/buyCar", text: "购物车", icon: "icon-gouwuche", active: 2 },
                    { path: "/mine", text: "我的", icon: "icon-wode", active: 3 }
                ],
                CarNum: ""//购物车数量
            };
        },
        mounted() {
            if (window.location.hash.split('?')[0].split('#')[1] == '/') {
                this.active = '/home';
            } else {
                this.active = window.location.hash.split('?')[0].split('#')[1];
            }
            if (this.$store.state.baseUser) {
                this.getCarNum()
            }
        },
        methods: {
            routerLink(item) {
                this.$router.push(item.path);
                if (item.active == 2) return false;
                this.active = item.path;
            },
            //获取购物车数量
            getCarNum() {
                let parameter = {
                    userId: this.$store.state.baseUser.userId,
                }
                this.$http
                    .post(process.env.API_HOST + "/mall_api/cart/select_cart_count", parameter)
                    .then(response => {
                        if (response.data.code == 0 && response.data.success == true) {
                            this.CarNum = response.data.data
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
        }
    };
</script>
<style lang="scss" scoped>
    .nav-box {
        height: 2.25rem;
        display: flex;
        align-items: center;
        width: 100%;
        position: fixed;
        bottom: 0;
        background: #fff;
        border-top: 0.05rem solid #eee;
        font-size: 0.6rem;
        a {
            flex: 1;
            text-align: center;
        }
    }

    .act {
        color: #f5d53b !important;
    }

    .cart-num {
        position: absolute;
        top: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        font-size: 10px;
        font-weight: 500 !important;
        text-align: center;
        color: #fff;
        background-color: #f23030;
        width: 16px;
        height: 16px;
        line-height: 16px;
        border-radius: 8px;
        overflow: hidden;
    }
</style>
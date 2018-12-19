import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home/home'
import productList from '@/page/productList/productList'
import mine from '@/page/mine/mine'
import login from '@/page/login/login'
import search from '@/page/search/search'
import detail from '@/page/detail/detail'
import buyCar from '@/page/buyCar/buyCar'
import getSum from '@/page/buyCar/getSum'
Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/home',
            name: 'home',
            component: home
        },
        {
            path: '/productList',
            name: 'productList',
            component: productList
        },
        {
            path: '/buyCar',
            name: 'buyCar',
            component: buyCar,
            meta:{
                requireAuth:true //需要登陆
            },
        }, 
        {
            path: '/getSUm',
            name: 'getSUm',
            component: getSum,
            meta:{
                requireAuth:true 
            },
            
        }, 
        {
            path: '/mine',
            name: 'mine',
            component: mine
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        //搜索页
        {
            path: '/search',
            name: 'search',
            component: search
        },
        //详情页
        {
            path: '/detail',
            name: 'detail',
            component: detail
        },
  
    ]
})

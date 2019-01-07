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
import nowbuy from '@/page/buyCar/nowbuy'
import order from '@/page/order/order'

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
            meta:{auth:true} // 设置当前路由需要校验  不需要校验的路由就不用写了
        },
        {
            path: '/getSUm',
            name: 'getSUm',
            component: getSum,
            meta:{auth:true} 
            
        }, 
        {
            path: '/nowbuy',
            name: 'nowbuy',
            component: nowbuy,
            meta:{auth:true} 
            
        }, 
      
        {
            path: '/mine',
            name: 'mine',
            component: mine,
            meta:{auth:true}
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
        //订单
        {
            path: '/order',
            name: 'order',
            component: order
        },
  
    ]
})


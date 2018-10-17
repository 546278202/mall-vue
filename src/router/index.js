import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home/home'
import productList from '@/page/productList/productList'
import buyCart from '@/page/buyCart/buyCart'
import mine from '@/page/mine/mine'
import login from '@/page/login/login'


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
            path: '/buyCart',
            name: 'buyCart',
            component: buyCart
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
  
    ]
})

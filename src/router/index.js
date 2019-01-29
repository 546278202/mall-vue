import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home/home'
import productList from '@/page/productList/productList'
import mine from '@/page/mine/mine'
import login from '@/page/login/login'
import register from '@/page/login/register'
import password from '@/page/login/password'
import search from '@/page/search/search'
import detail from '@/page/detail/detail'
import buyCar from '@/page/buyCar/buyCar'
import getSum from '@/page/buyCar/getSum'
import nowbuy from '@/page/buyCar/nowbuy'
import order from '@/page/order/order'
import orderDetail from '@/page/order/children/orderDetail'
import afterSaleList from '@/page/saleService/afterSaleList'
import afterSaleDetail from '@/page/saleService/afterSaleDetail'
import collection from '@/page/collection/collection'
import record from '@/page/collection/record'
import discuss from '@/page/discuss/discuss'
import setpage from '@/page/setpage/setpage'
import list from '@/page/address/list'
import addpage from '@/page/address/addpage'
import editpage from '@/page/address/editpage'
import faPiao from '@/page/faPiao/faPiao'
import editFaPiao from '@/page/faPiao/editFaPiao'




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
            meta: { auth: true } // 设置当前路由需要校验  不需要校验的路由就不用写了
        },
        {
            path: '/getSUm',
            name: 'getSUm',
            component: getSum,
            meta: { auth: true }

        },
        {
            path: '/nowbuy',
            name: 'nowbuy',
            component: nowbuy,
            meta: { auth: true }

        },

        {
            path: '/mine',
            name: 'mine',
            component: mine,
            meta: { auth: true }
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/password',
            name: 'password',
            component: password
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
            component: order,
        },
        //订单详情页
        {
            path: '/order/orderDetail',
            name: 'orderDetail',
            component: orderDetail

        },
        //售后服务
        {
            path: '/afterSaleList',
            name: 'afterSaleList',
            component: afterSaleList
        },
        //售后服务
        {
            path: '/afterSaleDetail',
            name: 'afterSaleDetail',
            component: afterSaleDetail
        },
        // 商品收藏
        {
            path: '/collection',
            name: 'collection',
            component: collection
        },
        //浏览记录
        {
            path: '/record',
            name: 'record',
            component: record
        },
        //评论列表
        {
            path: '/discuss',
            name: 'discuss',
            component: discuss
        },
        //设置页面
        {
            path: '/setpage',
            name: 'setpage',
            component: setpage
        },
        //地址列表
        {
            path: '/list',
            name: 'list',
            component: list
        },
        //添加地址
        {
            path: '/addpage',
            name: 'addpage',
            component: addpage
        },
        //编辑地址
        {
            path: '/editpage',
            name: 'editpage',
            component: editpage
        },
        //添加发票
        {
            path: '/faPiao',
            name: 'faPiao',
            component: faPiao
        },
        //编辑发票
        {
            path: '/editFaPiao',
            name: 'editFaPiao',
            component: editFaPiao
        },
    ]
})


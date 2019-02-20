import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home/home'
import productList from '@/page/productList/productList'
import mine from '@/page/mine/mine'
import login from '@/page/login/login'
import quickLogin from '@/page/login/quickLogin'
import forget1 from '@/page/login/forget1'
import forget2 from '@/page/login/forget2'
import register from '@/page/login/register'
import password from '@/page/login/password'
import search from '@/page/search/search'
import detail from '@/page/detail/detail'
import buyCar from '@/page/buyCar/buyCar'
import getSum from '@/page/buyCar/getSum'
import order from '@/page/order/order'
import orderDetail from '@/page/order/children/orderDetail'
import afterSaleList from '@/page/saleService/afterSaleList'
import afterSaleDetail from '@/page/saleService/afterSaleDetail'
import collection from '@/page/collection/collection'
import record from '@/page/collection/record'
import discuss from '@/page/discuss/discuss'
import setpage from '@/page/setpage/setpage'
import setpassword from '@/page/setpage/setpassword'
import information from '@/page/information/information'
import setname from '@/page/information/setname'
import setphone from '@/page/information/setphone'
import list from '@/page/address/list'
import addpage from '@/page/address/addpage'
import editpage from '@/page/address/editpage'
import faPiao from '@/page/faPiao/faPiao'
import editFaPiao from '@/page/faPiao/editFaPiao'
import mall from '@/page/mall/mall'

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
        // 我的页面
        {
            path: '/mine',
            name: 'mine',
            component: mine,
            meta: { auth: true }
        },
        // 登陆页面
        {
            path: '/login',
            name: 'login',
            component: login
        },
        // 快捷登陆
        {
            path: '/quickLogin',
            name: 'quickLogin',
            component: quickLogin
        },
        // 忘记密码1
        {
            path: '/forget1',
            name: 'forget1',
            component: forget1
        },
        // 忘记密码2
        {
            path: '/forget2',
            name: 'forget2',
            component: forget2
        },
        // 注册页面
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
        //搜索页面
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
        //设置密码
        {
            path: '/setpassword',
            name: 'setpassword',
            component: setpassword
        },
        //个人资料
        {
            path: '/information',
            name: 'information',
            component: information,
        },
        //修改用户
        {
            path: '/information/setname',
            name: 'setname',
            component: setname
        },
        //修改手机
        {
            path: '/information/setphone',
            name: 'setphone',
            component: setphone
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
        //店铺商品
        {
            path: '/mall',
            name: 'mall',
            component: mall
        },
    ]
})


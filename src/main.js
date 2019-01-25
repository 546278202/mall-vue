import Vue from 'vue'
import store from './store/store'
import App from './App'
import router from './router'
import './config/rem'
/*引入公共样式*/
import './style/common.css'
import 'swiper/dist/css/swiper.css'
Vue.config.productionTip = false

// MintUI
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
import axios from 'axios'
import qs from 'qs'
import { Indicator } from 'mint-ui'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
	if (config.method == 'post') {
		config.data = qs.stringify(config.data);
	}
	if (config.method == 'get') {

	}
	config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	Indicator.open('加载中...')
	return config
}), function (error) {
	Indicator.close()
	return Promise.reject(error)
}
axios.interceptors.response.use(function (config) {
	Indicator.close()
	return config
}), function (error) {
	Indicator.close()
	return Promise.reject(error)
}


router.beforeEach((to, from, next) => {
	if (to.matched.some(m => m.meta.auth)) {
		// console.log(store.state.baseUser)
		// 对路由进行验证     
		if (store.state.baseUser != null) {   
			next()   // 正常跳转  
		}
		else {
			// 未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；
			next({ path: '/login', query: { Rurl: to.fullPath } })
		}
	} else {
		next()
	}
})
Vue.prototype.$http = axios
new Vue({
	el: '#app',
	store,
	router,
	components: { App },
	template: '<App/>'
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store/store'
import App from './App'
import router from './router'

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

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
	if (config.method != 'get') {
		config.data = qs.stringify(config.data);
	}
	config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	let token = window.sessionStorage.getItem("TOKEN");
	if (token) {
		config.headers.common['Authorization'] = "Bearer " + token;
	}
	return config;
}, function (error) {
	return Promise.reject(error)
})

Vue.prototype.$http = axios
new Vue({
	el: '#app',
	store,
	router,
	components: { App },
	template: '<App/>'
})

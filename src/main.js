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
  if(config.method!='get'){
      config.data=qs.stringify(config.data);
  }
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  let token = window.sessionStorage.getItem("TOKEN");
  if(token) {
      config.headers.common['Authorization'] = "Bearer " + token;
  }

  return config;
},function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // if(error.response&&error.response.data.errcode==500){
  //     ElementUI.Message({
  //         type:'warning',
  //         message:"身份过期，请重新登录",
  //         onClose:function(){
  //             sessionStorage.removeItem('TOKEN')
  //             router.push('/login')
  //         }
  //     });
  // }
  // 对响应错误做点什么
  return Promise.reject(error);
});

// 获取当前时间，格式YYYY-MM-DD
Vue.prototype.getNowFormatDate = function() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
};


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

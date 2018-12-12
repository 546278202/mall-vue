import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		loginInfo: "0",//当前用户简要信息
	},
	mutations: {
		increment (state) {

		}
	}
})
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//定义vuex
const  store= new Vuex.Store({
   
    state:{
        baseUser:JSON.parse(sessionStorage.getItem("baseUser")),
        title:null,
        k:0
    },
    mutations:{
        changeLogin(state,data){
            state.baseUser=JSON.parse(data)
        },
        changeTitle(state,msg){
			state.title=msg
		},
		k(state,msg){
			state.k=msg
		},
    }
})
export default store

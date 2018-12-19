import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//定义vuex
const  store= new Vuex.Store({
   
    state:{
        baseUser:JSON.parse(sessionStorage.getItem("baseUser")),
        title:null,
    },
    mutations:{
        changeTitle(state,msg){
			state.title=msg
		},
		
    }
})
export default store

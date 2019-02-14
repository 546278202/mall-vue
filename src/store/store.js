import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//定义vuex
const  store= new Vuex.Store({
   
    state:{
        baseUser:JSON.parse(sessionStorage.getItem("baseUser")),
        title:null,
        searchModel:0,
        // seachModeState:false//搜索框
    },
    mutations:{
        changeLogin(state,data){
            state.baseUser=JSON.parse(data)
        },
        changeTitle(state,msg){
			state.title=msg
        },

		getsearchModel(state,msg){
			state.searchModel=msg
        },
        // changeSeachModeState(state,data){state.seachModeState=data},
    }
})
export default store

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
    state:{//存放状态
		isLogin:false
    },
	mutations:{
		setLogin(state){
			state.isLogin = !state.isLogin
		}
	}
})
export default store
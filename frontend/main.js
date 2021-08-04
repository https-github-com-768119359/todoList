import Vue from 'vue'
import App from './App'
import store from './store'
import uView from './uview-ui'


import {request} from './utils/api.js'
import {imgRequest} from './utils/imgApi.js'

Vue.config.productionTip = false

Vue.prototype.$request = request
Vue.prototype.$imgRequest = imgRequest
Vue.prototype.$store = store

Vue.use(uView)

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()

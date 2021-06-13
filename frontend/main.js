import Vue from 'vue'
import App from './App'
import store from './store'

import {request} from './utils/api.js'

Vue.config.productionTip = false

Vue.prototype.$request = request
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import filter from '@/common/filters.js';

import util from '@/common/utils'
Vue.prototype.$util = util

// 引入全局uView
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/uview.interface.js'
Vue.use(httpInterceptor, app)

app.$mount()

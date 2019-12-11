import Vue from 'vue'
import App from './App.vue'
import router from './utils/router'
import store from './utils/store'
import { getApi } from './utils/api/api'
import './utils/fontawedome'
import './registerServiceWorker'

Vue.config.productionTip = false

// const api = getApi('ws://localhost:13034')

const api = getApi()

new Vue({
	router,
	store,
	api,
	render: h => h(App)
}).$mount('#app')

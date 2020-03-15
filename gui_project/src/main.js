import Vue from "vue";
import App from "./App.vue";
import router from "./utils/router";
import { getStore } from "./utils/store/store";
import { RemoteDataSource } from "./utils/api/remote.datasource";
import "./utils/fontawedome";
import "./registerServiceWorker";

Vue.config.productionTip = false;

const dataSource = new RemoteDataSource();
const store = getStore(dataSource);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");

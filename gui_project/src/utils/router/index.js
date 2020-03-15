import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../../views/home/home.view.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "home",
		component: Home
	},
	{
		path: "/tester",
		name: "tester",
		component: () => import("@/views/tester/tester.view.vue")
	},
	{
		path: "/annotation",
		component: () => import("@/views/annotations/annotations.view.vue"),
		name: "annotations"
	},
	{
		path: "/training",
		name: "training",
		component: () => import("../../views/training/training.view.vue")
	}
];

const router = new VueRouter({
	routes
});

export default router;

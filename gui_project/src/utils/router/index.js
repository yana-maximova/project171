import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/tester',
		name: 'tester',
		component: () => import('@/views/Tester.vue')
	},
	{
		path: '/annotation',
		component: () => import('@/views/Annotation.vue'),
		children: [
			{
				path: '',
				name: 'annotationLetters',
				component: () => import('@/components/Annotations/AnnotationBlocks.vue')
			}
		]
	},
	{
		path: '/training',
		name: 'training',
		component: () => import('../../views/Training.vue')
	}
]

const router = new VueRouter({
	routes
})

export default router

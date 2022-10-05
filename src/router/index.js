import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'


Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Login',
		component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
	},
	// {
	// 	path: '/about',
	// 	name: 'About',
	// 	// route level code-splitting
	// 	// this generates a separate chunk (about.[hash].js) for this route
	// 	// which is lazy-loaded when the route is visited.
	// 	component: () => import(/* webpackChunkName: "about" */ '../views/TextImg.vue')
	// },
	{
		path: '/text-img',
		name: 'TextImg',
		component: () => import(/* webpackChunkName: "about" */ '../views/TextImg.vue')
	},
	{
		path: '/img-text',
		name: 'ImgText',
		component: () => import(/* webpackChunkName: "about" */ '../views/ImgText.vue')
	},
	{
		path: '/data-preview',
		name: 'DataPreview',
		component: () => import(/* webpackChunkName: "about" */ '../views/DataPreview.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
	// console.log('已开启路由守卫');
	if (to.path !== '/' && to.path !== '/data-preview') { // 判断该路由是否需要登录权限
		// console.log(to, store.state)
		if(store.state.user.userName !== ''){ //判断本地是否存在access_token
			next();
		}else {
			// this.$bvToast.toast(`请登录后访问该页面！`, {
			// 	title: '警告',
			// 	autoHideDelay: 3000,
			// 	appendToast: false,
			// 	variant: 'danger'
			// })

			next({
				path:'/'
			})

			alert('请登录后访问该页面!')

			// this.$bvToast.toast(`请登录后访问该页面！`, {
			// 	title: '警告',
			// 	autoHideDelay: 3000,
			// 	appendToast: false,
			// 	variant: 'danger'
			// })
		}
	}
	else {
		next();
	}
});

export default router

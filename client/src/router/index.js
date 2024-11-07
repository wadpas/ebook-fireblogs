import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Books from '../views/Books.vue'
import Login from '../views/Login.vue'
import Register from '@/views/Register.vue'
import Forgot from '@/views/Forgot.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			meta: {
				title: 'Головна',
			},
		},
		{
			path: '/about',
			name: 'about',
			component: About,
			meta: {
				title: 'Про нас',
			},
		},
		{
			path: '/books',
			name: 'books',
			component: Books,
			meta: {
				title: 'Книги',
			},
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: {
				title: 'Вхід',
			},
		},
		{
			path: '/register',
			name: 'register',
			component: Register,
			meta: {
				title: 'Реєстрація',
			},
		},
		{
			path: '/forgot',
			name: 'forgot',
			component: Forgot,
			meta: {
				title: 'Відновлення паролю',
			},
		},
	],
})

router.beforeEach((to, from, next) => {
	document.title = `${to.meta.title} | Тутbook`
	next()
})

export default router

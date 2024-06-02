import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ThreadView from '../views/ThreadView.vue'
import ForumView from '../views/ForumView.vue'
import NotFound from '../views/NotFoundView.vue'
import ProfileView from '../views/ProfileView.vue'
import sourceData from '../data.json'

const routes = [
	{
		path: '/',
		name: 'HomeView',
		component: HomeView,
	},
	{
		path: '/me',
		name: 'ProfileView',
		component: ProfileView,
	},
	{
		path: '/forums/:id',
		name: 'ForumView',
		component: ForumView,
		props: true,
	},
	{
		path: '/threads/:id',
		name: 'ThreadView',
		component: ThreadView,
		props: true,
		beforeEnter(to, from, next) {
			const threadExists = sourceData.threads.find((thread) => thread.id === to.params.id)
			if (threadExists) {
				next()
			} else {
				next({
					name: 'NotFound',
					params: { pathMatch: to.path.substring(1).split('/') },
					query: to.query,
					hash: to.hash,
				})
			}
		},
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: NotFound,
	},
]

const router = createRouter({ history: createWebHistory(), routes })

export default router

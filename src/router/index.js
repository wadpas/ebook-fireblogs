import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ThreadView from '../views/ThreadView.vue'
import ThreadCreate from '../views/ThreadCreate.vue'
import ThreadEdit from '../views/ThreadEdit.vue'
import ForumView from '../views/ForumView.vue'
import NotFound from '../views/NotFoundView.vue'
import ProfileView from '../views/ProfileView.vue'
import RegisterView from '../views/RegisterView.vue'
import SingInView from '../views/SingInView.vue'
import store from '../store/index'

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
		meta: { toTop: true, smoothScroll: true, requestAuth: true },
	},
	{
		path: '/me/edit',
		name: 'ProfileEditView',
		component: ProfileView,
		meta: { requestAuth: true },
		props: { edit: true },
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
	},
	{
		path: '/forums/:forumId/threads/create',
		name: 'ThreadCreate',
		component: ThreadCreate,
		props: true,
		meta: { requestAuth: true },
	},
	{
		path: '/threads/:id/edit',
		name: 'ThreadEdit',
		component: ThreadEdit,
		props: true,
		meta: { requestAuth: true },
	},
	{
		path: '/register',
		name: 'RegisterView',
		component: RegisterView,
		meta: { requiresGest: true },
	},
	{
		path: '/signin',
		name: 'SingInView',
		component: SingInView,
		meta: { requiresGest: true },
	},
	{
		path: '/logout',
		name: 'SignOut',
		async beforeEnter(to, from) {
			await store.dispatch('signOut')
			return { name: 'HomeView' }
		},
	},
	{
		path: '/:pathMatch(.*)*',
		component: NotFound,
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(to) {
		const scroll = {}
		if (to.meta?.toTop) scroll.top = 0
		if (to.meta?.smoothScroll) scroll.behavior = 'smooth'
		return scroll
	},
})

router.beforeEach(async (to, from) => {
	await store.dispatch('initAuthentication')
	store.dispatch('unsubscribeSnapshots')
	if (to.meta.requestAuth && !store.state.authId) {
		return { name: 'SingInView' }
	}
	if (to.meta.requiresGest && store.state.authId) {
		return { name: 'HomeView' }
	}
})

export default router

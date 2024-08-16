import { createStore } from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import categories from './modules/categories'
import forums from './modules/forums'
import threads from './modules/threads'
import posts from './modules/posts'
import users from './modules/users'
import auth from './modules/auth'

export default createStore({
	modules: {
		categories,
		forums,
		threads,
		posts,
		users,
		auth,
	},
	state: {
		categories: [],
		forums: [],
		threads: [],
		posts: [],
		users: [],
		// authId: 'jUjmgCurRRdzayqbRMO7aTG9X1G2',
		authId: null,
		unsubscribes: [],
		authUserUnsubscribe: null,
		authObserverUnsubscribe: null,
	},
	getters,
	mutations,
	actions,
})

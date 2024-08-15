import { createStore } from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default createStore({
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

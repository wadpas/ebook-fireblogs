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
		authId: 'NnooaWj4KHVxbhKwO1pEdfaQDsD2',
		unsubscribes: [],
	},
	getters,
	mutations,
	actions,
})

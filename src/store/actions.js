import firebase from 'firebase'

export default {
	fetchItem({ state, commit }, { id, resource, handleUnsubscribe = null }) {
		return new Promise((resolve) => {
			const unsubscribe = firebase
				.firestore()
				.collection(resource)
				.doc(id)
				.onSnapshot((doc) => {
					const item = { ...doc.data(), id: doc.id }
					commit('setItem', { resource, item })
					resolve(item)
				})
			if (handleUnsubscribe) {
				handleUnsubscribe(unsubscribe)
			} else {
				commit('appendUnsubscribe', { unsubscribe })
			}
		})
	},

	fetchItems({ dispatch }, { ids, resource }) {
		return Promise.all(ids.map((id) => dispatch('fetchItem', { resource, id })))
	},

	async unsubscribeSnapshots({ state, commit }) {
		state.unsubscribes.forEach((unsubscribe) => unsubscribe())
		commit('clearUnsubscribes')
	},
}

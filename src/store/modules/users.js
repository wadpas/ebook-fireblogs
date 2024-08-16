import firebase from 'firebase'
import { findById, upsert, docToResource, makeAppendChildToParentMutation } from '../../helpers'

export default {
	namespaced: true,
	state: {
		items: [],
	},
	getters: {
		user: (state, getters, rootState) => {
			return (id) => {
				const user = findById(state.items, id)
				if (!user) return null
				return {
					...user,
					get posts() {
						return rootState.posts.items.filter((post) => post.userId === user.id)
					},
					get postsCount() {
						return user.postsCount || 0
					},
					get threads() {
						return rootState.threads.items.filter((post) => post.userId === user.id)
					},
					get threadIds() {
						return user.threads
					},
					get threadsCount() {
						return user.threads?.length || 0
					},
				}
			}
		},
	},
	actions: {
		async createUser({ commit }, { id, email, name, username, avatar }) {
			const registeredAt = firebase.firestore.FieldValue.serverTimestamp()
			const usernameLower = username.toLowerCase()
			email = email.toLowerCase()
			const user = { email, name, username, usernameLower, avatar, registeredAt }
			const userRef = await firebase.firestore().collection('users').doc(id)
			userRef.set(user)
			const newUser = await userRef.get()
			commit('setItem', { resource: 'users', item: newUser }, { root: true })
			return docToResource(newUser)
		},

		async updateUser({ commit }, user) {
			const updates = {
				avatar: user.avatar || null,
				username: user.username || null,
				name: user.name || null,
				bio: user.bio || null,
				website: user.website || null,
				email: user.email || null,
				location: user.location || null,
			}
			const userRef = firebase.firestore().collection('users').doc(user.id)
			await userRef.update(updates)
			commit('setItem', { resource: 'users', item: user }, { root: true })
		},
		fetchUser: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'users', id }, { root: true }),
		fetchUsers: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'users', ids }, { root: true }),
	},
	mutations: {
		appendThreadToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' }),
	},
}

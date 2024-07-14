import { createStore } from 'vuex'
import { upsert } from '../helpers'
import firebase from 'firebase'

export default createStore({
	state: {
		categories: [],
		forums: [],
		threads: [],
		posts: [],
		users: [],
		authId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2',
	},

	getters: {
		authUser: (state, getters) => {
			return getters.user(state.authId)
		},
		user: (state) => {
			return (id) => {
				const user = state.users.find((item) => item.id === id)
				if (!user) return null
				return {
					...user,
					get posts() {
						return state.posts.filter((post) => post.userId === user.id)
					},
					get postsCount() {
						return this.posts.length
					},
					get threads() {
						return state.threads.filter((thread) => thread.userId === user.id)
					},
					get threadsCount() {
						return this.threads.length
					},
				}
			}
		},
		thread: (state) => {
			return (id) => {
				const thread = state.threads.find((item) => item.id === id)
				return {
					...thread,
					get author() {
						return state.users.find((item) => item.id === thread.userId)
					},
					get repliesCount() {
						return thread?.posts.length - 1
					},
					get contributorsCount() {
						return thread?.contributors.length
					},
				}
			}
		},
	},

	actions: {
		createPost({ commit, state }, post) {
			post.id = 'post' + Math.random()
			post.userId = state.authId
			post.publishedAt = Math.floor(Date.now() / 1000)

			commit('setItem', { resource: 'users', item: post })
			commit('appendPostToThread', { parentId: post.threadId, childId: post.id })
			commit('appendContributorToThread', { parentId: post.threadId, childId: state.authId })
		},

		async createThread({ commit, state }, { title, forumId }) {
			const id = 'thread' + Math.random()
			const userId = state.authId
			const publishedAt = Math.floor(Date.now() / 1000)
			const thread = { forumId, title, publishedAt, userId, id }
			commit('setItem', { resource: 'threads', item: thread })
			commit('appendThreadToForum', { parentId: forumId, childId: id })
			commit('appendThreadToUser', { parentId: userId, threadId: id })
			return findById(state.threads, id)
		},

		async updateThread({ commit, state }, { title, text, id }) {
			const thread = findById(state.threads, id)
			const post = findById(state.posts, thread.posts[0])
			const newThread = { ...thread, title }
			const newPost = { ...post, text }
			commit('setItem', { resource: 'threads', item: newThread })
			commit('setItem', { resource: 'users', item: newPost })
			return newThread
		},

		updateUser({ commit }, user) {
			commit('setItem', { resource: 'users', item: user.id })
		},

		fetchThread({ dispatch }, { id }) {
			return dispatch('fetchItem', { resource: 'threads', id })
		},

		fetchUser({ dispatch }, { id }) {
			return dispatch('fetchItem', { resource: 'users', id })
		},

		fetchPost({ dispatch }, { id }) {
			return dispatch('fetchItem', { resource: 'posts', id })
		},

		fetchThreads({ dispatch }, { ids }) {
			return dispatch('fetchItems', { resource: 'threads', ids })
		},

		fetchUsers({ dispatch }, { ids }) {
			return dispatch('fetchItems', { resource: 'users', ids })
		},

		fetchPosts({ dispatch }, { ids }) {
			return dispatch('fetchItems', { resource: 'posts', ids })
		},

		fetchItem({ state, commit }, { id, resource }) {
			return new Promise((resolve) => {
				firebase
					.firestore()
					.collection(resource)
					.doc(id)
					.onSnapshot((doc) => {
						const item = { ...doc.data(), id: doc.id }
						commit('setItem', { resource, item })
						resolve(item)
					})
			})
		},

		fetchItems({ dispatch }, { ids, resource }) {
			return Promise.all(ids.map((id) => dispatch('fetchItem', { resource, id }))).catch((error) => {
				console.log(error)
			})
		},
	},

	mutations: {
		setItem(state, { resource, item }) {
			upsert(state[resource], item)
		},

		appendPostToThread: appendMutation({ parent: 'threads', child: 'posts' }),
		appendThreadToForum: appendMutation({ parent: 'forums', child: 'threads' }),
		appendThreadToUser: appendMutation({ parent: 'users', child: 'threads' }),
		appendContributorToThread: appendMutation({ parent: 'threads', child: 'contributors' }),
	},
})

function appendMutation({ parent, child }) {
	return (state, { parentId, childId }) => {
		const resource = findById(state[parent], parentId)
		resource[child] = resource[child] || []
		if (resource[child].includes(childId)) return
		resource[child].push(childId)
	}
}

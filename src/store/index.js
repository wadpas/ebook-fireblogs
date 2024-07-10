import { createStore } from 'vuex'
import { findById, upsert } from '../helpers'
import sourceData from '../data.json'

export default createStore({
	state: {
		...sourceData,
		authId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2',
	},

	getters: {
		authUser: (state, getters) => {
			return getters.user(state.authId)
		},
		user: (state) => {
			return (id) => {
				const user = findById(state.users, id)
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
				const thread = findById(state.threads, id)
				return {
					...thread,
					get author() {
						return findById(state.users, thread.userId)
					},
					get repliesCount() {
						return thread.posts.length - 1
					},
					get contributorsCount() {
						return thread.contributors.length
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

			commit('setPost', { post })
			commit('appendPostToThread', { parentId: post.threadId, childId: post.id })
			commit('appendContributorToThread', { parentId: post.threadId, childId: state.authId })
		},

		async createThread({ commit, state }, { title, forumId }) {
			const id = 'thread' + Math.random()
			const userId = state.authId
			const publishedAt = Math.floor(Date.now() / 1000)
			const thread = { forumId, title, publishedAt, userId, id }
			commit('setThread', { thread })
			commit('appendThreadToForum', { parentId: forumId, childId: id })
			commit('appendThreadToUser', { parentId: userId, threadId: id })
			return findById(state.threads, id)
		},

		async updateThread({ commit, state }, { title, text, id }) {
			const thread = findById(state.threads, id)
			const post = findById(state.posts, thread.posts[0])
			const newThread = { ...thread, title }
			const newPost = { ...post, text }
			commit('setThread', { thread: newThread })
			commit('setPost', { post: newPost })
			return newThread
		},

		updateUser({ commit }, user) {
			commit('setUser', { user, userId: user.id })
		},
	},

	mutations: {
		setPost(state, { post }) {
			upsert(state.posts, post)
		},

		setThread(state, { thread }) {
			upsert(state.threads, thread)
		},

		setUser(state, { user, userId }) {
			const userIndex = state.users.findIndex((user) => user.id === userId)
			state.users[userIndex] = user
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

import { createStore } from 'vuex'
import sourceData from '../data.json'

export default createStore({
	state: sourceData,
	actions: {
		createPost(context, post) {
			post.id = 'testId' + Math.random()
			context.commit('setPost', { post })
			context.commit('appendPost', { postId: post.id, threadId: post.threadId })
		},
	},
	mutations: {
		setPost(state, { post }) {
			state.posts.push(post)
		},
		appendPost(state, { postId, threadId }) {
			const thread = state.threads.find((thread) => thread.id === threadId)
			thread.posts.push(postId)
		},
	},
})

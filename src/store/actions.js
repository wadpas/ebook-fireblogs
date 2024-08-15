import firebase from 'firebase'
import { findById, docToResource } from '../helpers'

export default {
	initAuthentication({ dispatch, commit, state }) {
		if (state.authObserverUnsubscribe) state.authObserverUnsubscribe
		return new Promise((resolve, reject) => {
			const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
				this.dispatch('unsubscribeAuthUserSnapshot')
				if (user) {
					await this.dispatch('fetchAuthUser')
					resolve(user)
				} else {
					resolve(null)
				}
			})
			commit('setAuthObserverUnsubscribe', unsubscribe)
		})
	},
	async createPost({ commit, state }, post) {
		post.userId = state.authId
		post.publishedAt = firebase.firestore.FieldValue.serverTimestamp()
		const postRef = firebase.firestore().collection('posts').doc()
		const threadRef = firebase.firestore().collection('threads').doc(post.threadId)
		const userRef = firebase.firestore().collection('users').doc(state.authId)
		const batch = firebase.firestore().batch()
		batch.set(postRef, post)
		batch.update(threadRef, {
			posts: firebase.firestore.FieldValue.arrayUnion(postRef.id),
			contributors: firebase.firestore.FieldValue.arrayUnion(post.userId),
		})
		batch.update(userRef, {
			postsCount: firebase.firestore.FieldValue.increment(1),
		})
		await batch.commit()
		const newPost = await postRef.get()
		commit('setItem', { resource: 'posts', item: { ...newPost.data(), id: postRef.id } })
		commit('appendPostToThread', { parentId: post.threadId, childId: postRef.id })
		commit('appendContributorToThread', { parentId: post.threadId, childId: state.authId })
	},

	async updatePost({ commit, state }, { text, id }) {
		const post = {
			text,
			edited: {
				at: firebase.firestore.FieldValue.serverTimestamp(),
				by: state.authId,
				moderated: false,
			},
		}
		const postRef = firebase.firestore().collection('posts').doc(id)
		await postRef.update(post)
		const updatedPost = await postRef.get()
		commit('setItem', { resource: 'posts', item: updatedPost })
	},

	async createThread({ commit, state, dispatch }, { text, title, forumId }) {
		const userId = state.authId
		const publishedAt = firebase.firestore.FieldValue.serverTimestamp()
		const threadRef = firebase.firestore().collection('threads').doc()
		const thread = { forumId, title, publishedAt, userId, id: threadRef.id }
		const userRef = firebase.firestore().collection('users').doc(userId)
		const forumRef = firebase.firestore().collection('forums').doc(forumId)
		const batch = firebase.firestore().batch()
		console.log(userRef)

		batch.set(threadRef, thread)
		batch.update(userRef, {
			threads: firebase.firestore.FieldValue.arrayUnion(threadRef.id),
		})
		batch.update(forumRef, {
			threads: firebase.firestore.FieldValue.arrayUnion(threadRef.id),
		})
		await batch.commit()
		const newThread = await threadRef.get()
		commit('setItem', { resource: 'threads', item: { ...newThread.data(), id: newThread.id } })
		commit('appendThreadToUser', { parentId: userId, childId: threadRef.id })
		commit('appendThreadToForum', { parentId: forumId, childId: threadRef.id })
		await dispatch('createPost', { text, threadId: threadRef.id })
		return thread
	},

	async updateThread({ commit, state }, { title, text, id }) {
		const thread = findById(state.threads, id)
		const post = findById(state.posts, thread.posts[0])
		let newThread = { ...thread, title }
		let newPost = { ...post, text }
		const threadRef = firebase.firestore().collection('threads').doc(id)
		const postRef = firebase.firestore().collection('posts').doc(post.id)
		const batch = firebase.firestore().batch()
		batch.update(threadRef, newThread)
		batch.update(postRef, newPost)
		await batch.commit()
		newThread = await threadRef.get()
		newPost = await postRef.get()
		commit('setItem', { resource: 'threads', item: newThread })
		commit('setItem', { resource: 'users', item: newPost })
		return docToResource(newThread)
	},

	async registerUserWithEmailAndPassword({ dispatch }, { avatar = null, email, name, username, password }) {
		const result = await firebase.auth().createUserWithEmailAndPassword(email, password)
		await dispatch('createUser', { id: result.user.uid, email, name, username, avatar })
	},

	async signInWithUserWithEmailAndPassword(context, { email, password }) {
		return firebase.auth().signInWithEmailAndPassword(email, password)
	},

	async signInWithGoogle({ dispatch }) {
		const provider = new firebase.auth.GoogleAuthProvider()
		const response = await firebase.auth().signInWithPopup(provider)
		const user = response.user
		const userRef = await firebase.firestore().collection('users').doc(user.uid)
		const userDoc = await userRef.get()
		if (!userDoc.exists) {
			return dispatch('createUser', {
				id: user.uid,
				email: user.email,
				name: user.displayName,
				username: user.email.split('@')[0],
				avatar: user.photoURL,
			})
		}
	},

	async signOut({ commit }) {
		await firebase.auth().signOut()
		commit('setAuthId', null)
	},

	async createUser({ commit }, { id, email, name, username, avatar }) {
		const registeredAt = firebase.firestore.FieldValue.serverTimestamp()
		const usernameLower = username.toLowerCase()
		email = email.toLowerCase()
		const user = { email, name, username, usernameLower, avatar, registeredAt }
		const userRef = await firebase.firestore().collection('users').doc(id)
		userRef.set(user)
		const newUser = await userRef.get()
		commit('setItem', { resource: 'users', item: newUser })
		return docToResource(newUser)
	},

	updateUser({ commit }, user) {
		commit('setItem', { resource: 'users', item: user.id })
	},

	fetchThread: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'threads', id }),
	fetchForum: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'forums', id }),
	fetchPost: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'posts', id }),
	fetchUser: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'users', id }),
	fetchAuthUser: async ({ dispatch, state, commit }) => {
		const userId = firebase.auth().currentUser?.uid
		if (!userId) return
		await dispatch('fetchItem', {
			resource: 'users',
			id: userId,
			handleUnsubscribe: (unsubscribe) => {
				commit('setAuthUserUnsubscribe', unsubscribe)
			},
		})
		commit('setAuthId', userId)
	},

	async fetchAuthUsersPosts({ commit, state }) {
		const posts = await firebase.firestore().collection('posts').where('userId', '==', state.authId).get()
		posts.forEach((post) => {
			commit('setItem', { resource: 'posts', item: post.data() })
		})
	},

	fetchAllCategories({ commit }) {
		return new Promise((resolve) => {
			firebase
				.firestore()
				.collection('categories')
				.onSnapshot((snapshot) => {
					const categories = snapshot.docs.map((doc) => {
						const item = { id: doc.id, ...doc.data() }
						commit('setItem', { resource: 'categories', item })
						return item
					})
					resolve(categories)
				})
		})
	},

	fetchThreads: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'threads', ids }),
	fetchForums: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'forums', ids }),
	fetchUsers: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'users', ids }),
	fetchPosts: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'posts', ids }),

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

	async unsubscribeAuthUserSnapshot({ state, commit }) {
		if (state.authUserUnsubscribe) {
			state.authUserUnsubscribe()
			commit('setAuthUserUnsubscribe', null)
		}
	},
}

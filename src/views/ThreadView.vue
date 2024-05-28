<template>
	<h1>{{ thread.title }}</h1>

	<PostList :posts="threadPosts" />

	<PostEditor @save="addPost" />
</template>

<script>
	import sourceData from '../data.json'
	import PostList from '../components/PostList.vue'
	import PostEditor from '../components/PostEditor.vue'

	export default {
		props: {
			id: String,
		},
		data() {
			return {
				posts: sourceData.posts,
			}
		},
		computed: {
			thread() {
				return sourceData.threads.find((thread) => thread.id === this.id)
			},
			threadPosts() {
				return this.posts.filter((post) => post.threadId === this.id)
			},
		},
		methods: {
			addPost(eventData) {
				const postId = 'testId' + Math.random()
				const post = {
					...eventData.post,
					threadId: this.id,
				}

				this.posts.push(post)
				this.thread.posts.push(postId)
			},
		},
	}
</script>

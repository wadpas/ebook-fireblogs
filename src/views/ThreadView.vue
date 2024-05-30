<template>
	<h1>{{ thread.title }}</h1>

	<PostList :posts="threadPosts" />

	<PostEditor @save="addPost" />
</template>

<script>
	import PostList from '../components/PostList.vue'
	import PostEditor from '../components/PostEditor.vue'

	export default {
		props: {
			id: String,
		},
		computed: {
			posts() {
				return this.$store.state.posts
			},
			thread() {
				return this.$store.state.threads.find((thread) => thread.id === this.id)
			},
			threadPosts() {
				return this.posts.filter((post) => post.threadId === this.id)
			},
		},
		methods: {
			addPost(eventData) {
				const post = {
					...eventData.post,
					threadId: this.id,
				}
				this.$store.dispatch('createPost', post)
			},
		},
	}
</script>

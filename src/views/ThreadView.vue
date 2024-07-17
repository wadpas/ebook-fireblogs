<template>
	<h1>
		{{ thread.title }}

		<router-link
			:to="{ name: 'ThreadEdit', id: this.id }"
			class="btn-green btn-small"
			tag="button">
			Edit
		</router-link>
	</h1>
	<p>
		By
		<a
			href="#"
			class="link-unstyled">
			{{ thread.author?.name }}
		</a>
		,
		<AppDate :timestamp="thread.publishedAt" />
		<span
			style="float: right; margin-top: 2px"
			class="hide-mobile text-faded text-small">
			{{ thread.posts?.length - 1 }} replies by {{ thread.contributors?.length }} contributors
		</span>
	</p>
	<PostList :posts="threadPosts" />

	<PostEditor @save="addPost" />
</template>

<script>
	import PostList from '../components/PostList.vue'
	import PostEditor from '../components/PostEditor.vue'
	import AppDate from '../components/AppDate.vue'
	import { findById } from '../helpers/index'
	import { mapActions } from 'vuex'

	export default {
		props: {
			id: String,
		},
		computed: {
			posts() {
				return this.$store.state.posts
			},
			users() {
				return this.$store.state.users
			},
			thread() {
				return this.$store.getters.thread(this.id)
			},
			threadPosts() {
				return this.posts.filter((post) => post.threadId === this.id)
			},
		},
		methods: {
			...mapActions(['fetchThread', 'fetchUsers', 'fetchPosts', 'createPost']),
			addPost(eventData) {
				const post = { ...eventData.post, threadId: this.id }
				this.createPost(post)
			},
		},
		async created() {
			const thread = await this.fetchThread({ id: this.id })

			const posts = await this.fetchPosts({ ids: thread.posts })

			const usersIds = posts.map((post) => post.userId).concat(thread.userId)
			this.fetchUsers({ ids: usersIds })
		},
	}
</script>

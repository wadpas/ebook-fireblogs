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
			{{ thread?.repliesCount }} replies by {{ thread?.contributorsCount }} contributors
		</span>
	</p>
	<PostList :posts="threadPosts" />

	<PostEditor @save="addPost" />
</template>

<script>
	import PostList from '../components/PostList.vue'
	import PostEditor from '../components/PostEditor.vue'
	import AppDate from '../components/AppDate.vue'

	export default {
		props: {
			id: String,
		},
		computed: {
			posts() {
				return this.$store.state.posts
			},
			thread() {
				return this.$store.getters.thread(this.id)
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
		async created() {
			const thread = await this.$store.dispatch('fetchThread', { id: this.id })
			this.$store.dispatch('fetchUser', { id: thread.userId })

			const posts = await this.$store.dispatch('fetchPosts', { ids: thread.posts })
			const usersIds = posts.map((post) => post.userId)
			this.$store.dispatch('fetchUsers', { ids: usersIds })
		},
	}
</script>

<template>
	<div
		v-if="forum"
		class="forum-header">
		<div class="forum-details">
			<h1>{{ forum.name }}</h1>
			<p class="text-lead">{{ forum.description }}</p>
		</div>
		<router-link
			:to="{ name: 'ThreadCreate', params: { forumId: id } }"
			class="btn-green btn-small">
			Start a thread
		</router-link>
	</div>

	<ThreadList :threads="threads" />
</template>

<script>
	import { mapActions } from 'vuex'

	export default {
		props: {
			id: String,
		},
		computed: {
			forum() {
				return this.$store.state.forums.find((forum) => forum.id === this.id)
			},
			threads() {
				if (!this.forum) return []
				return this.forum.threads.map((threadId) => this.$store.getters.thread(threadId))
			},
		},
		methods: {
			...mapActions(['fetchForum', 'fetchThreads', 'fetchUsers']),
		},
		async created() {
			const forum = await this.fetchForum({ id: this.id })
			const threads = await this.fetchThreads({ ids: forum.threads })
			this.fetchUsers({ ids: threads.map((thread) => thread.userId) })
		},
	}
</script>

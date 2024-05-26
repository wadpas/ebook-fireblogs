<template>
	<div class="col-full push-top">
		<div class="forum-header">
			<div class="forum-details">
				<h1>{{ forum.name }}</h1>
				<p class="text-lead">{{ forum.description }}</p>
			</div>
			<a
				href="new-thread.html"
				class="btn-green btn-small">
				Start a thread
			</a>
		</div>
	</div>

	<ThreadList :threads="forumThreads" />
</template>

<script>
	import sourceData from '../data.json'
	import ThreadList from '../components/ThreadList.vue'

	export default {
		props: {
			id: String,
		},
		computed: {
			forum() {
				return sourceData.forums.find((forum) => forum.id === this.id)
			},
			forumThreads() {
				return sourceData.threads.filter((post) => post.forumId === this.id)
			},
		},
	}
</script>

<style scoped></style>

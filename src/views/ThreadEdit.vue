<template>
	<div class="col-full push-top">
		<h1>Editing {{ thread.title }}</h1>
		<ThreadEditor
			:title="thread.title"
			:text="text"
			@save="save"
			@cancel="cancel" />
	</div>
</template>

<script>
	export default {
		props: {
			id: {
				type: String,
				required: true,
			},
		},
		computed: {
			thread() {
				return this.$store.state.threads.find((thread) => thread.id === this.id)
			},
			text() {
				return this.$store.state.posts.find((post) => post.id === this.thread.posts[0]).text
			},
		},

		methods: {
			async save({ title, text }) {
				const thread = await this.$store.dispatch('updateThread', {
					id: this.id,
					title,
				})
				this.$store.dispatch('createPost', {
					threadId: thread.id,
					text,
				})
				this.$router.push({ name: 'ThreadView', params: { id: thread.id } })
			},
			cancel() {
				this.$router.push({ name: 'ForumView', params: { id: this.forum.id } })
			},
		},
	}
</script>

<style lang="scss" scoped></style>

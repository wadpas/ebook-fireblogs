<template>
	<div
		v-if="thread && text"
		class="col-full push-top">
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
				const post = this.$store.state.posts.find((post) => post.id === this.thread.posts[0])
				return post ? post.text : ''
			},
		},

		methods: {
			async save({ title, text }) {
				const thread = await this.$store.dispatch('updateThread', {
					id: this.id,
					title,
					text,
				})
				this.$router.push({ name: 'ThreadView', params: { id: thread.id } })
			},

			cancel() {
				this.$router.push({ name: 'ThreadView', params: { id: this.id } })
			},
		},
		async created() {
			const thread = await this.$store.dispatch('fetchThread', { id: this.id })
			this.$store.dispatch('fetchPost', { id: thread.posts[0] })
		},
	}
</script>

<style lang="scss" scoped></style>

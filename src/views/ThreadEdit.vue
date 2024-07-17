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
	import { mapActions } from 'vuex'

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
			...mapActions(['fetchThread', 'fetchPost', 'updateThread']),
			async save({ title, text }) {
				const thread = await this.updateThread({
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
			const thread = await this.fetchThread({ id: this.id })
			this.fetchPost({ id: thread.posts[0] })
		},
	}
</script>

<style lang="scss" scoped></style>

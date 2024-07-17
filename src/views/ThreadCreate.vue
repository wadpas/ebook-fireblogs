<template>
	<div
		v-if="forum"
		class="col-full push-top">
		<h1>
			Create new thread in
			{{ forum.name }}
		</h1>
		<ThreadEditor
			@save="save"
			@cancel="cancel" />
	</div>
</template>

<script>
	import { findById } from '../helpers/index'
	import { mapActions } from 'vuex'

	export default {
		props: {
			forumId: {
				type: String,
				required: true,
			},
		},
		computed: {
			forum() {
				return findById(this.$store.state.forums, this.forumId)
			},
		},
		data() {
			return {
				title: '',
				text: '',
			}
		},
		methods: {
			...mapActions(['fetchForum', 'createThread']),
			async save({ title, text }) {
				const newThread = await this.createThread({
					forumId: this.forumId,
					title,
					text,
				})
				this.$router.push({ name: 'ThreadView', params: { id: newThread.id } })
			},
			cancel() {
				this.$router.push({ name: 'ForumView', params: { id: this.forum.id } })
			},
		},
		created() {
			this.fetchForum({ id: this.forumId })
		},
	}
</script>

<style lang="scss" scoped></style>

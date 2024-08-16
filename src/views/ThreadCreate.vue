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
			@cancel="cancel"
			@dirty="formIsDirty = true"
			@clean="formIsDirty = false" />
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
				return findById(this.$store.state.forums.items, this.forumId)
			},
		},
		data() {
			return {
				title: '',
				text: '',
				formIsDirty: false,
			}
		},
		methods: {
			...mapActions('forums', ['fetchForum']),
			...mapActions('threads', ['createThread']),
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
		beforeRouteLeave() {
			if (this.formIsDirty) {
				const confirmed = window.confirm('Are you sure you want to leave?')
				if (!confirmed) return false
			}
		},
	}
</script>

<style lang="scss" scoped></style>

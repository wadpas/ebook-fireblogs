<template>
	<div class="col-full push-top">
		<h1>
			Create new thread in
			{{ forum.name }}
		</h1>

		<form @submit.prevent="save">
			<div class="form-group">
				<label for="thread_title">Title:</label>
				<input
					v-model="title"
					type="text"
					id="thread_title"
					class="form-input"
					name="title" />
			</div>

			<div class="form-group">
				<label for="thread_content">Content:</label>
				<textarea
					v-model="text"
					id="thread_content"
					class="form-input"
					name="content"
					rows="8"
					cols="140"></textarea>
			</div>

			<div class="btn-group">
				<button class="btn btn-ghost">Cancel</button>
				<button
					class="btn btn-blue"
					type="submit"
					name="Publish">
					Publish
				</button>
			</div>
		</form>
	</div>
</template>

<script>
	export default {
		props: {
			forumId: {
				type: String,
				required: true,
			},
		},
		computed: {
			forum() {
				return this.$store.state.forums.find((forum) => forum.id === this.forumId)
			},
		},
		data() {
			return {
				title: '',
				text: '',
			}
		},
		methods: {
			async save() {
				const thread = await this.$store.dispatch('createThread', {
					id: this.id,
					forumId: this.forum.id,
					title: this.title,
				})
				this.$store.dispatch('createPost', {
					text: this.text,
					threadId: thread.id,
				}),
					this.$router.push({ name: 'ThreadView', params: { id: thread.id } })
			},
		},
	}
</script>

<style lang="scss" scoped></style>

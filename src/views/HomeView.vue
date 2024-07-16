<template>
	<h1>Welcome to the Forum</h1>

	<div
		class="forum-list"
		v-for="category in categories">
		<h2 class="list-title">
			<a>{{ category.name }}</a>
		</h2>
		<ForumList :forumIds="category.forums" />
	</div>
</template>

<script>
	export default {
		computed: {
			categories() {
				return this.$store.state.categories
			},
		},

		async beforeCreate() {
			const categories = await this.$store.dispatch('fetchAllCategories')
			const forumIds = categories.map((category) => category.forums).flat()
			this.$store.dispatch('fetchForums', { ids: forumIds })
		},
	}
</script>

<style scoped></style>

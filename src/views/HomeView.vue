<template>
	<h1>Welcome to the Forum</h1>

	<div
		class="forum-list"
		v-for="category in categories">
		<h2 class="list-title">
			<a>{{ category.name }}</a>
		</h2>

		<ForumList :forums="categoryForums(category.forums)" />
	</div>
</template>

<script>
	export default {
		computed: {
			categories() {
				return this.$store.state.categories
			},
		},
		methods: {
			categoryForums(forumsId) {
				return forumsId.map((id) => this.$store.state.forums.find((forum) => forum.id === id))
			},
		},
	}
</script>

<style scoped></style>

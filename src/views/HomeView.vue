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
	import sourceData from '../data.json'

	export default {
		data() {
			return {
				categories: sourceData.categories,
			}
		},

		methods: {
			categories() {
				return sourceData.categories
			},

			userById(userId) {
				return sourceData.users.find((user) => user.id === userId)
			},
			categoryForums(forumsId) {
				return forumsId.map((id) => sourceData.forums.find((forum) => forum.id === id))
			},
		},
	}
</script>

<style scoped></style>

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
	import { mapActions } from 'vuex'

	export default {
		computed: {
			categories() {
				return this.$store.state.categories.items
			},
		},
		methods: {
			...mapActions('categories', ['fetchAllCategories']),
			...mapActions('forums', ['fetchForums']),
		},

		async created() {
			const categories = await this.fetchAllCategories()
			const forumIds = categories.map((category) => category.forums).flat()
			this.fetchForums({ ids: forumIds })
		},
	}
</script>

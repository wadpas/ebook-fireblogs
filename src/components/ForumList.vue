<template>
	<div
		class="forum-listing"
		v-for="forumId in forumIds">
		<div class="forum-details">
			<router-link
				:to="{ name: 'ForumView', params: { id: forumId } }"
				class="text-xlarge">
				{{ forumById(forumId).name }}
			</router-link>
			<p>{{ forumById(forumId).description }}</p>
		</div>
		<div class="threads-count">
			<p>
				<span class="count">{{ forumById(forumId).threads?.length }}</span>
				{{ forumById(forumId).threads?.length > 1 ? 'threads' : 'thread' }}
			</p>
		</div>
		<div class="last-thread"></div>
	</div>
</template>

<script>
	export default {
		props: {
			forumIds: Array,
		},

		methods: {
			userById(userId) {
				return this.$store.getters.user(userId)
			},
			forumById(forumId) {
				return this.$store.getters.forum(forumId)
			},
		},
	}
</script>

<style scoped></style>

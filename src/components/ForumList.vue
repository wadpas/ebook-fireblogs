<template>
	<div
		class="forum-listing"
		v-for="forumId in forumIds">
		<div class="forum-details">
			<router-link
				:to="{ name: 'ForumView', params: { id: forumId } }"
				class="text-xlarge">
				{{ forum(forumId)?.name }}
			</router-link>
			<p>{{ forum(forumId)?.description }}</p>
		</div>
		<div class="threads-count">
			<p>
				<span class="count">{{ forum(forumId)?.threads.length }}</span>
				{{ forum(forumId)?.threads.length > 1 ? 'threads' : 'thread' }}
			</p>
		</div>
		<div class="last-thread"></div>
	</div>
</template>

<script>
	import { findById } from '../helpers/index'

	export default {
		props: {
			forumIds: Array,
		},

		methods: {
			forum(id) {
				return findById(this.$store.state.forums.items, id)
			},
		},
	}
</script>

<style scoped></style>

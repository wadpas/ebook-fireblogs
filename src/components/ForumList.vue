<template>
	<div
		class="forum-listing"
		v-for="forum in forums">
		<div class="forum-details">
			<router-link
				:to="{ name: 'ForumView', params: { id: forum.id } }"
				class="text-xlarge">
				{{ forum.name }}
			</router-link>
			<p>{{ forum.description }}</p>
		</div>

		<div class="threads-count">
			<p>
				<span class="count">{{ forum.threads.length }}</span>
				{{ forum.threads.length > 1 ? 'threads' : 'thread' }}
			</p>
		</div>
		<div class="last-thread"></div>
	</div>
</template>

<script>
	import sourceData from '../data.json'

	export default {
		props: {
			forums: Array,
		},

		methods: {
			userById(userId) {
				return sourceData.users.find((user) => user.id === userId)
			},
		},
	}
</script>

<style scoped></style>

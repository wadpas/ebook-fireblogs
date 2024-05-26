<template>
	<div class="col-full push-top">
		<div class="thread-list">
			<h2 class="list-title">Threads</h2>
			<div
				v-for="thread in threads"
				:key="thread.id"
				class="thread">
				<div>
					<p>
						<router-link :to="{ name: 'ThreadView', params: { id: thread.id } }">{{ thread.title }}</router-link>
					</p>
					<p class="text-faded text-xsmall">
						By
						<a href="#">{{ userById(thread.userId).name }}</a>
						created
						<AppDate :timestamp="thread.publishedAt" />
					</p>
				</div>
				<div class="activity">
					<p class="replies-count">{{ thread.posts.length }} replies</p>
					<img
						class="avatar-medium"
						:src="userById(thread.userId).avatar"
						alt="" />
					<div>
						<p class="text-xsmall">
							<a href="#">{{ userById(thread.userId).name }}</a>
						</p>
						<p class="text-xsmall text-faded">
							<AppDate :timestamp="thread.publishedAt" />
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import sourceData from '../data.json'

	export default {
		props: {
			threads: Array,
		},
		data() {
			return {
				users: sourceData.users,
			}
		},
		methods: {
			userById(userId) {
				return this.users.find((user) => user.id === userId)
			},
		},
	}
</script>

<style scoped></style>

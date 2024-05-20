<template>
	<div
		v-if="thread"
		class="col-large push-top">
		<h1>{{ thread?.title }}</h1>

		<div class="post-list">
			<div
				v-for="postId in thread.posts"
				:key="postId"
				class="post">
				<div class="user-info">
					<a
						href="#"
						class="user-name">
						{{ userById(postById(postId).userId).name }}
					</a>
					<a href="#">
						<img
							class="avatar-large"
							:src="userById(postById(postId).userId).avatar"
							alt="" />
					</a>

					<p class="desktop-only text-small">107 posts</p>
				</div>

				<div class="post-content">
					<div>
						<p>
							{{ postById(postId).text }}
							{{ userById(postById(postId)?.userId)?.avatar }}
						</p>
					</div>
				</div>

				<div class="post-date text-faded">{{ postById(postId).publishedAt }}</div>
			</div>
		</div>
	</div>
	<div
		v-else
		class="col-full text-center">
		<h1>Thread Not Found</h1>
		<router-link :to="{ name: 'HomeView' }">To Main Page</router-link>
	</div>
</template>

<script>
	import sourceData from '../data.json'

	export default {
		props: {
			id: {
				type: String,
				required: true,
			},
		},
		data() {
			return {
				threads: sourceData.threads,
				posts: sourceData.posts,
				users: sourceData.users,
			}
		},
		computed: {
			thread() {
				return this.threads.find((thread) => thread.id === this.id)
			},
		},
		methods: {
			postById(postId) {
				return this.posts.find((post) => post.id === postId)
			},
			userById(userId) {
				return this.users.find((user) => user.id === userId)
			},
		},
	}
</script>

<style scoped></style>

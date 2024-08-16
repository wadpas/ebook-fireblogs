<template>
	<div class="post-list">
		<div
			v-for="post in posts"
			:key="post.id"
			class="post">
			<div
				v-if="userById(post.userId)"
				class="user-info">
				<a
					href="#"
					class="user-name">
					{{ userById(post.userId)?.name }}
				</a>
				<a href="#">
					<img
						class="avatar-large"
						:src="userById(post.userId).avatar"
						alt="" />
				</a>
				<p class="desktop-only text-small">{{ userById(post.userId).postsCount }} posts</p>
				<p class="desktop-only text-small">{{ userById(post.userId).threadsCount }} threads</p>
			</div>
			<div class="post-content">
				<div class="col-full">
					<PostEditor
						v-if="editing === post.id"
						@save="handleUpdate"
						:post="post">
						Edit Mode
					</PostEditor>
					<p v-else>
						{{ post.text }}
					</p>
				</div>
				<a
					v-if="post.userId === $store.state.auth.authId"
					@click.prevent="toggleEditMode(post.id)"
					href="#"
					style="margin-left: auto; padding-left: 10px"
					class="link-unstyled"
					title="Make a change">
					<fa icon="pencil-alt" />
				</a>
			</div>

			<div class="post-date text-faded">
				<div
					v-if="post.edited?.at"
					class="edition-info"></div>
				<AppDate :timestamp="post.publishedAt" />
			</div>
		</div>
	</div>
</template>

<script>
	import PostEditor from './PostEditor.vue'
	import { mapActions } from 'vuex'

	export default {
		props: {
			posts: Array,
		},
		data() {
			return {
				editing: null,
			}
		},

		methods: {
			...mapActions('posts', ['updatePost']),
			userById(userId) {
				return this.$store.getters['users/user'](userId)
			},
			toggleEditMode(id) {
				this.editing = id === this.editing ? null : id
			},
			handleUpdate(event) {
				this.updatePost(event.post)
				this.editing = null
			},
		},
	}
</script>

<style scoped></style>

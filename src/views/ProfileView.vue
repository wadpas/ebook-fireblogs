<template>
	<div class="container">
		<div class="flex-grid">
			<div class="col-3 push-top">
				<ProfileCard
					v-if="!edit"
					:user="user" />
				<ProfileCardEditor
					v-else
					:user="user" />
			</div>

			<div class="col-7 push-top">
				<div class="profile-header">
					<span class="text-lead">{{ user.username }} recent activity</span>
					<a href="#">See only started threads?</a>
				</div>

				<hr />

				<PostList :posts="user.posts" />
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		props: {
			edit: { type: Boolean, default: false },
		},
		computed: {
			...mapGetters('auth', { user: ['authUser'] }),
		},
		async created() {
			await this.$store.dispatch('auth/fetchAuthUsersPosts')
		},
	}
</script>

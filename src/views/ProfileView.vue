<template>
	<div class="container">
		<div class="flex-grid">
			<div class="col-3 push-top">
				<ProfileCard :user="user" />
				<ProfileCardEditor :user="user" />

				<p class="text-xsmall text-faded text-center">Member since june 2003, last visited 4 hours ago</p>

				<div class="text-center">
					<hr />
					<a
						href="edit-profile.html"
						class="btn-green btn-small">
						Edit Profile
					</a>
				</div>
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
		computed: {
			...mapGetters({ user: ['authUser'] }),
		},
	}
</script>

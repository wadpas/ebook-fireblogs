<template>
	<TheNavbar />
	<div class="container">
		<div class="col-full push-top">
			<router-view />
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'

	export default {
		methods: {
			...mapActions(['fetchAuthUser']),
		},
		created() {
			this.fetchAuthUser()
		},
	}
</script>

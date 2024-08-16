<template>
	<div class="flex-grid justify-center">
		<div class="col-2">
			<form
				@submit.prevent="signIn"
				class="card card-form">
				<h1 class="text-center">Login</h1>

				<div class="form-group">
					<label for="email">Email</label>
					<input
						id="email"
						v-model="form.email"
						type="text"
						class="form-input" />
				</div>
				<div class="form-group">
					<label for="password">Password</label>
					<input
						id="password"
						v-model="form.password"
						type="password"
						class="form-input" />
				</div>

				<div class="push-top">
					<button
						type="submit"
						class="btn-blue btn-block">
						Log in
					</button>
				</div>

				<div class="form-actions text-right">
					<router-link :to="{ name: 'RegisterView' }">Create account</router-link>
				</div>
			</form>

			<div
				@click="signInWithGoogle"
				class="push-top text-center">
				<button class="btn-red btn-xsmall">
					<i class="fa fa-google fa-btn"></i>
					Sign in with Google
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					email: '',
					password: '',
				},
			}
		},
		methods: {
			async signIn() {
				try {
					await this.$store.dispatch('auth/signInWithUserWithEmailAndPassword', { ...this.form })
					this.$router.push('/')
				} catch (error) {
					alert(error.message)
				}
			},
			async signInWithGoogle() {
				await this.$store.dispatch('auth/signInWithGoogle')
				this.$router.push('/')
			},
			created() {
				this.$emit('ready')
			},
		},
	}
</script>

<style lang="scss" scoped></style>

<template>
	<div class="form-wrap">
		<div>
			<img
				src="/books.png"
				class="my-6" />
		</div>
		<form class="login">
			<h2>Відновлення паролю</h2>
			<h2>Тутbook</h2>
			<p class="login-register">Введіть свою електронну пошту</p>
			<div class="inputs">
				<div class="input">
					<span class="material-icons">alternate_email</span>
					<input
						class="rounded focus:border-transparent focus:ring-0"
						type="email"
						placeholder="пошта"
						v-model="data.email" />
				</div>
			</div>
			<button class="px-4 py-2 mt-10 login-btn">Увійти</button>
			<router-link :to="{ name: 'home' }">Підтвердити</router-link>
		</form>
	</div>
</template>

<script setup>
	import { reactive } from 'vue'
	import { useRouter } from 'vue-router'
	const router = useRouter()

	const data = reactive({
		email: '',
		password: '',
	})
</script>

<style lang="scss" scoped></style>

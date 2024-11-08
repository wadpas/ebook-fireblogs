<template>
	<div class="form-wrap">
		<div>
			<img
				src="/books.png"
				class="my-6" />
		</div>
		<form class="register">
			<h2>Реєстрація у Тутbook</h2>
			<p class="login-register">
				Вже з нами?
				<router-link :to="{ name: 'login' }">Вхід</router-link>
			</p>
			<div class="inputs">
				<div class="input">
					<span class="material-icons">alternate_email</span>
					<input
						class="rounded focus:border-transparent focus:ring-0"
						type="email"
						placeholder="пошта"
						v-model="data.email" />
				</div>
				<div class="input">
					<span class="material-icons">account_circle</span>
					<input
						class="rounded focus:border-transparent focus:ring-0"
						type="text"
						placeholder="нік"
						v-model="data.username" />
				</div>
				<div class="input">
					<span class="material-icons">password</span>
					<input
						class="rounded focus:border-transparent focus:ring-0"
						type="password"
						placeholder="пароль"
						v-model="data.password" />
				</div>
			</div>
			<button class="px-4 py-2 mt-10 login-btn">Зареєструватися</button>
			<router-link :to="{ name: 'home' }">Пропустити</router-link>
		</form>
	</div>
</template>

<script setup>
	import { reactive } from 'vue'
	import { useRouter } from 'vue-router'
	const router = useRouter()

	const data = reactive({
		email: '',
		username: '',
		password: '',
	})
</script>

<style lang="scss" scoped></style>

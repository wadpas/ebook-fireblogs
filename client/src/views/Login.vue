<template>
	<div class="form-wrap">
		<div>
			<img
				src="/books.png"
				class="my-6" />
		</div>
		<form class="login">
			<h2>Вхід до Тутbook</h2>
			<p class="login-register">
				Не маєш акаунта?
				<router-link :to="{ name: 'register' }">Реєстрація</router-link>
			</p>
			<div class="mb-3 inputs">
				<div class="input">
					<span class="material-icons">alternate_email</span>
					<input
						class="rounded focus:border-transparent focus:ring-0"
						type="email"
						placeholder="пошта"
						v-model="data.email" />
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
			<p class="login-register">
				Забув пароль?
				<router-link :to="{ name: 'forgot' }">Відновити</router-link>
			</p>
			<button class="login-btn">Увійти</button>
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
		password: '',
	})
</script>

<style lang="scss">
	.form-wrap {
		overflow: hidden;
		display: flex;
		flex-direction: column;
		height: 100vh;
		justify-content: center;
		align-items: center;
		margin: 0 auto;

		.login-register {
			margin-bottom: 32px;
		}

		form {
			min-width: 350px;
			padding: 0 10px;
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-content: center;
		}
		p {
			text-align: center;
		}

		h2 {
			text-align: center;
			font-size: 32px;
		}

		.inputs {
			min-width: 350px;

			.input {
				position: relative;
				display: flex;
				flex-direction: row;

				input {
					width: 100%;
					border: none;
					background-color: ghostwhite;
					margin-top: 4px;
					padding-left: 40px;
				}
				.material-icons {
					position: absolute;
					top: 12px;
					left: 8px;
					font-size: 20px;
				}
			}
		}

		a {
			color: #249afc;
			text-decoration: none;
			text-align: center;
			cursor: pointer;
			margin-bottom: 32px;
			margin-top: 8px;
			border-bottom: 1px solid transparent;
			transition: 0.2s ease all;

			&:hover {
				font-weight: bold;
			}
		}

		.login-btn {
			width: 100px;
			padding: 4px 16px;
			border-radius: 5%;
			align-self: center;
			background-color: #249afc;
			transition: 0.2s ease all;
			color: white;
			&:hover {
				font-weight: bold;
			}
		}
	}
</style>

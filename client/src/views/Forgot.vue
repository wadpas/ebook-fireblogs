<template>
	<div class="form-wrap">
		<Modal
			v-if="data.modalActive"
			:closeModal="closeModal" />
		<Loading v-if="data.loading" />
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
	import Modal from '@/components/Modal.vue'
	import Loading from '@/components/Loading.vue'
	const router = useRouter()

	const data = reactive({
		modalActive: true,
		loading: false,
		email: '',
		modalMessage: '',
	})

	function closeModal() {
		data.modalActive = false
		data.email = ''
		data.password = ''
	}
</script>

<style lang="scss" scoped></style>

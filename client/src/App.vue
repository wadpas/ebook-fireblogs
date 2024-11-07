<template>
	<div class="flex flex-col h-screen">
		<Navbar v-show="!blankLayout" />
		<div class="flex-grow m-4">
			<router-view />
		</div>
		<Footer v-show="!blankLayout" />
	</div>
</template>

<script setup>
	import { ref, computed } from 'vue'
	import { useRoute } from 'vue-router'
	import { RouterLink, RouterView } from 'vue-router'
	import Navbar from './components/Navbar.vue'
	import Footer from './components/Footer.vue'
	const route = useRoute()

	const blankLayout = computed(() => {
		return route.name === 'login' || route.name === 'register' || route.name === 'forgot'
	})
</script>

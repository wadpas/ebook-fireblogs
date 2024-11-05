<template>
	<div class="flex flex-col h-screen">
		<Navbar />
		<div class="flex-grow m-4">
			<router-view />
		</div>
		<Footer />
	</div>
</template>

<script setup>
	import { RouterLink, RouterView } from 'vue-router'
	import Navbar from './components/Navbar.vue'
	import Footer from './components/Footer.vue'
</script>

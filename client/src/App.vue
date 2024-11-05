<template>
	<header>
		<div class="wrapper">
			<Navigation />
		</div>
	</header>

	<RouterView />
</template>

<script setup>
	import { RouterLink, RouterView } from 'vue-router'
	import Navigation from './components/Navigation.vue'
</script>

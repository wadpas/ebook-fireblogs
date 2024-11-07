<template>
	<div class="home">
		<Banner
			v-for="banner in banners"
			:banner="banner" />
	</div>
</template>

<script setup>
	import { storeToRefs } from 'pinia'
	import { onMounted } from 'vue'
	import { useBooksStore } from '@/stores/books'
	import Banner from '@/components/Banner.vue'
	const booksStore = useBooksStore()
	const { banners } = storeToRefs(booksStore)

	onMounted(() => {
		booksStore.getBanners()
	})
</script>

<style lang="scss" scoped></style>

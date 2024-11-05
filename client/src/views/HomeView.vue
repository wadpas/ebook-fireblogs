<template>
	{{ banners }}
</template>

<script setup>
	import { useBooksStore } from '@/stores/books'
	import { storeToRefs } from 'pinia'
	import { onMounted } from 'vue'
	const booksStore = useBooksStore()
	const { banners } = storeToRefs(booksStore)

	onMounted(() => {
		booksStore.getBanners()
	})
</script>

<style lang="scss" scoped></style>

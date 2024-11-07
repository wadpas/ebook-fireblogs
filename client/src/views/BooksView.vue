<template>
	<div class="book-card-wrap">
		<div class="book-cards">
			<BookCard
				v-for="book in books"
				:book="book" />
		</div>
	</div>
</template>

<script setup>
	import { storeToRefs } from 'pinia'
	import { onMounted } from 'vue'
	import { useBooksStore } from '@/stores/books'
	import BookCard from '@/components/BookCard.vue'
	const booksStore = useBooksStore()
	const { books } = storeToRefs(booksStore)

	onMounted(() => {
		booksStore.getBooks()
	})
</script>

<style lang="scss" scoped>
	.book-card-wrap {
		position: relative;
		.book-cards {
			display: grid;
			gap: 24px;
			grid-template-columns: 1fr;
			@media (min-width: 500px) {
				grid-template-columns: repeat(2, 1fr);
			}
			@media (min-width: 900px) {
				grid-template-columns: repeat(3, 1fr);
			}
			@media (min-width: 1200px) {
				grid-template-columns: repeat(4, 1fr);
			}
		}
	}
</style>

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axiosInstance from '../plugins/axiosInstance'

export const useBooksStore = defineStore('books', () => {
	const banners = ref([])
	const books = ref([])

	async function getBanners() {
		try {
			const response = await axiosInstance.get('/banners')
			banners.value = response.data.banners
		} catch (error) {
			console.log(error)
		}
	}

	async function getBooks() {
		try {
			const response = await axiosInstance.get('/books')
			books.value = response.data.books
		} catch (error) {
			console.log(error)
		}
	}

	return { banners, books, getBanners, getBooks }
})

<template>
	<h1>Welcome to the Forum</h1>
	<ForumView :threads="threads" />
</template>

<script>
	import sourceData from '../data.json'
	import ForumView from './ForumView.vue'

	export default {
		components: { ForumView },
		data() {
			return {
				threads: sourceData.threads,
			}
		},
	}
</script>

<style scoped></style>

<template>
	<div class="shadow book-card">
		<div class="icons">
			<div class="icon">
				<span class="material-icons">edit</span>
			</div>
			<div class="icon">
				<span class="material-icons">delete</span>
			</div>
		</div>
		<img :src="book.image" />
		<div class="info">
			<h1>{{ book.title }}</h1>
			<h2>{{ book.author }}</h2>
			<router-link
				class="link"
				to="#">
				Детальніше >
			</router-link>
		</div>
	</div>
</template>

<script setup>
	const { book } = defineProps({
		book: Object,
	})
</script>

<style lang="scss" scoped>
	.book-card {
		position: relative;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		border-radius: 4px;
		transition: 0.5s ease all;

		&:hover {
			transform: rotateZ(-0.5deg) scale(1.02);
		}

		.icons {
			display: flex;
			position: absolute;
			top: 10px;
			right: 10px;
			z-index: 99;

			.icon {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 35px;
				height: 35px;
				border-radius: 50%;
				background-color: white;
				transition: 0.5s ease all;
				opacity: 90%;

				&:hover {
					color: #249afc;
				}

				&:nth-child(1) {
					margin-right: 8px;
				}
			}
		}

		img {
			display: block;
			border-radius: 8px 8px 0 0;
			height: 3/4;
			z-index: 1;
			height: 100%;
			min-height: 200px;
			object-fit: cover;
		}

		.info {
			display: flex;
			flex-direction: column;
			height: 160px;
			z-index: 3;
			padding: 8px 16px;
			justify-content: space-between;
		}

		h1 {
			font-weight: bold;
		}
		h2 {
			font-style: italic;
		}
		.link {
			padding: 4px 16px;
			border-radius: 5%;
			max-width: fit-content;
			margin-left: -5px;
			background-color: aliceblue;
			transition: 0.5s ease all;
			&:hover {
				font-weight: bold;
			}
		}
	}
</style>

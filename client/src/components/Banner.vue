<template>
	<div class="banner-wrapper">
		<div class="banner-content">
			<div>
				<h2>{{ banner.title }}</h2>
				<p class="content-preview">{{ banner.description }}</p>
				<router-link
					class="link"
					to="#">
					{{ banner.button }} >
				</router-link>
			</div>
		</div>
		<div class="banner-photo">
			<img :src="banner.image" />
		</div>
	</div>
</template>

<script setup>
	import IconArrow from './icons/IconArrow.vue'
	const { banner } = defineProps({
		banner: Object,
	})
</script>

<style lang="scss" scoped>
	.banner-wrapper {
		display: flex;
		flex-direction: column;
		@media (min-width: 700px) {
			max-height: 650px;
			flex-direction: row;
		}
		.banner-content {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			flex: 4;
			order: 2;
			@media (min-width: 700px) {
				order: 1;
			}
			@media (min-width: 800px) {
				flex: 3;
			}
			div {
				max-width: 375px;
				max-height: 375px;
				padding: 36px 12px;
				@media (min-width: 700px) {
					padding: 0px 12px;
				}
				h2 {
					font-size: 18px;
					text-transform: uppercase;
					margin-bottom: 4px;
					@media (min-width: 700px) {
						font-size: 24px;
					}
				}
				.link {
					display: inline-flex;
					align-items: center;
					padding: 4px 6px;
					margin-top: 8px;
					background-color: aliceblue;
					&:hover {
						color: #249afc;
					}
				}
			}
		}
		.banner-photo {
			order: 1;
			flex: 3;

			@media (min-width: 700px) {
				order: 2;
			}
			@media (min-width: 800px) {
				flex: 4;
			}

			.img {
				display: block;
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
		&:nth-child(even) {
			.banner-content {
				order: 2;
			}
			.banner-photo {
				order: 1;
			}
		}
	}
</style>

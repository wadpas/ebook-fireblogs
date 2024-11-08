<template>
	<div class="modal">
		<div class="modal-content">
			<p>{{ message }}</p>
			<button @click="closeModal">Так</button>
		</div>
	</div>
</template>

<script setup>
	const { message, closeModal } = defineProps({
		message: String,
		closeModal: Function,
	})
</script>

<style lang="scss" scoped>
	.modal {
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 101;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		background-color: rgba(0, 0, 0, 0.7);

		.modal-content {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 300px;
			height: 200px;
			background-color: #fff;
			border-radius: 10px;
			padding: 20px;
			text-align: center;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
			p {
				margin-bottom: 20px;
			}
			button {
				padding: 10px 20px;
				border: none;
				border-radius: 5px;
				background-color: #007bff;
				color: #fff;
				cursor: pointer;
			}
		}
	}
</style>

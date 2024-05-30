<template>
	<form @submit.prevent="save">
		<div class="form-group">
			<textarea
				v-model="text"
				name=""
				id=""
				cols="30"
				rows="10"
				class="form-input" />
		</div>
		<div class="form-actions">
			<button class="btn-blue">Submit</button>
		</div>
	</form>
</template>

<script>
	export default {
		data() {
			return {
				text: '',
			}
		},
		methods: {
			save() {
				const post = {
					text: this.text,
					publishedAt: Math.floor(Date.now() / 1000),
					userId: 'jVa6Go6Nl1Urkag1R2p9CHTf4ny1',
				}
				this.$emit('save', { post })
				this.text = ''
			},
		},
	}
</script>

<template>
	<span :title="dateForHumans">
		{{ diffForHumans }}
	</span>
</template>

<script>
	import dayjs from 'dayjs'
	import relativeTime from 'dayjs/plugin/relativeTime'
	import localizedFormat from 'dayjs/plugin/localizedFormat'
	dayjs.extend(relativeTime)
	dayjs.extend(localizedFormat)

	export default {
		props: {
			timestamp: [Number, Object],
		},
		computed: {
			normalizedTimestamp() {
				return this.timestamp?.seconds || this.timestamp
			},
			diffForHumans() {
				return dayjs.unix(this.normalizedTimestamp).fromNow()
			},
			dateForHumans() {
				return dayjs.unix(this.normalizedTimestamp).format('llll')
			},
		},
	}
</script>

<style lang="scss" scoped></style>

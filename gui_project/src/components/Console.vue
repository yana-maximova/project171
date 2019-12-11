<template>
	<section ref="console" class="console bordered">
		<div
			v-for="(item, key) in items"
			class="item"
			:class="{
				'error': item.type === 'error',
				'message': item.type === 'message',
				'warning': item.type === 'warning'
			}"
			:key="key"
		>
			{{ item.message }}
		</div>
	</section>
</template>

<script>
import eventBus from '@/utils/EventBus'
export default {
	name: 'Console',
	data () {
		return {
			items: []
		}
	},
	methods: {
		addItem (e) {
			const { type, message } = e
			if (e.replace) {
				this.items.splice(this.items.length - 1, 1, { type, message })
			} else {
				this.items.push({ type, message })
			}
			this.$refs.console.scrollTop = this.$refs.console.scrollHeight
		}
	},
	mounted () {
		eventBus.$on('logFromPython', this.addItem)
	},
	beforeDestroy () {
		eventBus.$off('logFromPython', this.addItem)
	}
}
</script>

<style scoped lang="scss">
	.console {
		flex-grow: 1;
		background-color: var(--text-color);
		height: 0;
		overflow-y: scroll;
	}
	.item {
		min-height: 1em;
	}
	.error {
		color: var(--error);
	}
	.message {
		color: var(--message);
	}
	.warning {
		color: var(--warning);
	}
</style>

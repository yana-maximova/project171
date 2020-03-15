<template>
	<section ref="console" class="console bordered">
		<div
			v-for="(item, key) in items"
			class="item"
			:class="{
				error: item.type === 'error',
				message: item.type === 'message',
				warning: item.type === 'warning'
			}"
			:key="key"
		>
			{{ item.message }}
		</div>
	</section>
</template>

<script>
import eventBus from "@/utils/EventBus";

export default {
	name: "Console",
	data() {
		return {
			items: []
		};
	},
	methods: {
		addItem(e) {
			const { type, message } = e;
			if (e.replace) {
				this.items.splice(this.items.length - 1, 1, { type, message });
			} else {
				this.items.push({ type, message });
			}
			this.$refs.console.scrollTop = this.$refs.console.scrollHeight;
		},
		clearConsole() {
			this.items = [];
		}
	},
	mounted() {
		eventBus.$on("logFromPython", this.addItem);
		eventBus.$on("clearConsole", this.clearConsole);
	},
	beforeDestroy() {
		eventBus.$off("logFromPython", this.addItem);
		eventBus.$off("clearConsole", this.clearConsole);
	}
};
</script>

<style scoped lang="scss">
.console {
	background-color: var(--text-color);
	height: 100%;
	min-height: 150px;
	overflow-y: scroll;
	margin-bottom: 1em;
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

<template>
	<div class="spinner">
		<div class="spinner-border text-primary" role="status">
			<!-- <span class="sr-only">Loading...</span> -->
		</div>
		<div class="message">
			{{ message }}
		</div>
		<div class="message">
			{{ info }}
		</div>
	</div>
</template>

<script>
import eventBus from "@/utils/EventBus";

export default {
	name: "Spinner",
	props: {
		message: {
			type: String,
			default: () => "Загрузка"
		}
	},
	data() {
		return {
			info: ""
		};
	},
	methods: {
		messageHandler(e) {
			this.info = e.message;
		}
	},
	mounted() {
		eventBus.$on("logFromPython", this.messageHandler);
	},
	beforeDestroy() {
		eventBus.$off("logFromPython", this.messageHandler);
	}
};
</script>

<style lang="scss" scoped>
.spinner {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: var(--text-color);
}
.message {
	color: var(--gray-color);
}
</style>

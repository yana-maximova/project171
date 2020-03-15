<template>
	<div>
		<form class="form-group border p-3" @submit.prevent="start">
			<div
				class="d-flex justify-content-between align-items-end flex-wrap mb-3"
			>
				<label class="form-label settings__item">
					Количество элетентов в скрытом слое
					<input
						type="text"
						class="form-control"
						v-model.number="value.hiddenNodes"
					/>
				</label>
				<label class="form-label settings__item">
					Количество эпох
					<input
						type="text"
						class="form-control"
						v-model.number="value.epochs"
					/>
				</label>
			</div>
			<input type="submit" class="btn btn-primary" value="Старт" />
		</form>
	</div>
</template>

<script>
import eventBus from "@/utils/EventBus";

export default {
	name: "TrainingOptions",
	props: {
		value: {
			type: Object,
			required: true
		}
	},
	methods: {
		start() {
			eventBus.$emit("clearConsole");
			this.$emit("start");
		}
	}
};
</script>

<style scoped lang="scss">
.settings__item {
	width: 45%;
	margin: 0 0.5em;
}
</style>

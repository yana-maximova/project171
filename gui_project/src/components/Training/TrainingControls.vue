<template>
	<div>
		<form class="form-group" @submit.prevent="start">
			<div class="settings">
				<label class="form-label settings__item">
					Количество элетентов в скрытом слое
					<input type="text" class="form-control" v-model.number="value.hiddenNodes">
				</label>
				<label class="form-label settings__item">
					Количество эпох
					<input type="text" class="form-control" v-model.number="value.epochs">
				</label>
			</div>
			<input type="submit" class="btn" value="Старт">
		</form>
	</div>
</template>

<script>
export default {
	name: 'TrainingOptions',
	props: {
		value: {
			type: Object,
			required: true
		}
	},
	methods: {
		start () {
			this.$emit('start')
		}
	}
}
</script>

<style scoped lang="scss">
	.settings {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-end;

		.settings__item {
			width: 45%;
			margin: 0 .5em;
		}
	}
</style>

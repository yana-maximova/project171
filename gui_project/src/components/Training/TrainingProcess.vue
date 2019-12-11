<template>
    <section class="training-letters">
			<h2>Обучение символов</h2>
			<TrainingControls @start="train" v-model="options"></TrainingControls>
			<Console></Console>
		</section>
</template>

<script>
import Console from '@/components/Console.vue'
import TrainingControls from '@/components/Training/TrainingControls.vue'
export default {
	name: 'TrainLetters',
	components: { Console, TrainingControls },
	props: {
		typeOfDataset: {
			type: String,
			required: true
		}
	},
	data () {
		return {
			options: {
				hiddenNodes: 100,
				epochs: 5
			}
		}
	},
	methods: {
		train () {
			let inputNodes = 0
			let outputNodes = 0

			switch (this.typeOfDataset) {
			case 'BLOCKS':
				inputNodes = 216000
				outputNodes = 40
				break
			case 'LETTER_BLOCKS':
				inputNodes = 216000
				outputNodes = 40
				break
			default:
				inputNodes = 784
				outputNodes = 10
				break
			}
			this.$api.apiFunction(
				this.$api.functionNames.TRAINING,
				{
					typeOfDataset: this.typeOfDataset,
					hiddenNodes: this.options.hiddenNodes,
					inputNodes: inputNodes,
					outputNodes: outputNodes,
					epochs: this.options.epochs
				}
			)
		}
	}
}
</script>

<style scoped lang="scss">
	.training-letters {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}
</style>

<template>
	<section class="container-sm training">
		<h2>Обучение символов</h2>
		<TrainingControls @start="train" v-model="options"></TrainingControls>
		<Console></Console>
	</section>
</template>

<script>
import Console from "@/components/Console.vue";
import TrainingControls from "@/views/training/TrainingControls.vue";
import eventBus from "@/utils/EventBus";

export default {
	name: "TrainLetters",
	components: { Console, TrainingControls },
	props: {
		payload: {
			type: String,
			default: "NONE"
		}
	},
	data() {
		return {
			options: {
				hiddenNodes: 100,
				epochs: 5
			}
		};
	},
	watch: {
		payload() {
			eventBus.$emit("clearConsole");
		}
	},
	methods: {
		train() {
			const inputNodes = 784;
			const outputNodes = 10;
			this.$store.dispatch("training", {
				typeOfDataset: this.payload,
				hiddenNodes: this.options.hiddenNodes,
				inputNodes: inputNodes,
				outputNodes: outputNodes,
				epochs: this.options.epochs
			});
		}
	}
};
</script>

<style scoped lang="scss">
.training {
	display: flex;
	flex-direction: column;
}
</style>

<template>
	<Tabs :tabs="tabs"></Tabs>
</template>

<script>
import TrainingProcess from "@/views/training/TrainingProcess.vue";
import Tabs from "@/components/Tabs.vue";
export default {
	name: "Training",
	components: { Tabs },
	data() {
		return {
			tabs: [
				{
					title: "Обучение символов",
					component: TrainingProcess,
					payload: "LETTERS"
				},
				{
					title: "Обучение блоков ответов",
					component: TrainingProcess,
					payload: "BLOCKS"
				},
				{
					title: "Обучение блоков символов",
					component: TrainingProcess,
					payload: "LETTERS_BLOCK"
				}
			]
		};
	}
};
</script>

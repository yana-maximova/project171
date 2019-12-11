<template>
  <section class="training">
		<NetTypeTabs v-model="typeOfDataset" :tabs="tabs"></NetTypeTabs>
		<TrainingProcess :typeOfDataset="typeOfDataset"></TrainingProcess>
  </section>
</template>

<script>
import TrainingProcess from '@/components/Training/TrainingProcess.vue'
import NetTypeTabs from '@/components/NetTypeTabs'
export default {
	name: 'Training',
	components: { NetTypeTabs, TrainingProcess },
	data () {
		return {
			tabs: [
				{
					payload: 'LETTERS',
					title: 'Обучение символов'
				},
				{
					payload: 'BLOCKS',
					title: 'Обучение блоков ответов'
				},
				{
					payload: 'LETTER_BLOCKS',
					title: 'Обучение блоков символов'
				}
			],
			typeOfDataset: 'LETTERS'
		}
	}
}
</script>

<style scoped lang="scss">
	.training {
		display: flex;
		flex-direction: column;
		margin: 1em 0;
		width: 100%;
	}
</style>

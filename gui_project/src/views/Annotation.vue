<template>
	<section class="annotation">
		<NetTypeTabs v-model="typeOfDataset" :tabs="tabs"></NetTypeTabs>
		<router-view></router-view>
	</section>
</template>

<script>
import NetTypeTabs from '@/components/NetTypeTabs.vue'
export default {
	name: 'Annotation',
	components: { NetTypeTabs },
	data () {
		return {
			answerBlocks: [],
			reader: null,
			tabs: [
				{
					payload: 'BLOCKS',
					title: 'Обучение блоков ответов'
				},
				{
					payload: 'LETTER_BLOCKS',
					title: 'Обучение блоков символов'
				}
			],
			typeOfDataset: 'BLOCKS'
		}
	},
	methods: {
		async loadImage (item) {
			return new Promise(resolve => {
				this.reader.onload = (e) => {
					resolve(e.target.result)
				}
				this.reader.readAsDataURL(item)
			})
		},
		async setImages (e) {
			this.reader = new FileReader()
			for (let item of [...e.target.files]) {
				const content = await this.loadImage(item)
				this.answerBlocks.push({
					blocks: [],
					file: item.name,
					image: content
				})
			}
		}
		// ,
		// selectImages (e) {
		// 	this.$refs.inputImage.click()
		// }
	}
}
</script>

<style scoped lang="scss">
	.annotation {
		display: flex;
		flex-direction: column;
		margin: 1em 0;
		width: 100%;
	}
</style>

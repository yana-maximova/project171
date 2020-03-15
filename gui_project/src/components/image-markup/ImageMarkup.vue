<template>
	<div class="editor">
		<div v-if="showControls" class="d-flex justify-content-start my-1">
			<button class="btn-icon mr-2" @click="scale(0.1)">
				<font-awesome-icon icon="search-plus" />
			</button>
			<button class="btn-icon mr-2" @click="scale(-0.1)">
				<font-awesome-icon icon="search-minus" />
			</button>
			<button class="btn-icon" @click="addBlock">
				<font-awesome-icon icon="th" />
			</button>
		</div>
		<div class="work-area bordered">
			<span v-if="isEmpty">Выберите файл для обработки</span>
			<div v-show="!isEmpty" class="image-area">
				<div
					class="content"
					ref="content"
					:style="{
						width: `${imageSize.width}px`,
						height: `${imageSize.height}px`,
						transfom: `scale${scaled}px`
					}"
				>
					<canvas class="canvas" ref="canvas"></canvas>
					<div v-if="!isEmpty">
						<Block
							v-for="(block, key) in value"
							:key="key"
							v-model="value[key]"
							@remove="remove(key)"
						>
						</Block>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Block from "@/components/image-markup/Block.vue";
export default {
	name: "ImagesEditor",
	components: { Block },
	props: {
		value: {
			type: Array,
			default: () => []
		},
		imageSize: {
			type: Object,
			required: true
		},
		image: {
			type: Array,
			default: () => []
		},
		showControls: {
			type: Boolean,
			default: () => true
		}
	},
	data() {
		return {
			scaled: 1
		};
	},
	computed: {
		isEmpty() {
			return this.value === null;
		}
	},
	methods: {
		addBlock() {
			this.value.push({
				top: 0,
				left: 0,
				width: 300,
				height: 100
			});
		},
		remove(key) {
			this.value.splice(key, 1);
		},
		scale(step) {
			if ((this.scaled > 1 && step < 0) || (this.scaled < 3 && step > 0)) {
				this.scaled += step;
			}
			this.$refs.content.style.transform = `scale(${this.scaled})`;
		},
		load() {
			if (this.isEmpty) return;
			const ctx = this.$refs.canvas.getContext("2d");
			const imageData = ctx.createImageData(
				this.imageSize.width,
				this.imageSize.height
			);
			this.$refs.canvas.width = this.imageSize.width;
			this.$refs.canvas.height = this.imageSize.height;
			const len = imageData.data.length;
			let j = 0;
			for (let i = 0; i < len; i += 4) {
				imageData.data[i] = this.image[j];
				imageData.data[i + 1] = this.image[j];
				imageData.data[i + 2] = this.image[j];
				imageData.data[i + 3] = 255;
				j++;
			}
			ctx.putImageData(imageData, 0, 0);
		}
	},
	watch: {
		image: function() {
			this.load();
		}
	}
};
</script>

<style scoped lang="scss">
.editor {
	height: 70vh;
}
.work-area {
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: white;
}

.image-area {
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	background: white;
	width: 100%;
	height: 100%;
	margin: 0 auto;
	overflow: scroll;

	.content {
		position: relative;
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		transform: scale(1);
	}
}
.controls {
	z-index: var(--zindex-overlay);

	.control {
		margin-right: 0.5em;
	}
}
</style>

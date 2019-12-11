<template>
  <div class="annotation-blocks">
    <JsonViewer
      :jsonContent="selectedImage"
      v-if="showJson"
      @hideJson="showJson = false"
    ></JsonViewer>
    <div class="controls">
      <input ref="inputImage" type="file" class="hidden" @change="setImages" accept=".jpg, .jpeg, .png" multiple>
      <div class="btn-icon" @click="$refs.inputImage.click()">
        <font-awesome-icon icon="plus" />
      </div>
			<div class="btn-icon" :class="{ disabled: !modified }" @click="save">
				<font-awesome-icon icon="save" />
			</div>
    </div>
    <div class="content">
      <div class="list">
        <AnnotationsList
          :items="images"
          @viewJson="showJson = true"
          @selected="selectImage($event)"
        ></AnnotationsList>
      </div>
      <div class="image-editor">
        <ImageEditor
          :showBlockControls="true"
          v-model="selectedImage"
          :imageSize="imageSize"
        ></ImageEditor>
      </div>
    </div>
  </div>
</template>

<script>
import ImageEditor from '@/components/ImageEditor/ImageEditor.vue'
import AnnotationsList from '@/components/Annotations/AnnotationsList.vue'
import JsonViewer from '@/components/JsonViewer.vue'
import eventBus from '@/utils/EventBus'

export default {
	name: 'AnnotationBlocks',
	components: {
		AnnotationsList,
		ImageEditor,
		JsonViewer
	},
	data () {
		return {
			images: [],
			reader: null,
			selectedImage: null,
			showJson: false,
			canvas: null,
			imageSize: {
				width: 400,
				height: 540
			},
			modified: false,
			loading: false
		}
	},
	watch: {
		images: {
			deep: true,
			handler: function () {
				if (!this.loading)	{
					this.modified = true
				} else {
					this.loading = false
				}
			}
		}
	},
	methods: {
		async loadImage (item) {
			const ctx = this.canvas.getContext('2d')
			const grayscaleImage = this.grayscaleImage
			const { width, height } = this.imageSize
			return new Promise(resolve => {
				this.reader.onload = (e) => {
					const image = new Image()
					image.onload = function () {
						ctx.canvas.width = width
						ctx.canvas.height = height
						ctx.drawImage(image, 0, 0, width, height)
						resolve({
							image: ctx.canvas.toDataURL('image/jpeg', 1),
							model: grayscaleImage(ctx.getImageData(0, 0, width, height).data)
						})
					}
					image.src = e.target.result
				}
				this.reader.readAsDataURL(item)
			})
		},
		async setImages (e) {
			this.reader = new FileReader()
			for (let item of [...e.target.files]) {
				const content = await this.loadImage(item)
				this.images.push({
					blocks: [],
					file: item.name,
					image: content.image,
					model: content.model
				})
			}
		},
		grayscaleImage (data) {
			const len = data.length
			let result = []
			for (let i = 0; i < len; i += 4) {
				const value = (data[i] + data[i + 1] + data[i + 2]) / 3
				result.push(value.toFixed(0))
			}
			return result.join(',')
		},
		selectImage (e) {
			this.selectedImage = this.images[e.key]
		},
		async save () {
			if (this.modified) {
				this.$api.apiFunction(this.$api.functionNames.SAVE_ANNOTATIONS_BLOCK,	{
					data: this.images
				})
				this.modified = false
			}
		},
		startLoad () {
			this.loading = true
			this.$api.apiFunction(this.$api.functionNames.GET_ANNOTATIONS_BLOCK)
		},
		load (items) {
			this.images = items.data
			this.loading = false
		}
	},
	mounted () {
		this.canvas = document.createElement('canvas')
		eventBus.$on('annotations', this.load)
		this.startLoad()
	},
	beforeDestroy () {
		eventBus.$off('annotation', this.load)
	}
}
</script>

<style scoped lang="scss">
  .annotation-blocks {
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .content {
    display: flex;
    justify-content: space-around;
  }
  .controls {
		display: flex;
    margin: 1em 0;
  }
  .list {
    width: 40%;
    margin-right: .5em;
    background-color: white;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .image-editor {
    width: 60%;
    height: 70vh;
  }
	.disabled {
		background-color: var(--gray-color);
	}
</style>

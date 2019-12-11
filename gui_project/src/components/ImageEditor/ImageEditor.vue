<template>
  <div class="editor">
    <div class="work-area bordered">
      <span v-if="isEmpty">Выберите файл для обработки</span>
      <section v-show="!isEmpty" class="image-area">
        <div class="controls">
          <button class="btn-icon control" @click="scale(.1)">
            <font-awesome-icon icon="search-plus" />
          </button>
          <button class="btn-icon control" @click="scale(-.1)">
            <font-awesome-icon icon="search-minus" />
          </button>
          <button class="btn-icon control" @click="addBlock">
            <font-awesome-icon icon="th" />
          </button>
        </div>
        <div
          class="content"
          ref="content"
          :style="{
            width: `${imageSize.width}px`,
            height: `${imageSize.height}px`
          }"
        >
          <canvas class="canvas" ref="canvas"></canvas>
          <div v-if="!isEmpty">
            <Block
              v-for="(block, key) in value.blocks"
              :key="value.file+key"
              v-model="value.blocks[key]"
              :scaleFactor="scaled"
							@remove="remove(key)"
            >
            </Block>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Block from '@/components/ImageEditor/Block.vue'

export default {
	name: 'ImagesEditor',
	components: { Block },
	props: {
		value: {
			type: Object,
			default: null
		},
		imageSize: {
			type: Object,
			required: true
		}
	},
	data () {
		return {
			scaled: 1
		}
	},
	computed: {
		isEmpty () {
			return this.value === null
		}
	},
	methods: {
		addBlock () {
			this.value.blocks.push({
				top: 0,
				left: 0,
				width: 300,
				height: 100
			})
		},
		remove (key) {
			this.value.blocks.splice(key, 1)
		},
		scale (step) {
			if (
				(this.scaled > 1 && step < 0) ||
				(this.scaled < 3 && step > 0)
			) {
				// this.scaled += step
			}
			// this.$refs.content.style.transform = `scale(${this.scaled})`
		},
		load () {
			if (this.isEmpty) return
			const image = new Image()
			const ctx = this.$refs.canvas.getContext('2d')
			image.onload = function () {
				ctx.canvas.width = image.width
				ctx.canvas.height = image.height
				ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height)
			}
			image.src = this.value.image
		}
	},
	watch: {
		value: {
			deep: true,
			handler: function () { this.load() }
		}
	},
	mounted () {
		this.load()
	}
}
</script>

<style scoped lang="scss">
  .editor {
    height: 100%;
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
    flex-direction: column;
    justify-content: flex-start;
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
    display: flex;
    justify-content: flex-start;
    position: sticky;
    left: 0.5em;
    top: 0.5em;
    z-index: var(--zindex-overlay);

    .control {
      margin-right: .5em;
    }
  }
</style>

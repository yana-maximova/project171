<template>
	<div
		ref="block"
		class="block"
		@mousedown.prevent.stop="startMove($event)"
		@mouseup.prevent.stop="stop"
		@mousemove.prevent.stop="move($event)"
		:style="{
			top: `${value.top}px`,
			left: `${value.left}px`,
			width: `${value.width}px`,
			height: `${value.height}px`
		}"
	>
		<div
			class="remove"
			@click.stop.prevent="remove"
		>x</div>
		<div
			class="resize"
			@mousedown.prevent.stop="startResize($event)"
			@mouseup.prevent.stop="stop"
			@mouseleave.prevent.stop="stop"
			@mousemove.prevent.stop="resize($event)"
		></div>
	</div>
</template>

<script>
export default {
	name: 'Block',
	props: {
		value: {
			type: Object,
			default: () => {}
		},
		scaleFactor: {
			type: Number,
			default: 1
		}
	},
	data () {
		return {
			moveble: false,
			resizeble: false,
			deltaX: 0,
			deltaY: 0
		}
	},
	methods: {
		startMove (e) {
			this.moveble = true
			this.deltaX = e.x - this.value.left
			this.deltaY = e.y - this.value.top
		},
		stop () {
			this.moveble = false
			this.resizeble = false
			// this.$emit('input', this.value)
		},
		move (e) {
			if (this.moveble) {
				const x = e.x - this.deltaX
				const y = e.y - this.deltaY
				this.$emit('input', {
					left: x,
					top: y,
					width: this.value.width,
					height: this.value.height
				})
			}
		},
		startResize (e) {
			this.resizeble = true
			this.deltaX = e.x - this.value.width
			this.deltaY = e.y - this.value.height
		},
		resize (e) {
			if (this.resizeble) {
				const x = e.x - this.deltaX
				const y = e.y - this.deltaY
				this.$emit('input', {
					left: this.value.left,
					top: this.value.top,
					width: x,
					height: y
				})
			}
		},
		remove () {
			this.$emit('remove')
		}
	}
}
</script>

<style scoped lang="scss">
	.block {
		position: absolute;
		border: 2px solid red;
		background: rgba(255, 0, 0, .3);
		cursor: pointer;
		z-index: 10;

		.resize {
			position: absolute;
			left: calc(100% - 10px);
			top: calc(100% - 10px);
			background: red;
			width: 10px;
			height: 10px;
			cursor: col-resize;
		}

		.remove {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			left: 0;
			top: 0;
			border: 1px solid red;
			background: white;
			width: 1.2em;
			height: 1.2em;
			font-size: 0.8rem;
			font-weight: bold;
			cursor: pointer;
		}
	}
</style>

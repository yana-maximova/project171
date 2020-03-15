<template>
	<DragResize
		:isActive="true"
		:w="position.width"
		:h="position.height"
		:x="position.left"
		:y="position.top"
		:minw="20"
		:minh="15"
		v-on:resizestop="change"
		v-on:dragstop="change"
		class="block"
	>
		<div class="remove" @click.stop="remove">x</div>
	</DragResize>
	<!--	<div-->
	<!--		ref="block"-->
	<!--		class="block"-->
	<!--		@mousedown.stop="startMove($event)"-->
	<!--		@mouseup.stop="stop"-->
	<!--		@mouseleave.stop="stop"-->
	<!--		@mousemove.stop="move($event)"-->
	<!--		:style="{-->
	<!--			top: `${position.top}px`,-->
	<!--			left: `${position.left}px`,-->
	<!--			width: `${position.width}px`,-->
	<!--			height: `${position.height}px`-->
	<!--		}"-->
	<!--	>-->
	<!--		<div-->
	<!--			class="remove"-->
	<!--			@click.stop="remove"-->
	<!--		>x</div>-->
	<!--		<div-->
	<!--			class="resize"-->
	<!--			@mousedown.stop="startResize($event)"-->
	<!--			@mouseup.stop="stop"-->
	<!--			@mouseleave.stop="stop"-->
	<!--			@mousemove.stop="resize($event)"-->
	<!--		></div>-->
	<!--	</div>-->
</template>

<script>
import DragResize from "vue-drag-resize";

export default {
	name: "Block",
	components: { DragResize },
	props: {
		value: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			position: {}
		};
	},
	methods: {
		change(newRect) {
			this.position.top = newRect.top;
			this.position.left = newRect.left;
			this.position.width = newRect.width;
			this.position.height = newRect.height;
			this.$emit("input", this.position);
		},
		remove() {
			this.$emit("remove");
		}
	},
	mounted() {
		this.position = { ...this.value };
	},
	watch: {
		value() {
			this.position = { ...this.value };
		}
	}
};
</script>

<style scoped lang="scss">
.block {
	position: absolute;
	border: 2px solid red;
	background: rgba(255, 0, 0, 0.3);
	cursor: pointer;
	z-index: 10;

	.remove {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 5%;
		top: calc(50% - 0.6em);
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

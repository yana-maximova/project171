<template>
	<div class="container tester">
		<h3>Страница обработки тестов учеников <strong>в разработке</strong></h3>
		<div class="d-flex my-1">
			<input
				ref="inputImage"
				type="file"
				class="hidden"
				@change="addImage($event)"
				accept=".jpg, .jpeg, .png"
				multiple
			/>
			<div class="btn-icon my-1" @click="selectImage">
				<font-awesome-icon icon="plus" />
			</div>
		</div>
		<div class="col-12">
			<ImageMarkup
				:showControls="false"
				:showBlockControls="true"
				:image="innerImage.image"
				:imageSize="{
					width: imageSize.width,
					height: imageSize.height
				}"
			></ImageMarkup>
		</div>
	</div>
</template>

<script>
import ImageMarkup from "@/components/image-markup/ImageMarkup.vue";
import { imageLoader } from "@/utils/mixins/image-loader.mixin.js";

export default {
	name: "Tester",
	components: {
		ImageMarkup
	},
	mixins: [imageLoader],
	methods: {
		selectImage() {
			this.$refs.inputImage.click();
		}
	}
};
</script>

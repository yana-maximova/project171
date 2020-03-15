<template>
	<Spinner v-if="loading" info=""></Spinner>
	<div v-else class="d-flex flex-column">
		<JsonViewer
			:jsonContent="selectedImage.blocks"
			v-if="showJson"
			@hideJson="showJson = false"
		></JsonViewer>
		<div class="row">
			<div class="col-md-4 list">
				<AnnotationsList
					:items="images"
					@viewJson="showJson = true"
					@selected="selectImage($event)"
					@remove="removeImage($event)"
					@addImage="addImage($event)"
					@saveImages="saveImages"
					:modified="modified"
				></AnnotationsList>
			</div>
			<div class="col-md-8">
				<ImageMarkup
					:showBlockControls="true"
					v-model="selectedImage.blocks"
					:image="selectedImage.image"
					:imageSize="{
						width: selectedImage.width,
						height: selectedImage.height
					}"
				></ImageMarkup>
			</div>
		</div>
	</div>
</template>

<script>
import ImageMarkup from "@/components/image-markup/ImageMarkup.vue";
import AnnotationsList from "@/views/annotations/AnnotationsList.vue";
import JsonViewer from "@/components/JsonViewer.vue";
import { imageLoader } from "@/utils/mixins/image-loader.mixin.js";
import Spinner from "@/components/Spinner.vue";
import eventBus from "@/utils/EventBus";

const emptyImage = {
	blocks: [],
	image: []
};

export default {
	name: "Annotation",
	components: {
		AnnotationsList,
		ImageMarkup,
		JsonViewer,
		Spinner
	},
	mixins: [imageLoader],
	data() {
		return {
			selectedImage: emptyImage,
			showJson: false,
			modified: false,
			loading: true
		};
	},
	computed: {
		images() {
			return this.$store.getters.blockImages;
		}
	},
	watch: {
		images: {
			deep: true,
			handler: function() {
				this.modified = true;
			}
		}
	},
	methods: {
		selectImage(e) {
			this.selectedImage = this.images[e.key];
		},
		removeImage(e) {
			this.selectedImage = emptyImage;
			this.$store.commit("removeBlockImage", e.key);
		},
		saveImages() {
			if (this.modified) {
				console.log("save");
				this.$store.dispatch("saveBlockImages");
				this.modified = false;
			}
		},
		loadedHandler() {
			this.loading = false;
		}
	},
	mounted() {
		eventBus.$on("loaded", this.loadedHandler);
		this.$store.dispatch("loadBlockImages");
	},
	beforeDestroy() {
		eventBus.$off("loaded", this.loadedHandler);
	}
};
</script>

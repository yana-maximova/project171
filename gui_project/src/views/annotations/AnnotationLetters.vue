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
					typeBlocks="letterBlocks"
					:items="images"
					@viewJson="showJson = true"
					@selected="selectImage($event)"
					@remove="removeImage($event)"
					@addImage="addImage($event)"
					@saveImages="saveImages"
					@loading="loading = true"
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
	name: "AnnotationLetters",
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
			return this.$store.getters.letterBlockImages;
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
				this.$store.dispatch("saveBlockImages", { name: "letterBlocks" });
				this.modified = false;
			}
		},
		messageHandler(e) {
			this.message = e.messge;
		},
		loadedHandler() {
			this.loading = false;
		}
	},
	mounted() {
		eventBus.$on("logFromPython", this.messageHandler);
		eventBus.$on("loaded", this.loadedHandler);
		this.$store.dispatch("loadBlockImages", "letterBlocks");
	},
	beforeDestroy() {
		eventBus.$off("logFromPython", this.messageHandler);
		eventBus.$off("loaded", this.loadedHandler);
	}
};
</script>

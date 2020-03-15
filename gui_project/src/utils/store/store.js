import Vue from "vue";
import Vuex from "vuex";
import eventBus from "@/utils/EventBus";

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		blockImages: [],
		letterBlockImages: [],
		dataSource: null
	},
	getters: {
		blockImages(state) {
			return state.blockImages;
		},
		letterBlockImages(state) {
			return state.letterBlockImages;
		},
		dataSource(state) {
			return state.dataSource;
		}
	},
	mutations: {
		setDataSource(state, source) {
			state.dataSource = source;
		},
		setBlockImages(state, images) {
			if (images) {
				state.blockImages = images;
			}
			eventBus.$emit("loaded");
		},
		setLetterBlockImages(state, images) {
			if (images) {
				state.letterBlockImages = images;
			}
			eventBus.$emit("loaded");
		},
		addBlockImage(state, image) {
			state.blockImages.push(image);
		},
		removeBlockImage(state, key) {
			// state.blockImages.splice(key, 1);
		}
	},
	actions: {
		loadBlockImages({ state }, name = "blocks") {
			state.dataSource.getBlockImages({ name });
		},
		saveBlockImages({ state }, payload = { name: "blocks" }) {
			const name = payload.name;
			let data = {};
			if (name === "blocks") {
				data = state.blockImages;
			} else {
				data = state.letterBlockImages;
			}
			state.dataSource.saveBlockImages({
				data,
				name
			});
		},
		createLettersFromBlocks({ state }) {
			state.dataSource.createLettersFromBlocks();
		},
		training({ state }, options) {
			state.dataSource.training(options);
		}
	},
	modules: {}
});

export function getStore(dataSource) {
	store.commit("setDataSource", dataSource);
	eventBus.$on("annotations", event => {
		if (event.name === "blocks") {
			store.commit("setBlockImages", event.data.data);
		}
		if (event.name === "letterBlocks") {
			store.commit("setLetterBlockImages", event.data.data);
		}
	});
	return store;
}

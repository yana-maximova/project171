import { getApi } from "./remote.api";

const functionNames = {
	GET_BLOCKS: "getBlocks",
	SAVE_BLOCKS: "saveBlocks",
	CREATE_LETTERS_FROM_BLOCKS: "createLettersFromBlocks",
	GET_LETTER_BLOCKS: "getLetterBlocks",
	SAVE_LETTER_BLOCKS: "saveLetterBlocks",
	TRAINING: "trainingNet"
};

export class RemoteDataSource {
	constructor() {
		this.api = getApi();
	}

	getBlockImages(name) {
		this.api.apiFunction(functionNames.GET_BLOCKS, name);
	}

	saveBlockImages(images) {
		this.api.apiFunction(functionNames.SAVE_BLOCKS, images);
	}

	createLettersFromBlocks() {
		this.api.apiFunction(functionNames.CREATE_LETTERS_FROM_BLOCKS);
	}

	training(
		options = {
			typeOfDataset: "NONE",
			hiddenNodes: 100,
			inputNodes: 704,
			outputNodes: 10,
			epochs: 5
		}
	) {
		this.api.apiFunction(functionNames.TRAINING, options);
	}
}

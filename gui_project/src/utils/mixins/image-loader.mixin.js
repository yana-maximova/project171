export const imageLoader = {
	data() {
		return {
			imageSize: {
				width: 400,
				height: 400
			},
			reader: null,
			canvas: null,
			innerImage: {}
		};
	},
	methods: {
		loadImage(item) {
			const ctx = this.canvas.getContext("2d");
			const grayscaleImage = this.grayscaleImage;
			const { width, height } = this.imageSize;
			return new Promise(resolve => {
				this.reader.onload = e => {
					const image = new Image();
					image.onload = function() {
						ctx.canvas.width = width;
						ctx.canvas.height = height;
						ctx.drawImage(image, 0, 0, width, height);
						resolve({
							image: grayscaleImage(ctx.getImageData(0, 0, width, height).data)
						});
					};
					image.src = e.target.result;
				};
				this.reader.readAsDataURL(item);
			});
		},
		async addImage(e) {
			this.reader = new FileReader();
			for (const item of [...e.target.files]) {
				const content = await this.loadImage(item);
				const data = {
					blocks: [],
					file: item.name,
					image: content.image,
					width: this.imageSize.width,
					height: this.imageSize.height
				};
				this.innerImage = data;
				this.$store.commit("addBlockImage", data);
			}
		},
		grayscaleImage(data) {
			const len = data.length;
			const result = [];
			for (let i = 0; i < len; i += 4) {
				const value = (data[i] + data[i + 1] + data[i + 2]) / 3;
				result.push(Math.round(value));
			}
			return result;
		}
	},
	mounted() {
		this.canvas = document.createElement("canvas");
	}
};

<template>
	<section class="list">
		<div class="d-flex my-1">
			<input
				ref="inputImage"
				type="file"
				class="hidden"
				@change="$emit('addImage', $event)"
				accept=".jpg, .jpeg, .png"
				multiple
			/>
			<div class="btn-icon" @click="addItem">
				<font-awesome-icon icon="plus" />
			</div>
			<div
				class="btn-icon"
				:class="{ disabled: !modified }"
				@click="$emit('saveImages')"
			>
				<font-awesome-icon icon="save" />
			</div>
		</div>
		<div class="content">
			<table class="table table-sm table-hover">
				<tbody>
					<tr
						scope="row"
						v-for="(item, key) in items"
						:key="key"
						@click="selectItem(key)"
					>
						<td :class="{ selected: selectedItem === key }">{{ item.file }}</td>
						<td>
							<div class="d-flex justify-content-end">
								<a class="control" @click.prevent="viewJSON">
									<font-awesome-icon icon="eye" />
								</a>
								<a class="control" @click.prevent="removeItem(key)">
									<font-awesome-icon icon="trash" />
								</a>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
</template>

<script>
export default {
	props: {
		items: {
			type: Array,
			required: true
		},
		modified: {
			type: Boolean,
			required: true
		},
		typeBlocks: {
			type: String,
			default: "blocks"
		}
	},
	name: "AnnotationsList",
	data() {
		return {
			selectedItem: -1
		};
	},
	methods: {
		viewJSON() {
			this.$emit("viewJson");
		},
		removeItem(key) {
			this.$emit("remove", { key });
		},
		selectItem(key) {
			this.selectedItem = key;
			this.$emit("selected", { key });
		},
		addItem() {
			this.$emit("loading");
			if (this.typeBlocks === "letterBlocks") {
				this.$store.dispatch("createLettersFromBlocks");
			} else {
				this.$refs.inputImage.click();
			}
		}
	}
};
</script>

<style scoped lang="scss">
.content {
	background-color: white;
	overflow-y: scroll;
	overflow-x: hidden;
	min-height: 70vh;
}
.selected {
	background-color: var(--primary);
}
.control {
	background: rgba(0, 0, 0, 0);
	color: var(--secondary);
	margin-right: 1em;
}
.disabled {
	background-color: var(--gray-color);
}
</style>

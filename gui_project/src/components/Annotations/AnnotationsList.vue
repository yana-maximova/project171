<template>
  <div>
  <table>
    <tr :class="{ selected: selectedItem === key }" v-for="(item, key) in items" :key="key" @click="selectItem(key)">
      <td class="name">{{ item.file }}</td>
      <td class="controls">
        <button class="btn-icon control" @click="viewJSON">
          <font-awesome-icon icon="eye" />
        </button>
        <button class="btn-icon control trash"  @click="removeItem(key)">
          <font-awesome-icon icon="trash" />
        </button>
      </td>
    </tr>
  </table>
  </div>
</template>

<script>
export default {
	props: {
		items: {
			type: Array,
			required: true
		}
	},
	name: 'AnnotationsList',
	data () {
		return {
			selectedItem: -1
		}
	},
	methods: {
		viewJSON () {
			this.$emit('viewJson')
		},
		removeItem (key) {
			this.$emit('remove', { key })
		},
		selectItem (key) {
			this.selectedItem = key
			this.$emit('selected', { key })
		}
	}
}
</script>

<style scoped lang="scss">
  table {
    width: 100%;
  }
  tr {
    border: 1px solid var(--table-color);
    background-color: white;
    &.selected {
      background-color: var(--primary)
    }
  }
  .name {
    width: 80%;
    padding-left: .5em;
  }
  .controls {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .control {
      font-size: 1rem;
      margin: .1em;
      background-color: var(--table-color);
    }
    .trash {
      color: var(--remove-color);
    }
  }
</style>

<template>
  <section class="viewer">
    <div class="overlay" @click.stop="hide"></div>
    <div class="content">
      <button class="btn-icon close" @click.stop="hide">
        <font-awesome-icon icon="times-circle" />
      </button>
      <pre>{{ jsonContent }}</pre>
    </div>
  </section>
</template>

<script>
export default {
	name: 'JsonViewer',
	props: {
		jsonContent: null
	},
	data () {
		return {
		}
	},
	methods: {
		hide () {
			this.$emit('hideJson')
		}
	}
}
</script>

<style scoped lang="scss">
  .overlay {
    position: absolute;
    z-index: var(--zindex-overlay);
    background-color: black;
    opacity: 0.7;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: var(--gray-color);
    margin: 2em 10em;
    z-index: var(--zindex-overlay-content);
    padding: 1em;

    pre {
      width: 100%;
      height: 100%;
      /*margin: .5em;*/
      white-space: pre-wrap;
      white-space: -moz-pre-wrap;
      white-space: -o-pre-wrap;
      word-wrap: break-word;
      overflow-y: scroll;
      overflow-x: hidden;
    }

    .close {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background-color: white;
      color: black;
      font-weight: bold;
      font-size: 1.2rem;
      width: 1.2em;
      height: 1.2em;
      right: -1.1em;
      top: -1.1em;
    }
  }
</style>

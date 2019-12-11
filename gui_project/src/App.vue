<template>
  <div class="container">
    <Header></Header>
    <main class="main wrap">
      <router-view/>
    </main>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
	name: 'App',
	components: {
		Header
	}
}
</script>

<style lang="scss">
@import './scss/style';
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color);
}
.main {
	display: flex;
	flex-grow: 1;
	align-items: stretch;
}
</style>

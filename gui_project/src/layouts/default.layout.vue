<template>
	<div class="container-fluid d-flex flex-column layout">
		<header>
			<slot name="header">
				<Header />
			</slot>
		</header>
		<main class="main flex-grow-1">
			<slot></slot>
		</main>
		<footer>
			<slot name="footer"></slot>
		</footer>
	</div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
	name: "Layout",
	components: {
		Header
	}
};
</script>

<style lang="scss" scoped>
.layout {
	min-height: 100vh;
}
.main {
	display: flex;
}
</style>

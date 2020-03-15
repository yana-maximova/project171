<template>
	<Layout>
		<router-view />
	</Layout>
</template>

<script>
import Layout from "./layouts/default.layout";
export default {
	name: "App",
	components: { Layout }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap&subset=cyrillic");

:root {
	--zindex-overlay: 10;
	--zindex-overlay-content: 11;

	--primary: #73b0fc;
	--secondary: #2499fa;
	--text-color: #2c3e50;
	--bg-color: #f4f4f4;
	--gray-color: #d2d2d2;
	--icon-color: #787878;
	--table-color: #157575;
	--remove-color: #ff8c85;
	--error: #ff616e;
	--message: #00ff00;
	--warning: #ffaf11;
}

body {
	font-family: "Roboto", Arial, sans-serif;
	font-size: 1rem;
	background-color: var(--bg-color);
}

ul {
	list-style: none;
}

.hidden {
	clip: rect(1px, 1px, 1px, 1px);
	height: 1px;
	width: 1px;
	overflow: hidden;
	position: absolute !important;
}

.btn-icon {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1.5rem;
	width: 2em;
	height: 2em;
	background-color: var(--secondary);
	border: none;
	border-radius: 0.2em;
	opacity: 1;
	color: white;
	margin: 0.2em;
	transition: opacity 0.3s;

	&:hover {
		opacity: 0.8;
	}
}

#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: var(--text-color);
	background-color: var(--bg-color);
}
</style>

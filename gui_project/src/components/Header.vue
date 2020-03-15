<template>
	<div
		class="header_content d-flex justify-content-between align-items-center py-2 px-4"
	>
		<div class="logo">
			<router-link to="/">
				<img
					src="../assets/logo.png"
					width="30px"
					height="30px"
					alt="логотип"
				/>
			</router-link>
		</div>
		<nav class="menu">
			<ul
				class="menu__list d-flex justify-content-around align-items-center mb-1"
			>
				<li class="menu__link mr-3">
					<router-link to="/tester">Тестирование</router-link>
				</li>
				<li class="menu__link mr-3">
					<router-link to="/annotation">Аннотации</router-link>
				</li>
				<li class="menu__link mr-3">
					<router-link to="/training">Обучение сети</router-link>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
export default {
	name: "Header"
};
</script>

<style lang="scss">
.header_content {
	border-bottom: 2px solid var(--secondary);
}

.menu__list {
	a {
		font-weight: bold;
		color: var(--text-color);
		text-decoration: none;
		transition: color 0.3s;

		&.router-link-exact-active,
		&:hover {
			color: var(--secondary);
			text-decoration: none;
		}
	}
}
</style>

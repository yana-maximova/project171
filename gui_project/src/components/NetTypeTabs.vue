<template>
	<nav class="tabs">
		<ul class="tabs__list">
			<li
				v-for="(tab, key) in tabs"
				:key="key"
			>
				<div
					@click="selectNetType(tab.payload)"
					class="btn-tab tabs__link"
					:class="{ active: tab.payload === value }"
				>
					{{ tab.title }}
				</div>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	name: 'NetTypeTabs',
	props: {
		tabs: {
			type: Array,
			required: true
		},
		value: {
			type: String,
			required: true
		}
	},
	methods: {
		selectNetType (value) {
			this.$emit('input', value)
		}
	}
}
</script>

<style scoped lang="scss">
	.tabs {
		border-bottom: 1px solid var(--primary);

	.tabs__list {
		display: flex;
		flex-wrap: wrap;

		li {
			display: block;
		}
	}

	.tabs__link {
		text-decoration: none;
		&.active {
			background-color: var(--bg-color);
			color: var(--primary);
			font-weight: bold;
			}
	}
	}
</style>

<template>
	<!--	<ul class="my-3 nav nav-tabs nav-fill border border-primary">-->
	<!--		<li-->
	<!--			v-for="(tab, key) in tabs"-->
	<!--			:key="key"-->
	<!--			class="nav-item"-->
	<!--		>-->
	<!--			<a-->
	<!--				@click.prevent="selectNetType(tab.payload)"-->
	<!--				class="nav-link"-->
	<!--				:class="{ selected: tab.payload === value }"-->
	<!--			>-->
	<!--				{{ tab.title }}-->
	<!--			</a>-->
	<!--		</li>-->
	<!--	</ul>-->
	<div class="container-sm tabs">
		<ul class="tab-list">
			<li
				v-for="(tab, index) in tabs"
				:key="tab.title"
				@click="select(index)"
				:class="{ active: tab.isActive }"
			>
				{{ tab.title }}
			</li>
		</ul>
		<div class="tab-content">
			<transition name="fade" appear>
				<KeepAlive>
					<component
						class="tab-components"
						:is="tabs[selectedIndex].component"
						:payload="tabs[selectedIndex].payload"
					/>
				</KeepAlive>
			</transition>
		</div>
	</div>
</template>

<script>
export default {
	name: "Tabs",
	props: {
		tabs: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			selectedIndex: 0
		};
	},
	created() {
		this.select(0);
	},
	methods: {
		select(idx) {
			this.selectedIndex = idx;
			this.tabs.forEach((item, index) => {
				item.isActive = index === idx;
			});
		}
	}
};
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.7s;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}

.tabs {
	display: flex;
	flex-direction: column;
	margin-top: 1em;
}

.tab-list {
	list-style: none;
	display: flex;
	justify-content: flex-start;
	margin: 0;
	padding: 0;
}

.tab-list > li {
	background: var(--primary);
	padding: 0.5em;
	border: 1px solid black;
	border-top-right-radius: 10px;
	border-top-left-radius: 10px;
	cursor: pointer;
	transition: background 0.3s;
	color: var(--text-color);
}

.tab-list > li.active {
	border-bottom: none;
	background: white;
}

.tab-content {
	display: flex;
	margin: 0;
	padding: 0;
	flex-grow: 1;
	position: relative;
}

.tab-components {
	display: flex;
	margin: 0;
	padding: 0;
	flex-grow: 1;
	position: absolute;
	left: 0;
	bottom: 0;
	right: 0;
	top: 0;
}
</style>

<template>
	<Tabs :tabs="tabs"></Tabs>
</template>

<script>
import Annotation from "@/views/annotations/Annotation.vue";
import AnnotationLetters from "@/views/annotations/AnnotationLetters.vue";
import Tabs from "@/components/Tabs.vue";

export default {
	name: "Annotations",
	components: { Tabs },
	data() {
		return {
			tabs: [
				{
					title: "Аннотации блоков ответов",
					component: Annotation,
					payload: null
				},
				{
					title: "Аннотации блоков символов",
					component: AnnotationLetters,
					payload: null
				}
			]
		};
	}
};
</script>

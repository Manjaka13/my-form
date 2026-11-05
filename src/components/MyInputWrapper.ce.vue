<template>
	<div ref="rootEl" :class="computedClasses" :title="title">
		<label v-if="label" class="my-input-wrapper__label" :for="name">
			{{ label }}
		</label>

		<div v-if="!noDot" class="my-input-wrapper__dots"></div>
		
		<!-- Input content -->
		<div class="my-input-wrapper__content" :style="contentStyle">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import type { InputLayoutType } from "@/helpers/types";

/**
 * Wrapper for inputs
 */

interface IProps {
	label?: string;
	name?: string;
	myClass?: string;
	noDot?: boolean;
	breakpoint?: string | number;
	width?: string | number;
	title?: string;
	layout?: InputLayoutType;
}

const props = withDefaults(defineProps<IProps>(), {
	noDot: false,
});

const isColumn = computed(() => {
	const bp = Number(props.breakpoint);
	if (!Number.isNaN(bp)) if (bp) return width.value < bp;
	return false;
});
const computedClasses = computed(() => [
	"my-input-wrapper",
	{
		"my-input-wrapper--column": (props.layout === "column" || isColumn.value) && !(props.layout === "inline"),
	},
	props.myClass,
]);
const contentStyle = computed(() => {
	let width: string | number = Number(props.width);

	return {
		width: (props.layout === "column" || isColumn.value) ? "100%" : Number.isNaN(width) ? "auto" : width + "px"
	};
});

let observer: ResizeObserver | undefined;

const rootEl = ref<HTMLElement | null>(null);
const width = ref<number>(Infinity);

onMounted(() => {
	if (rootEl.value) {
		observer = new ResizeObserver(([entry]) => {
			width.value = entry.contentRect.width;
		});
		observer.observe(rootEl.value);
	}
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<style lang="css">
@import "@/styles/my-input-wrapper.css";
</style>

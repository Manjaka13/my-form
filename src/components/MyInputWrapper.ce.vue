<template>
	<div ref="rootEl" :class="computedClasses">
		<label v-if="label" class="my-input-wrapper__label" :for="name">
			{{ label }}
			<svg
				v-if="!!error"
				class="warning"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width="1em"
				height="1em"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<path d="M12 3 22 20H2Z" />
				<path d="M12 9v5" />
				<circle cx="12" cy="17" r="0.5" fill="currentColor" />
			</svg>
		</label>

		<div v-if="!noDot" class="my-input-wrapper__dots"></div>

		<div class="my-input-wrapper__content">
			<!-- Input icon -->
			<div v-if="icon" class="icon-box">
				<span :class="icon">x</span>
			</div>

			<!-- Input content -->
			<slot></slot>

			<!-- Error message -->
			<p v-if="error" class="error-box" role="alert">
				{{ error }}
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

/**
 * Wrapper for inputs
 */

interface IProps {
	label?: string;
	name?: string;
	error?: string;
	icon?: string;
	myClass?: string;
	noDot?: boolean;
	breakpoint?: string | number;
	title?: string;
}

const props = withDefaults(defineProps<IProps>(), {
	noDot: false,
});

const isColumn = computed(() => {
	const bp = Number(props.breakpoint);
	if (!Number.isNaN(bp))
		if (bp) return width.value < bp;
	return false;
});

const computedClasses = computed(() => [
	"my-input-wrapper",
	{
		"my-input-wrapper--has-error": !!props.error,
		"my-input-wrapper--column": isColumn.value,
	},
	props.myClass,
]);

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

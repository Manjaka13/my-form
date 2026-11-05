<template>
	<div :class="computedClasses">
		<p ref="contentRef" class="my-clamp__content" :class="{ 'is-expanded': expanded }" :style="contentStyle">
			<slot />
		</p>

		<button v-if="expandable && clamped" class="my-clamp__toggle" type="button" @click="toggle">
			{{ more }}
		</button>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from "vue";

interface IProps {
	lines?: number;
	more?: string;
	expandable?: boolean;
	justify?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
	lines: 3,
	more: "Voir plus",
	expandable: true,
	justify: false,
});

const expanded = ref(false);
const clamped = ref(false);
const contentRef = ref<HTMLElement | null>(null);

let resizeObserver: ResizeObserver | undefined;

const computedClasses = computed(() => [
	"my-clamp",
	{
		"my-clamp--justify": props.justify,
	}
]);
const contentStyle = computed(() => ({
	"--my-clamp-lines": props.lines,
	maxHeight: expanded.value ? "none" : undefined,
}));

function checkOverflow() {
	const element = contentRef.value;
	if (!element) return;

	const previous = element.style.webkitLineClamp;
	element.style.webkitLineClamp = "unset";

	const fullHeight = element.scrollHeight;

	element.style.webkitLineClamp = String(props.lines);
	const clampedHeight = element.clientHeight;

	element.style.webkitLineClamp = previous;

	clamped.value = fullHeight > clampedHeight + 1;
}

function toggle() {
	expanded.value = !expanded.value;
}

onMounted(async () => {
	await nextTick();
	checkOverflow();

	if (contentRef.value) {
		resizeObserver = new ResizeObserver(checkOverflow);
		resizeObserver.observe(contentRef.value);
	}
});

onBeforeUnmount(() => {
	resizeObserver?.disconnect();
});
</script>

<style>
@import "@/styles/my-clamp.css";
</style>

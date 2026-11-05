<template>
	<span :class="computedClasses"></span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ColorType } from "@/helpers/types";

/**
 * Loading spinner
 */

interface IProps {
	color?: ColorType;
  small?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
	color: "theme",
  small: false
});

const computedClasses = computed(() => [
  "my-spinner",
  `my-spinner--${props.color}`,
  props.small ? "my-spinner--small" : null
]);
</script>

<style lang="css">
@import "@/styles/my-spinner.css";
</style>

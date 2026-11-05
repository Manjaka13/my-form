<template>
	<button :type="type" :class="computedClasses" :disabled="disabled" @click="handleClick">
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { ColorType, ButtonType } from "@/helpers/types";
import { BUTTON_TYPES } from "@/helpers/const";
import { generateName } from "@/helpers/utils";

/**
 * Simple button
 */

interface IProps {
	name?: string;
	myClass?: string;
	color?: ColorType;
	disabled?: boolean;
	type?: ButtonType;
}

const props = withDefaults(defineProps<IProps>(), {
	color: "theme",
	disabled: false,
	type: BUTTON_TYPES[0],
});

const emit = defineEmits<{
	"my-click": [name: string];
}>();

const computedClasses = computed(() => [
	"my-button",
	`my-button--${props.color}`,
	{
		"my-button--disabled": !!props.disabled,
	},
	props.myClass,
]);

const internalName = ref(generateName("my-button", props.name));

function handleClick() {
  if (!props.disabled)
    emit("my-click", internalName.value);
}
</script>

<style lang="css">
@import "@/styles/my-button.css";
</style>

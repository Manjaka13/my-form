<template>
	<div :class="computedClasses" @click="handleClick">
		<div class="my-switch__inner"></div>
    <template v-if="!noText">
      <p class="my-switch__text my-switch__on">
        {{ value ? "ON" : "" }}
      </p>
      <p class="my-switch__text my-switch__off">
        {{ !value ? "OFF" : "" }}
      </p>
    </template>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { ColorType } from "@/helpers/types";
import { generateName } from "@/helpers/utils";

const emit = defineEmits<{
	"my-change": [name: string, value: boolean];
}>();

interface IProps {
	color?: ColorType;
	disabled?: boolean;
	value?: boolean;
  noText?: boolean;
  small?: boolean;
	name?: string;
}

const props = withDefaults(defineProps<IProps>(), {
	color: "theme",
	disabled: false,
  noText: false,
  small: false
});

const computedClasses = computed(() => [
	"my-switch",
	`my-switch--${props.color}`,
	{
		"my-switch--disabled": !!props.disabled,
		"my-switch--checked": !!props.value,
    "my-switch--small": !!props.small
	},
]);

const internalName = ref(generateName("my-input", props.name));

function handleClick() {
	if (!props.disabled) emit("my-change", internalName.value, !props.value);
}
</script>

<style lang="css">
@import "@/styles/my-switch.css";
</style>

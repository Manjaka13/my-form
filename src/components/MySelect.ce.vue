<template>
	<div :class="computedClasses">
		<select class="my-select__field" :name="internalName" :required="required" :disabled="disabled" :value="internalValue" @change="handleChange">
			<option value="" hidden>{{ placeholder }}</option>
			<option v-for="element of elements" :key="element.value" :value="element.value" :hidden="element.hide" :disabled="element.disabled">
				{{ element.label }}
			</option>
		</select>

		<!-- Shows any error -->
		<p v-if="error" class="my-eslect__error">
			<svg
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
			{{ error }}
		</p>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { generateName } from "@/helpers/utils";
import type { ErrorType, SelectElement } from "@/helpers/types";
import valid from "@/helpers/validation";

/**
 * Select component
 */

interface IProps {
	placeholder?: string;
	name?: string;
	required?: boolean;
	disabled?: boolean;
	value?: string | number;
	elements?: SelectElement[];
	small?: boolean;
  error?: string;
}

const props = withDefaults(defineProps<IProps>(), {
	placeholder: "Choose an option",
});

const emit = defineEmits<{
	"my-change": [name: string, value: string | number];
}>();

const computedClasses = computed(() => [
	"my-select",
	{
		"my-select--small": !!props.small,
		"my-select--disabled": !!props.disabled,
	},
]);
const internalValue = computed(() => props.value || "");

const internalName = ref(generateName("my-select", props.name));

function handleChange(event: Event) {
	const target = event.target as HTMLSelectElement;
  const newValue = target.value;
	emit("my-change", internalName.value, newValue);
}
</script>

<style lang="css">
@import "@/styles/my-select.css";
</style>

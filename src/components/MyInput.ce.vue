<template>
	<div :class="computedClasses">
		<input
			class="my-input__field"
			:id="internalName"
			:placeholder="placeholder"
			:value="internalValue"
			:required="required"
			:readonly="readonly"
			@input="handleInput"
			@change="handleChange"
			@focus="(e) => handleFocus(e, true)"
			@blur="(e) => handleFocus(e, false)"
		/>
		<p v-if="error" class="my-input__error">
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
import type { ErrorType, InputType } from "@/helpers/types";
import valid from "@/helpers/validation";

/**
 * Input component
 */

interface IProps {
	name?: string;
	error?: string;
	placeholder?: string;
	value?: string;
	type?: InputType;
	strongPassword?: boolean;
	required?: boolean;
	readonly?: boolean;
	small?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
	placeholder: "Enter a value",
	type: "text",
	strongPassword: true,
	small: false
});

const emit = defineEmits<{
	"my-input": [name: string, value: string | undefined];
	"my-change": [name: string | undefined, value: string | undefined];
	"my-focus": [name: string];
	"my-blur": [name: string];
	"my-error": [name: string, error: ErrorType | boolean];
}>();

const computedClasses = computed(() => [
	"my-input",
	{
		"my-input--has-error": !!props.error,
		"my-input--small": !!props.small
	}
]);
const internalValue = computed(() => props.value ?? "");

const internalName = ref(generateName("my-input", props.name));

function handleInput(event: Event) {
	const target = event.target as HTMLInputElement;
	emit("my-input", internalName.value, target.value || "");
}

function handleChange(event: Event) {
	const target = event.target as HTMLInputElement;
	emit("my-change", internalName.value, target.value || "");
}

function handleFocus(e: Event, focused: boolean) {
	if (focused) emit("my-focus", internalName.value);
	else {
		emit("my-blur", internalName.value);
		const target = e.target as HTMLInputElement;
		const error = checkInternalError(target.value);
		if (error) emit("my-error", internalName.value, error);
	}
}

function checkInternalError(value: string | number | undefined | null): ErrorType | undefined {
	if (props.required) {
		const test = valid["required"](value);
		if (typeof test !== "boolean") return test;
	}

	if (props.type === "email") return valid["email"](value);
	else if (props.type === "password") {
		if (props.strongPassword) return valid["strongPassword"](value);
		else return valid["password"](value);
	} else if (props.type === "number") return valid["number"](value);
	else if (props.type === "tel") return valid["phone"](value);
	else if (props.type === "url") return valid["url"](value);
	else if (props.type === "date") return valid["date"](value);
}
</script>

<style lang="css">
@import "@/styles/my-input.css";
</style>

<template>
	<my-input-wrapper :name="internalName" :myClass="myClass" :error="error" :icon="icon" :label="label">
		<input
			:id="internalName"
			:class="computedClass"
			:placeholder="placeholder"
			:value="internalValue"
			:required="required"
			:readonly="readonly"
			@input="handleInput"
			@change="handleChange"
			@focus="(e) => handleFocus(e, true)"
			@blur="(e) => handleFocus(e, false)"
		/>
	</my-input-wrapper>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { generateName } from "@/helpers/utils";
import type { ErrorType, InputType } from "@/helpers/types";
import valid from "@/helpers/validation";

/**
 * Input component
 */

const emit = defineEmits<{
	"my-input": [name: string, value: string | undefined];
	"my-change": [name: string | undefined, value: string | undefined];
	"my-focus": [name: string];
	"my-blur": [name: string];
	"my-error": [name: string, error: ErrorType | boolean];
}>();

interface IProps {
	label?: string;
	name?: string;
	error?: string;
	icon?: string;
	myClass?: string;
	placeholder?: string;
	value?: string;
	type?: InputType;
	strongPassword?: boolean;
	required?: boolean;
	readonly?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
	placeholder: "Enter a value",
	type: "text",
	strongPassword: true,
});

const computedClass = computed(() => [
	"my-input",
	{
		"my-input--with-icon": !!props.icon
	},
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
		if (error)
			emit("my-error", internalName.value, error);
	}
}

function checkInternalError(value: string | number | undefined | null): ErrorType | undefined {
	if (props.required) {
		const test = valid["required"](value);
		if (typeof test !== "boolean")
			return test;
	}

	if (props.type === "email") {
		console.log(value)
		return valid["email"](value);
	}
	else if (props.type === "password") {
		if (props.strongPassword) return valid["strongPassword"](value);
		else return valid["password"](value);
	}
	else if (props.type === "number")
		return valid["number"](value);
	else if (props.type === "tel")
		return valid["phone"](value);
	else if (props.type === "url")
		return valid["url"](value);
	else if (props.type === "date")
		return valid["date"](value);
}
</script>

<style lang="css">
@import "@/styles/my-input.css";
</style>

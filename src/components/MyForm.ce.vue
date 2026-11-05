<template>
	<form class="my-form" @submit="handleSubmit">
		<slot></slot>
	</form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { generateName } from "@/helpers/utils";

interface IProps {
	name?: string;
}

const props = defineProps<IProps>();

const emit = defineEmits<{
	"my-submit": [name: string];
}>();

const internalName = ref(generateName("my-form", props.name));

function handleSubmit(event: Event) {
	event.preventDefault();
	emit("my-submit", internalName.value);
}
</script>

<style lang="css">
@import "@/styles/my-form.css";
</style>

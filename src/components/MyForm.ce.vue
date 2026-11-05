<template>
	<form class="my-form" @submit="handleSubmit">
		<my-group :title="title" :small="small">
			<slot></slot>
		</my-group>
	</form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { generateName } from "@/helpers/utils";

interface IProps {
	name?: string;
	title?: string;
	small?: boolean;
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

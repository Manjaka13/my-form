<template>
	<div class="my-demo">
		<my-input label="Entrer une valeur" type="email" :value="valueText" :error="error" @my-input="handleInput" @my-change="handleChange" @my-focus="handleFocus(true)" @my-blur="handleFocus(false)" @my-error="handleError" required />
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const valueText = ref("");
const error = ref("");

// function checkError() {
// 	if (!valueText.value) error.value = "Veuillez remplir ce champ";
// 	else if (valueText.value.length < 5) error.value = "Le contenu est trop court (5 caractères minimum)";
// 	else error.value = "";
// }

function handleInput(event: CustomEvent) {
	const newValue = event.detail[1];
	valueText.value = newValue;
}

function handleChange(event: CustomEvent) {
	const newValue = event.detail[1];
	valueText.value = newValue;
}

function handleFocus(focused: boolean) {
	if (focused)
		error.value = "";
	// else
	// 	checkError();
}

function handleError(event: CustomEvent) {
	const err = event.detail[1]
	console.log(err);
	if (err.code === "required")
		error.value = "Champ obligatoire";
	else if (err.code === "email")
		error.value = "Veuillez entrer un email valide";
}
</script>

<style lang="css" scoped>
.my-demo,
.my-demo--dark {
	font-size: 15px;
	font-family: system-ui, sans-serif;
	box-sizing: border-box;
	padding: 20px;
	outline: 1px var(--my-color-light-darker) solid;
	display: flex;
	align-items: center;
	gap: 10px;
	width: 100%;
}

.my-demo--dark {
	background: var(--my-color-dark);
}
</style>

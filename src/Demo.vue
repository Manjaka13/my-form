<template>
	<my-form my-title="Informations">
		<my-input-wrapper name="input1" label="Remplir le champ" breakpoint="500" my-title="Entrer une adresse email standard">
			<my-input
				name="input1"
				label="Entrer une valeur"
				:error="error"
				:value="valueText"
				@my-input="handleInput"
				@my-change="handleChange"
				@my-error="handleError"
				@my-focus="handleFocus(true)"
				@my-blur="handleFocus(false)"
				required
			/>
		</my-input-wrapper>

		<my-input-wrapper name="input2" label="Activer le compte" breakpoint="500" my-title="Si vous souhaitez activer le compte directement" layout="inline">
			<my-switch name="input2" :value="valueBool" @my-change="handleBoolChange" />
		</my-input-wrapper>

		<my-button color="info" title="Ceci est un titre" fill>
			<my-spinner color="light" small /> Submit
		</my-button>

		<my-select
			name="select1"
			:value="valueSelect"
			:elements="elements"
			placeholder="Sélectionner une option"
			:error="selectError"
			@my-change="handleSelectChange"
		/>
	</my-form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const error = ref("");
const selectError = ref("");
const valueText = ref("");
const valueBool = ref(false);
const valueSelect = ref("");
const elements = [
	{ label: "France", value: "FR" },
	{ label: "Madagascar", value: "MG", disabled: true },
	{ label: "United States of America", value: "USA" },
	{ label: "Japan", value: "JP" },
	{ label: "Mauritius", value: "MR" },
];

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
	if (focused) error.value = "";
}

function handleError(event: CustomEvent) {
	const err = event.detail[1];
	if (err.code === "required") error.value = "Champ obligatoire";
	else if (err.code === "email") error.value = "Veuillez entrer un email valide";
	else error.value = "";
}

function handleBoolChange(event: CustomEvent) {
	const newValue = event.detail[1];
	valueBool.value = newValue;
}

function handleSelectChange(event: CustomEvent) {
	const newValue = event.detail[1];
	valueSelect.value = newValue;
}
</script>

<style lang="css">
body {
	font-size: 15px;
	font-family: system-ui, sans-serif;
	box-sizing: border-box;
	/* padding: 20px; */
	/* outline: 1px var(--my-color-light-darker) solid; */
	width: 100%;
	margin: 0;
	padding: 0;
}
</style>

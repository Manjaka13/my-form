<template>
	<div :class="computedClasses">
		<label v-if="label" class="my-input-wrapper__label" :for="name">
			{{ label }}
		</label>

		<div class="my-input-wrapper__content">
			<!-- Input icon -->
			<div v-if="icon" class="icon-box">
				<span :class="icon">x</span>
			</div>

      <!-- Input content -->
      <slot></slot>

			<!-- Error message -->
			<p v-if="error" class="error-box" role="alert">
				{{ error }}
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

/**
 * Wrapper for inputs
 */

interface IProps {
	label?: string;
	name?: string;
	error?: string;
	icon?: string;
	myClass?: string;
}

const props = withDefaults(defineProps<IProps>(), {});

const computedClasses = computed(() => ["my-input-wrapper", { "my-input-wrapper--has-error": !!props.error }, props.myClass]);
</script>

<style lang="css">
@import "@/styles/my-input-wrapper.css";
</style>

<template>
  <div v-if="myTitle" :class="computedClasses">
    <p class="my-group__title">{{ myTitle }}</p>
    <slot></slot>
  </div>
  <slot v-else></slot>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface IProps {
  myTitle?: string;
  small?: boolean;
}

const props = defineProps<IProps>();

const computedClasses = computed(() => [
  "my-group",
  {
    "my-group--small": !!props.small
  }
])
</script>

<style lang="css">
@import "@/styles/my-group.css";
</style>

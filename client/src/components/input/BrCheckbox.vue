<script setup lang="ts">
import useModelValue from "@/composables/useModelValue";

interface BrCheckboxProps {
  modelValue: boolean;
  label: string;
}

interface BrCheckboxEmits {
  (e: "update:modelValue", v: boolean): void;
}

const props = defineProps<BrCheckboxProps>();
const emit = defineEmits<BrCheckboxEmits>();

const { model } = useModelValue(() => props.modelValue, emit);
</script>

<template>
  <v-checkbox v-model="model" :label="label" color="primary" />
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", v: string): void;
  (e: "click:appendInner", v: any): void;
}>();

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<template>
  <v-text-field
    v-model="internalValue"
    variant="underlined"
    color="primary"
    @click:append-inner="$emit('click:appendInner')"
  >
    <template #append>
      <slot name="append" />
    </template>
  </v-text-field>
</template>

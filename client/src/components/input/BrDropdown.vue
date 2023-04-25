<script setup lang="ts">
import useModelValue from "@/composables/useModelValue";

interface BrDropdownProps<T> {
  items: T[];
  itemTitle: (item: T) => string;
  itemValue: (item: T) => string;
  label: string;
  loading?: boolean;
  modelValue?: string;
}

interface BrDropdownEmits<T> {
  (e: "update:modelValue", v: T): void;
}

const props = defineProps<BrDropdownProps<unknown>>();
const emit = defineEmits<BrDropdownEmits<unknown>>();

const { model } = useModelValue(() => props.modelValue, emit);
</script>

<template>
  <v-autocomplete
    v-model="model"
    v-bind="$attrs"
    :items="items"
    :item-title="itemTitle"
    :item-value="itemValue"
    :label="label"
    variant="underlined"
    color="primary"
    :loading="loading"
    :disabled="loading"
  />
</template>

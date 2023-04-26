<script setup lang="ts">
import useModelValue from "@/composables/useModelValue";

interface ConfirmationDialogProps {
  modelValue: boolean;
}

interface ConfirmationDialogEmits {
  (e: "update:modelValue", v: boolean): void;
  (e: "accept", v: any): void;
  (e: "cancel", v: void): void;
}

const props = defineProps<ConfirmationDialogProps>();
const emit = defineEmits<ConfirmationDialogEmits>();

const { model } = useModelValue(() => props.modelValue, emit);
</script>

<template>
  <br-dialog
    v-bind="$attrs"
    v-model="model"
    label="Are you sure?"
    @accept="$emit('accept')"
    @cancel="$emit('cancel')"
  >
    <slot />
  </br-dialog>
</template>

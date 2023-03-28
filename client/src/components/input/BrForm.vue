<script setup lang="ts">
import { ref } from "vue";

export type FormValidationStatus = {
  valid: boolean;
  errors: { id: string | number; errorMessages: string[] }[];
};
export interface CFormInterface {
  validate(): Promise<FormValidationStatus>;
  reset(): void;
  resetValidation(): void;
}

const form = ref<CFormInterface>();

defineExpose<CFormInterface>({
  validate: async () =>
    (await form.value?.validate()) ?? {
      valid: false,
      errors: [
        {
          id: "-1",
          errorMessages: ["Form ref not found"],
        },
      ],
    },
  reset: () => form.value?.reset(),
  resetValidation: () => form.value?.resetValidation(),
});
</script>

<template>
  <v-form v-bind="$attrs" ref="form" validate-on="blur">
    <slot />
  </v-form>
</template>

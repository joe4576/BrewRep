<script setup lang="ts">
import BrForm from "@/components/input/BrForm.vue";
import { useFormValidation } from "@/composables/useFormValidation";
import useModelValue from "@/composables/useModelValue";
import { useValidationRules } from "@/composables/useValidationRules";
import { ref } from "vue";

interface ConfirmationDialogProps {
  modelValue: boolean;
}

interface ConfirmationDialogEmits {
  (e: "update:modelValue", v: boolean): void;
  (e: "accept", v: string): void;
  (e: "cancel", v: void): void;
}

const props = defineProps<ConfirmationDialogProps>();
const emit = defineEmits<ConfirmationDialogEmits>();

const { model } = useModelValue(() => props.modelValue, emit);
const { form, formIsValid } = useFormValidation();
const { required } = useValidationRules();

const userIdToAdd = ref("");

const validateAndAccept = async () => {
  if (!(await formIsValid())) {
    return;
  }

  emit("accept", userIdToAdd.value);
};
</script>

<template>
  <br-dialog
    v-model="model"
    label="Add User to Company"
    @cancel="$emit('cancel')"
    @accept="validateAndAccept"
  >
    Enter the User ID of a user you would like to add to your company
    <br-form ref="form">
      <br-text v-model="userIdToAdd" label="User ID" :rules="[required]" />
    </br-form>
  </br-dialog>
</template>

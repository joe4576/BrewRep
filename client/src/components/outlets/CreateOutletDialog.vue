<script setup lang="ts">
import BrDialog from "@/components/dialogs/BrDialog.vue";
import useModelValue from "@/composables/useModelValue";
import { reactive } from "vue";
import { useUserStore } from "@/store/userStore";
import { v4 as uuid } from "uuid";
import { useFormValidation } from "@/composables/useFormValidation";
import { useValidationRules } from "@/composables/useValidationRules";
import BrForm from "@/components/input/BrForm.vue";
import useLoadingState from "@/composables/useLoadingState";
import { client } from "@/api/client";
import { Outlet } from "@server/models/outlet.model";

interface ConfirmationDialogProps {
  modelValue: boolean;
}

interface ConfirmationDialogEmits {
  (e: "update:modelValue", v: boolean): void;

  (e: "accept", v: void): void;

  (e: "cancel", v: void): void;
}

const props = defineProps<ConfirmationDialogProps>();
const emit = defineEmits<ConfirmationDialogEmits>();

const { model } = useModelValue(() => props.modelValue, emit);
const { form, formIsValid } = useFormValidation();
const { required } = useValidationRules();
const userStore = useUserStore();

const internalOutlet = reactive<Outlet>({
  id: uuid(),
  tenantId: userStore.tenantId ?? "",
  lat: "",
  long: "",
  code: "",
  name: "",
});

const [creating, createOutlet] = useLoadingState(async () => {
  if (!userStore.tenantId || !(await formIsValid())) {
    return;
  }

  await client.outlet.createOutlet.mutate(internalOutlet);

  emit("accept");
  model.value = false;
});
</script>

<template>
  <br-dialog
    v-bind="$attrs"
    v-model="model"
    @accept="createOutlet"
    @cancel="$emit('cancel')"
    label="Create Outlet"
    :loading="creating"
  >
    <br-form ref="form">
      <br-text v-model="internalOutlet.name" label="Name" :rules="[required]" />
      <br-text v-model="internalOutlet.code" label="Code" :rules="[required]" />
    </br-form>
  </br-dialog>
</template>

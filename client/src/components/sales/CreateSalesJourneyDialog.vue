<script setup lang="ts">
import BrDialog from "@/components/dialogs/BrDialog.vue";
import useModelValue from "@/composables/useModelValue";
import { reactive } from "vue";
import { useUserStore } from "@/store/userStore";
import { v4 as uuid } from "uuid";
import { useFormValidation } from "@/composables/useFormValidation";
import { useValidationRules } from "@/composables/useValidationRules";
import BrForm from "@/components/input/BrForm.vue";
import BrDropdown from "@/components/input/BrDropdown.vue";
import BrDate from "@/components/input/specialised/BrDate.vue";
import { SalesJourney } from "@server/models/salesJourney.model";
import useLoadingState from "@/composables/useLoadingState";
import { client } from "@/api/client";
import { User } from "@server/models/user.model";

interface ConfirmationDialogProps {
  modelValue: boolean;
  users: User[];
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

const internalSalesJourney = reactive<SalesJourney>({
  id: uuid(),
  tenantId: userStore.tenantId ?? "",
  completed: false,
  inProgress: false,
  reference: "",
  date: new Date(),
  startMilage: 0,
  endMilage: 0,
  assignedUserId: "",
});

const [creating, createSalesJourney] = useLoadingState(async () => {
  if (!userStore.tenantId || !(await formIsValid())) {
    return;
  }

  await client.salesJourney.createSalesJourney.mutate(internalSalesJourney);

  emit("accept");
  model.value = false;
});
</script>

<template>
  <br-dialog
    v-bind="$attrs"
    v-model="model"
    @accept="createSalesJourney"
    @cancel="$emit('cancel')"
    label="Create Sales Journey"
    :loading="creating"
  >
    <br-form ref="form">
      <br-text
        v-model="internalSalesJourney.reference"
        label="Reference"
        :rules="[required]"
      />
      <br-dropdown
        v-model="internalSalesJourney.assignedUserId"
        label="Assigned user"
        :items="users"
        :item-title="(item: User) => item.name"
        :item-value="(item: User) => item.id!"
        :rules="[required]"
      />
      <br-date
        v-model="internalSalesJourney.date"
        label="Start Date"
        :rules="[required]"
      />
    </br-form>
  </br-dialog>
</template>

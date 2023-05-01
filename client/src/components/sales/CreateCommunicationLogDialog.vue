<script setup lang="ts">
import BrDialog from "@/components/dialogs/BrDialog.vue";
import useModelValue from "@/composables/useModelValue";
import { reactive, watch } from "vue";
import { SalesVisit } from "@server/models/salesVisit.model";
import { useUserStore } from "@/store/userStore";
import { v4 as uuid } from "uuid";
import { useFormValidation } from "@/composables/useFormValidation";
import { useValidationRules } from "@/composables/useValidationRules";
import BrForm from "@/components/input/BrForm.vue";
import { Outlet } from "@server/models/outlet.model";
import useLoadingState from "@/composables/useLoadingState";
import { client } from "@/api/client";
import { CommunicationLog } from "@server/models/communicationLog.model";
import { User } from "@server/models/user.model";

interface CreateCommunicationLogDialogProps {
  modelValue: boolean;
  outlets: Outlet[];
  users: User[];
  salesVisit?: SalesVisit;
  creatingFromOutlet?: boolean;
  creatingFromSalesVisit?: boolean;
}

interface CreateCommunicationLogDialogEmits {
  (e: "update:modelValue", v: boolean): void;

  (e: "accept", v: void): void;

  (e: "cancel", v: void): void;
}

const props = defineProps<CreateCommunicationLogDialogProps>();
const emit = defineEmits<CreateCommunicationLogDialogEmits>();

const { model } = useModelValue(() => props.modelValue, emit);
const { form, formIsValid } = useFormValidation();
const { required } = useValidationRules();
const userStore = useUserStore();

const internalCommunicationLog = reactive<CommunicationLog>({
  description: "",
  tenantId: userStore.tenantId ?? "",
  id: uuid(),
  authorId: userStore.user?.id ?? "",
  outletId: "",
  salesVisitId: null,
});

const [creating, createCommunicationLog] = useLoadingState(async () => {
  if (!userStore.tenantId || !userStore.user || !(await formIsValid())) {
    return;
  }

  await client.communicationLog.createCommunicationLog.mutate({
    ...internalCommunicationLog,
    authorId: userStore.user.id!,
    tenantId: userStore.tenantId!,
  });

  emit("accept");
  model.value = false;
});

watch(
  () => props.outlets,
  (val) => {
    if (val.length >= 1 && props.creatingFromOutlet) {
      internalCommunicationLog.outletId = val[0].id;
    }

    if (val.length >= 1 && props.creatingFromSalesVisit && props.salesVisit) {
      internalCommunicationLog.salesVisitId = props.salesVisit.id;
      internalCommunicationLog.outletId = props.salesVisit.outletId;
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <br-dialog
    v-bind="$attrs"
    v-model="model"
    @accept="createCommunicationLog"
    @cancel="$emit('cancel')"
    label="Create Communication Log"
    :loading="creating"
  >
    <br-form ref="form" @submit.prevent="createCommunicationLog">
      <br-text
        v-model="internalCommunicationLog.description"
        label="Description"
        :rules="[required]"
      />
    </br-form>
  </br-dialog>
</template>

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
import BrDropdown from "@/components/input/BrDropdown.vue";
import BrDate from "@/components/input/specialised/BrDate.vue";
import { SalesJourney } from "@server/models/salesJourney.model";
import useLoadingState from "@/composables/useLoadingState";
import { client } from "@/api/client";

interface ConfirmationDialogProps {
  modelValue: boolean;
  outlets: Outlet[];
  salesJourneys: SalesJourney[];
  creatingFromJourney?: boolean;
  outletId?: string | null;
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

const internalSalesVisit = reactive<SalesVisit>({
  endTime: new Date(),
  reference: "",
  status: "OPEN",
  startTime: new Date(),
  outletId: props.outletId ?? "",
  id: uuid(),
  salesJourneyId: null,
  tenantId: userStore.tenantId ?? "",
});

const [creating, createSalesVisit] = useLoadingState(async () => {
  if (!userStore.tenantId || !(await formIsValid())) {
    return;
  }

  await client.salesVisit.createSalesVisit.mutate(internalSalesVisit);

  emit("accept");
  model.value = false;
});

watch(
  () => props.salesJourneys,
  (val) => {
    if (val.length >= 1 && props.creatingFromJourney) {
      internalSalesVisit.salesJourneyId = props.salesJourneys[0].id;
      internalSalesVisit.startTime = props.salesJourneys[0].date;
      internalSalesVisit.endTime = props.salesJourneys[0].date;
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
    @accept="createSalesVisit"
    @cancel="$emit('cancel')"
    label="Create Sales Visit"
    :loading="creating"
  >
    <br-form ref="form">
      <br-text
        v-model="internalSalesVisit.reference"
        label="Reference"
        :rules="[required]"
      />
      <br-dropdown
        v-model="internalSalesVisit.outletId"
        label="Associated outlet"
        :items="outlets"
        :item-title="(item: Outlet) => item.name"
        :item-value="(item: Outlet) => item.id"
        :rules="[required]"
      />
      <br-date
        v-model="internalSalesVisit.startTime"
        label="Start Date"
        :rules="[required]"
      />
      <br-date
        v-model="internalSalesVisit.endTime"
        label="End Date"
        :rules="[required]"
      />
      <br-dropdown
        v-model="internalSalesVisit.salesJourneyId"
        label="Add to journey"
        :items="salesJourneys"
        :item-title="(item: SalesJourney) => item.reference"
        :item-value="(item: SalesJourney) => item.id"
        :readonly="creatingFromJourney"
        :clearable="!creatingFromJourney"
      />
    </br-form>
  </br-dialog>
</template>

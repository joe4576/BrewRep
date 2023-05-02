<script setup lang="ts">
import BrDialog from "@/components/dialogs/BrDialog.vue";
import useModelValue from "@/composables/useModelValue";
import { computed, ref } from "vue";
import { SalesVisit } from "@server/models/salesVisit.model";
import { useFormValidation } from "@/composables/useFormValidation";
import { useValidationRules } from "@/composables/useValidationRules";
import BrForm from "@/components/input/BrForm.vue";
import BrDropdown from "@/components/input/BrDropdown.vue";
import { SalesJourney } from "@server/models/salesJourney.model";
import useLoadingState from "@/composables/useLoadingState";
import { client } from "@/api/client";

interface AddExistingVisitDialog {
  modelValue: boolean;
  salesVisits: SalesVisit[];
  salesJourney: SalesJourney;
}

interface AddExistingVisitDialogEmits {
  (e: "update:modelValue", v: boolean): void;

  (e: "accept", v: string): void;

  (e: "cancel", v: void): void;
}

const props = defineProps<AddExistingVisitDialog>();
const emit = defineEmits<AddExistingVisitDialogEmits>();

const { model } = useModelValue(() => props.modelValue, emit);
const { form, formIsValid } = useFormValidation();
const { required } = useValidationRules();

const salesVisitId = ref<string | null>(null);

const unassignedVisits = computed(() =>
  props.salesVisits.filter((visit) => !visit.salesJourneyId)
);

const [creating, createSalesVisit] = useLoadingState(async () => {
  if (!(await formIsValid()) || !salesVisitId.value) {
    return;
  }

  await client.salesJourney.addVisitToSalesJourney.mutate({
    salesVisitId: salesVisitId.value,
    salesJourneyId: props.salesJourney.id,
  });

  emit("accept", salesVisitId.value);
  model.value = false;
});
</script>

<template>
  <br-dialog
    v-bind="$attrs"
    v-model="model"
    @accept="createSalesVisit"
    @cancel="$emit('cancel')"
    :label="`Add visit to ${salesJourney.reference}`"
    :loading="creating"
  >
    <br-form ref="form">
      <br-dropdown
        v-model="salesVisitId"
        label="Choose sales visit"
        :items="unassignedVisits"
        :item-title="(item: SalesVisit) => item.reference"
        :item-value="(item: SalesVisit) => item.id"
        :rules="[required]"
      />
    </br-form>
  </br-dialog>
</template>

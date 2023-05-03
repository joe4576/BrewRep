<script setup lang="ts">
import { SalesJourney } from "@server/models/salesJourney.model";
import useModelValue from "@/composables/useModelValue";
import { useFormValidation } from "@/composables/useFormValidation";
import { useValidationRules } from "@/composables/useValidationRules";
import BrForm from "@/components/input/BrForm.vue";
import BrDialog from "@/components/dialogs/BrDialog.vue";
import { ref } from "vue";

export interface RecordMileageEvent {
  startMileage: number | null;
  endMileage: number | null;
}

interface RecordMileageDialogProps {
  modelValue: boolean;
  salesJourney: SalesJourney;
}

interface RecordMileageDialogEmits {
  (e: "update:modelValue", v: boolean): void;

  (e: "accept", v: RecordMileageEvent): void;

  (e: "cancel", v: void): void;
}

const props = defineProps<RecordMileageDialogProps>();
const emit = defineEmits<RecordMileageDialogEmits>();

const { model } = useModelValue(() => props.modelValue, emit);
const { form, formIsValid } = useFormValidation();
const { required } = useValidationRules();

const startMileage = ref("0");
const endMileage = ref("0");

const acceptAndClose = async () => {
  if (await formIsValid()) {
    // if a journey is in progress, mileage is being recorded at the end
    // of a journey, and vice versa
    emit("accept", {
      startMileage: props.salesJourney.inProgress ? null : +startMileage.value,
      endMileage: props.salesJourney.inProgress ? +endMileage.value : null,
    });

    model.value = false;
  }
};
</script>

<template>
  <br-dialog
    v-bind="$attrs"
    v-model="model"
    :label="`Record Mileage for Journey: ${salesJourney.reference}`"
    @accept="acceptAndClose"
    @cancel="$emit('cancel')"
  >
    <br-form ref="form" @submit.prevent="acceptAndClose">
      <br-text
        v-if="!salesJourney.inProgress"
        v-model="startMileage"
        label="Start Mileage"
        type="number"
        :rules="[required]"
      />
      <br-text
        v-else
        v-model="endMileage"
        label="End Mileage"
        type="number"
        :rules="[required]"
      />
    </br-form>
  </br-dialog>
</template>

<script setup lang="ts">
import BrDialog from "@/components/dialogs/BrDialog.vue";
import useModelValue from "@/composables/useModelValue";
import { ref } from "vue";
import { useUserStore } from "@/store/userStore";
import { useFormValidation } from "@/composables/useFormValidation";
import { useValidationRules } from "@/composables/useValidationRules";
import BrForm from "@/components/input/BrForm.vue";
import useLoadingState from "@/composables/useLoadingState";
import { client } from "@/api/client";
import { Outlet } from "@server/models/outlet.model";
import BrDropdown from "@/components/input/BrDropdown.vue";

interface ImportBrewManOutletsDialogProps {
  modelValue: boolean;
  brewmanOutlets: Outlet[];
}

interface ImportBrewManOutletsDialogEmits {
  (e: "update:modelValue", v: boolean): void;

  (e: "accept", v: void): void;

  (e: "cancel", v: void): void;
}

const props = defineProps<ImportBrewManOutletsDialogProps>();
const emit = defineEmits<ImportBrewManOutletsDialogEmits>();

const { model } = useModelValue(() => props.modelValue, emit);
const { form, formIsValid } = useFormValidation();
const { required } = useValidationRules();
const userStore = useUserStore();

const selectedOutletIds = ref<string[]>([]);

const [importing, importOutlets] = useLoadingState(async () => {
  if (
    !userStore.tenantId ||
    !(await formIsValid()) ||
    selectedOutletIds.value.length === 0
  ) {
    return;
  }

  await client.outlet.importBrewManOutlets.mutate(selectedOutletIds.value);

  emit("accept");
  model.value = false;
});
</script>

<template>
  <br-dialog
    v-bind="$attrs"
    v-model="model"
    @accept="importOutlets"
    @cancel="$emit('cancel')"
    label="Import BrewMan Outlets"
    :loading="importing"
  >
    <br-form ref="form">
      Select BrewMan outlets to import. Existing outlets will be ignored
      <br-dropdown
        v-model="selectedOutletIds"
        :item-title="(item: Outlet) => item.name"
        :item-value="(item: Outlet) => item.id"
        label="Select BrewMan Outlets"
        multiple
        :items="brewmanOutlets"
      />
    </br-form>
  </br-dialog>
</template>

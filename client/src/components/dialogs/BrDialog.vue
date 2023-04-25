<script setup lang="ts">
import useModelValue from "@/composables/useModelValue";
import BrIconBtn from "@/components/input/BrIconBtn.vue";
import { Ref } from "vue";

interface BrDialogProps {
  modelValue: boolean;
  label?: string;
  confirmText?: string;
}

interface BrDialogEmits {
  (e: "update:modelValue", v: boolean): void;
  (e: "accept", v: any): void;
  (e: "cancel", v: void): void;
}

const props = withDefaults(defineProps<BrDialogProps>(), {
  confirmText: "Confirm",
});

const emit = defineEmits<BrDialogEmits>();

const { model } = useModelValue(() => props.modelValue, emit);

const closeDialog = (isActive: Ref<boolean>) => {
  isActive.value = false;
  emit("cancel");
};
</script>

<template>
  <v-dialog
    v-model="model"
    :width="$vuetify.display.xs ? '100%' : '550px'"
    :fullscreen="$vuetify.display.xs"
    :transition="$vuetify.display.xs ? 'dialog-bottom-transition' : undefined"
    v-slot="{ isActive }"
  >
    <v-card>
      <v-card-title class="mx-3 my-3 mb-0">
        <br-icon-btn
          v-if="$vuetify.display.xs"
          class="mr-2"
          icon="mdi-close"
          size="small"
          color="grey"
          @click="closeDialog(isActive)"
        />
        {{ label }}
      </v-card-title>
      <v-card-text class="mx-2">
        <slot />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <br-btn variant="text" color="red" @click="closeDialog(isActive)">
          Cancel
        </br-btn>
        <br-btn variant="text" color="primary" @click="$emit('accept')">
          {{ confirmText }}
        </br-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

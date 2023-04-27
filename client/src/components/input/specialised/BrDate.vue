<script setup lang="ts">
import { computed } from "vue";

interface BrDateProps {
  modelValue: Date;
}

interface BrDateEmits {
  (e: "update:modelValue", v: Date): void;
}

const props = defineProps<BrDateProps>();
const emit = defineEmits<BrDateEmits>();

const formattedDate = computed({
  get: () =>
    new Date(
      props.modelValue.getTime() - props.modelValue.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 16),
  set: (val: string) => emit("update:modelValue", new Date(val)),
});
</script>

<template>
  <br-text v-model="formattedDate" type="datetime-local" />
</template>

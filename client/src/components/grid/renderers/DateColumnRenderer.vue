<script setup lang="ts">
import { computed } from "vue";

interface DateColumnRendererProps {
  params: any;
}

const props = defineProps<DateColumnRendererProps>();

const formattedDate = computed(() => {
  const date = new Date(props.params.value);
  return date.toLocaleDateString();
});
</script>

<template>
  <div>
    {{ formattedDate }}
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { formateDateTime } from "@/utils/formattingUtils";

interface DateTimeColumnRendererProps {
  params: any;
}

const props = defineProps<DateTimeColumnRendererProps>();

const formattedDateTime = computed(() => formateDateTime(props.params.value));
</script>

<template>
  <div>
    {{ formattedDateTime }}
  </div>
</template>

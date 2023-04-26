<script setup lang="ts">
import { computed } from "vue";

interface BooleanColumnRendererProps {
  params: any;
}

const props = defineProps<BooleanColumnRendererProps>();

const showTick = computed((): boolean => props.params.value);
</script>

<template>
  <v-icon :icon="showTick ? 'mdi-check' : 'mdi-window-close'" />
</template>

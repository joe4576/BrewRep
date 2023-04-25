<script setup lang="ts">
interface BrIconBtnProps {
  icon: string;
}

interface BrIconBtnEmits {
  (e: "click", v: void): void;
}

defineProps<BrIconBtnProps>();
defineEmits<BrIconBtnEmits>();
</script>

<template>
  <v-icon v-bind="$attrs" :icon="icon" @click="$emit('click')" />
</template>

<style></style>

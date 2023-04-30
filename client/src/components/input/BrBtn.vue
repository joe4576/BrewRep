<script setup lang="ts">
interface BrBtnProps {
  secondary?: boolean;
}

defineProps<BrBtnProps>();

defineEmits<{
  (e: "click", v: void): void;
}>();
</script>

<template>
  <v-btn
    :class="{
      secondary: secondary,
    }"
    @click="$emit('click')"
  >
    <slot />
    <template #prepend>
      <slot name="prepend" />
    </template>
  </v-btn>
</template>

<style scoped>
.secondary {
  background-color: white;
}
</style>

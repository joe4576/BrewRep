<script setup lang="ts">
defineEmits<{
  (e: "click", v: never): void;
}>();
</script>

<template>
  <v-btn @click="$emit('click')">
    <slot />
    <template #prepend>
      <slot name="prepend" />
    </template>
  </v-btn>
</template>

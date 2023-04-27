<script setup lang="ts">
interface BrPageProps {
  title: string;
  loading?: boolean;
}

defineProps<BrPageProps>();
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row class="justify-space-between">
          <v-col cols="auto">
            <v-progress-circular v-if="loading" indeterminate />
            <h4 v-else class="text-h4">{{ title }}</h4>
          </v-col>
          <v-col v-if="$slots['summary']" cols="auto">
            <slot name="summary" />
          </v-col>
          <v-col cols="12">
            <slot />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ComputedRef, defineProps } from "vue";

export type SummaryItem = {
  icon: string;
  body: ComputedRef<string | undefined>;
};

interface BrEventSummaryMenuProps<T> {
  payload: T;
  activator: any;
  title: string;
  prependIcon: string;
  tooltipText: string;
  summaryItems?: SummaryItem[];
}

defineProps<BrEventSummaryMenuProps<any>>();

defineEmits<{
  (e: "edit", v: string): void;
}>();
</script>

<template>
  <v-menu v-bind="$attrs" :activator="activator" location="end">
    <v-card width="300">
      <v-list>
        <v-list-item :title="title" :prepend-icon="prependIcon">
          <template #append>
            <v-tooltip location="top">
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  variant="text"
                  icon="mdi-pencil"
                  color="primary"
                  @click="$emit('edit', payload)"
                />
              </template>
              <span>{{ tooltipText }}</span>
            </v-tooltip>
          </template>
        </v-list-item>
        <v-divider />
        <v-list-item
          v-for="(item, idx) in summaryItems"
          :key="idx"
          :title="item.body.value"
          :prepend-icon="item.icon"
        />
      </v-list>
    </v-card>
  </v-menu>
</template>

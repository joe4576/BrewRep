<script setup lang="ts">
import { Action } from "@/components/grid/actionConfigurationBuilder";

interface ActionsColumnRendererProps {
  params: {
    actions: Action<any>[];
    data: any;
  };
}

defineProps<ActionsColumnRendererProps>();
</script>

<template>
  <v-menu>
    <template #activator="{ props }">
      <v-icon v-bind="props" icon="mdi-dots-vertical" class="mr-5" />
    </template>
    <v-list>
      <template v-for="action in params.actions" :key="action.name">
        <v-list-item
          v-if="action.options?.visible?.(params.data) ?? true"
          :to="action.routerLocationCallback?.(params.data)"
          @click="action.callback?.(params.data)"
        >
          <v-list-item-title>
            {{ action.name }}
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store/userStore";

const userStore = useUserStore();
</script>

<template>
  <div>
    Home view
    <v-row v-if="userStore.user">
      <pre>{{ userStore.user }}</pre>
    </v-row>
  </div>
</template>

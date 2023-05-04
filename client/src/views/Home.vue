<script lang="ts" setup>
import { useUserStore } from "@/store/userStore";

const userStore = useUserStore();
</script>

<template>
  <v-container>
    <v-row class="justify-center align-center text-center" style="height: 100%">
      <v-col cols="auto">
        <h2 class="text-h2">
          Welcome to BrewRep, {{ userStore.user?.name ?? "-" }}
        </h2>
      </v-col>
    </v-row>
  </v-container>
</template>

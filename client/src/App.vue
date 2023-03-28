<script setup lang="ts">
import AppBar from "@/components/app/AppBar.vue";
</script>

<template>
  <v-app>
    <app-bar />
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

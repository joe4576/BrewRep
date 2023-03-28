<script setup lang="ts">
import AppBar from "@/components/app/AppBar.vue";
import { computed } from "vue";
import { useTheme } from "vuetify";

const { current } = useTheme();
const primary = computed(() => current.value.colors.primary);
</script>

<template>
  <v-app>
    <app-bar />
    <v-main>
      <v-container class="app-container" fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.app-container {
  display: flex;
  height: 100%;
}

p {
  /* text-body-1 styles borrowed from vuetify */
  font-size: 1rem !important;
  font-weight: 400;
  line-height: 1.5rem;
  letter-spacing: 0.03125em !important;
  font-family: "Roboto", sans-serif !important;
  text-transform: none !important;
}

a {
  color: v-bind(primary);
  text-decoration: none;
}
</style>

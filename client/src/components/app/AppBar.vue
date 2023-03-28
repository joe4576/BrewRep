<script setup lang="ts">
import { ref } from "vue";
import NavigationDrawer from "@/components/app/NavigationDrawer.vue";

const showDrawer = ref(true);
</script>

<template>
  <v-app-bar app color="primary">
    <v-app-bar-nav-icon variant="text" @click.stop="showDrawer = !showDrawer" />
    <v-app-bar-title>
      <v-btn variant="text" @click="$router.push('/')" style="height: 100%">
        <img
          src="/assets/BrewRep.svg"
          alt="BrewRep Logo"
          style="height: 26px"
        />
      </v-btn>
    </v-app-bar-title>
  </v-app-bar>
  <navigation-drawer v-model="showDrawer" />
</template>

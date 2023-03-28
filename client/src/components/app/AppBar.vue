<script setup lang="ts">
import { ref } from "vue";
import NavigationDrawer from "@/components/app/NavigationDrawer.vue";
import { useUserStore } from "@/store/userStore";

const { isUserSignedIn } = useUserStore();

const showDrawer = ref(true);
</script>

<template>
  <v-app-bar app color="primary">
    <v-app-bar-nav-icon
      v-if="isUserSignedIn"
      variant="text"
      @click.stop="showDrawer = !showDrawer"
    />
    <v-app-bar-title>
      <v-btn variant="text" @click="$router.push('/home')" style="height: 100%">
        <img
          src="/src/assets/BrewRep.svg"
          alt="BrewRep Logo"
          style="height: 26px"
        />
      </v-btn>
    </v-app-bar-title>
  </v-app-bar>
  <navigation-drawer v-if="isUserSignedIn" v-model="showDrawer" />
</template>

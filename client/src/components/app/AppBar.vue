<script setup lang="ts">
import { ref } from "vue";
import NavigationDrawer from "@/components/app/NavigationDrawer.vue";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "vue-router";
import cookieService from "@/services/cookieService";

const userStore = useUserStore();
const router = useRouter();

const showDrawer = ref(true);

const logOut = async () => {
  userStore.clearState();
  cookieService.removeCookie("br-session");
  cookieService.removeCookie("tenant-id");
  await router.push("/");
};
</script>

<template>
  <v-app-bar app color="primary">
    <v-app-bar-nav-icon
      v-if="userStore.isUserSignedIn && userStore.isTenantSelected"
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
    <template v-if="userStore.isUserSignedIn">
      <v-spacer />
      <br-btn @click="logOut">Log out</br-btn>
    </template>
  </v-app-bar>
  <navigation-drawer v-if="userStore.isUserSignedIn" v-model="showDrawer" />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import NavigationDrawer from "@/components/app/NavigationDrawer.vue";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "vue-router";
import cookieService from "@/services/cookieService";

const userStore = useUserStore();
const router = useRouter();

const drawIsOpen = ref(true);

const drawIsAccessible = computed(
  () => userStore.isUserSignedIn && userStore.isTenantSelected
);

const logOut = async () => {
  userStore.clearState();
  cookieService.removeCookie("br-session");
  cookieService.removeCookie("tenantgroupid");
  cookieService.removeCookie("tenantid");
  await router.push("/");
};
</script>

<template>
  <v-app-bar app color="primary">
    <v-app-bar-nav-icon
      v-if="drawIsAccessible"
      variant="text"
      @click.stop="drawIsOpen = !drawIsOpen"
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
  <navigation-drawer v-if="drawIsAccessible" v-model="drawIsOpen" />
</template>

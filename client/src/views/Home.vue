<script lang="ts" setup>
import { useUserStore } from "@/store/userStore";
import cookieService from "@/services/cookieService";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const logOut = async () => {
  userStore.clearState();
  cookieService.removeCookie("br-session");
  await router.push("/");
};
</script>

<template>
  <div>
    Home view
    <v-row v-if="userStore.user">
      <pre>{{ userStore.user }}</pre>
    </v-row>
  </div>
</template>

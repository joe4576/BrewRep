<script lang="ts" setup>
import { useUserStore } from "@/store/userStore";
import { ref } from "vue";
import clientAuthenticationService from "@/services/clientAuthenticationService";
import cookieService from "@/services/cookieService";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const emailAddress = ref("");
const password = ref("");

const register = async () => {
  let sessionToken: string;

  try {
    sessionToken =
      await clientAuthenticationService.registerWithEmailAndPassword(
        emailAddress.value,
        password.value
      );
  } catch (e) {
    throw new Error("Failed to register", {
      cause: e,
    });
  }

  cookieService.setCookie("br-session", sessionToken);
  await userStore.load();
};

const logInWithEmailAndPassword = async () => {
  let sessionToken: string;

  try {
    sessionToken = await clientAuthenticationService.loginWithEmailAndPassword(
      emailAddress.value,
      password.value
    );
  } catch (e) {
    throw new Error("Failed to log in", {
      cause: e,
    });
  }

  cookieService.setCookie("br-session", sessionToken);
  await userStore.load();
};

const logOut = async () => {
  userStore.clearState();
  cookieService.removeCookie("br-session");
  await router.push("/");
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-text-field v-model="emailAddress" label="email address" />
        <v-text-field v-model="password" label="password" />
        <v-btn color="primary" @click="logInWithEmailAndPassword">
          Login in
        </v-btn>
        <v-btn color="secondary" @click="register">Regsiter</v-btn>
        <v-btn color="danger" @click="logOut">Log out</v-btn>
      </v-col>
    </v-row>
    <v-row v-if="userStore.user">
      <pre>{{ userStore.user }}</pre>
    </v-row>
  </v-container>
</template>

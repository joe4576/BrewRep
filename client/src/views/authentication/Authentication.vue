<script setup lang="ts">
import { useUserStore } from "@/store/userStore";
import { computed, onBeforeMount, ref, watch } from "vue";
import { useRouter } from "vue-router";
import BrPassword from "@/components/input/specialised/BrPassword.vue";
import BrForm from "@/components/input/BrForm.vue";
import { useFormValidation } from "@/composables/useFormValidation";
import { useValidationRules } from "@/composables/useValidationRules";
import { VCard } from "vuetify/components";
import clientAuthenticationService from "@/services/clientAuthenticationService";
import cookieService from "@/services/cookieService";
import useLoadingState from "@/composables/useLoadingState";

interface AuthenticationProps {
  login: boolean;
}
const props = defineProps<AuthenticationProps>();

const userStore = useUserStore();
const router = useRouter();
const { form } = useFormValidation();
const { required } = useValidationRules();

const emailAddress = ref("");
const password = ref("");

onBeforeMount(async () => {
  // if there is a signed in user, redirect to home page
  if (userStore.isUserSignedIn) {
    return await router.push({
      name: "home",
    });
  }
});

const title = computed(() =>
  props.login ? "Log in to BrewRep" : "Sign up to BrewRep"
);

watch(
  () => props.login,
  () => {
    // reset validation when switching between login/register
    form.value?.resetValidation();
  }
);

/**
 * Authenticates a user and then redirects them to the home page
 *
 * @param authType Type of authentication method to use.
 *
 * Note: Google doesn't differentiate between login and register:
 * Firebase just supplies an id token, that we then pass to the
 * backend for verification etc.
 */
const [loading, authenticate] = useLoadingState(
  async (authType: "login" | "register" | "google") => {
    // validate form if email login or register
    if (authType === "login" || authType === "register") {
      const formValidationStatus = await form.value?.validate();

      if (!formValidationStatus?.valid) {
        return;
      }
    }

    let sessionToken: string;

    try {
      switch (authType) {
        case "login":
          sessionToken =
            await clientAuthenticationService.loginWithEmailAndPassword(
              emailAddress.value,
              password.value
            );
          break;

        case "register":
          sessionToken =
            await clientAuthenticationService.registerWithEmailAndPassword(
              emailAddress.value,
              password.value
            );
          break;

        case "google":
          sessionToken = await clientAuthenticationService.logInWithGoogle();
          break;

        default:
          throw new Error("No authentication type given");
      }
    } catch (e) {
      throw new Error("Authentication failed", {
        cause: e,
      });
    }

    // now we have a session token, set cookie, load user store and
    // send user to home page
    cookieService.setCookie("br-session", sessionToken);
    await userStore.load();
    await router.push({
      name: "company-settings",
    });
  }
);

const logInOrRegister = () => {
  return props.login ? authenticate("login") : authenticate("register");
};
</script>

<template>
  <v-container
    :class="{
      'align-self-center': true,
      'px-0': $vuetify.display.smAndDown,
    }"
  >
    <v-row class="justify-center mt-6">
      <v-col cols="12">
        <component
          :is="$vuetify.display.smAndDown ? 'div' : VCard"
          class="login-card pa-2"
          elevation="2"
        >
          <v-card-text
            :class="{
              'pa-8': $vuetify.display.mdAndUp,
            }"
          >
            <v-row class="justify-center py-3">
              <v-col cols="auto">
                <h4 class="text-h4">{{ title }}</h4>
              </v-col>
            </v-row>
            <br-form ref="form" @keydown.enter="logInOrRegister">
              <v-row>
                <v-col cols="12">
                  <br-text
                    v-model="emailAddress"
                    label="Email address"
                    :rules="[required]"
                    clearable
                  />
                </v-col>

                <v-col cols="12">
                  <br-password
                    v-model="password"
                    label="Password"
                    :rules="[required]"
                  />
                </v-col>

                <v-col cols="12">
                  <br-btn
                    block
                    color="primary"
                    height="50px"
                    :loading="loading"
                    @click="logInOrRegister"
                  >
                    {{ login ? "Log in" : "Sign Up" }}
                  </br-btn>
                </v-col>

                <v-col cols="12" class="mt-2">
                  <p class="divider"><span>or</span></p>
                </v-col>

                <v-col cols="12">
                  <br-btn
                    variant="outlined"
                    block
                    height="50px"
                    :loading="loading"
                    @click="authenticate('google')"
                  >
                    Continue with Google
                    <template #prepend>
                      <img src="/src/assets/google.svg" alt="Google Icon" />
                    </template>
                  </br-btn>
                </v-col>

                <v-col cols="12" class="mt-4">
                  <template v-if="login">
                    <p>
                      New to BrewRep?
                      <router-link to="/register">Get started</router-link>
                    </p>
                  </template>
                  <template v-else>
                    <p>
                      Already have an account?
                      <router-link to="/login">Sign in</router-link>
                    </p>
                  </template>
                </v-col>
              </v-row>
            </br-form>
          </v-card-text>
        </component>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.login-card {
  margin: 0 auto;
  max-width: 500px;
  width: 100%;
}

p.divider {
  text-align: center;
  border-bottom: 1px solid #78909c;
  line-height: 0.1em;
  margin: 10px 0 20px;
}
p.divider span {
  background: #ffffff;
  padding: 0 10px;
}
</style>

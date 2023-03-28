<script setup lang="ts">
import { useUserStore } from "@/store/userStore";
import { computed, onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import BrPassword from "@/components/input/specialised/BrPassword.vue";
import BrForm from "@/components/input/BrForm.vue";
import { useFormValidation } from "@/composables/useFormValidation";
import { useValidationRules } from "@/composables/useValidationRules";
import { VCard } from "vuetify/components";

interface AuthenticationProps {
  login: boolean;
}
const props = defineProps<AuthenticationProps>();

const { isUserSignedIn } = useUserStore();
const router = useRouter();
const { form } = useFormValidation();
const { required } = useValidationRules();

const emailAddress = ref("");
const password = ref("");

onBeforeMount(async () => {
  // if there is a signed in user, redirect to home page
  if (isUserSignedIn) {
    return await router.push({
      name: "home",
    });
  }
});

const title = computed(() =>
  props.login ? "Log in to BrewRep" : "Sign up to BrewRep"
);

const loginOrRegister = async () => {
  const valid = await form.value?.validate();

  if (!valid?.valid) {
    return;
  }

  // todo: register or login
};
</script>

<template>
  <v-container
    :class="{
      'align-self-center': true,
      'px-0': $vuetify.display.smAndDown,
    }"
  >
    <v-row class="justify-center">
      <v-col cols="auto">
        <h4 class="text-h4">{{ title }}</h4>
      </v-col>
    </v-row>
    <v-row class="justify-center mt-6">
      <v-col cols="12">
        <component
          :is="$vuetify.display.smAndDown ? 'div' : VCard"
          class="login-card pa-2"
          elevation="2"
        >
          <v-card-text
            :class="{
              'pa-5': $vuetify.display.mdAndUp,
            }"
          >
            <br-form ref="form">
              <v-col cols="12">
                <br-text
                  v-model="emailAddress"
                  label="Email address"
                  :rules="[required]"
                  clearable
                />
              </v-col>
              <v-col cols="12">
                <br-password v-model="password" label="Password" />
              </v-col>
              <v-col cols="12">
                <br-btn
                  block
                  color="primary"
                  height="50px"
                  @click="loginOrRegister"
                  >{{ login ? "Log in" : "Sign Up" }}</br-btn
                >
              </v-col>
            </br-form>
            <v-col cols="12" class="mt-2">
              <p class="divider"><span>or</span></p>
            </v-col>
            <v-col cols="12">
              <br-btn variant="outlined" block height="50px">
                <template #default> Continue with Google </template>
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

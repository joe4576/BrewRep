<script setup lang="ts">
import { client } from "@/api/client";
import BrForm from "@/components/input/BrForm.vue";
import useDirtyState from "@/composables/useDirtyState";
import { useFormValidation } from "@/composables/useFormValidation";
import useLoadingState from "@/composables/useLoadingState";
import { useValidationRules } from "@/composables/useValidationRules";
import { useUserStore } from "@/store/userStore";
import { User } from "@server/models/user.model";
import { onMounted, ref } from "vue";

const userStore = useUserStore();
const { form, formIsValid } = useFormValidation();
const { required } = useValidationRules();

const user = ref<User>();
const userName = ref("");
const showUpdatedSnackbar = ref(false);

const { isDirty, resetDirtyState } = useDirtyState(userName);

const [loading, updateUser] = useLoadingState(async () => {
  if (!(await formIsValid()) || !user.value) {
    return;
  }

  await client.user.saveUser.mutate({
    ...user.value,
    name: userName.value,
  });

  showUpdatedSnackbar.value = true;
  resetDirtyState();
});

const [loadingPrerequisites, loadPrerequisites] = useLoadingState(async () => {
  if (!userStore.tenantId) {
    return;
  }

  user.value = await client.user.getCurrentUser.query();

  userName.value = user.value.name;
  resetDirtyState();
});

onMounted(loadPrerequisites);
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h4 class="text-h4">User Settings</h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title>User Details</v-card-title>
          <v-card-text>
            <br-form ref="form" @submit.prevent="updateUser">
              <br-text
                v-model="userName"
                label="Username"
                :loading="loadingPrerequisites"
                :rules="[required]"
              />
            </br-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <br-btn
              variant="text"
              color="primary"
              :loading="loading"
              :disabled="!isDirty"
              @click="updateUser"
            >
              Update
            </br-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-snackbar v-model="showUpdatedSnackbar" :timeout="2000">
    User updated successfully! ✅
  </v-snackbar>
</template>

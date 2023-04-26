<script setup lang="ts">
import { client } from "@/api/client";
import BrForm from "@/components/input/BrForm.vue";
import useDirtyState from "@/composables/useDirtyState";
import { useFormValidation } from "@/composables/useFormValidation";
import useLoadingState from "@/composables/useLoadingState";
import { useValidationRules } from "@/composables/useValidationRules";
import { useUserStore } from "@/store/userStore";
import { Tenant } from "@server/models/tenant.model";
import { User } from "@server/models/user.model";
import { onMounted, ref } from "vue";

type TenantAndUser = Tenant & {
  users: User[];
};

const userStore = useUserStore();
const { form, formIsValid } = useFormValidation();
const { required } = useValidationRules();

const tenant = ref<TenantAndUser>();
const tenantName = ref("");
const showUpdatedSnackbar = ref(false);

const { isDirty, resetDirtyState } = useDirtyState(tenantName);

const [loading, updateTenant] = useLoadingState(async () => {
  if (!(await formIsValid()) || !tenant.value) {
    return;
  }

  await client.tenant.saveTenant.mutate({
    id: tenant.value.id!,
    dateCreated: tenant.value.dateCreated,
    name: tenantName.value,
  });

  showUpdatedSnackbar.value = true;
  resetDirtyState();
});

onMounted(async () => {
  if (!userStore.tenantId) {
    return;
  }

  tenant.value = await client.tenant.getTenant.query(userStore.tenantId);

  tenantName.value = tenant.value.name;
  resetDirtyState();
});
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title>Company Settings</v-card-title>
          <v-card-text>
            <br-form ref="form">
              <br-text
                v-model="tenantName"
                label="Tenant name"
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
              @click="updateTenant"
            >
              Update
            </br-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-snackbar v-model="showUpdatedSnackbar" :timeout="2000">
    Tenant updated successfully! ✅
  </v-snackbar>
</template>

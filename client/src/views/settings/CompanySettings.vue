<script setup lang="ts">
import { client } from "@/api/client";
import ButtonBar from "@/components/ButtonBar.vue";
import BrConfirmationDialog from "@/components/dialogs/BrConfirmationDialog.vue";
import BrGrid from "@/components/grid/BrGrid.vue";
import { GridConfigurationBuilder } from "@/components/grid/gridConfigurationBuilder";
import BrForm from "@/components/input/BrForm.vue";
import useDirtyState from "@/composables/useDirtyState";
import { useFormValidation } from "@/composables/useFormValidation";
import useLoadingState from "@/composables/useLoadingState";
import { useValidationRules } from "@/composables/useValidationRules";
import { useUserStore } from "@/store/userStore";
import { Tenant } from "@server/models/tenant.model";
import { User } from "@server/models/user.model";
import { computed, onMounted, ref } from "vue";
import AddUserDialog from "@/components/settings/AddUserDialog.vue";
import BrSubtitle from "@/components/text/BrSubtitle.vue";
import { v4 as uuid } from "uuid";
import { BrewmanLink } from "@server/models/brewmanLink.model";

type TenantAndUser = Tenant & {
  users: User[];
};

const userStore = useUserStore();
const { form, formIsValid } = useFormValidation();
const { form: brewmanForm, formIsValid: brewmanFormIsValid } =
  useFormValidation();
const { required } = useValidationRules();

const tenant = ref<TenantAndUser>();
const tenantName = ref("");
const showUpdatedSnackbar = ref(false);
const showAddedUserSnackbar = ref(false);
const showFailedToAddUserSnackbar = ref(false);
const showConfirmationDialog = ref(false);
const showAddUserDialog = ref(false);
const selectedUser = ref<User>();
const addedUserName = ref("");
const brewmanLink = ref<BrewmanLink | null>(null);
const brewmanApiKey = ref("");
const brewmanTenantId = ref("");

const users = computed(() => tenant.value?.users ?? []);

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

const [loadingTenantSettings, loadTenantSettings] = useLoadingState(
  async () => {
    if (!userStore.tenantId) {
      return;
    }

    [tenant.value, brewmanLink.value] = await Promise.all([
      client.tenant.getTenant.query(userStore.tenantId),
      client.brewmanLink.getBrewmanLink.query(),
    ]);

    tenantName.value = tenant.value.name;

    brewmanApiKey.value = brewmanLink.value?.brewmanApiKey ?? "";
    brewmanTenantId.value = brewmanLink.value?.brewmanTenantId ?? "";
    resetDirtyState();
  }
);

const showRemoveDialog = (user: User) => {
  selectedUser.value = user;
  showConfirmationDialog.value = true;
};

const removeUserFromCompany = async () => {
  if (!selectedUser.value?.id) {
    return;
  }
  await client.user.removeUserFromCurrentTenant.mutate(selectedUser.value.id);
  showConfirmationDialog.value = false;
  await loadTenantSettings();
};

const addUserToCompany = async (userId: string) => {
  try {
    const user = await client.user.addUserToCurrentTenant.mutate(userId);
    showAddUserDialog.value = false;
    addedUserName.value = user.name;
    showAddedUserSnackbar.value = true;
    await loadTenantSettings();
  } catch {
    showFailedToAddUserSnackbar.value = true;
  }
};

const [connectingBrewmanLink, connectBrewmanLink] = useLoadingState(
  async () => {
    if (!(await brewmanFormIsValid()) || !userStore.tenantId) {
      return;
    }

    await client.brewmanLink.createBrewmanLink.mutate({
      tenantId: userStore.tenantId,
      id: uuid(),
      brewmanTenantId: brewmanTenantId.value,
      brewmanApiKey: brewmanApiKey.value,
    });

    await loadTenantSettings();
  }
);

const [disconnectingBrewmanLink, disconnectBrewmanLink] = useLoadingState(
  async () => {
    await client.brewmanLink.disconnectBrewmanLink.mutate();
    userStore.brewmanLink = null;
    await loadTenantSettings();
  }
);

const usersGridConfiguration = new GridConfigurationBuilder<User>()
  .addTextColumn("Username", (item) => item.name)
  .addBooleanColumn("Is Admin?", (item) => item.isAdmin ?? false)
  .addActionsColumn((builder) =>
    builder
      .addRoutingAction(
        "Edit",
        () => ({
          name: "user-settings",
        }),
        {
          visible: (item) => {
            if (!userStore.user?.id) {
              return false;
            }

            return userStore.user.id === item.id;
          },
        }
      )
      .addClickAction("Remove", (item) => showRemoveDialog(item), {
        visible: (item) => {
          if (!userStore.user?.id) {
            return true;
          }

          return userStore.user.id !== item.id;
        },
      })
  )
  .build();

onMounted(loadTenantSettings);
</script>

<template>
  <v-container fluid>
    <v-row>
      <!--      Company Settings-->
      <v-col cols="12" sm="6">
        <v-row>
          <v-col cols="12">
            <br-subtitle>Company Settings</br-subtitle>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card :loading="loadingTenantSettings">
              <v-card-title>Tenant Details</v-card-title>
              <v-card-text>
                <br-form ref="form" @submit.prevent="updateTenant">
                  <br-text
                    v-model="tenantName"
                    label="Name"
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
      </v-col>

      <!--      BrewMan Link Settings-->
      <v-col cols="12" sm="6">
        <v-row>
          <v-col cols="12">
            <br-subtitle>BrewMan Link Settings</br-subtitle>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title>BrewMan Link Settings</v-card-title>
              <v-card-text>
                <br-form :disabled="brewmanLink" ref="brewmanForm">
                  <br-text
                    v-model="brewmanTenantId"
                    label="BrewMan Tenant ID"
                    :rules="[required]"
                  />
                  <br-text
                    v-model="brewmanApiKey"
                    label="BrewMan API Key"
                    :rules="[required]"
                  />
                </br-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <br-btn
                  v-if="brewmanLink"
                  color="red"
                  variant="text"
                  :loading="disconnectingBrewmanLink"
                  @click="disconnectBrewmanLink"
                >
                  Disconnect
                </br-btn>

                <br-btn
                  v-else
                  variant="text"
                  color="primary"
                  :loading="connectingBrewmanLink"
                  :disabled="brewmanLink"
                  @click="connectBrewmanLink"
                >
                  Connect
                </br-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mt-8">
      <v-col cols="12">
        <br-subtitle>Users in the Company</br-subtitle>
      </v-col>
      <v-col cols="12">
        <br-grid
          :items="users"
          :grid-configuration="usersGridConfiguration"
          :loading="loadingTenantSettings"
        />
      </v-col>
    </v-row>
  </v-container>

  <portal to="footer">
    <button-bar>
      <template #right>
        <br-btn color="primary" @click="showAddUserDialog = true">
          Add user
        </br-btn>
      </template>
    </button-bar>
  </portal>

  <br-confirmation-dialog
    v-if="showConfirmationDialog && selectedUser"
    v-model="showConfirmationDialog"
    @accept="removeUserFromCompany"
  >
    Are you sure you want to remove {{ selectedUser.name }} from the company?
  </br-confirmation-dialog>

  <add-user-dialog
    v-if="showAddUserDialog"
    v-model="showAddUserDialog"
    @accept="addUserToCompany"
  />

  <v-snackbar v-model="showUpdatedSnackbar" :timeout="2000">
    Tenant updated successfully! ✅
  </v-snackbar>

  <v-snackbar v-model="showAddedUserSnackbar" color="success" :timeout="3000">
    Added {{ addedUserName }} to the company!
  </v-snackbar>

  <v-snackbar v-model="showFailedToAddUserSnackbar" color="red" :timeout="3000">
    Incorrect ID
  </v-snackbar>
</template>

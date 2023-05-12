<script setup lang="ts">
import { client } from "@/api/client";
import BrPage from "@/components/base/BrPage.vue";
import BrForm from "@/components/input/BrForm.vue";
import { useFormValidation } from "@/composables/useFormValidation";
import useLoadingState from "@/composables/useLoadingState";
import { useValidationRules } from "@/composables/useValidationRules";
import { Outlet } from "@server/models/outlet.model";
import { computed, onMounted, reactive, ref } from "vue";
import BrSubtitle from "@/components/text/BrSubtitle.vue";
import { useUserStore } from "@/store/userStore";
import { v4 as uuid } from "uuid";
import { CommunicationLog } from "@server/models/communicationLog.model";
import { User } from "@server/models/user.model";
import ViewCommunicationLogs from "@/components/sales/ViewCommunicationLogs.vue";
import CreateCommunicationLogDialog from "@/components/sales/CreateCommunicationLogDialog.vue";
import ButtonBar from "@/components/ButtonBar.vue";

interface ViewOutletProps {
  outletId: string;
}

const props = defineProps<ViewOutletProps>();

const { form, formIsValid } = useFormValidation();
const { required } = useValidationRules();
const userStore = useUserStore();

const outlet = ref<Outlet>();
const communicationLogs = ref<CommunicationLog[]>([]);
const users = ref<User[]>([]);
const showCreateCommunicationLogDialog = ref(false);

const internalOutlet = reactive<Outlet>({
  name: "",
  id: uuid(),
  code: "",
  lat: "",
  long: "",
  tenantId: userStore.tenantId ?? "",
  isBrewManOutlet: false,
});

const isBrewManOutlet = computed(() => internalOutlet.isBrewManOutlet);

const [loading, refresh] = useLoadingState(async () => {
  [outlet.value, communicationLogs.value, users.value] = await Promise.all([
    client.outlet.getOutlet.query(props.outletId),
    client.communicationLog.getCommunicationLogsForOutlet.query(props.outletId),
    client.user.getAllUsers.query(),
  ]);

  Object.keys(internalOutlet).forEach(
    // @ts-ignore
    (key) => (internalOutlet[key] = outlet.value[key])
  );
});

const [savingOutlet, saveOutlet] = useLoadingState(
  async () => {
    if (!(await formIsValid()) || !outlet.value || !userStore.tenantId) {
      return;
    }

    if (isBrewManOutlet.value) {
      await client.outlet.updateBrewManOutlet.mutate(internalOutlet.id);
    } else {
      await client.outlet.saveOutlet.mutate({
        ...outlet.value,
        ...internalOutlet,
        tenantId: userStore.tenantId,
      });
    }

    await refresh();
  },
  (e) => {
    console.error("Failed to save outlet", e);
  }
);

onMounted(refresh);
</script>

<template>
  <br-page
    :title="`Outlet: ${outlet?.name ?? '-'}`"
    :loading="loading"
    show-back-button
  >
    <v-row>
      <v-col cols="12" md="6">
        <v-card :loading="loading">
          <v-card-title>Outlet details</v-card-title>
          <v-card-text>
            <br-form ref="form" @submit.prevent="saveOutlet">
              <br-text
                v-model="internalOutlet.name"
                label="Name"
                :disabled="isBrewManOutlet"
                :rules="[required]"
              />
              <br-text
                v-model="internalOutlet.code"
                label="Code"
                :disabled="isBrewManOutlet"
                :rules="[required]"
              />
              <br-text
                v-model="internalOutlet.lat"
                label="Latitude"
                :disabled="isBrewManOutlet"
                :rules="[required]"
              />
              <br-text
                v-model="internalOutlet.long"
                label="Longitude"
                :disabled="isBrewManOutlet"
                :rules="[required]"
              />
            </br-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <br-btn
              v-if="isBrewManOutlet"
              color="primary"
              :href="`https://brewman.premiersystems.com/outlet/${internalOutlet.id}/crm`"
              target="_blank"
            >
              Open in BrewMan
            </br-btn>
            <v-tooltip v-if="isBrewManOutlet" location="top">
              <template #activator="{ props }">
                <br-btn
                  v-bind="props"
                  color="primary"
                  :disabled="loading || savingOutlet"
                  :loading="savingOutlet"
                  @click="saveOutlet"
                >
                  Update
                </br-btn>
              </template>
              <span> Fetch updated outlet information from BrewMan </span>
            </v-tooltip>
            <br-btn
              v-else
              color="primary"
              :disabled="loading || savingOutlet"
              :loading="savingOutlet"
              @click="saveOutlet"
            >
              Update
            </br-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <br-subtitle>Communication Logs</br-subtitle>
      </v-col>
      <v-col cols="12" md="6">
        <view-communication-logs
          :communication-logs="communicationLogs"
          :users="users"
        />
      </v-col>
    </v-row>
    <template #footer>
      <button-bar>
        <template #right>
          <br-btn
            color="primary"
            @click="showCreateCommunicationLogDialog = true"
          >
            Log Communication
          </br-btn>
        </template>
      </button-bar>
    </template>
  </br-page>
  <create-communication-log-dialog
    v-if="showCreateCommunicationLogDialog && outlet"
    v-model="showCreateCommunicationLogDialog"
    :outlets="[outlet]"
    :users="users"
    creating-from-outlet
    @accept="refresh"
  />
</template>

<script setup lang="ts">
import { client } from "@/api/client";
import BrPage from "@/components/base/BrPage.vue";
import BrForm from "@/components/input/BrForm.vue";
import { useFormValidation } from "@/composables/useFormValidation";
import useLoadingState from "@/composables/useLoadingState";
import { useValidationRules } from "@/composables/useValidationRules";
import { Outlet } from "@server/models/outlet.model";
import { onMounted, reactive, ref } from "vue";
import BrSubtitle from "@/components/text/BrSubtitle.vue";
import { useUserStore } from "@/store/userStore";
import { v4 as uuid } from "uuid";
import { CommunicationLog } from "@server/models/communicationLog.model";
import { User } from "@server/models/user.model";
import CommunicationLogs from "@/components/sales/CommunicationLogs.vue";

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

const internalOutlet = reactive<Outlet>({
  name: "",
  id: uuid(),
  code: "",
  lat: "",
  long: "",
  tenantId: userStore.tenantId ?? "",
});

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

    await client.outlet.saveOutlet.mutate({
      ...outlet.value,
      ...internalOutlet,
      tenantId: userStore.tenantId,
    });

    await refresh();
  },
  (e) => {
    console.error("Failed to save outlet", e);
  }
);

onMounted(refresh);
</script>

<template>
  <br-page :title="`Outlet: ${outlet?.name ?? '-'}`" :loading="loading">
    <v-row>
      <v-col cols="12" md="6">
        <v-card :loading="loading">
          <v-card-title>Outlet details</v-card-title>
          <v-card-text>
            <br-form ref="form" @submit.prevent="saveOutlet">
              <br-text
                v-model="internalOutlet.name"
                label="Name"
                :rules="[required]"
              />
              <br-text
                v-model="internalOutlet.code"
                label="Code"
                :rules="[required]"
              />
              <br-text
                v-model="internalOutlet.lat"
                label="Latitude"
                :rules="[required]"
              />
              <br-text
                v-model="internalOutlet.long"
                label="Longitude"
                :rules="[required]"
              />
            </br-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <br-btn
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
        <communication-logs
          :communication-logs="communicationLogs"
          :users="users"
        />
      </v-col>
    </v-row>
  </br-page>
</template>

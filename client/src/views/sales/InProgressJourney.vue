<script setup lang="ts">
import { SalesVisit } from "@server/models/salesVisit.model";
import { computed, onMounted, ref, watch } from "vue";
import useLoadingState from "@/composables/useLoadingState";
import { client } from "@/api/client";
import { formateDateTime } from "@/utils/formattingUtils";
import { SalesJourney } from "@server/models/salesJourney.model";
import { CommunicationLog } from "@server/models/communicationLog.model";
import { User } from "@server/models/user.model";
import ViewCommunicationLogs from "@/components/sales/ViewCommunicationLogs.vue";
import CreateCommunicationLogDialog from "@/components/sales/CreateCommunicationLogDialog.vue";
import { Outlet } from "@server/models/outlet.model";

interface InProgressVisitProps {
  salesJourneyId: string;
}

type SalesJourneyAndVisits = SalesJourney & { salesVisits: SalesVisit[] };

const props = defineProps<InProgressVisitProps>();

const salesJourney = ref<SalesJourneyAndVisits>();
const currentVisit = ref<SalesVisit>();
const communicationLogs = ref<CommunicationLog[]>([]);
const users = ref<User[]>([]);
const showCreateCommunicationLogDialog = ref(false);
const currentOutlet = ref<Outlet>();

const salesVisits = computed(() => salesJourney.value?.salesVisits ?? []);

const inProgressSalesVisits = computed(() =>
  salesVisits.value.filter((visit) => visit.status === "OPEN")
);

const completedSalesVisits = computed(() =>
  salesVisits.value.filter((visit) => visit.status === "COMPLETE")
);

const [loading, refresh] = useLoadingState(async () => {
  [salesJourney.value, users.value] = await Promise.all([
    client.salesJourney.getSalesJourney.query(props.salesJourneyId),
    client.user.getAllUsers.query(),
  ]);

  if (currentVisit.value) {
    await loadVisitExtras();
  }
});

const [loadingVisitExtras, loadVisitExtras] = useLoadingState(async () => {
  if (!currentVisit.value?.outletId) {
    return;
  }

  [communicationLogs.value, currentOutlet.value] = await Promise.all([
    client.communicationLog.getCommunicationLogsForSalesVisit.query(
      currentVisit.value.id
    ),
    client.outlet.getOutlet.query(currentVisit.value.outletId),
  ]);
});

const [completingVisit, completeVisit] = useLoadingState(async () => {
  if (!currentVisit.value || !salesJourney.value) {
    return;
  }

  await client.salesJourney.completeVisit.mutate({
    salesJourneyId: salesJourney.value.id,
    salesVisitId: currentVisit.value.id,
  });

  currentVisit.value = undefined;
  await refresh();
});

watch(
  currentVisit,
  async () => {
    await loadVisitExtras();
  },
  { immediate: true }
);

onMounted(refresh);
</script>

<template>
  <v-container class="mx-0">
    <v-row
      :style="{
        height: $vuetify.display.mdAndUp ? '700px' : undefined,
      }"
    >
      <v-col cols="12" md="3" class="pl-0">
        <v-list :opened="['Pending Visits']">
          <!-- Pending Visits -->
          <v-list-group value="Pending Visits">
            <template #activator="{ props }">
              <v-list-item v-bind="props">
                <v-list-item-title>Pending Visits</v-list-item-title>
              </v-list-item>
            </template>
            <v-list-item
              v-for="visit in inProgressSalesVisits"
              :key="visit.id"
              @click="
                currentVisit = inProgressSalesVisits.find(
                  ({ id }) => id === visit.id
                )
              "
            >
              <v-list-item-title>{{ visit.reference }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ formateDateTime(visit.startTime) }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list-group>

          <!-- Completed Visits -->
          <v-list-group value="Completed Visits">
            <template #activator="{ props }">
              <v-list-item v-bind="props">
                <v-list-item-title>Completed Visits</v-list-item-title>
              </v-list-item>
            </template>
            <v-list-item
              v-for="visit in completedSalesVisits"
              :key="visit.id"
              @click="
                currentVisit = completedSalesVisits.find(
                  ({ id }) => id === visit.id
                )
              "
            >
              <v-list-item-title>{{ visit.reference }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ formateDateTime(visit.startTime) }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-col>
      <v-divider v-if="$vuetify.display.mdAndUp" vertical />
      <v-col cols="12" md="9" v-if="currentVisit">
        <v-card>
          <v-card-title>{{ currentVisit.reference }}</v-card-title>
          <v-card-text>
            <v-row class="justify-space-between align-center">
              <v-col cols="auto">
                <h6 class="text-h6">Communication Logs</h6>
              </v-col>
              <v-col cols="auto">
                <v-tooltip location="top">
                  <template #activator="{ props }">
                    <v-btn
                      v-bind="props"
                      variant="text"
                      icon="mdi-pencil"
                      color="primary"
                      :disabled="currentVisit.status === 'COMPLETE'"
                      @click="showCreateCommunicationLogDialog = true"
                    />
                  </template>
                  <span>Create communication log</span>
                </v-tooltip>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <view-communication-logs
                  :communication-logs="communicationLogs"
                  :users="users"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <br-btn
              variant="text"
              color="primary"
              :loading="completingVisit"
              @click="completeVisit"
              :disabled="currentVisit.status === 'COMPLETE'"
            >
              Complete Visit
            </br-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <create-communication-log-dialog
    v-if="showCreateCommunicationLogDialog && currentVisit && currentOutlet"
    v-model="showCreateCommunicationLogDialog"
    :outlets="[currentOutlet]"
    :users="users"
    :sales-visit="currentVisit"
    creating-from-sales-visit
    @accept="refresh"
  />
</template>

<style scoped></style>

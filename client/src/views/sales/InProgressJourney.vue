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
import { Task } from "@server/models/task.model";
import { GridConfigurationBuilder } from "@/components/grid/gridConfigurationBuilder";
import BrGrid from "@/components/grid/BrGrid.vue";
import TaskEditDialog from "@/components/tasks/TaskEditDialog.vue";
import { EntireItem } from "@server/bmapi/types";
import { useUserStore } from "@/store/userStore";

interface InProgressVisitProps {
  salesJourneyId: string;
}

type SalesJourneyAndVisits = SalesJourney & { salesVisits: SalesVisit[] };

const props = defineProps<InProgressVisitProps>();

const userStore = useUserStore();

const salesJourney = ref<SalesJourneyAndVisits>();
const currentVisit = ref<SalesVisit>();
const communicationLogs = ref<CommunicationLog[]>([]);
const users = ref<User[]>([]);
const showCreateCommunicationLogDialog = ref(false);
const showTaskEditDialog = ref(false);
const currentOutlet = ref<Outlet>();
const tasks = ref<Task[]>([]);
const taskToEdit = ref<Task>();
const recentlyOrderedProducts = ref<EntireItem[]>([]);

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

  [communicationLogs.value, currentOutlet.value, tasks.value] =
    await Promise.all([
      client.communicationLog.getCommunicationLogsForSalesVisit.query(
        currentVisit.value.id
      ),
      client.outlet.getOutlet.query(currentVisit.value.outletId),
      client.task.getTaskByFilter.query({
        assignedSalesVisitId: currentVisit.value.id,
      }),
    ]);

  if (currentOutlet.value && currentOutlet.value.isBrewManOutlet) {
    recentlyOrderedProducts.value =
      await client.outlet.getRecentlyOrderedProductsForBrewmanOutlet.query(
        currentOutlet.value.id!
      );
  }
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

const tasksGridConfiguration = new GridConfigurationBuilder<Task>()
  .addTextColumn("Description", (item) => item.description)
  .addTextColumn("Assigned to", (item) =>
    item.assignedToUserId
      ? users.value.find((user) => user.id === item.assignedToUserId)?.name ??
        "-"
      : "-"
  )
  .addBooleanColumn("Completed?", (item) => item.completed)
  .addActionsColumn((builder) => {
    builder
      .addClickAction("Edit", (item) => {
        taskToEdit.value = item;
        showTaskEditDialog.value = true;
      })
      .addClickAction(
        "Mark as Complete",
        async (item) => {
          await client.task.saveTask.mutate({
            ...item,
            completed: true,
          });

          await loadVisitExtras();
        },
        {
          visible: (item) => !item.completed,
        }
      );
  })
  .build();

const recentlyOrderedProductsGridConfiguration =
  new GridConfigurationBuilder<EntireItem>()
    .addTextColumn("Name", (item) => item.details.name ?? "-")
    .addTextColumn("Code", (item) => item.details.code ?? "-")
    .addTextColumn("Cost Price", (item) => item.details.costPrice.toString())
    .addActionsColumn((builder) => {
      builder.addHrefAction(
        "Open in BrewMan",
        (item) => `https://brewman.premiersystems.com/stock/${item.details.id}`
      );
    })
    .build();

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
  <v-container class="mx-0 mb-10">
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
      <v-col class="mb-16" cols="12" md="9" v-if="currentVisit">
        <v-card>
          <v-card-title
            >{{ currentVisit.reference }} -
            <router-link
              v-if="currentOutlet"
              :to="{
                path: `/outlets/${currentOutlet.id}`,
              }"
              target="_blank"
            >
              {{ currentOutlet.name }}
            </router-link>
          </v-card-title>
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
            <v-row>
              <v-col cols="12">
                <h6 class="text-h6">Tasks</h6>
              </v-col>
              <v-col cols="12">
                <br-grid
                  style="min-height: 200px"
                  :grid-configuration="tasksGridConfiguration"
                  :items="tasks"
                  :loading="loadingVisitExtras"
                />
              </v-col>
            </v-row>
            <v-row
              v-if="currentOutlet?.isBrewManOutlet && userStore.hasBrewManLink"
            >
              <v-col cols="12">
                <h6 class="text-h6">Recently Ordered Products</h6>
              </v-col>
              <v-col cols="12">
                <br-grid
                  style="min-height: 200px"
                  :grid-configuration="recentlyOrderedProductsGridConfiguration"
                  :items="recentlyOrderedProducts"
                  :loading="loadingVisitExtras"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <br-btn
              v-if="currentOutlet?.isBrewManOutlet && userStore.hasBrewManLink"
              variant="text"
              color="primary"
              :disabled="currentVisit.status === 'COMPLETE'"
              :href="`https://brewman.premiersystems.com/orders/create?outletId=${currentOutlet.id}`"
              target="_blank"
            >
              Create Order
            </br-btn>
            <br-btn
              variant="text"
              color="primary"
              :loading="completingVisit"
              :disabled="currentVisit.status === 'COMPLETE'"
              @click="completeVisit"
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
  <task-edit-dialog
    v-model="showTaskEditDialog"
    v-if="showTaskEditDialog && taskToEdit && currentVisit"
    :task="taskToEdit"
    :users="users"
    :sales-visits="[currentVisit]"
    @accept="
      showTaskEditDialog = false;
      loadVisitExtras();
    "
  />
</template>

<style scoped></style>

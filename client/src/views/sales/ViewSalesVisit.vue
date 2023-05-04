<script setup lang="ts">
import useLoadingState from "@/composables/useLoadingState";
import { computed, onMounted, reactive, ref } from "vue";
import { SalesJourney } from "@server/models/salesJourney.model";
import { client } from "@/api/client";
import BrPage from "@/components/base/BrPage.vue";
import BrForm from "@/components/input/BrForm.vue";
import { useFormValidation } from "@/composables/useFormValidation";
import BrDate from "@/components/input/specialised/BrDate.vue";
import { SalesVisit } from "@server/models/salesVisit.model";
import { useRouter } from "vue-router";
import { Outlet } from "@server/models/outlet.model";
import useDirtyState from "@/composables/useDirtyState";
import BrDropdown from "@/components/input/BrDropdown.vue";
import { useValidationRules } from "@/composables/useValidationRules";
import ButtonBar from "@/components/ButtonBar.vue";
import { CommunicationLog } from "@server/models/communicationLog.model";
import { User } from "@server/models/user.model";
import BrSubtitle from "@/components/text/BrSubtitle.vue";
import ViewCommunicationLogs from "@/components/sales/ViewCommunicationLogs.vue";
import CreateCommunicationLogDialog from "@/components/sales/CreateCommunicationLogDialog.vue";
import BrGrid from "@/components/grid/BrGrid.vue";
import { GridConfigurationBuilder } from "@/components/grid/gridConfigurationBuilder";
import { Task } from "@server/models/task.model";
import TaskEditDialog from "@/components/tasks/TaskEditDialog.vue";
import { useUserStore } from "@/store/userStore";
import { v4 as uuid } from "uuid";

type SalesVisitAndJourney = SalesVisit & {
  salesJourney: SalesJourney | null;
};

interface ViewSalesJourneyProps {
  salesVisitId: string;
}

const props = defineProps<ViewSalesJourneyProps>();

const userStore = useUserStore();

const salesVisit = ref<SalesVisitAndJourney>();
const outlets = ref<Outlet[]>([]);
const salesJourneys = ref<SalesJourney[]>([]);
const communicationLogs = ref<CommunicationLog[]>([]);
const users = ref<User[]>([]);
const tasks = ref<Task[]>([]);
const taskToEdit = ref<Task>();
const showTaskEditDialog = ref(false);
const showCreateCommunicationLogDialog = ref(false);
const creatingTask = ref(false);

const internalSalesVisit = reactive<SalesVisit>({
  endTime: new Date(),
  reference: "",
  status: "OPEN",
  startTime: new Date(),
  outletId: "",
  id: "",
  salesJourneyId: "",
  tenantId: "",
});

const { form } = useFormValidation();
const { required } = useValidationRules();
const { isDirty, resetDirtyState } = useDirtyState(ref(internalSalesVisit));
const router = useRouter();

const [loading, refresh] = useLoadingState(async () => {
  [
    salesVisit.value,
    outlets.value,
    salesJourneys.value,
    users.value,
    tasks.value,
  ] = await Promise.all([
    client.salesVisit.getSalesVisit.query(props.salesVisitId),
    client.outlet.getAllOutlets.query(),
    client.salesJourney.getAllSalesJourneys.query(),
    client.user.getAllUsers.query(),
    client.task.getTaskByFilter.query({
      assignedSalesVisitId: props.salesVisitId,
    }),
  ]);

  if (salesVisit.value?.outletId) {
    communicationLogs.value =
      await client.communicationLog.getCommunicationLogsForOutlet.query(
        salesVisit.value.outletId
      );
  }

  Object.entries(salesVisit.value).forEach(
    // @ts-ignore
    ([key, value]) => (internalSalesVisit[key] = value)
  );

  creatingTask.value = false;
  resetDirtyState();
});

const [updating, updateSalesVisit] = useLoadingState(async () => {
  if (!salesVisit.value) {
    return;
  }

  await client.salesVisit.saveSalesVisit.mutate({
    ...salesVisit.value,
    ...internalSalesVisit,
  });

  await refresh();
});

const salesVisitStatus = computed(() => {
  if (!salesVisit.value) {
    return "-";
  }

  return salesVisit.value?.status ?? "-";
});

const createTask = () => {
  if (!userStore.user || !userStore.tenantId) {
    return;
  }

  taskToEdit.value = {
    createdByUserId: userStore.user.id!,
    dateCreated: new Date(),
    dateDue: salesVisit.value?.startTime ?? new Date(),
    id: uuid(),
    assignedSalesVisitId: salesVisit.value?.id ?? null,
    description: "",
    completed: false,
    tenantId: userStore.tenantId,
  };

  creatingTask.value = true;
  showTaskEditDialog.value = true;
};

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

          await refresh();
        },
        {
          visible: (item) => !item.completed,
        }
      );
  })
  .build();

onMounted(refresh);
</script>

<template>
  <br-page title="Sales Visit" show-back-button>
    <template #summary>
      {{ salesVisitStatus }}
    </template>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card :loading="loading">
          <v-card-title> Sales Visit Details</v-card-title>
          <v-card-text>
            <br-form ref="form" @submit.prevent="updateSalesVisit">
              <br-text
                v-model="internalSalesVisit.reference"
                label="Reference"
                :rules="[required]"
                :loading="loading"
              />
              <br-date
                v-model="internalSalesVisit.startTime"
                label="Visit Start Date"
                :loading="loading"
              />
              <br-date
                v-model="internalSalesVisit.endTime"
                label="Journey End Date"
                :loading="loading"
              />
              <br-dropdown
                v-model="internalSalesVisit.outletId"
                :item-title="(item: Outlet) => item.name"
                :item-value="(item: Outlet) => item.id"
                label="Outlet"
                :items="outlets"
              />
            </br-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card :loading="loading">
          <v-card-title>Journey Details</v-card-title>
          <v-card-text>
            <br-dropdown
              v-model="internalSalesVisit.salesJourneyId"
              :loading="loading"
              label="Assign to journey"
              :items="salesJourneys"
              :item-title="(item: SalesJourney) => item.reference"
              :item-value="(item: SalesJourney) => item.id"
              clearable
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <br-btn
              color="primary"
              variant="text"
              :disabled="!internalSalesVisit.salesJourneyId"
              :to="{
                path: `/sales/journeys/${internalSalesVisit.salesJourneyId}`,
              }"
            >
              Go to Journey
            </br-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <br-subtitle>Communication logs</br-subtitle>
        <view-communication-logs
          :communication-logs="communicationLogs"
          :users="users"
        />
      </v-col>
      <v-col cols="12" md="6">
        <br-subtitle>Tasks</br-subtitle>
        <br-grid
          :grid-configuration="tasksGridConfiguration"
          :items="tasks"
          :loading="loading"
        />
      </v-col>
    </v-row>
    <template #footer>
      <button-bar>
        <template #right>
          <br-btn secondary @click="createTask"> Create Task</br-btn>
          <br-btn
            class="ml-2"
            secondary
            @click="showCreateCommunicationLogDialog = true"
          >
            Log Communication
          </br-btn>
          <br-btn
            class="ml-2"
            color="primary"
            :disabled="loading || !isDirty || updating"
            @click="updateSalesVisit"
          >
            Update
          </br-btn>
        </template>
      </button-bar>
    </template>
  </br-page>
  <create-communication-log-dialog
    v-if="showCreateCommunicationLogDialog"
    v-model="showCreateCommunicationLogDialog"
    :sales-visit="salesVisit"
    :outlets="outlets"
    :users="users"
    creating-from-sales-visit
    @accept="refresh"
  />
  <task-edit-dialog
    v-model="showTaskEditDialog"
    v-if="showTaskEditDialog && taskToEdit && salesVisit"
    :task="taskToEdit"
    :users="users"
    :sales-visits="[salesVisit]"
    :is-creating="creatingTask"
    @accept="
      showTaskEditDialog = false;
      refresh();
    "
  />
</template>

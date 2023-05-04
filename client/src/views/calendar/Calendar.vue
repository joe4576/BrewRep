<script setup lang="ts">
import { client } from "@/api/client";
import BrCalendar from "@/components/calendar/BrCalendar.vue";
import BrEventSummaryMenu, {
  SummaryItem,
} from "@/components/calendar/BrEventSummaryMenu.vue";
import TaskEditDialog from "@/components/tasks/TaskEditDialog.vue";
import { useCalendar } from "@/composables/useCalendar";
import useLoadingState from "@/composables/useLoadingState";
import { Task } from "@server/models/task.model";
import { User } from "@server/models/user.model";
import { computed, onMounted, ref } from "vue";
import { SalesVisit } from "@server/models/salesVisit.model";
import { SalesJourney } from "@server/models/salesJourney.model";

type TaskAndVisit = Partial<Task & SalesVisit>;

type SalesVisitAndJourney = SalesVisit & {
  salesJourney: SalesJourney | null;
};

const tasks = ref<Task[]>([]);
const users = ref<User[]>([]);
const salesVisits = ref<SalesVisitAndJourney[]>([]);
const selectedTask = ref<Task>();
const selectedVisit = ref<SalesVisitAndJourney>();
const showEditTaskDialog = ref(false);
const hideWeekends = ref(true);
const summaryMenuActivator = ref();

const [refreshLoading, refresh] = useLoadingState(async () => {
  [tasks.value, users.value, salesVisits.value] = await Promise.all([
    client.task.getAllTasks.query(),
    client.user.getAllUsers.query(),
    client.salesVisit.getAllSalesVisits.query(),
  ]);
});

onMounted(refresh);

const [savingTask, saveTask] = useLoadingState(
  async (task: Task, newDueDate: Date) => {
    await client.task.saveTask.mutate({ ...task, dateDue: newDueDate });
    await refresh();
  }
);

const [savingVisit, saveVisit] = useLoadingState(
  async (visit: SalesVisit, newStartTime: Date, newEndTime: Date) => {
    await client.salesVisit.saveSalesVisit.mutate({
      ...visit,
      startTime: newStartTime,
      endTime: newEndTime,
    });
    await refresh();
  }
);

const tasksAndVisits = computed((): TaskAndVisit[] => [
  ...tasks.value,
  ...salesVisits.value,
]);

const eventIsTask = (event: TaskAndVisit): event is Task =>
  event.description !== undefined;

const eventIsVisit = (event: TaskAndVisit): event is SalesVisitAndJourney =>
  event.reference !== undefined;

const { events, onEventClick, onEventDrop, onEventDurationChange } =
  useCalendar({
    events: tasksAndVisits,
    titleExtractor: (item) => {
      if (eventIsTask(item)) {
        return item.description;
      }

      if (eventIsVisit(item)) {
        return item.reference;
      }

      return "";
    },
    contentExtractor: (item) => {
      if (eventIsTask(item)) {
        return item.description;
      }

      if (eventIsVisit(item)) {
        return item.reference;
      }

      return "";
    },
    startDateExtractor: (item) => {
      if (eventIsTask(item)) {
        return item.dateDue;
      }

      if (eventIsVisit(item)) {
        return item.startTime;
      }

      return new Date();
    },
    endDateExtractor: (item) => {
      // Tasks don't have a duration, so set to 1 hour so they are visible
      if (eventIsTask(item)) {
        return item.dateDue.addHours(1);
      }

      if (eventIsVisit(item)) {
        return item.endTime;
      }

      return new Date();
    },
    onEventDurationChange: async (item) => {
      if (eventIsVisit(item.event.payload)) {
        await saveVisit(item.event.payload, item.event.start, item.event.end);
      }
    },
    onEventClick: async (item, nativeEvent) => {
      if (eventIsTask(item.payload)) {
        selectedTask.value = item.payload;
        selectedVisit.value = undefined;
      }

      if (eventIsVisit(item.payload)) {
        selectedVisit.value = item.payload;
        selectedTask.value = undefined;
      }

      summaryMenuActivator.value = nativeEvent.target;
      nativeEvent.preventDefault();
    },
    onEventDrop: async (item) => {
      if (eventIsTask(item.event.payload)) {
        await saveTask(item.event.payload, item.newDate);
      }

      if (eventIsVisit(item.event.payload)) {
        await saveVisit(item.event.payload, item.event.start, item.event.end);
      }
    },
    class: (item) => {
      if (eventIsTask(item)) {
        return "task-background";
      }

      return "visit-background";
    },
    resizeable: (item) => !eventIsTask(item),
  });

const taskEventSummaryItems: SummaryItem[] = [
  {
    icon: "mdi-account",
    body: computed(
      () =>
        users.value.find(
          (user) => user.id === selectedTask.value?.assignedToUserId
        )?.name ?? "N/A"
    ),
  },
  {
    icon: "mdi-text-box-edit-outline",
    body: computed(() => selectedTask.value?.description),
  },
  {
    icon: "mdi-clock-outline",
    body: computed(
      () => "Due time: " + selectedTask.value?.dateDue.formatTime("HH:mm")
    ),
  },
];

const visitEventSummaryItems: SummaryItem[] = [
  {
    icon: "mdi-account",
    body: computed(
      () =>
        users.value.find(
          (user) =>
            user.id === selectedVisit.value?.salesJourney?.assignedUserId
        )?.name ?? "N/A"
    ),
  },
  {
    icon: "mdi-car",
    body: computed(
      () => selectedVisit.value?.salesJourney?.reference ?? "No Journey"
    ),
  },
  {
    icon: "mdi-clock-outline",
    body: computed(
      () =>
        "Time: " +
        selectedVisit.value?.startTime.formatTime("HH:mm") +
        " - " +
        selectedVisit.value?.endTime.formatTime("HH:mm")
    ),
  },
];
</script>

<template>
  <v-container class="pa-0" fluid style="height: calc(100vh - 125px)">
    <div class="d-flex justify-space-between">
      <div>
        <br-checkbox
          v-model="hideWeekends"
          label="Hide Weekends"
          hide-details
          density="compact"
        />
      </div>
      <div v-if="savingTask || refreshLoading || savingVisit">
        <v-progress-circular indeterminate />
      </div>
    </div>
    <br-calendar
      :events="events"
      :snap-to-time="15"
      :hide-weekends="hideWeekends"
      @event-click="onEventClick"
      @event-drop="onEventDrop"
      @event-duration-change="onEventDurationChange"
    />
  </v-container>

  <br-event-summary-menu
    :payload="selectedTask ?? selectedVisit"
    :activator="summaryMenuActivator"
    :title="selectedTask ? 'Task' : 'Visit'"
    :prepend-icon="
      selectedTask
        ? 'mdi-checkbox-multiple-marked-outline'
        : 'mdi-account-group-outline'
    "
    :tooltip-text="selectedTask ? 'Edit Task' : 'Edit Visit'"
    :summary-items="
      selectedTask ? taskEventSummaryItems : visitEventSummaryItems
    "
    @edit="
      selectedTask
        ? (showEditTaskDialog = true)
        : $router.push({
            path: '/sales/visits/' + selectedVisit?.id,
          })
    "
  />

  <task-edit-dialog
    v-model="showEditTaskDialog"
    v-if="showEditTaskDialog && selectedTask"
    :task="selectedTask"
    :users="users"
    :sales-visits="salesVisits"
    @accept="
      showEditTaskDialog = false;
      refresh();
    "
  />
</template>

<style>
.task-background {
  background-color: #019b91;
  color: white;
}

.visit-background {
  background-color: #9b4401;
  color: white;
}
</style>

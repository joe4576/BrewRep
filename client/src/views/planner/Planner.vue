<script setup lang="ts">
import { client } from "@/api/client";
import BrCalendar from "@/components/calendar/BrCalendar.vue";
import BrEventSummaryMenu, {
  SummaryItem,
} from "@/components/calendar/BrEventSummaryMenu.vue";
import TaskEditDialog from "@/components/tasks/TaskEditDialog.vue";
import { useCalendar } from "@/composables/useCalendar";
import useLoadingState from "@/composables/useLoadingState";
import { eventIsTask } from "@/services/plannerService";
import { Task } from "@server/models/task.model";
import { User } from "@server/models/user.model";
import { computed, onMounted, ref } from "vue";

const tasks = ref<Task[]>([]);
const users = ref<User[]>([]);
const selectedTask = ref<Task>();
const showEditTaskDialog = ref(false);
const hideWeekends = ref(true);
const summaryMenuActivator = ref();

const [refreshLoading, refresh] = useLoadingState(async () => {
  [tasks.value, users.value] = await Promise.all([
    client.task.getAllTasks.query(),
    client.user.getAllUsers.query(),
  ]);
});

onMounted(refresh);

const [savingTask, saveTask] = useLoadingState(
  async (task: Task, newDueDate: Date) => {
    await client.task.saveTask.mutate({ ...task, dateDue: newDueDate });
    await refresh();
  }
);

const { events, onEventClick, onEventDrop, onEventDurationChange } =
  useCalendar({
    events: tasks,
    titleExtractor: (item) => item.description,
    contentExtractor: (item) => item.description,
    startDateExtractor: (item) => item.dateDue,
    // Tasks don't have a duration, so set to 1 hour so they are visible
    endDateExtractor: (item) => item.dateDue.addHours(1),
    onEventDurationChange: (item) => {
      // TODO
    },
    onEventClick: async (item, nativeEvent) => {
      selectedTask.value = item.payload;
      summaryMenuActivator.value = nativeEvent.target;
      nativeEvent.preventDefault();
    },
    onEventDrop: async (item) => {
      await saveTask(item.event.payload, item.newDate);
    },
    class: (item) => {
      if (eventIsTask(item)) {
        return "task-background";
      }

      return "visit-background";
    },
    resizeable: (item) => !eventIsTask(item),
  });

const eventSummaryItems: SummaryItem[] = [
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
      <div v-if="savingTask || refreshLoading">
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
    :payload="selectedTask"
    :activator="summaryMenuActivator"
    title="Task"
    prepend-icon="mdi-checkbox-multiple-marked-outline"
    tooltip-text="Edit Task"
    :summary-items="eventSummaryItems"
    @edit="showEditTaskDialog = true"
  />

  <task-edit-dialog
    v-model="showEditTaskDialog"
    v-if="showEditTaskDialog && selectedTask"
    :task="selectedTask"
    :users="users"
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

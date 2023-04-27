<script setup lang="ts">
import { client } from "@/api/client";
import BrCalendar from "@/components/calendar/BrCalendar.vue";
import { useCalendar } from "@/composables/useCalendar";
import useLoadingState from "@/composables/useLoadingState";
import { eventIsTask } from "@/services/plannerService";
import { Task } from "@server/models/task.model";
import { onMounted, ref } from "vue";

const tasks = ref<Task[]>([]);

const hideWeekends = ref(true);

onMounted(async () => {
  tasks.value = await client.task.getAllTasks.query();
});

// save task, but don't get updated list
const [savingTask, saveTask] = useLoadingState(
  async (task: Task, newDueDate: Date) => {
    await client.task.saveTask.mutate({ ...task, dateDue: newDueDate });
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
    onEventClick: (item, nativeEvent) => {
      // TODO
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
      <div v-if="savingTask">
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

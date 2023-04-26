<script setup lang="ts">
import { client } from "@/api/client";
import BrCalendar from "@/components/calendar/BrCalendar.vue";
import { useCalendar } from "@/composables/useCalendar";
import { Task } from "@server/models/task.model";
import { onMounted, ref } from "vue";

const tasks = ref<Task[]>([]);

onMounted(async () => {
  tasks.value = await client.task.getAllTasks.query();
});

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
    onEventDrop: (item) => {
      // TODO
    },
  });
</script>

<template>
  <v-container fluid class="pa-0" style="height: calc(100vh - 100px)">
    <br-calendar
      :events="events"
      :snap-to-time="15"
      @event-click="onEventClick"
      @event-drop="onEventDrop"
      @event-duration-change="onEventDurationChange"
    />
  </v-container>
</template>

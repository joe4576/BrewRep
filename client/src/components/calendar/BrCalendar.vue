<script setup lang="ts">
import VueCal, { type Event as CalEvent, Props } from "vue-cal";
import "vue-cal/dist/vuecal.css";

export interface EventDrop<T extends CalEvent> {
  event: T;
  external: boolean;
  newDate: Date;
  oldDate: Date;
  originalEvent: T;
}

export interface EventDurationChange<T extends CalEvent> {
  event: T;
  oldDate: Date;
  originalEvent: T;
}

interface CalendarEmits<T extends CalEvent> {
  (e: "event-click", calEvent: T, nativeEvent: Event): void;
  (e: "event-drop", eventDrop: EventDrop<T>): void;
  (
    e: "event-duration-change",
    eventDurationChange: EventDurationChange<T>
  ): void;
}

const emit = defineEmits<CalendarEmits<any>>();

interface CalendarProps extends Props {}

defineProps<CalendarProps>();

// for some reason, this doesn't follow the same pattern as other events
const bubbleEventClick = (calEvent: CalEvent, nativeEvent: Event) => {
  emit("event-click", calEvent, nativeEvent);
};

const bubbleEventDrop = <T extends CalEvent>(eventDrop: EventDrop<T>) => {
  emit("event-drop", eventDrop);
};

const bubbleEventDurationChange = <T extends CalEvent>(
  eventDurationChange: EventDurationChange<T>
) => {
  emit("event-duration-change", eventDurationChange);
};
</script>

<template>
  <vue-cal
    v-bind="$attrs"
    :disable-views="['years']"
    :time-step="30"
    today-button
    :editable-events="{
      title: false,
      drag: true,
      resize: true,
      delete: false,
      create: false,
    }"
    :on-event-click="bubbleEventClick"
    @event-drop="bubbleEventDrop"
    @event-duration-change="bubbleEventDurationChange"
  >
    <template #today-button>
      <v-tooltip location="top">
        <template #activator="{ props }">
          <v-btn v-bind="props" variant="outlined"> Today </v-btn>
        </template>
        <span>Go to Today's date</span>
      </v-tooltip>
    </template>
  </vue-cal>
</template>

<!-- These styles need to be global -->
<style>
.vuecal__menu,
.vuecal__cell-events-count {
  background-color: #002e5d;
  color: white;
}

.vuecal__title-bar {
  background-color: #5596e6;
  color: white;
}

.vuecal__cell--today,
.vuecal__cell--current {
  background-color: rgba(85, 150, 230, 0.1);
}

.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {
  background-color: rgba(85, 150, 230, 0.1);
}

.vuecal__cell--selected:before {
  background-color: rgba(85, 150, 230, 0.1);
}

.vuecal__event:hover {
  cursor: pointer;
}
</style>

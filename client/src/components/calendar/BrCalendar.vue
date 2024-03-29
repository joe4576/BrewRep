<script setup lang="ts">
import VueCal, { Props, type Event as CalEvent } from "vue-cal";
import "vue-cal/dist/vuecal.css";
import BrEvent from "@/components/calendar/BrEvent.vue";

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
interface CalendarProps extends Props {}

defineProps<CalendarProps>();
const emit = defineEmits<CalendarEmits<any>>();

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

const scrollToCurrentTime = async () => {
  // need to wait for this amount of time before scrolling, otherwise
  // doesn't work when switching between views
  await new Promise((res) => setTimeout(res, 400));

  const calendar = document.querySelector("#vuecal .vuecal__bg");
  const timeWindowHeightPx = 50;
  const now = new Date();
  const hours = now.getHours() + now.getMinutes() / 60;

  calendar?.scrollTo({ top: hours * timeWindowHeightPx, behavior: "smooth" });
};
</script>

<template>
  <vue-cal
    v-bind="$attrs"
    id="vuecal"
    :disable-views="['years', 'year']"
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
    events-on-month-view="short"
    @event-drop="bubbleEventDrop"
    @event-duration-change="bubbleEventDurationChange"
    @view-change="scrollToCurrentTime"
    @ready="scrollToCurrentTime"
  >
    <template #today-button>
      <v-tooltip location="top">
        <template #activator="{ props }">
          <br-btn v-bind="props" variant="outlined"> Today </br-btn>
        </template>
        <span>Go to Today's date</span>
      </v-tooltip>
    </template>
    <template #event="{ event }">
      <br-event :event="event" />
    </template>
  </vue-cal>
</template>

<!-- These styles need to be global -->
<style>
.vuecal__menu,
.vuecal__cell-events-count {
  background-color: #01579b;
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

.vuecal__now-line {
  color: #06c;
}
</style>

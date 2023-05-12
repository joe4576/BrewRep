<script setup lang="ts">
import { DecoratedCalEvent } from "@/composables/useCalendar";
import { eventIsTask } from "@/services/plannerService";
import { computed } from "vue";

interface BrEventProps<T = unknown> {
  event: DecoratedCalEvent<T>;
}

const props = defineProps<BrEventProps>();

const formatDate = (date: string | Date) => {
  if (typeof date === "string") {
    return date;
  }

  return date.formatTime("HH:mm");
};

const showEndTime = computed(() => !eventIsTask(props.event.payload));
</script>

<template>
  <div class="my-auto d-flex align-center justify-center" style="height: 100%">
    <div>
      <strong>
        {{ event.title }}
      </strong>
      <p v-if="showEndTime">
        {{ formatDate(event.start) }} - {{ formatDate(event.end) }}
      </p>
      <p v-else>
        {{ formatDate(event.start) }}
      </p>
    </div>
  </div>
</template>

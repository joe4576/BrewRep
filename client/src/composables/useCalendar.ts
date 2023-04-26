import {
  EventDrop,
  EventDurationChange,
} from "@/components/calendar/BrCalendar.vue";
import { refNoUnwrap } from "@/utils/reactivityUtils";
import { Ref, watch } from "vue";
import { Event as CalEvent } from "vue-cal";

interface CalendarConfiguration<T> {
  events: Ref<T[]>;
  startDateExtractor: (item: T) => Date;
  endDateExtractor: (item: T) => Date;
  titleExtractor?: (item: T) => string;
  contentExtractor?: (item: T) => string;
  class?: (item: T) => string;
  onEventClick: (
    item: DecoratedCalEvent<T>,
    nativeEvent: Event
  ) => void | Promise<void>;
  onEventDrop: (
    eventDrop: EventDrop<DecoratedCalEvent<T>>
  ) => void | Promise<void>;
  onEventDurationChange: (
    eventDurationChange: EventDurationChange<DecoratedCalEvent<T>>
  ) => void | Promise<void>;
}

type DecoratedCalEvent<T> = CalEvent & {
  payload: T;
};

export function useCalendar<T>(configuration: CalendarConfiguration<T>) {
  const events = refNoUnwrap<DecoratedCalEvent<T>[]>([]);

  const buildCalendarEvent = (event: T): DecoratedCalEvent<T> => {
    return {
      start: configuration.startDateExtractor(event),
      end: configuration.endDateExtractor(event),
      title: configuration.titleExtractor?.(event),
      content: configuration.contentExtractor?.(event),
      class: configuration.class?.(event),
      payload: {
        ...event,
      },
    };
  };

  watch(configuration.events, () => {
    events.value = configuration.events.value.map(buildCalendarEvent);
  });

  return {
    events,
    onEventClick: configuration.onEventClick,
    onEventDrop: configuration.onEventDrop,
    onEventDurationChange: configuration.onEventDurationChange,
  };
}

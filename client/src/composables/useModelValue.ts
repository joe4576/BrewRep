import { computed } from "vue";

/**
 * Handles two-way data binding from inside components.
 *
 * @param value Funtion to get value, likely `() => props.modelValue`
 * @param emitFn Emit function, e.g. emit from `const emit = defineEmits()`
 * @param event Event name to emit updated value
 */
function useModelValue<T>(
  value: () => T,
  emitFn: any,
  event: string = "update:modelValue"
) {
  const model = computed({
    get: value,
    set: (val) => emitFn(event, val),
  });

  return {
    model,
  };
}

export default useModelValue;

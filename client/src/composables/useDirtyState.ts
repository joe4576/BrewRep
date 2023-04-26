import cloneDeep from "lodash.clonedeep";
import isEqual from "lodash.isequal";
import { onMounted, ref, watch, type Ref } from "vue";

function useDirtyState(...items: Ref<any>[]) {
  let originalItemValues: Ref<any>[] = [];
  const isDirty = ref(false);

  onMounted(() => {
    resetDirtyState();
  });

  watch(
    items,
    (newValue) => {
      isDirty.value = !isEqual(newValue, originalItemValues);
    },
    { deep: true }
  );

  const resetDirtyState = () => {
    originalItemValues = cloneDeep(items.map((item) => item.value));
  };

  return {
    isDirty,
    resetDirtyState,
  };
}

export default useDirtyState;

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
    (newItems) => {
      isDirty.value = !isEqual(newItems, originalItemValues);
    },
    { deep: true }
  );

  const resetDirtyState = () => {
    originalItemValues = cloneDeep(items.map((item) => item.value));
    isDirty.value = false;
  };

  return {
    isDirty,
    resetDirtyState,
  };
}

export default useDirtyState;

<script setup lang="ts">
import { GridConfiguration } from "@/components/grid/gridConfigurationBuilder";
import BooleanColumnRenderer from "@/components/grid/renderers/BooleanColumnRenderer.vue";
import DateColumnRenderer from "@/components/grid/renderers/DateColumnRenderer.vue";
import { ColDef } from "@ag-grid-community/core";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridVue } from "ag-grid-vue3";
import { ref, watch } from "vue";

interface BrGridProps<T> {
  items: T[];
  gridConfiguration: GridConfiguration<T>;
}

interface BrGridEmits<T> {
  (e: "rowClicked", v: T): void;
}

const props = defineProps<BrGridProps<any>>();
defineEmits<BrGridEmits<any>>();

const columnDefs = ref<ColDef[]>([]);

watch(
  () => props.gridConfiguration,
  (config) => {
    columnDefs.value = Object.entries(config).map(
      ([columnHeader, columnConfig]) => {
        const colDef: ColDef = {
          colId: columnHeader,
          headerName: columnHeader,
          valueGetter: (item: any) => columnConfig.extractor(item.data),
          cellRenderer:
            columnConfig.cellRenderer === "boolean"
              ? BooleanColumnRenderer
              : columnConfig.cellRenderer === "date"
              ? DateColumnRenderer
              : undefined,
        };

        return colDef;
      }
    );
  },
  { immediate: true }
);

const defaultColDef: ColDef = {
  sortable: true,
  filter: true,
  flex: 1,
};
</script>

<template>
  <ag-grid-vue
    class="ag-theme-material"
    style="height: 500px"
    :columnDefs="columnDefs"
    :rowData="props.items"
    :defaultColDef="defaultColDef"
    rowSelection="multiple"
    animateRows="true"
    @row-clicked="$emit('rowClicked', $event.data)"
  >
  </ag-grid-vue>
</template>

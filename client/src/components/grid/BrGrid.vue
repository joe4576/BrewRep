<script setup lang="ts">
import { GridConfiguration } from "@/components/grid/gridConfigurationBuilder";
import ActionsColumnRenderer from "@/components/grid/renderers/ActionsColumnRenderer.vue";
import BooleanColumnRenderer from "@/components/grid/renderers/BooleanColumnRenderer.vue";
import DateColumnRenderer from "@/components/grid/renderers/DateColumnRenderer.vue";
import { ColDef } from "@ag-grid-community/core";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridVue } from "ag-grid-vue3";
import { ref, watch } from "vue";
import DateTimeColumnRenderer from "@/components/grid/renderers/DateTimeColumnRenderer.vue";

interface BrGridProps<T> {
  items: T[];
  gridConfiguration: GridConfiguration<T>;
  loading?: boolean;
}

interface BrGridEmits<T> {
  (e: "rowClicked", v: T): void;
}

const props = defineProps<BrGridProps<any>>();
defineEmits<BrGridEmits<any>>();

const columnDefs = ref<ColDef[]>([]);

const dateComparer = (dateA: Date, dateB: Date) => {
  const millisecondsA = dateA.getTime();
  const millisecondsB = dateB.getTime();

  if (millisecondsA > millisecondsB) {
    return 1;
  } else if (millisecondsA < millisecondsB) {
    return -1;
  } else {
    return 0;
  }
};

watch(
  () => props.gridConfiguration,
  (config) => {
    columnDefs.value = Object.entries(config).map(
      ([columnHeader, columnConfig]) => {
        const { renderer, extractor } = columnConfig;

        const colDef: ColDef = {
          colId: columnHeader,
          headerName: columnHeader,
          valueGetter: (item: any) => extractor(item.data),
        };

        if (renderer.type === "boolean") {
          colDef.cellRenderer = BooleanColumnRenderer;
        }

        if (renderer.type === "date") {
          colDef.cellRenderer = DateColumnRenderer;
          colDef.comparator = dateComparer;
        }

        if (renderer.type === "date-time") {
          colDef.cellRenderer = DateTimeColumnRenderer;
          colDef.comparator = dateComparer;
        }

        if (renderer.type === "actions") {
          colDef.cellRendererParams = columnConfig.renderer.meta;
          colDef.cellRenderer = ActionsColumnRenderer;
          colDef.headerName = "";
          colDef.lockPinned = true;
          colDef.pinned = "right";
          colDef.width = 30;
          colDef.maxWidth = 30;
          colDef.resizable = false;
          colDef.cellStyle = {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          };
        }

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
  <v-skeleton-loader v-if="loading" type="table-tbody" />
  <ag-grid-vue
    v-else
    v-bind="$attrs"
    class="ag-theme-material"
    style="min-height: 500px; height: 100%"
    :columnDefs="columnDefs"
    :rowData="props.items"
    :defaultColDef="defaultColDef"
    rowSelection="multiple"
    animateRows="true"
    @row-clicked="$emit('rowClicked', $event.data)"
  >
  </ag-grid-vue>
</template>

<script setup lang="ts">
import { client } from "@/api/client";
import BrMap, { Marker } from "@/components/map/BrMap.vue";
import useLoadingState from "@/composables/useLoadingState";
import { Outlet } from "@server/models/outlet.model";
import { computed, onMounted, ref } from "vue";

const outlets = ref<Outlet[]>([]);

const [loading, refresh] = useLoadingState(async () => {
  outlets.value = await client.outlet.getAllOutlets.query();
});

const markers = computed((): Marker[] =>
  outlets.value
    .filter((outlet) => outlet.lat && outlet.long)
    .map((outlet) => ({
      lat: outlet.lat,
      long: outlet.long,
      label: outlet.name,
      entityId: outlet.id,
      color: "green",
    }))
);

onMounted(refresh);
</script>

<template>
  <br-map :markers="markers" :loading="loading" />
</template>

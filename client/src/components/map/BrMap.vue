<script setup lang="ts">
import {
  Map,
  MarkerOptions,
  map as createMap,
  marker,
  tileLayer,
} from "leaflet";
import { onMounted, watch } from "vue";

export type Marker = {
  lat: string;
  long: string;
  label: string;
  entityId: string;
};

type DecoratedMarkerOptions = MarkerOptions & { entityId: string };

interface BrMapProps {
  markers: Marker[];
  loading?: boolean;
}

interface BrMapEmits {
  (e: "markerClick", v: string): void;
}

const props = defineProps<BrMapProps>();
const emit = defineEmits<BrMapEmits>();

let map: Map | null = null;

watch(
  () => props.markers,
  (markers) => {
    if (markers.length === 0 || !map) {
      return;
    }

    // set initial lat/long as centre of all coordinates
    const { lat, long } = markers.reduce(
      (acc, { lat, long }, idx, arr) => {
        acc["lat"] += +lat;
        acc["long"] += +long;

        if (idx === arr.length - 1) {
          acc["lat"] = acc["lat"] / arr.length;
          acc["long"] = acc["long"] / arr.length;
        }

        return acc;
      },
      { lat: 0, long: 0 }
    );

    // add each marker to the map
    props.markers.forEach(({ lat, long, label, entityId }) => {
      const markerOptions: DecoratedMarkerOptions = {
        entityId,
      };

      marker([+lat, +long], markerOptions)
        .bindPopup(label)
        .addEventListener("click", (marker) => {
          emit("markerClick", marker.sourceTarget.options.entityId);
        })
        .addTo(map!);
    });

    map.setView([lat, long], 13);
  },
  { immediate: true }
);

onMounted(() => {
  map = createMap("map");

  const initialLat = 51.508;
  const initialLong = -0.11;
  map.setView([initialLat, initialLong], 12);

  tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; OSM Mapnik <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
});
</script>

<template>
  <div v-show="!loading" id="map" />
  <v-progress-circular v-show="loading" indeterminate />
</template>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>

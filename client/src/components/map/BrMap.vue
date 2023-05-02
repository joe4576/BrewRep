<script setup lang="ts">
import {
  Icon,
  Map,
  map as createMap,
  marker,
  MarkerOptions,
  tileLayer,
} from "leaflet";
import { onMounted, watch } from "vue";

export type Marker = {
  lat: string;
  long: string;
  label: string;
  entityId: string;
  color: "green" | "red";
};

type DecoratedMarkerOptions = MarkerOptions & { entityId: string };

interface BrMapProps {
  markers: Marker[];
  loading?: boolean;
}

interface BrMapEmits {
  (e: "markerClick", v: string): void;

  (e: "mapClick", v: void): void;
}

const props = defineProps<BrMapProps>();
const emit = defineEmits<BrMapEmits>();

let map: Map | null = null;

const configureInitialMapState = () => {
  if (props.markers.length === 0 || !map) {
    return;
  }

  // set initial lat/long as centre of all coordinates
  const { lat, long } = props.markers.reduce(
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
  props.markers.forEach(({ lat, long, label, entityId, color }) => {
    const icon = new Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const markerOptions: DecoratedMarkerOptions = {
      entityId,
      icon,
    };

    marker([+lat, +long], markerOptions)
      .bindPopup(label)
      .addEventListener("click", (marker) => {
        emit("markerClick", marker.sourceTarget.options.entityId);
      })
      .addTo(map!);
  });

  map.setView([lat, long], 13);
};

watch(() => props.markers, configureInitialMapState, { immediate: true });

onMounted(() => {
  map = createMap("map").addEventListener("click", () => {
    emit("mapClick");
  });

  const initialLat = 51.508;
  const initialLong = -0.11;
  map.setView([initialLat, initialLong], 12);

  tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; OSM Mapnik <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  configureInitialMapState();
});
</script>

<template>
  <div v-bind="$attrs" v-show="!loading" id="map" />
  <v-progress-circular v-show="loading" indeterminate />
</template>

<style>
#map {
  width: 100%;
  height: 100%;
}

.yellow {
  background-color: yellow;
}
</style>

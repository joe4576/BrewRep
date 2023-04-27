<script setup lang="ts">
import { client } from "@/api/client";
import BrPage from "@/components/base/BrPage.vue";
import useLoadingState from "@/composables/useLoadingState";
import { Outlet } from "@server/models/outlet.model";
import { onMounted, ref } from "vue";

interface ViewOutletProps {
  outletId: string;
}

const props = defineProps<ViewOutletProps>();
const outlet = ref<Outlet>();

const [loading, refresh] = useLoadingState(async () => {
  outlet.value = await client.outlet.getOutlet.query(props.outletId);
});

onMounted(refresh);
</script>

<template>
  <br-page :title="outlet?.name ?? ''" :loading="loading">
    <pre>{{ outlet }}</pre>
  </br-page>
</template>

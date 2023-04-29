<script setup lang="ts">
import useLoadingState from "@/composables/useLoadingState";
import { onMounted, ref } from "vue";
import { SalesJourney } from "@server/models/salesJourney.model";
import { client } from "@/api/client";

interface ViewSalesJourneyProps {
  salesJourneyId: string;
}

const props = defineProps<ViewSalesJourneyProps>();

const salesJourney = ref<SalesJourney>();

const [loading, refresh] = useLoadingState(async () => {
  salesJourney.value = await client.salesJourney.getSalesJourney.query(
    props.salesJourneyId
  );
});

onMounted(refresh);
</script>

<template>
  <pre>{{ salesJourney }}</pre>
</template>

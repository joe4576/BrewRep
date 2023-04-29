<script setup lang="ts">
import { SalesJourney } from "@server/models/salesJourney.model";
import { onMounted, ref } from "vue";
import useLoadingState from "@/composables/useLoadingState";
import { client } from "@/api/client";
import { GridConfigurationBuilder } from "@/components/grid/gridConfigurationBuilder";
import { User } from "@server/models/user.model";
import BrGrid from "@/components/grid/BrGrid.vue";
import BrPage from "@/components/base/BrPage.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const journeys = ref<SalesJourney[]>([]);
const users = ref<User[]>([]);

const [loading, refresh] = useLoadingState(async () => {
  journeys.value = await client.salesJourney.getAllSalesJourneys.query();
  users.value = await client.user.getUsers.query(
    journeys.value.map((journey) => journey.assignedUserId)
  );
});

const openSalesJourney = async (item: SalesJourney) => {
  await router.push({
    path: `/sales/journeys/${item.id}`,
  });
};

const gridConfiguration = new GridConfigurationBuilder<SalesJourney>()
  .addTextColumn(
    "Assigned to user",
    (item) =>
      users.value?.find((user) => user.id === item.assignedUserId)?.name ?? "-"
  )
  .addDateColumn("Date", (item) => item.date)
  .addBooleanColumn("Completed?", (item) => item.completed)
  .addActionsColumn((builder) => {
    builder.addRoutingAction("View", (item) => ({
      path: `/sales/journeys/${item.id}`,
    }));
  })
  .build();

onMounted(refresh);
</script>

<template>
  <br-page :loading="loading" title="Sales Journeys">
    <br-grid
      :items="journeys"
      :grid-configuration="gridConfiguration"
      :loading="loading"
      @row-clicked="openSalesJourney"
    />
  </br-page>
</template>
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
import ButtonBar from "@/components/ButtonBar.vue";
import CreateSalesJourneyDialog from "@/components/sales/CreateSalesJourneyDialog.vue";

const router = useRouter();

const journeys = ref<SalesJourney[]>([]);
const users = ref<User[]>([]);
const showCreateSalesJourneyDialog = ref(false);

const [loading, refresh] = useLoadingState(async () => {
  [journeys.value, users.value] = await Promise.all([
    client.salesJourney.getAllSalesJourneys.query(),
    client.user.getAllUsers.query(),
  ]);
});

const openSalesJourney = async (item: SalesJourney) => {
  await router.push({
    path: `/sales/journeys/${item.id}`,
  });
};

const gridConfiguration = new GridConfigurationBuilder<SalesJourney>()
  .addTextColumn("Reference", (item) => item.reference)
  .addTextColumn(
    "Assigned to user",
    (item) =>
      users.value?.find((user) => user.id === item.assignedUserId)?.name ?? "-"
  )
  .addDateColumn("Date", (item) => item.date)
  .addBooleanColumn("Completed?", (item) => item.completed)
  .addTextColumn("Distance travelled", (item) =>
    item.completed
      ? (item.endMilage - item.startMilage).toString() + " miles"
      : "-"
  )
  .addActionsColumn((builder) => {
    builder
      .addRoutingAction("View", (item) => ({
        path: `/sales/journeys/${item.id}`,
      }))
      .addClickAction("Delete", async (item) => {
        await client.salesJourney.deleteSalesJourney.mutate(item);
        await refresh();
      });
  })
  .build();

onMounted(refresh);
</script>

<template>
  <br-page :loading="loading" title="Sales Journeys">
    <br-grid
      class="pb-4"
      :items="journeys"
      :grid-configuration="gridConfiguration"
      :loading="loading"
      @row-clicked="openSalesJourney"
    />
    <template #footer>
      <button-bar>
        <template #right>
          <br-btn
            color="primary"
            :disabled="loading"
            @click="showCreateSalesJourneyDialog = true"
          >
            Create Journey
          </br-btn>
        </template>
      </button-bar>
    </template>
  </br-page>
  <create-sales-journey-dialog
    v-if="showCreateSalesJourneyDialog"
    v-model="showCreateSalesJourneyDialog"
    :users="users"
    @accept="refresh"
  />
</template>

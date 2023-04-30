<script setup lang="ts">
import useLoadingState from "@/composables/useLoadingState";
import { computed, onMounted, reactive, ref, toRef } from "vue";
import { SalesJourney } from "@server/models/salesJourney.model";
import { client } from "@/api/client";
import BrPage from "@/components/base/BrPage.vue";
import BrForm from "@/components/input/BrForm.vue";
import { useFormValidation } from "@/composables/useFormValidation";
import BrDate from "@/components/input/specialised/BrDate.vue";
import useDirtyState from "@/composables/useDirtyState";
import { SalesVisit } from "@server/models/salesVisit.model";
import BrSubtitle from "@/components/text/BrSubtitle.vue";
import { GridConfigurationBuilder } from "@/components/grid/gridConfigurationBuilder";
import BrGrid from "@/components/grid/BrGrid.vue";
import { Outlet } from "@server/models/outlet.model";
import ButtonBar from "@/components/ButtonBar.vue";
import { useRouter } from "vue-router";
import { useValidationRules } from "@/composables/useValidationRules";

type SalesJourneyAndVisit = SalesJourney & {
  salesVisits: SalesVisit[];
};

interface ViewSalesJourneyProps {
  salesJourneyId: string;
}

const props = defineProps<ViewSalesJourneyProps>();

const salesJourney = ref<SalesJourneyAndVisit>();
const outlets = ref<Outlet[]>([]);

const internalSalesJourney = reactive<SalesJourney>({
  reference: "",
  assignedUserId: "",
  inProgress: false,
  completed: false,
  tenantId: "",
  date: new Date(),
  id: "",
  endMilage: 0,
  startMilage: 0,
});

const { form } = useFormValidation();
const { required } = useValidationRules();
const { isDirty, resetDirtyState } = useDirtyState(ref(internalSalesJourney));
const router = useRouter();

const [loading, refresh] = useLoadingState(async () => {
  salesJourney.value = await client.salesJourney.getSalesJourney.query(
    props.salesJourneyId
  );

  Object.entries(salesJourney.value).forEach(
    // @ts-ignore
    ([key, value]) => (internalSalesJourney[key] = value)
  );

  outlets.value = await client.outlet.getOutlets.query(
    salesJourney.value?.salesVisits?.map((visit) => visit.outletId) ?? []
  );

  resetDirtyState();
});

const [updating, updateSalesJourney] = useLoadingState(async () => {
  if (!salesJourney.value) {
    return;
  }

  await client.salesJourney.saveSalesJourney.mutate({
    ...salesJourney.value,
    ...internalSalesJourney,
  });
  await refresh();
});

const salesJourneyStatus = computed(() => {
  if (!salesJourney.value) {
    return "-";
  }

  if (salesJourney.value?.inProgress) {
    return "In Progress";
  }

  if (salesJourney.value?.completed) {
    return "Completed";
  }

  return "Pending";
});

const gridConfiguration = new GridConfigurationBuilder<SalesVisit>()
  .addTextColumn("Reference", (item) => item.reference)
  .addTextColumn(
    "Outlet",
    (item) =>
      outlets.value.find((outlet) => outlet.id === item.outletId)?.name ?? "-"
  )
  .addDateTimeColumn("Start time", (item) => item.startTime)
  .addDateTimeColumn("End time", (item) => item.endTime)
  .addTextColumn("Status", (item) => item.status)
  .addActionsColumn((builder) => {
    builder.addRoutingAction("View", (item) => ({
      path: `/sales/visits/${item.id}`,
    }));
    builder.addClickAction("Remove Visit", async (item) => {
      if (!item.salesJourneyId) {
        return;
      }

      await client.salesJourney.removeVisitFromSalesJourney.mutate({
        salesJourneyId: item.salesJourneyId,
        salesVisitId: item.id,
      });

      await refresh();
    });
  })
  .build();

onMounted(refresh);
</script>

<template>
  <br-page title="Sales Journey">
    <template #summary>
      {{ salesJourneyStatus }}
    </template>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card :loading="loading">
          <v-card-title> Sales Journey Details</v-card-title>
          <v-card-text>
            <br-form ref="form">
              <br-text
                v-model="internalSalesJourney.reference"
                label="Reference"
                :rules="[required]"
                :loading="loading"
              />
              <br-date
                v-model="internalSalesJourney.date"
                label="Journey Start Date"
                :loading="loading"
              />
            </br-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <br-btn
              variant="text"
              :disabled="!isDirty || updating"
              :loading="loading || updating"
              color="primary"
              @click="updateSalesJourney"
            >
              Update
            </br-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-row class="justify-space-between">
          <v-col cols="auto">
            <br-subtitle>Visits on Journey</br-subtitle>
          </v-col>
          <v-col cols="auto">
            <br-btn color="primary" :disabled="loading">
              Add Visit
              <v-icon icon="mdi-plus-circle-outline" class="ml-2" />
            </br-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <br-grid
          :grid-configuration="gridConfiguration"
          :items="salesJourney?.salesVisits ?? []"
          :loading="loading"
          @row-clicked="
            $router.push({
              path: `/sales/visits/${$event.id}`,
            })
          "
        />
      </v-col>
    </v-row>
    <template #footer>
      <button-bar>
        <template #right>
          <br-btn
            v-if="salesJourney?.inProgress"
            color="primary"
            :disabled="loading"
          >
            Finish Journey
          </br-btn>
          <br-btn v-else color="primary" :disabled="loading">
            Start Journey
          </br-btn>
        </template>
      </button-bar>
    </template>
  </br-page>
</template>

<script setup lang="ts">
import useLoadingState from "@/composables/useLoadingState";
import { computed, onMounted, ref } from "vue";
import { SalesJourney } from "@server/models/salesJourney.model";
import { client } from "@/api/client";
import BrPage from "@/components/base/BrPage.vue";
import BrForm from "@/components/input/BrForm.vue";
import { useFormValidation } from "@/composables/useFormValidation";
import BrDate from "@/components/input/specialised/BrDate.vue";
import { SalesVisit } from "@server/models/salesVisit.model";
import { useRouter } from "vue-router";
import { Outlet } from "@server/models/outlet.model";
import useDirtyState from "@/composables/useDirtyState";
import BrDropdown from "@/components/input/BrDropdown.vue";

type SalesVisitAndJourney = SalesVisit & {
  salesJourney: SalesJourney | null;
};

interface ViewSalesJourneyProps {
  salesVisitId: string;
}

const props = defineProps<ViewSalesJourneyProps>();

const salesVisit = ref<SalesVisitAndJourney>();
const outlets = ref<Outlet[]>([]);

const salesVisitStartDate = ref<Date>(new Date());
const salesVisitEndDate = ref<Date>(new Date());
const salesVisitOutletId = ref<string | null>(null);

const { form } = useFormValidation();
const { isDirty, resetDirtyState } = useDirtyState(
  salesVisitStartDate,
  salesVisitEndDate,
  salesVisitOutletId
);
const router = useRouter();

const [loading, refresh] = useLoadingState(async () => {
  [salesVisit.value, outlets.value] = await Promise.all([
    client.salesVisit.getSalesVisit.query(props.salesVisitId),
    client.outlet.getAllOutlets.query(),
  ]);

  salesVisitStartDate.value = salesVisit.value?.startTime;
  salesVisitEndDate.value = salesVisit.value?.endTime;
  salesVisitOutletId.value = salesVisit.value?.outletId;

  resetDirtyState();
});

const [updating, updateSalesVisit] = useLoadingState(async () => {
  if (!salesVisit.value || !salesVisitOutletId.value) {
    return;
  }

  await client.salesVisit.saveSalesVisit.mutate({
    ...salesVisit.value,
    startTime: salesVisitStartDate.value,
    endTime: salesVisitEndDate.value,
    outletId: salesVisitOutletId.value,
  });
  await refresh();
});

const salesVisitStatus = computed(() => {
  if (!salesVisit.value) {
    return "-";
  }

  return salesVisit.value?.status ?? "-";
});

onMounted(refresh);
</script>

<template>
  <br-page title="Sales Visit">
    <template #summary>
      {{ salesVisitStatus }}
    </template>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card :loading="loading">
          <v-card-title> Sales Visit Details</v-card-title>
          <v-card-text>
            <br-form ref="form">
              <br-date
                v-model="salesVisitStartDate"
                label="Visit Start Date"
                :loading="loading"
              />
              <br-date
                v-model="salesVisitEndDate"
                label="Journey End Date"
                :loading="loading"
              />
              <br-dropdown
                v-model="salesVisitOutletId"
                :item-title="(item: Outlet) => item.name"
                :item-value="(item: Outlet) => item.id"
                label="Outlet"
                :items="outlets"
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
              @click="updateSalesVisit"
            >
              Update
            </br-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </br-page>
</template>

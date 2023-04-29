<script setup lang="ts">
import useLoadingState from "@/composables/useLoadingState";
import { computed, onMounted, ref } from "vue";
import { SalesJourney } from "@server/models/salesJourney.model";
import { client } from "@/api/client";
import BrPage from "@/components/base/BrPage.vue";
import BrForm from "@/components/input/BrForm.vue";
import { useFormValidation } from "@/composables/useFormValidation";
import BrDate from "@/components/input/specialised/BrDate.vue";
import useDirtyState from "@/composables/useDirtyState";

interface ViewSalesJourneyProps {
  salesJourneyId: string;
}

const props = defineProps<ViewSalesJourneyProps>();

const salesJourney = ref<SalesJourney>();
const salesJourneyDate = ref<Date>(new Date());

const { form } = useFormValidation();
const { isDirty, resetDirtyState } = useDirtyState(salesJourneyDate);

const [loading, refresh] = useLoadingState(async () => {
  salesJourney.value = await client.salesJourney.getSalesJourney.query(
    props.salesJourneyId
  );
  salesJourneyDate.value = salesJourney.value?.date;
  resetDirtyState();
});

const [updating, updateSalesJourney] = useLoadingState(async () => {
  if (!salesJourney.value) {
    return;
  }

  await client.salesJourney.saveSalesJourney.mutate({
    ...salesJourney.value,
    date: salesJourneyDate.value,
  });
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
              <br-date v-model="salesJourneyDate" :loading="loading" />
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
  </br-page>
</template>
